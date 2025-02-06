import React, { ReactElement } from 'react';
import { IGenerealTaskProps } from '../../types';

export interface ITaskReducer {
    viewComponent: ReactElement;
    editComponent: ReactElement;
    reducerName: 'edit' | 'view';
    props: IGenerealTaskProps;
}

const TaskReducer = ({ viewComponent, editComponent, reducerName, props }: ITaskReducer) => {
    switch (reducerName) {
        case 'edit': {
            return React.cloneElement(editComponent, { props });
        }
        case 'view': {
            return React.cloneElement(viewComponent, { props });
        }
        default: {
            return null;
        }
    }
}

export default TaskReducer