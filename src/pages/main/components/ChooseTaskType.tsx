import { Button, Flex, Typography } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { ControlledFlowContext } from '../../../components/flow/ControlledFlowContext';
import FlowButtons from '../../../components/flow/FlowButtons';
import { IGeneralTaskProps } from '../../../types';

const ChooseTaskType = () => {
    const context = useContext(ControlledFlowContext);
    const [selectedType, setSelectedType] = useState<IGeneralTaskProps['type'] | null>(null);
    const types: { label: ReactElement, value: IGeneralTaskProps["type"] }[] = [
        {
            label: <Typography.Text strong>Sport 💪</Typography.Text>,
            value: 'sport',
        },
        {
            label: <Typography.Text strong>Learning 📚</Typography.Text>,
            value: 'learning',
        },
        {
            label: <Typography.Text strong>Daily 🧹</Typography.Text>,
            value: 'daily',
        },
        {
            label: <Typography.Text strong>Other 🍿</Typography.Text>,
            value: 'other',
        },
    ];

    const handleClickNextButton = () => {
        if (selectedType) {
            context?.pushData({ type: selectedType } as IGeneralTaskProps)
        }
    }

    return (
        <Flex vertical gap={12} className='choose-task-type'>
            <Typography.Text strong>Choose the type of activity:</Typography.Text>
            <Flex vertical gap={8}>
                {
                    types.map(t => (
                        <Button
                            key={t.value}
                            type={selectedType == t.value ? 'primary' : 'default'}
                            onClick={() => setSelectedType(t.value)}
                        >
                            {t.label}
                        </Button>
                    ))
                }
            </Flex>
            <FlowButtons
                handleClickNextButton={handleClickNextButton}
                disabled={!selectedType}
            />
        </Flex>
    )
}

export default ChooseTaskType