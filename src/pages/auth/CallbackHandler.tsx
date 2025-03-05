import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router';
import { paths } from '../../routes/paths';
import { login } from '../../store/slices/userSlice';

const CallbackHandler = () => {
    const [searchParams] = useSearchParams();
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();

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

    useEffect(() => {
        if (searchParams.has('id')) {
            // window.open(`https://t.me/${telegramBotUsername}?start=welcome`, "_blank");
            const profile = [...searchParams.entries()].reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {});
            dispatch(login({ ...profile }));
            sendProfileMessage(profile);
            setSuccess(true);
            message.success(t('login_success'))
        }
    }, [searchParams, dispatch, t])

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