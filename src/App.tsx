import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import RouterElement from "./routes";

function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, [])

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
