import { Flex, Typography } from 'antd'
import React from 'react'
import { ISportTaskProps } from '../../../types'

const ViewSportTask = ({ props }: { props?: ISportTaskProps }) => {
    return (
        <Flex className="sport-task view-task task-body" gap={8}>
            <Flex className='task-content' vertical gap={8} style={{ width: '100%' }}>
                <Typography.Text strong>{props?.name} - {props?.reps} reps</Typography.Text>
                <Typography.Text strong>{props?.current} / {props?.totalSets} sets</Typography.Text>
            </Flex>
            <div className='task-img' style={{ backgroundImage: `url(${props?.img})` }} />
        </Flex>
    )
}

export default ViewSportTask