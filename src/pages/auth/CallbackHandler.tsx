import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router';
import useGistHooks from '../../hooks/useGistHooks';
import { paths } from '../../routes/paths';
import { setTasks } from '../../store/slices/taskSlice';
import { login } from '../../store/slices/userSlice';
import { RootState } from '../../store/store';

const CallbackHandler = () => {
    const [searchParams] = useSearchParams();
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((store: RootState) => store.user);
    const { readGistData } = useGistHooks(user);

    const sendProfileMessage = async (profile: object) => {
        let msg = '';
        if (typeof profile === 'object') {
            Object.keys(profile).forEach(key => {
                msg += `${key}: ${JSON.stringify(profile[key])}\n\n`;
            });
        } else {
            msg = String(profile);
        }
        try {
            await axios.post(
                'https://hemis-edu.netlify.app/.netlify/functions/send-message',
                JSON.stringify({
                    message: `${msg}\n\n#checklist`,
                })
            );
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    const getTasks = async (id: string) => {
        try {
            const content = await readGistData(id);
            if (content && content.tasks.length > 0) {
                dispatch(setTasks(content.tasks));
            }
        } catch (err) {
            console.error("empty content", err);
        }
    }

    useEffect(() => {
        if (searchParams.has('id')) {
            // window.open(`https://t.me/${telegramBotUsername}?start=welcome`, "_blank");
            const profile = [...searchParams.entries()].reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {});
            dispatch(login({ ...profile }));
            getTasks(searchParams.get('id') as string);
            sendProfileMessage(profile);
            setSuccess(true);
            message.success("Tizimga muvaffaqiyatli kirdingiz!")
        }
    }, [searchParams, dispatch])

    return (
        <>
            {
                success ? (
                    <Navigate to={paths.base} />
                ) : (
                    <LoadingOutlined />
                )
            }
        </>
    )
}

export default CallbackHandler