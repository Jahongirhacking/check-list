import { Flex, Typography } from 'antd'
import React from 'react'
import { IDefaultTaskProps } from '../../../types'
import { ITaskContainer } from '../TaskContainer'

const ViewDefaultTask = ({ props, children }: { props?: IDefaultTaskProps, children: ITaskContainer['children'] }) => {
    return (
        <Flex className="sport-task view-task task-body" gap={8}>
            <Flex className='task-content' vertical gap={6} style={{ width: '100%' }}>
                <Flex gap={5} align='center' className='task-name'>
                    <Typography.Text>#{(props?.order ?? 0) + 1}</Typography.Text>
                    <Typography.Text strong>{props?.name}</Typography.Text>
                </Flex>
                {
                    props?.isCountable && (
                        <Typography.Text strong><span className='current-indicator'>{props?.current}</span> / {props?.totalPart} {props?.partUnit}</Typography.Text>
                    )
                }
            </Flex>
            {children}
        </Flex>
    )
}

export default ViewDefaultTask