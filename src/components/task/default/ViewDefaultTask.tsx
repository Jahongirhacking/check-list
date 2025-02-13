import { Flex, Typography } from 'antd'
import React from 'react'
import { IDefaultTaskProps } from '../../../types'
import { ITaskContainer } from '../TaskContainer'

const ViewDefaultTask = ({ props, children }: { props?: IDefaultTaskProps, children: ITaskContainer['children'] }) => {
    return (
        <Flex className="sport-task view-task task-body" gap={8}>
            <Flex className='task-content' vertical gap={8} style={{ width: '100%' }}>
                <Typography.Text strong>{props?.name}</Typography.Text>
                {
                    props?.isCountable && (
                        <Typography.Text strong>{props?.current} / {props?.totalPart} {props?.partUnit}</Typography.Text>
                    )
                }
            </Flex>
            {children}
        </Flex>
    )
}

export default ViewDefaultTask