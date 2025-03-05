import { Button, Flex, FlexProps } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toFirstCapitalLetter } from '../../utils/stringUtils';
import { ControlledFlowContext } from './ControlledFlowContext';

const FlowButtons = ({ handleClickNextButton = () => { }, disabled = false, ...props }: { handleClickNextButton?: () => void, disabled?: boolean, props?: FlexProps }) => {
    const context = useContext(ControlledFlowContext);
    const { t } = useTranslation();

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
                {toFirstCapitalLetter(t('back'))}
            </Button>
            <Button type="primary" onClick={handleNextBtn} htmlType="submit" disabled={disabled}>
                {toFirstCapitalLetter(t('add'))}
            </Button>
        </Flex>
    )
}

export default FlowButtons