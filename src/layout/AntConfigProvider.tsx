import { ConfigProvider, theme } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export interface ProviderProps {
    children: JSX.Element;
}

function AntConfigProvider({ children }: ProviderProps) {
    const themeColor = useSelector((store: RootState) => store.theme?.color);

    return (
        <ConfigProvider
            theme={{
                algorithm:
                    themeColor === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            {children}
        </ConfigProvider>
    );
}

export default AntConfigProvider;