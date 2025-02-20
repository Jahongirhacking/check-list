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
        <div className='animated-element'>
            <Card
                className={`task-card ${task?.isDone ? 'complete' : 'incomplete'}-task-card animated-element-content`}
                actions={
                    task?.isCountable ? [
                        ...((task?.current || 0) >= 0 ? [<Button key={1} size='small' shape='circle' color='danger' variant='outlined' icon={<MinusOutlined />} onClick={() => handleDecrement(task?.id)} />] : []),
                        <Button key={2} size='small' shape='circle' color='cyan' variant='outlined' icon={<PlusOutlined />} onClick={() => handleIncrement(task?.id)} />
                    ] : [
                        ...(task?.isDone
                            ? [<Button key={1} size='small' color="danger" shape='circle' variant='outlined' icon={<CloseOutlined />} onClick={() => handleMakeTaskDone(task?.id, false)} />]
                            : [<Button key={2} size='small' color="cyan" shape='circle' variant='outlined' icon={<CheckOutlined />} onClick={() => handleMakeTaskDone(task?.id, true)} />]
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
        </div>
    )
}

export default MainCard