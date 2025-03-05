import { Button, Flex, FormInstance } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { editTask } from '../../store/slices/taskSlice';
import { IGeneralTaskProps } from '../../types';
import { toFirstCapitalLetter } from '../../utils/stringUtils';
import { ITaskContainer } from '../task/TaskContainer';

const EditButtons = ({ id, form, setReducerName }: { id: IGeneralTaskProps['id'], form: FormInstance, setReducerName: ITaskContainer['setReducerName'] }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

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
                {toFirstCapitalLetter(t('cancel'))}
            </Button>
            <Button type="primary" onClick={handleEdit}>
                {toFirstCapitalLetter(t('edit'))}
            </Button>
        </Flex>
    )
}

export default EditButtons