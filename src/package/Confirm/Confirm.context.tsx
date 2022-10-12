import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import Confirm from './Confirm'

type ConfirmDialogContext = (
  data?: Partial<React.ComponentProps<typeof Confirm>>
) => Promise<boolean>

const ConfirmDialog = createContext<ConfirmDialogContext>(undefined)

export function ConfirmDialogProvider({ children }) {
  const [state, setState] = useState({ isOpen: false })
  const fn = useRef(null)

  const confirm = useCallback(
    (data?: Partial<React.ComponentProps<typeof Confirm>>) => {
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
      <Confirm
        {...state}
        onClose={() => fn.current(false)}
        onConfirm={() => fn.current(true)}
      />
    </ConfirmDialog.Provider>
  )
}

export default function useConfirm() {
  return useContext(ConfirmDialog)
}
