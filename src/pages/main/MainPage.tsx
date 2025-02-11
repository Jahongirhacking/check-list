import { CheckOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Segmented } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import ControlledFlow from '../../components/flow/ControlledFlow'
import TaskContainer from '../../components/task/TaskContainer'
import { addTask, decrementTask, incrementTask } from '../../store/slices/taskSlice'
import { RootState } from '../../store/store'
import { IGeneralTaskProps } from '../../types'
import ChooseTaskType from './components/ChooseTaskType'
import EditableTask from './components/EditableTask'
import InitialAddTaskButton from './components/InitialAddTaskButton'
import './style.scss'

const MainPage = () => {
    const IMAGES_LENGTH = 5;
    const [step, setStep] = useState(0);
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const tasks = useSelector((store: RootState) => store.task)?.tasks;
    const themeColor = useSelector((store: RootState) => store.theme).color;
    const taskOptions: { label: string, value: IGeneralTaskProps['type'] | 'all' }[] = [
        { label: 'Hammasi', value: 'all' },
        { label: 'Sport', value: 'sport' },
        { label: 'Ilmiy', value: 'science' },
        { label: 'Kundalik', value: 'daily' },
        { label: 'Boshqa', value: 'other' },
    ]

    const handleAddTask = (taskData: IGeneralTaskProps | object | undefined) => {
        dispatch(addTask({
            ...taskData,
            id: uuidv4(),
            isDone: false,
            isCountable: (taskData as IGeneralTaskProps)?.type === 'sport' ? true : (taskData as IGeneralTaskProps)?.isCountable,
            createdAt: moment().unix(),
            order: tasks?.length ?? 0,
            img: `/images/${(taskData as IGeneralTaskProps)?.type}/${Math.floor(Math.random() * IMAGES_LENGTH) + 1}.jpg`,
            current: 0,
        }))
        setStep(0);
    }

    const handleIncrement = (id: IGeneralTaskProps['id']) => {
        dispatch(incrementTask(id));
    }

    const handleDecrement = (id: IGeneralTaskProps['id']) => {
        dispatch(decrementTask(id));
    }

    return (
        <Flex vertical className='frame' gap={18}>
            <Segmented
                size='small'
                options={taskOptions}

            />
            <Flex vertical gap={8}>
                {
                    tasks?.map(task => (
                        <Card
                            key={task?.id}
                            className='task-card'
                            actions={
                                task?.isCountable ? [
                                    <Button size='small' shape='circle' danger type="primary" icon={<MinusOutlined />} onClick={() => handleDecrement(task?.id)} />,
                                    <Button size='small' shape='circle' type="primary" icon={<PlusOutlined />} onClick={() => handleIncrement(task?.id)} />
                                ] : [
                                    <Button size='small' color="cyan" shape='circle' variant='solid' icon={<CheckOutlined />} />
                                ]
                            }
                            style={{ background: `linear-gradient(150deg, #${themeColor === 'dark' ? '000' : 'fff'}, #${themeColor === 'dark' ? '000000' : 'ffffff'}73), url(${task?.img})` }}
                        >
                            <EditableTask
                                type={task?.type}
                                props={{ ...task }}
                            />
                        </Card>
                    ))
                }
            </Flex>
            <Card className='add-task-card'>
                <ControlledFlow
                    currentIndex={step}
                    setCurrentIndex={setStep}
                    data={data}
                    setData={setData}
                    onSubmit={handleAddTask}
                >
                    <InitialAddTaskButton />
                    <ChooseTaskType />
                    <TaskContainer
                        type={(data as IGeneralTaskProps)?.type}
                        reducerName='edit'
                        props={{ type: (data as IGeneralTaskProps)?.type }}
                    />
                </ControlledFlow>
            </Card>
        </Flex >
    )
}

export default MainPage