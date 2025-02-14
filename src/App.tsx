import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGistHooks from "./hooks/useGistHooks";
import RouterElement from "./routes";
import { RootState } from "./store/store";
import { getUpdatesUrl, localStorageNames } from "./utils/config";
import { setLocalStorage } from "./utils/storageUtils";

function App() {
  const [isReady, setIsReady] = useState(false);
  const user = useSelector((store: RootState) => store.user);
  const tasks = useSelector((store: RootState) => store.task.tasks);
  const getChatId = async (userId: number) => {
    try {
      const { data } = await axios.get(getUpdatesUrl);
      const current = data.result.find(
        (chat) => chat?.message?.from?.id == userId
      );
      if (!current) {
        throw new Error("chat id not found");
      }
      const chat_id = current.message.chat.id;
      setLocalStorage(localStorageNames.chat_id, chat_id);
    } catch (err) {
      console.error(err);
    }
  }
  const { manageGist } = useGistHooks(user);

  useEffect(() => {
    manageGist({ tasks });
  }, [tasks])

  useEffect(() => {
    setIsReady(true);
  }, [])

  useEffect(() => {
    if (user?.id) {
      getChatId(user?.id);
    }
  }, [user?.id])

  return (
    <>
      {
        isReady ? (
          <RouterElement />
        ) : (
          <LoadingOutlined
            style={{
              fontSize: 70,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100dvh',
              color: '#006d75',
            }} />
        )
      }
    </>
  );
}

export default App
