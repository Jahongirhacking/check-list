import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { IGeneralTaskProps } from '../../types';
import TaskReducer, { ITaskReducer } from './TaskReducer';
import EditDefaultTask from './default/EditDefaultTask';
import ViewDefaultTask from './default/ViewDefaultTask';
import EditSportTask from './sport/EditSportTask';
import ViewSportTask from './sport/ViewSportTask';

export interface ITaskContainer {
    type: IGeneralTaskProps['type'];
    reducerName: ITaskReducer["reducerName"];
    setReducerName?: Dispatch<SetStateAction<ITaskReducer["reducerName"]>>
    props: IGeneralTaskProps;
    children?: ReactElement
}

const TaskContainer = ({ type, reducerName, setReducerName, props, children }: ITaskContainer) => {
    switch (type) {
        case 'sport': {
            return (
                <TaskReducer
                    editComponent={<EditSportTask />}
                    viewComponent={<ViewSportTask {...{ children }} />}
                    {...{ reducerName, props, setReducerName }}
                />
            )
        }
        default: {
            return (
                <TaskReducer
                    editComponent={<EditDefaultTask />}
                    viewComponent={<ViewDefaultTask {...{ children }} />}
                    {...{ reducerName, props, setReducerName }}
                />
            )
        }
    }
}

export default TaskContainer