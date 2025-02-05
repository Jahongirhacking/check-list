import { HeartFilled, UploadOutlined } from '@ant-design/icons'
import { Button, Flex, Typography } from 'antd'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { paths } from '../routes/paths'
import { RootState } from '../store/store'

const Footer: FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const user = useSelector((store: RootState) => store.user);
    const navigate = useNavigate();

    const handleSend = async () => {
        if (user.id) {
            console.log("sending...");
        } else {
            navigate(paths.login);
        }
    }

    return (
        <footer {...props}>
            <Flex gap={8} vertical align='center'>
                <Button type='primary' icon={<UploadOutlined />} iconPosition='end' onClick={handleSend}>Telegramga yuborish</Button>
                <Typography.Text style={{ textAlign: 'center' }}>
                    <a href='https://jahongirhacking.netlify.app/'>Jahongir Hayitov</a>dan sizga taqdim etildi <HeartFilled style={{ color: '#ed0e28' }} />
                </Typography.Text>
            </Flex>
        </footer>
    )
}

export default Footer