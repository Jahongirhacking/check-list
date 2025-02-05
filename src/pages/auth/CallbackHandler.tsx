import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router';
import { paths } from '../../routes/paths';
import { login } from '../../store/slices/userSlice';
import { telegramBotUsername } from '../../utils/config';

const CallbackHandler = () => {
    const [searchParams] = useSearchParams();
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchParams.has('id')) {
            console.log(searchParams, searchParams.get('id'));
            window.open(`https://t.me/${telegramBotUsername}?start=welcome`, "_blank");
            dispatch(login([...searchParams.entries()].reduce((acc, curr) => ({ ...acc, [curr[0]]: curr[1] }), {})))
            setSuccess(true);
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