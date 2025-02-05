import { LoginButton } from "@telegram-auth/react";
import React from "react";
import { authBackendUrl, telegramBotUsername } from "./utils/config";

function App() {
  return (
    <div>
      <LoginButton
        botUsername={telegramBotUsername}
        authCallbackUrl={authBackendUrl}
        buttonSize="large"
        cornerRadius={5}
        showAvatar={true}
        lang="en"
      />
    </div>
  );
}

export default App
