import { ClearOutlined, DeleteFilled, RobotOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Flex, FloatButton, message, Typography } from 'antd'
import axios from 'axios'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
    const { t } = useTranslation();
    const [isBotActive, setIsBotActive] = useState(false);
    const botUrl = "https://t.me/check_todo_list_bot";

    const handleSend = async () => {
        try {
            setIsBotActive(true);
            setTimeout(() => {
                setIsBotActive(false);
            }, 10000)
            await axios.post(sendMessageUrl, {
                chat_id: getLocalStorage(localStorageNames.chat_id) ?? user?.id,
                text: generateGeneralTasksMessage(tasks)
            });
            message.success(t("message_success"))
        } catch (err) {
            message.warning(t("message_error"))
            console.error(err);
        }
    }

    const handleDeleteAll = () => {
        if (window.confirm(t('delete_all'))) {
            dispatch(deleteAllTask());
        }
    }

    const handleResetAll = () => {
        if (window.confirm(t('reset_all'))) {
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
                                {t('send_bot')}
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
                <FloatButton
                    className={isBotActive ? "active" : "inactive"}
                    icon={<RobotOutlined />}
                    type='primary'
                    style={{ bottom: 110, right: 20 }}
                    href={botUrl}
                />
            </Flex>
        </footer>
    )
}

export default Footer