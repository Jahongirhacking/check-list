import { ClearOutlined, DeleteOutlined, EditOutlined, FileImageOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import TaskContainer, { ITaskContainer } from '../../../components/task/TaskContainer';
import { ITaskReducer } from '../../../components/task/TaskReducer';
import { deleteTask, editTask, resetTask } from '../../../store/slices/taskSlice';
import { generateTaskImage } from '../../../utils/taskUtils';

const EditableTask: FC<Omit<ITaskContainer, 'reducerName' | 'children'>> = ({ props, type }) => {
    const [reducerName, setReducerName] = useState<ITaskReducer['reducerName']>('view');
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (window.confirm(`Siz ${props?.name} mashg'ulotini o'chirmoqchimisiz ya'ni uni keyin qayta tiklay olmaysiz, shunga rozimisiz?`)) {
            dispatch(deleteTask(props?.id));
        }
    }

    const handleEdit = () => {
        if (setReducerName) {
            setReducerName('edit');
        }
    }

    const handleReset = () => {
        if (window.confirm(`Siz ${props?.name} mashg'ulotini tozalamoqchimisiz ya'ni undagi ko'rsatkich boshlang'ich holatiga qaytadi, shunga rozimisiz?`)) {
            dispatch(resetTask(props?.id));
        }
    }

    const handleEditImage = () => {
        dispatch(editTask({
            id: props?.id,
            img: generateTaskImage(props?.type)
        }))
    }

    const menuItems: MenuProps['items'] = [
        {
            key: 'edit',
            label: "Edit",
            icon: <EditOutlined />,
            onClick: handleEdit,
        },
        {
            key: 'editImage',
            label: "New image",
            icon: <FileImageOutlined />,
            onClick: handleEditImage,
        },
        {
            key: 'reset',
            label: "Reset",
            icon: <ClearOutlined />,
            onClick: handleReset,
            style: { color: '#13c2c2' },
        },
        {
            key: 'delete',
            label: "Delete",
            icon: <DeleteOutlined />,
            onClick: handleDelete,
            style: { color: 'red' },
        }
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