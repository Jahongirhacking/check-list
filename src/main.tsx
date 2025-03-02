import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import AntConfigProvider from './layout/AntConfigProvider.tsx'
import { store } from './store/store.ts'
import './style.scss'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <AntConfigProvider>
        <App />
      </AntConfigProvider>
    </I18nextProvider>
  </Provider>
)
