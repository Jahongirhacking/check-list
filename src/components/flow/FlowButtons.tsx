import { Button, Flex, FlexProps } from 'antd';
import React, { useContext } from 'react';
import { ControlledFlowContext } from './ControlledFlowContext';

const FlowButtons = ({ handleClickNextButton = () => { }, disabled = false, ...props }: { handleClickNextButton?: () => void, disabled?: boolean, props?: FlexProps }) => {
    const context = useContext(ControlledFlowContext);

    const handlePrevBtn = () => {
        context?.setPrevIndex();
    }

    const handleNextBtn = () => {
        handleClickNextButton();
        context?.setNextIndex();
    }

    return (
        <Flex className="flow-btns" gap={12} wrap align='center' justify='right' {...props}>
            <Button onClick={handlePrevBtn}>
                Orqaga
            </Button>
            <Button type="primary" onClick={handleNextBtn} htmlType="submit" disabled={disabled}>
                Qo'shish
            </Button>
        </Flex>
    )
}

export default FlowButtons