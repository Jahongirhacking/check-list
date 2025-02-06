import { Flex, Typography } from 'antd'
import React from 'react'
import { ISportTaskProps } from '../../../types'

const ViewSportTask = ({ props }: { props?: ISportTaskProps }) => {
    return (
        <Flex className="sport-task view-task" gap={8} wrap>
            <div className='task-img' />
            <Flex vertical>
                <Typography.Text strong>{props?.name}</Typography.Text>
            </Flex>
        </Flex>
    )
}

export default ViewSportTask