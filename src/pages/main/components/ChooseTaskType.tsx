import { Button, Flex, Typography } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { ControlledFlowContext } from '../../../components/flow/ControlledFlowContext';
import FlowButtons from '../../../components/flow/FlowButtons';
import { IGenerealTaskProps } from '../../../types';

const ChooseTaskType = () => {
    const context = useContext(ControlledFlowContext);
    const [selectedType, setSelectedType] = useState<IGenerealTaskProps['type'] | null>(null);
    const types: { label: ReactElement, value: IGenerealTaskProps["type"] }[] = [
        {
            label: <Typography.Text strong>Sport 💪</Typography.Text>,
            value: 'sport',
        },
        {
            label: <Typography.Text strong>Ilmiy 📚</Typography.Text>,
            value: 'science',
        },
        {
            label: <Typography.Text strong>Kundalik ish 🧹</Typography.Text>,
            value: 'daily',
        },
        {
            label: <Typography.Text strong>Boshqa 🤷‍♂️</Typography.Text>,
            value: 'other',
        },
    ];

    const handleClickNextButton = () => {
        if (selectedType) {
            context?.pushData({ type: selectedType } as IGenerealTaskProps)
        }
    }

    return (
        <Flex vertical gap={12} className='choose-task-type'>
            <Typography.Text strong>Mashg'ulot turini tanlang:</Typography.Text>
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