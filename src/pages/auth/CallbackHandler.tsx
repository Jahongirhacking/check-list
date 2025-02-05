import React from 'react';
import { Navigate, useParams } from 'react-router';
import { paths } from '../../routes/paths';
import { IState } from '../../store/slices/userSlice';

const CallbackHandler = () => {
    const params: IState = useParams();
    console.log(params, params.id);

    return (<Navigate to={paths.base} />)
}

export default CallbackHandler