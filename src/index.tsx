import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { ConfirmDialogProvider } from './common/Confirm'
import { ToasterProvider } from './common/Toaster'
import { StoreProvider } from './store/store.context'

import { App } from './components/App'

const rootElement = document.getElementById('root')
const root = ReactDOMClient.createRoot(rootElement)

root.render(
  <StoreProvider>
    <ToasterProvider>
      <ConfirmDialogProvider>
        <App />
      </ConfirmDialogProvider>
    </ToasterProvider>
  </StoreProvider>
)
