import { Button, Flex } from 'antd';
import React, { useContext } from 'react';
import { ControlledFlowContext } from '../../../components/flow/ControlledFlowContext';

const InitialAddTaskButton = () => {
    const context = useContext(ControlledFlowContext);

    const handleClickBtn = () => {
        context?.setNextIndex();
    }

    return (
        <Flex vertical gap={12}>
            <Button type='primary' onClick={handleClickBtn}>Mashg'ulot qo'shish</Button>
        </Flex>
    )
}

export default InitialAddTaskButton