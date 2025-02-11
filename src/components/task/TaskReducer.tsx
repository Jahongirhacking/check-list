import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { IGeneralTaskProps } from '../../types';

export interface ITaskReducer {
    viewComponent: ReactElement;
    editComponent: ReactElement;
    reducerName: 'edit' | 'view';
    setReducerName?: Dispatch<SetStateAction<ITaskReducer["reducerName"]>>,
    props: IGeneralTaskProps;
}

const TaskReducer = ({ viewComponent, editComponent, reducerName, setReducerName, props }: ITaskReducer) => {
    switch (reducerName) {
        case 'edit': {
            return React.cloneElement(editComponent, { props, setReducerName });
        }
        case 'view': {
            return React.cloneElement(viewComponent, { props, setReducerName });
        }
        default: {
            return null;
        }
    }
}

export default TaskReducer