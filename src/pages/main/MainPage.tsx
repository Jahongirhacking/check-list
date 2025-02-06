import { Card, Flex } from 'antd'
import React, { useState } from 'react'
import ControlledFlow from '../../components/flow/ControlledFlow'
import TaskContainer from '../../components/task/TaskContainer'
import { IGenerealTaskProps } from '../../types'
import ChooseTaskType from './components/ChooseTaskType'
import InitialAddTaskButton from './components/InitialAddTaskButton'

const MainPage = () => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({});

    return (
        <Flex vertical className='frame'>
            <Card className='add-task-card'>
                <ControlledFlow
                    currentIndex={step}
                    setCurrentIndex={setStep}
                    data={data}
                    setData={setData}
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