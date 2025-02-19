import { Button, Flex, FormInstance } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../../store/slices/taskSlice';
import { IGeneralTaskProps } from '../../types';
import { ITaskContainer } from '../task/TaskContainer';

const EditButtons = ({ id, form, setReducerName }: { id: IGeneralTaskProps['id'], form: FormInstance, setReducerName: ITaskContainer['setReducerName'] }) => {
    const dispatch = useDispatch();
    const handleEdit = () => {
        dispatch(editTask({ id, ...form.getFieldsValue() }));
        if (setReducerName) {
            setReducerName('view');
        }
    }

    const handleCancel = () => {
        if (setReducerName) {
            setReducerName('view');
        }
    }

    return (
        <Flex className="flow-btns" gap={12} wrap align='center' justify='right'>
            <Button onClick={handleCancel}>
                Cancel
            </Button>
            <Button type="primary" onClick={handleEdit}>
                Edit
            </Button>
        </Flex>
    )
}

export default EditButtons