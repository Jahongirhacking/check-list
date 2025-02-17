import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setTasks } from "../store/slices/taskSlice";
import { IUserState } from "../store/slices/userSlice";
import {
  getGistByIdUrl,
  getGistsUrl,
  patchGistUrl,
  postGistUrl,
} from "../utils/config";

const useGistHooks = (user: IUserState) => {
  const FILE_NAME = `${user?.id}.json`;
  const dispatch = useDispatch();

  // Function to get Gist by file name
  const getGistByName = useCallback(async (fileName: string) => {
    try {
      const { data } = await axios.post(getGistsUrl, { fileName });
      return data; // Return the Gist object if found, otherwise undefined
    } catch (error) {
      console.error(
        "Error fetching Gists:",
        error.response?.data || error.message
      );
      return null;
    }
  }, []);

  // Function to create a new Gist
  const createGist = useCallback(
    async (newData: object) => {
      try {
        const response = await axios.post(postGistUrl, {
          firstname: user?.first_name,
          lastname: user?.last_name,
          userId: user?.id,
          tasks: newData,
        });
        console.log("✅ Gist Created:", response.data.html_url);
        return response.data.id; // Return Gist ID
      } catch (error) {
        console.error("❌ Error:", error.response?.data || error.message);
      }
    },
    [user?.first_name, user?.last_name, user?.id]
  );

  // Function to update existing Gist
  const updateGist = useCallback(
    async (gistId: string, newData: object) => {
      try {
        const response = await axios.patch(patchGistUrl, {
          gistId,
          tasks: newData,
          userId: user?.id,
        });
        console.log("✅ Gist Successfully Updated:", response.data.html_url);
      } catch (error) {
        console.error(
          "❌ Error Updating Gist:",
          error.response?.data || error.message
        );
      }
    },
    [user?.id]
  );

  const checkGistExist = useCallback(async () => {
    const gist = await getGistByName(FILE_NAME);
    return gist;
  }, [FILE_NAME, getGistByName]);

  // Function to manage Gists (check if exists, update or create)
  const manageGist = useCallback(
    async (newData: object) => {
      const gist = await checkGistExist();
      if (gist) {
        await updateGist(gist.id, newData); // Update if found
      } else {
        await createGist(newData); // Create a new Gist if not found
      }
    },
    [updateGist, createGist, checkGistExist]
  );

  // Function to read JSON data from the Gist
  const readGistData = useCallback(
    async (id: number) => {
      try {
        const gist = await getGistByName(id ? `${id}.json` : FILE_NAME);
        // Make a GET request to the Gist API
        const response = await axios.post(getGistByIdUrl, { gistId: gist?.id });
        // Parse the content of the specified file (database.json in this case)
        const gistContent = JSON.parse(
          response.data.files[id ? `${id}.json` : FILE_NAME].content
        );
        console.log("📝 Gist Data:", gistContent);
        return gistContent; // Return the parsed JSON data
      } catch (error) {
        console.error(
          "❌ Error reading Gist:",
          error.response?.data || error.message
        );
        return null;
      }
    },
    [FILE_NAME, getGistByName]
  );

  const getTasks = useCallback(async () => {
    try {
      if (!user?.id) return;
      const content = await readGistData(user?.id);
      if (content && content.tasks.length > 0) {
        dispatch(setTasks(content.tasks));
      }
    } catch (err) {
      console.error("empty content", err);
    }
  }, [user?.id]);

  // Return all functions
  return {
    getGistByName,
    createGist,
    updateGist,
    manageGist,
    readGistData,
    checkGistExist,
    getTasks,
  };
};

export default useGistHooks;
