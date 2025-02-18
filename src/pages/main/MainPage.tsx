import { Card, Divider, Flex, Segmented } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import ControlledFlow from '../../components/flow/ControlledFlow'
import TaskContainer from '../../components/task/TaskContainer'
import { useCreateGistMutation, useEditGistMutation, useGetGistMutation, useGetTasksMutation } from '../../store/slices/apiSlice'
import { addTask, setTasks } from '../../store/slices/taskSlice'
import { editUser } from '../../store/slices/userSlice'
import { RootState } from '../../store/store'
import { IGeneralTaskProps } from '../../types'
import { generateTaskImage } from '../../utils/taskUtils'
import ChooseTaskType from './components/ChooseTaskType'
import InitialAddTaskButton from './components/InitialAddTaskButton'
import MainCard from './components/MainCard'
import './style.scss'

const MainPage = () => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const tasks = useSelector((store: RootState) => store.task)?.tasks;
    const user = useSelector((store: RootState) => store.user);
    const [getTasks] = useGetTasksMutation();
    const [getGist] = useGetGistMutation();
    const [editGist] = useEditGistMutation();
    const [createGist] = useCreateGistMutation();
    const taskOptions: { label: string, value: IGeneralTaskProps['type'] | 'all' }[] = [
        { label: 'Hammasi', value: 'all' },
        { label: 'Sport', value: 'sport' },
        { label: 'Ilmiy', value: 'science' },
        { label: 'Kundalik', value: 'daily' },
        { label: 'Boshqa', value: 'other' },
    ]
    const [taskType, setTaskType] = useState(taskOptions[0].value);

    const handleAddTask = (taskData: IGeneralTaskProps | object | undefined) => {
        dispatch(addTask({
            ...taskData,
            id: uuidv4(),
            isDone: false,
            isCountable: (taskData as IGeneralTaskProps)?.type === 'sport' ? true : (taskData as IGeneralTaskProps)?.isCountable,
            createdAt: moment().unix(),
            order: tasks?.length ?? 0,
            img: generateTaskImage((taskData as IGeneralTaskProps)?.type),
            current: 0,
        }))
        setStep(0);
    }

    const sortedTasks = tasks.filter((task) => taskType === 'all' || task.type === taskType);

    useEffect(() => {
        if (user?.id) {
            (async () => {
                try {
                    const { data: gist } = await getTasks({ userId: user.id! });
                    if (gist && "id" in gist) {
                        const response = await getGist({ gistId: gist.id as string });
                        const gistContent = JSON.parse(
                            response.data.files[`${user?.id}.json`].content
                        );
                        dispatch(setTasks(gistContent));
                    }
                } catch (err) {
                    console.error(err);
                } finally {
                    dispatch(editUser({ backupCompleted: true }));
                }
            })()
        }
    }, [user?.id, dispatch, getTasks, getGist])

    useEffect(() => {
        if (user?.backupCompleted && user?.id && tasks && tasks.length) {
            (async () => {
                const { data: gist } = await getTasks({ userId: user.id! });
                if (gist && 'id' in gist) {
                    await editGist({ gistId: gist.id as string, tasks, userId: user.id! });
                } else {
                    await createGist({ userId: user.id!, tasks, firstname: user.first_name ?? "", lastname: user.last_name ?? "" });
                }
            })()
        }
    }, [tasks, user.backupCompleted, editGist, createGist, getTasks, user?.first_name, user?.last_name, user?.id]);

    return (
        <Flex vertical className='frame' gap={18}>
            <Segmented
                size='small'
                options={taskOptions}
                value={taskType}
                onChange={(value) => setTaskType(value)}
            />
            <Flex vertical gap={8}>
                {
                    sortedTasks?.filter(task => !task.isDone)?.map(task => (
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
                !!sortedTasks?.filter(task => task.isDone).length && (
                    <>
                        <Divider>Bajarilgan mashg'ulotlar</Divider>
                        <Flex vertical gap={8}>
                            {
                                sortedTasks?.filter(task => task.isDone)?.map(task => (
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