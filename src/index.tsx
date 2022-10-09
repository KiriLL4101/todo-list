import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { ConfirmDialogProvider } from './common/Confirm/Confirm.context'

import { App } from './App'

const rootElement = document.getElementById('root')
const root = ReactDOMClient.createRoot(rootElement!)

root.render(
  <ConfirmDialogProvider>
    <App />
  </ConfirmDialogProvider>
)
