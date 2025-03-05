import { Flex, Typography } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ISportTaskProps } from '../../../types'
import { ITaskContainer } from '../TaskContainer'

const ViewSportTask = ({ props, children }: { props?: ISportTaskProps, children: ITaskContainer['children'] }) => {
    const { t } = useTranslation();

    return (
        <Flex className="sport-task view-task task-body" gap={8}>
            <Flex className='task-content' vertical gap={6} style={{ width: '100%' }}>
                <Flex gap={5} align='center' className='task-name'>
                    <Typography.Text>#{(props?.order ?? 0) + 1}</Typography.Text>
                    <Typography.Text strong>{props?.name}</Typography.Text>
                </Flex>
                <Typography.Text strong><span className='current-indicator'>{props?.current}</span> / {props?.totalSets} {t('sets')} | {props?.reps} {t('reps')}</Typography.Text>
            </Flex>
            {children}
        </Flex>
    )
}

export default ViewSportTask