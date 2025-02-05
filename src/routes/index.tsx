import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from '../layout/MainLayout'
import CallbackHandler from '../pages/auth/CallbackHandler'
import TelegramLoginPage from '../pages/auth/TelegramLoginPage'
import MainPage from '../pages/main/MainPage'
import NotFound from '../pages/NotFound'
import { paths } from './paths'

const RouterElement = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={paths.base} element={<MainLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path={paths.login} element={<TelegramLoginPage />} />
                    <Route path={paths.callback} element={<CallbackHandler />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterElement