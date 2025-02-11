import { ClearOutlined, DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown, Flex, MenuProps, Typography } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, resetTask } from '../../../store/slices/taskSlice'
import { IDefaultTaskProps } from '../../../types'
import { ITaskReducer } from '../TaskReducer'

const ViewDefaultTask = ({ props, setReducerName }: { props?: IDefaultTaskProps, setReducerName?: ITaskReducer['setReducerName'] }) => {
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

    const menuItems: MenuProps['items'] = [
        {
            key: 'edit',
            label: "O'zgartirish",
            icon: <EditOutlined />,
            onClick: handleEdit,
        },
        {
            key: 'reset',
            label: "Tozalash",
            icon: <ClearOutlined />,
            onClick: handleReset,
            style: { color: '#13c2c2' },
        },
        {
            key: 'delete',
            label: "O'chirish",
            icon: <DeleteOutlined />,
            onClick: handleDelete,
            style: { color: 'red' },
        }
    ]

    return (
        <Flex className="sport-task view-task task-body" gap={8}>
            <Flex className='task-content' vertical gap={8} style={{ width: '100%' }}>
                <Typography.Text strong>{props?.name}</Typography.Text>
                {
                    props?.isCountable && (
                        <Typography.Text strong>{props?.current} / {props?.totalPart} {props?.partUnit}</Typography.Text>
                    )
                }
            </Flex>
            <Dropdown
                trigger={['click']}
                menu={{ items: menuItems }}
            >
                <Button icon={<MoreOutlined />} />
            </Dropdown>
        </Flex>
    )
}

export default ViewDefaultTask