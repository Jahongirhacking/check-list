import { LogoutOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Flex, FlexProps, Image, Select, Switch, Typography } from 'antd'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../store/slices/themeSlice'
import { logout } from '../store/slices/userSlice'
import { RootState } from '../store/store'
import { useTranslation } from 'react-i18next'
import { getLocalStorage, setLocalStorage } from '../utils/storageUtils'
import { localStorageNames } from '../utils/config'

const Navbar: FC<Omit<FlexProps, 'children'>> = (props) => {
    const user = useSelector((store: RootState) => store.user);
    const themeColor = useSelector((store: RootState) => store.theme?.color);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const handleLogout = () => {
        dispatch(logout());
    }

    const changeLanguage = (value: string) => {
        i18n.changeLanguage(value);
        setLocalStorage(localStorageNames.lang, value || 'uz');
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
                <Flex align='center' justify='flex-end' gap={8}>
                    <Select
                        value={i18n.language}
                        onChange={changeLanguage}
                        labelRender={() => <Image width={18} preview={false} src={`/${i18n.language}.png`} />}
                        options={[
                            {
                                label: <Button icon={<Image width={18} preview={false} src={'/uz.png'} />}>O‘zbekcha</Button>,
                                value: 'uz',
                            },
                            {
                                label: <Button icon={<Image width={18} preview={false} src={'/en.png'} />}>English</Button>,
                                value: 'en'
                            }
                        ]}
                    />
                    <Switch
                        checkedChildren={<MoonOutlined />}
                        unCheckedChildren={<SunOutlined />}
                        value={themeColor === 'dark'}
                        onChange={() => { dispatch(toggleTheme()) }}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Navbar