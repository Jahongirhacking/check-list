import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router';
import { paths } from '../../routes/paths';

const CallbackHandler = () => {
    const [searchParams] = useSearchParams();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (searchParams.has('id')) {
            console.log(searchParams);
            setSuccess(true);
        }
    }, [searchParams])

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