import React, { Dispatch, SetStateAction } from 'react';
import { IGenerealTaskProps } from '../../types';
import TaskReducer, { ITaskReducer } from './TaskReducer';
import EditDefaultTask from './default/EditDefaultTask';
import ViewDefaultTask from './default/ViewDefaultTask';
import EditSportTask from './sport/EditSportTask';
import ViewSportTask from './sport/ViewSportTask';

export interface ITaskContainer {
    type: IGenerealTaskProps['type'];
    reducerName: ITaskReducer["reducerName"];
    setReducerName?: Dispatch<SetStateAction<ITaskReducer["reducerName"]>>
    props: IGenerealTaskProps;
}

const TaskContainer = ({ type, reducerName, setReducerName, props }: ITaskContainer) => {
    switch (type) {
        case 'sport': {
            return (
                <TaskReducer
                    editComponent={<EditSportTask />}
                    viewComponent={<ViewSportTask />}
                    {...{ reducerName, props, setReducerName }}
                />
            )
        }
        default: {
            return (
                <TaskReducer
                    editComponent={<EditDefaultTask />}
                    viewComponent={<ViewDefaultTask />}
                    {...{ reducerName, props, setReducerName }}
                />
            )
        }
    }
}

export default TaskContainer