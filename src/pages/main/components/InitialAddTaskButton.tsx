import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import React, { useContext } from 'react';
import { UploadIconSVG } from '../../../assets/icons';
import { ControlledFlowContext } from '../../../components/flow/ControlledFlowContext';

const InitialAddTaskButton = () => {
    const context = useContext(ControlledFlowContext);

    const handleClickBtn = () => {
        context?.setNextIndex();
    }

    return (
        <Flex vertical gap={12} align='center'>
            <Button type='text' style={{ display: 'block', height: 'auto' }} onClick={handleClickBtn}>
                <UploadIconSVG />
            </Button>
            <Button type='primary' icon={<PlusOutlined />} onClick={handleClickBtn}>Mashg'ulot yaratish</Button>
        </Flex>
    )
}

export default InitialAddTaskButton