import { Flex } from 'antd';
import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { ControlledFlowContext } from './ControlledFlowContext';

const ControlledFlow = ({
  children,
  currentIndex,
  setCurrentIndex,
  onSubmit = () => { },
  data = {},
  setData = () => { }
}: {
  children: ReactElement | ReactElement[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  onSubmit?: (data?: object) => void;
  data?: object;
  setData?: Dispatch<SetStateAction<object>>
}) => {
  const pushData = (newData: object) => {
    let tempData = {};
    setData(prevData => {
      tempData = { ...prevData, ...newData };
      return tempData;
    });
    return tempData;
  };

  const setNextIndex = () => {
    setCurrentIndex(prev =>
      Math.min(prev + 1, React.Children.toArray(children).length - 1)
    );
  };

  const setPrevIndex = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <ControlledFlowContext.Provider
      value={{
        setNextIndex,
        setPrevIndex,
        currentIndex,
        onSubmit,
        data,
        setData,
        pushData,
      }}
    >
      <Flex vertical className='controlled-flow-element'>
        {React.Children.map(
          children,
          (Component: ReactElement, index: number) => {
            if (index === currentIndex) return React.cloneElement(Component);
          }
        )}
      </Flex>
    </ControlledFlowContext.Provider>
  );
};

export default ControlledFlow;