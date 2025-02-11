import { ClearOutlined, DeleteFilled, HeartFilled, UploadOutlined } from '@ant-design/icons'
import { Button, Flex, message, Typography } from 'antd'
import axios from 'axios'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
            message.success("Xabar muvaffaqiyatli yuborildi!")
        } catch (err) {
            message.warning("Xabar yuborishda xatolik")
            console.error(err);
        }
    }

    const handleDeleteAll = () => {
        if (window.confirm("Siz barcha mashg'ulotlarni o'chirmoqchimisiz ya'ni ularni keyin qayta tiklay olmaysiz, shunga rozimisiz?")) {
            dispatch(deleteAllTask());
        }
    }

    const handleResetAll = () => {
        if (window.confirm("Siz barcha mashg'ulotlarni qayta o'rnatmoqchimisiz ya'ni barcha mashg'ulot ko'rsatkichlari boshlang'ich holatiga o'tadi, shunga rozimisiz?")) {
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
                    <Button
                        icon={<ClearOutlined />}
                        color='cyan'
                        variant='solid'
                        style={{ boxShadow: 'none' }}
                        onClick={handleResetAll}
                    />
                </Flex>
                <Typography.Text style={{ textAlign: 'center' }}>
                    <a href='https://jahongirhacking.netlify.app/'>Jahongir Hayitov</a>dan sizga taqdim etildi <HeartFilled style={{ color: '#ff2e53' }} />
                </Typography.Text>
            </Flex>
        </footer>
    )
}

export default Footer