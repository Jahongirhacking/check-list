import { Card, Divider, Flex, Segmented } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import ControlledFlow from '../../components/flow/ControlledFlow'
import TaskContainer from '../../components/task/TaskContainer'
import { addTask } from '../../store/slices/taskSlice'
import { RootState } from '../../store/store'
import { IGeneralTaskProps } from '../../types'
import ChooseTaskType from './components/ChooseTaskType'
import InitialAddTaskButton from './components/InitialAddTaskButton'
import MainCard from './components/MainCard'
import './style.scss'

const MainPage = () => {
    const IMAGES_LENGTH = 5;
    const [step, setStep] = useState(0);
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const tasks = useSelector((store: RootState) => store.task)?.tasks;
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

    return (
        <Flex vertical className='frame' gap={18}>
            <Segmented
                size='small'
                options={taskOptions}

            />
            <Flex vertical gap={8}>
                {
                    tasks?.filter(task => !task.isDone)?.map(task => (
                        <MainCard key={task?.id} task={task} />
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
            {
                !!tasks?.filter(task => task.isDone).length && (
                    <>
                        <Divider>Bajarilgan mashg'ulotlar</Divider>
                        <Flex vertical gap={8}>
                            {
                                tasks?.filter(task => task.isDone)?.map(task => (
                                    <MainCard key={task?.id} task={task} />
                                ))
                            }
                        </Flex>
                    </>
                )
            }
        </Flex >
    )
}

export default MainPage