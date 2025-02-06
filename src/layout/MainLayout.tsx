import { Flex } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { RootState } from '../store/store'

const MainLayout = () => {
    const themeColor = useSelector((store: RootState) => store.theme?.color);

    return (
        <Flex vertical className={`main-layout ${themeColor}-theme`} align='center'>
            <Navbar className='navbar padding-box' justify='center' align='center' />
            <Flex vertical className='main-content padding-box' align='center'>
                <Outlet />
            </Flex>
            <Footer className='footer padding-box' />
        </Flex>
    )
}

export default MainLayout