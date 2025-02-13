import { Flex, Typography } from 'antd'
import React from 'react'
import { ISportTaskProps } from '../../../types'
import { ITaskContainer } from '../TaskContainer'

const ViewSportTask = ({ props, children }: { props?: ISportTaskProps, children: ITaskContainer['children'] }) => {
    return (
        <Flex className="sport-task view-task task-body" gap={8}>
            <Flex className='task-content' vertical gap={8} style={{ width: '100%' }}>
                <Typography.Text strong>{props?.name} - {props?.reps} reps</Typography.Text>
                <Typography.Text strong>{props?.current} / {props?.totalSets} sets</Typography.Text>
            </Flex>
            {children}
        </Flex>
    )
}

export default ViewSportTask