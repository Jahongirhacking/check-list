import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import AntConfigProvider from './layout/AntConfigProvider.tsx'
import { store } from './store/store.ts'
import './style.scss'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AntConfigProvider>
      <App />
    </AntConfigProvider>
  </Provider>
)
