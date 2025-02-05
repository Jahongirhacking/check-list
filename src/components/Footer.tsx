import { HeartFilled, UploadOutlined } from '@ant-design/icons'
import { Button, Flex, Typography } from 'antd'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import TelegramLoginPage from '../pages/auth/TelegramLoginButton'
import { RootState } from '../store/store'

const Footer: FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const user = useSelector((store: RootState) => store.user);

    const handleSend = async () => {
        console.log("sending...");
    }

    return (
        <footer {...props}>
            <Flex gap={8} vertical align='center'>
                {
                    user?.id ? (
                        <Button type='primary' icon={<UploadOutlined />} iconPosition='end' onClick={handleSend}>Telegramga yuborish</Button>
                    ) : (
                        <TelegramLoginPage />
                    )
                }
                <Typography.Text style={{ textAlign: 'center' }}>
                    <a href='https://jahongirhacking.netlify.app/'>Jahongir Hayitov</a>dan sizga taqdim etildi <HeartFilled style={{ color: '#ed0e28' }} />
                </Typography.Text>
            </Flex>
        </footer>
    )
}

export default Footer