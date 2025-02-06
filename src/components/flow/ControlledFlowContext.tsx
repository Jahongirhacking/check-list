import { createContext, Dispatch, SetStateAction } from "react";

interface IProps {
    setNextIndex: () => void;
    setPrevIndex: () => void;
    currentIndex: number;
    onSubmit: (data?: object) => void;
    data: object;
    setData: Dispatch<SetStateAction<object>>;
    pushData: (data: object) => object;
}

export const ControlledFlowContext = createContext<IProps | null>(null);