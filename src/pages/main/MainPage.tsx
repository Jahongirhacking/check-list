import { CheckOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Flex } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import ControlledFlow from '../../components/flow/ControlledFlow'
import TaskContainer from '../../components/task/TaskContainer'
import { addTask } from '../../store/slices/taskSlice'
import { RootState } from '../../store/store'
import { IGenerealTaskProps } from '../../types'
import ChooseTaskType from './components/ChooseTaskType'
import EditableTask from './components/EditableTask'
import InitialAddTaskButton from './components/InitialAddTaskButton'
import './style.scss'

const MainPage = () => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const tasks = useSelector((store: RootState) => store.task)?.tasks;
    const IMAGES_LENGTH = 5;

    const handleAddTask = (taskData: IGenerealTaskProps | object | undefined) => {
        dispatch(addTask({
            ...taskData,
            id: uuidv4(),
            isDone: false,
            isCountable: (taskData as IGenerealTaskProps)?.type === 'sport' ? true : (taskData as IGenerealTaskProps)?.isCountable,
            createdAt: moment().unix(),
            order: tasks?.length ?? 0,
            img: `/images/${(taskData as IGenerealTaskProps)?.type}/${Math.floor(Math.random() * IMAGES_LENGTH) + 1}.jpg`,
            current: 0,
        }))
        setStep(0);
    }

    return (
        <Flex vertical className='frame' gap={18}>
            <Flex vertical gap={8}>
                {
                    tasks?.map(task => (
                        <Card key={task?.id} className='task-card'
                            actions={[
                                <Button danger type="primary" icon={<MinusOutlined />} />,
                                <Button color="cyan" variant='solid' icon={<CheckOutlined />} />,
                                <Button type="primary" icon={<PlusOutlined />} />
                            ]
                            }>
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
                        type={(data as IGenerealTaskProps)?.type}
                        reducerName='edit'
                        props={{ type: (data as IGenerealTaskProps)?.type }}
                    />
                </ControlledFlow>
            </Card>
        </Flex>
    )
}

export default MainPage