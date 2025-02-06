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
    setData(prevData => ({ ...prevData, ...newData }));
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
      {React.Children.map(
        children,
        (Component: ReactElement, index: number) => {
          if (index === currentIndex) return React.cloneElement(Component);
        }
      )}
    </ControlledFlowContext.Provider>
  );
};

export default ControlledFlow;