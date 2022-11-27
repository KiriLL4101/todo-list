import { createContext, useCallback, useContext, useRef, useState } from 'react'

import Confirm, { ConfirmPopup } from './Confirm'

type ConfirmDialogContext = (data?: ConfirmPopup) => Promise<boolean>

const ConfirmDialog = createContext<ConfirmDialogContext | null>(null)

export function ConfirmDialogProvider({ children }) {
  const [state, setState] = useState({ isOpen: false })
  const fn = useRef(null)

  const confirm = useCallback(
    (data?: ConfirmPopup) => {
      return new Promise<boolean>(resolve => {
        setState({ ...data, isOpen: true })

        fn.current = choice => {
          resolve(choice)
          setState({ isOpen: false })
        }
      })
    },
    [setState]
  )

  return (
    <ConfirmDialog.Provider value={confirm}>
      {children}
      <Confirm {...state} onClose={() => fn.current(false)} onConfirm={() => fn.current(true)} />
    </ConfirmDialog.Provider>
  )
}

export default function useConfirm() {
  return useContext(ConfirmDialog)
}
