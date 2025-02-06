import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { IGenerealTaskProps } from '../../types';

export interface ITaskReducer {
    viewComponent: ReactElement;
    editComponent: ReactElement;
    reducerName: 'edit' | 'view';
    setReducerName?: Dispatch<SetStateAction<ITaskReducer["reducerName"]>>,
    props: IGenerealTaskProps;
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