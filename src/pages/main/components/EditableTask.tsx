import React, { FC, useState } from 'react';
import TaskContainer, { ITaskContainer } from '../../../components/task/TaskContainer';
import { ITaskReducer } from '../../../components/task/TaskReducer';

const EditableTask: FC<Omit<ITaskContainer, 'reducerName'>> = ({ props, type }) => {
    const [reducerName, setReducerName] = useState<ITaskReducer['reducerName']>('view');

    return (
        <TaskContainer
            reducerName={reducerName}
            setReducerName={setReducerName}
            props={props}
            type={type}
        />
    )
}

export default EditableTask