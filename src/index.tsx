import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { ConfirmDialogProvider } from './package/Confirm/Confirm.context'
import { ToasterProvider } from './package/Toaster/Toaster.context'
import { StoreProvider } from './store/store.context'

import { App } from './App'

const rootElement = document.getElementById('root')
const root = ReactDOMClient.createRoot(rootElement!)

root.render(
  <StoreProvider>
    <ToasterProvider>
      <ConfirmDialogProvider>
        <App />
      </ConfirmDialogProvider>
    </ToasterProvider>
  </StoreProvider>
)
