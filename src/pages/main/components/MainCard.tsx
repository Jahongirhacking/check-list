import { CheckOutlined, CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementTask, editTask, incrementTask } from '../../../store/slices/taskSlice'
import { RootState } from '../../../store/store'
import { IGeneralTaskProps } from '../../../types'
import EditableTask from './EditableTask'

const MainCard = ({ task }: { task: IGeneralTaskProps }) => {
    const themeColor = useSelector((store: RootState) => store.theme).color;
    const dispatch = useDispatch();

    const handleIncrement = (id: IGeneralTaskProps['id']) => {
        dispatch(incrementTask(id));
    }

    const handleDecrement = (id: IGeneralTaskProps['id']) => {
        dispatch(decrementTask(id));
    }

    const handleMakeTaskDone = (id: IGeneralTaskProps['id'], isDone: boolean) => {
        dispatch(editTask({ id, isDone }));
    }
    return (
        <Card
            className={`task-card ${task?.isDone ? 'complete' : 'incomplete'}-task-card`}
            actions={
                task?.isCountable ? [
                    ...(task?.current !== 0 ? [<Button size='small' shape='circle' danger type="primary" icon={<MinusOutlined />} onClick={() => handleDecrement(task?.id)} />] : []),
                    ...(!task?.isDone ? [<Button size='small' shape='circle' type="primary" icon={<PlusOutlined />} onClick={() => handleIncrement(task?.id)} />] : [])
                ] : [
                    ...(task?.isDone
                        ? [<Button size='small' color="danger" shape='circle' variant='solid' icon={<CloseOutlined />} onClick={() => handleMakeTaskDone(task?.id, false)} />]
                        : [<Button size='small' color="cyan" shape='circle' variant='solid' icon={<CheckOutlined />} onClick={() => handleMakeTaskDone(task?.id, true)} />]
                    ),
                ]
            }
            style={{ background: `linear-gradient(150deg, #${themeColor === 'dark' ? '000' : 'fff'}, #${themeColor === 'dark' ? '000000' : 'ffffff'}73), url(${task?.img})` }}
        >
            <EditableTask
                type={task?.type}
                props={{ ...task }}
            />
        </Card>
    )
}

export default MainCard