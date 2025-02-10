import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RouterElement from "./routes";
import { RootState } from "./store/store";
import { getUpdatesUrl, localStorageNames } from "./utils/config";
import { setLocalStorage } from "./utils/storageUtils";

function App() {
  const [isReady, setIsReady] = useState(false);
  const userId = useSelector((store: RootState) => store.user.id);
  const getChatId = async (userId: number) => {
    try {
      const response = await axios.get(getUpdatesUrl);
      const current = response.data.result.find(
        (chat) => chat.message.from.id === userId
      );
      if (!current) {
        throw new Error("chat id not found");
      }
      console.log(current);
      const chat_id = current.message.chat.id;
      setLocalStorage(localStorageNames.chat_id, chat_id);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setIsReady(true);
  }, [])

  useEffect(() => {
    if (userId) {
      getChatId(userId);
    }
  }, [userId])

  return (
    <>
      {
        isReady ? (
          <RouterElement />
        ) : (
          <LoadingOutlined style={{ fontSize: 50, margin: 'auto' }} />
        )
      }
    </>
  );
}

export default App
