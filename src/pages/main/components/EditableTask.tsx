import { ClearOutlined, DeleteOutlined, DownOutlined, EditOutlined, FileImageOutlined, MoreOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import TaskContainer, { ITaskContainer } from '../../../components/task/TaskContainer';
import { ITaskReducer } from '../../../components/task/TaskReducer';
import { deleteTask, editTask, makeDownward, makeUpward, resetTask } from '../../../store/slices/taskSlice';
import { RootState } from '../../../store/store';
import { toFirstCapitalLetter } from '../../../utils/stringUtils';
import { generateTaskImage } from '../../../utils/taskUtils';

const EditableTask: FC<Omit<ITaskContainer, 'reducerName' | 'children'>> = ({ props, type }) => {
    const [reducerName, setReducerName] = useState<ITaskReducer['reducerName']>('view');
    const tasks = useSelector((store: RootState) => store.task.tasks);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleDelete = () => {
        if (window.confirm(t('delete_one', { name: props?.name }))) {
            dispatch(deleteTask(props?.id));
        }
    }

    const handleEdit = () => {
        if (setReducerName) {
            setReducerName('edit');
        }
    }

    const handleReset = () => {
        if (window.confirm(t('reset_one', { name: props?.name }))) {
            dispatch(resetTask(props?.id));
        }
    }

    const handleEditImage = () => {
        dispatch(editTask({
            id: props?.id,
            img: generateTaskImage(props?.type)
        }))
    }

    const handleUpward = () => {
        dispatch(makeUpward(props?.id));
    }

    const handleDownward = () => {
        dispatch(makeDownward(props?.id))
    }


    const menuItems: MenuProps['items'] = [
        ...((props?.order ?? 0) > 0 ? [{
            key: 'upward',
            label: toFirstCapitalLetter(t('upward')),
            icon: <UpOutlined />,
            onClick: handleUpward,
        }] : []),
        {
            key: 'edit',
            label: toFirstCapitalLetter(t('edit')),
            icon: <EditOutlined />,
            onClick: handleEdit,
            style: { color: '#d1a600' },
        },
        {
            key: 'editImage',
            label: toFirstCapitalLetter(t('new_image')),
            icon: <FileImageOutlined />,
            onClick: handleEditImage,
            style: { color: '#9073ff' },
        },
        {
            key: 'reset',
            label: toFirstCapitalLetter(t('reset')),
            icon: <ClearOutlined />,
            onClick: handleReset,
            style: { color: '#13c2c2' },
        },
        {
            key: 'delete',
            label: toFirstCapitalLetter(t('delete')),
            icon: <DeleteOutlined />,
            onClick: handleDelete,
            style: { color: '#eb3e40' },
        },
        ...((props?.order ?? 0) < tasks.length - 1 ? [{
            key: 'downward',
            label: toFirstCapitalLetter(t('downward')),
            icon: <DownOutlined />,
            onClick: handleDownward,
        }] : []),
    ]

    return (
        <TaskContainer
            reducerName={reducerName}
            setReducerName={setReducerName}
            props={props}
            type={type}
        >
            <Dropdown
                trigger={['click']}
                menu={{ items: menuItems }}
            >
                <Button icon={<MoreOutlined />} />
            </Dropdown>
        </TaskContainer>
    )
}

export default EditableTask