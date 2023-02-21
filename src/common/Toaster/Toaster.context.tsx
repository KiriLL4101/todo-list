import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import Toaster, { ToasterProps } from './Toaster'

type ToasterContextData = (data: Partial<ToasterProps>) => void

const ToasterContext = createContext<ToasterContextData | null>(null)

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ToasterProps>({ isOpen: false })

  useEffect(() => {
    if (!state.isOpen) return

    setTimeout(() => {
      onCloseHandler()
    }, 5000)
  }, [state.isOpen])

  const toaster = (data: Partial<ToasterProps>) => {
    setState({ ...data, onClose: onCloseHandler, isOpen: true })
  }

  const onCloseHandler = () => {
    setState(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <ToasterContext.Provider value={toaster}>
      {children}
      <Toaster {...state} />
    </ToasterContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToasterContext)

  if (!context) {
    throw new Error('useToast hook must be used within a Context Provider')
  }

  return context
}
