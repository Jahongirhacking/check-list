import { HeartFilled, UploadOutlined } from '@ant-design/icons'
import { Button, Flex, Typography } from 'antd'
import React, { FC } from 'react'

const Footer: FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <footer {...props}>
            <Flex gap={8} vertical align='center'>
                <Button type='primary' icon={<UploadOutlined />} iconPosition='end'>Telegram orqali yuborish</Button>
                <Typography.Text style={{ textAlign: 'center' }}>
                    <a href='https://jahongirhacking.netlify.app/'>Jahongir Hayitov</a>dan sizga taqdim etildi <HeartFilled style={{ color: '#ed0e28' }} />
                </Typography.Text>
            </Flex>
        </footer>
    )
}

export default Footer