import { ReactNode, createContext, useCallback, useContext, useRef, useState } from 'react'

import Confirm, { ConfirmPopup } from './Confirm'

type ConfirmDialogContext = (data?: Partial<ConfirmPopup>) => Promise<boolean>

const ConfirmDialog = createContext<ConfirmDialogContext | null>(null)

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({ isOpen: false })
  const fn = useRef<(choice: boolean) => void | null>(null)

  const confirm = useCallback(
    (data?: Partial<ConfirmPopup>) => {
      return new Promise<boolean>(resolve => {
        setState({ ...data, isOpen: true })

        fn.current = (choice: boolean) => {
          resolve(choice)
          setState({ isOpen: false })
        }
      })
    },
    [setState],
  )

  return (
    <ConfirmDialog.Provider value={confirm}>
      {children}
      <Confirm
        {...state}
        onClose={() => fn.current?.(false)}
        onConfirm={() => fn.current?.(true)}
      />
    </ConfirmDialog.Provider>
  )
}

export function useConfirm() {
  const context = useContext(ConfirmDialog)

  if (!context) {
    throw new Error('useConfirm hook must be used within a Confirm Dialog Provider')
  }

  return context
}
