import { ClearOutlined, DeleteFilled, SendOutlined } from '@ant-design/icons'
import { Button, Flex, message, Typography } from 'antd'
import axios from 'axios'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunderEmoji } from '../assets/icons'
import TelegramLoginButton from '../pages/auth/TelegramLoginButton'
import { deleteAllTask, resetAllTask } from '../store/slices/taskSlice'
import { RootState } from '../store/store'
import { localStorageNames, sendMessageUrl } from '../utils/config'
import { getLocalStorage } from '../utils/storageUtils'
import { generateGeneralTasksMessage } from '../utils/taskUtils'

const Footer: FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const user = useSelector((store: RootState) => store.user);
    const tasks = useSelector((store: RootState) => store.task.tasks);
    const dispatch = useDispatch();

    const handleSend = async () => {
        try {
            await axios.post(sendMessageUrl, {
                chat_id: getLocalStorage(localStorageNames.chat_id) ?? user?.id,
                text: generateGeneralTasksMessage(tasks)
            });
            message.success("Message is sent successfully!")
        } catch (err) {
            message.warning("Error on sending message")
            console.error(err);
        }
    }

    const handleDeleteAll = () => {
        if (window.confirm("Are you sure you want to delete all your workouts so you can't restore them later?")) {
            dispatch(deleteAllTask());
        }
    }

    const handleResetAll = () => {
        if (window.confirm("Do you want to clear all training sessions, meaning all training metrics will be reset? Are you okay with that?")) {
            dispatch(resetAllTask());
        }
    }

    return (
        <footer {...props}>
            <Flex className='frame' gap={8} vertical align='center'>
                <Flex gap={12} align='center'>
                    <Button
                        icon={<DeleteFilled />}
                        color='danger'
                        variant='solid'
                        onClick={handleDeleteAll}
                    />
                    {
                        user?.id ? (
                            <Button
                                type='primary'
                                icon={<SendOutlined />}
                                iconPosition='end'
                                onClick={handleSend}
                            >
                                Send via Telegram
                            </Button>
                        ) : (
                            <TelegramLoginButton />
                        )
                    }
                    <Button
                        icon={<ClearOutlined />}
                        color='cyan'
                        variant='solid'
                        style={{ boxShadow: 'none' }}
                        onClick={handleResetAll}
                    />
                </Flex>
                <Flex align='center' gap={6}>
                    <Typography.Text style={{ textAlign: 'center' }}>
                        Developed for you by <a href='https://jahongirhacking.netlify.app/'>Jahongir Hayitov</a>
                    </Typography.Text>
                    <img width={18} src={ThunderEmoji} />
                </Flex>
            </Flex>
        </footer>
    )
}

export default Footer