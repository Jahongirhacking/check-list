import { Button, Flex, Typography } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ControlledFlowContext } from '../../../components/flow/ControlledFlowContext';
import FlowButtons from '../../../components/flow/FlowButtons';
import { IGeneralTaskProps } from '../../../types';

const ChooseTaskType = () => {
    const context = useContext(ControlledFlowContext);
    const [selectedType, setSelectedType] = useState<IGeneralTaskProps['type'] | null>(null);
    const { t } = useTranslation();
    const types: { label: ReactElement, value: IGeneralTaskProps["type"] }[] = [
        {
            label: <Typography.Text strong>{t('sport')} 💪</Typography.Text>,
            value: 'sport',
        },
        {
            label: <Typography.Text strong>{t('learning')} 📚</Typography.Text>,
            value: 'learning',
        },
        {
            label: <Typography.Text strong>{t('daily')} 🧹</Typography.Text>,
            value: 'daily',
        },
        {
            label: <Typography.Text strong>{t('other')} 🍿</Typography.Text>,
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
            <Typography.Text strong>{t('choose_activity')}:</Typography.Text>
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