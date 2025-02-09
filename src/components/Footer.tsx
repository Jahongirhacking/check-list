import { HeartFilled, UploadOutlined } from '@ant-design/icons'
import { Button, Flex, Typography } from 'antd'
import axios from 'axios'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import TelegramLoginButton from '../pages/auth/TelegramLoginButton'
import { RootState } from '../store/store'
import { localStorageNames, sendMessageUrl } from '../utils/config'
import { getLocalStorage } from '../utils/storageUtils'

const Footer: FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const user = useSelector((store: RootState) => store.user);

    const handleSend = async () => {
        try {
            await axios.post(sendMessageUrl, { chat_id: getLocalStorage(localStorageNames.chat_id) });
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <footer {...props}>
            <Flex className='frame' gap={8} vertical align='center'>
                {
                    user?.id ? (
                        <Button
                            type='primary'
                            icon={<UploadOutlined />}
                            iconPosition='end'
                            onClick={handleSend}
                        >
                            Telegramga yuborish
                        </Button>
                    ) : (
                        <TelegramLoginButton />
                    )
                }
                <Typography.Text style={{ textAlign: 'center' }}>
                    <a href='https://jahongirhacking.netlify.app/'>Jahongir Hayitov</a>dan sizga taqdim etildi <HeartFilled style={{ color: '#ff2e53' }} />
                </Typography.Text>
            </Flex>
        </footer>
    )
}

export default Footer