import { Flex, Typography } from 'antd'
import React from 'react'
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <Flex vertical>
            <Typography.Title level={3}>Hello World</Typography.Title>
            <Outlet />
        </Flex>
    )
}

export default MainLayout