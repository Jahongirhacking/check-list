import { LogoutOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Flex, FlexProps, Switch, Typography } from 'antd'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/slices/themeSlice'
import { logout } from '../store/slices/userSlice'
import { RootState } from '../store/store'

const Navbar: FC<Omit<FlexProps, 'children'>> = (props) => {
    const user = useSelector((store: RootState) => store.user);
    const themeColor = useSelector((store: RootState) => store.theme?.color);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <Flex {...props}>
            <Flex className='frame' justify="space-between" gap={24} align='center'>
                <Flex gap={12} align='center'>
                    <Dropdown
                        trigger={user?.id ? ['click'] : []}
                        menu={{ items: [{ label: <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Button>, key: 'exit' }] }}
                    >
                        <Avatar src={user?.photo_url} size="large">{`${user?.first_name![0]}${user?.last_name![0]}`}</Avatar>
                    </Dropdown>
                    <Flex wrap style={{ columnGap: 5 }}>
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
        </Flex>
    )
}

export default Navbar