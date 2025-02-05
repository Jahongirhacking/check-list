import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Avatar, Flex, FlexProps, Switch, Typography } from 'antd'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/slices/themeSlice'
import { RootState } from '../store/store'

const Navbar: FC<Omit<FlexProps, 'children'>> = (props) => {
    const user = useSelector((store: RootState) => store.user);
    const themeColor = useSelector((store: RootState) => store.theme?.color);
    const dispatch = useDispatch();

    return (
        <Flex {...props}>
            <Flex gap={12} align='center'>
                <Avatar src={user?.photo_url} size="large">{`${user?.first_name![0]}${user?.last_name![0]}`}</Avatar>
                <Flex vertical>
                    <Typography.Text strong>{user?.first_name}</Typography.Text>
                    <Typography.Text strong>{user?.last_name}</Typography.Text>
                </Flex>
            </Flex>
            <Switch
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
                value={themeColor === 'dark'}
                onChange={() => { dispatch(toggleTheme()) }}
            />
        </Flex>
    )
}

export default Navbar