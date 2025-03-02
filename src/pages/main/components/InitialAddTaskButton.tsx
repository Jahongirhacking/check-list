import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import React, { useContext } from 'react';
import { UploadIconSVG } from '../../../assets/icons';
import { ControlledFlowContext } from '../../../components/flow/ControlledFlowContext';
import { useTranslation } from 'react-i18next';

const InitialAddTaskButton = () => {
    const context = useContext(ControlledFlowContext);
    const { t } = useTranslation();

    const handleClickBtn = () => {
        context?.setNextIndex();
    }

    return (
        <Flex vertical gap={12} align='center'>
            <Button type='text' style={{ display: 'block', height: 'auto' }} onClick={handleClickBtn}>
                <UploadIconSVG />
            </Button>
            <Button type='primary' icon={<PlusOutlined />} onClick={handleClickBtn}>{t('create_activity')}</Button>
        </Flex>
    )
}

export default InitialAddTaskButton