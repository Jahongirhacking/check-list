import { LoginButton } from '@telegram-auth/react'
import React from 'react'
import { paths } from '../../routes/paths'
import { telegramBotUsername } from '../../utils/config'

const TelegramLoginPage = () => {
    return (
        <LoginButton
            botUsername={telegramBotUsername}
            authCallbackUrl={paths.callback}
            buttonSize="large"
            cornerRadius={5}
            showAvatar={true}
            lang="en"
        />
    )
}

export default TelegramLoginPage