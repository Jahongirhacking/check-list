import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Image } from 'antd';
import React, { useContext } from 'react';
import UploadImage from '../../../assets/upload.svg';
import { ControlledFlowContext } from '../../../components/flow/ControlledFlowContext';

const InitialAddTaskButton = () => {
    const context = useContext(ControlledFlowContext);

    const handleClickBtn = () => {
        context?.setNextIndex();
    }

    return (
        <Flex vertical gap={12} align='center'>
            <Image width={80} preview={false} src={UploadImage} onClick={handleClickBtn} style={{ cursor: 'pointer' }} />
            <Button type='primary' icon={<PlusOutlined />} onClick={handleClickBtn}>Mashg'ulot yaratish</Button>
        </Flex>
    )
}

export default InitialAddTaskButton