import React, { createContext, useContext, useEffect, useState } from 'react'
import Toaster, { ToasterProps } from './Toaster'

type ToasterContextData = (data: Partial<ToasterProps>) => void

const ToasterContext = createContext<ToasterContextData>(undefined)

export function ToasterProvider({ children }) {
  const [state, setState] = useState<ToasterProps>({ isOpen: false })

  useEffect(() => {
    if (!state.isOpen) return

    setTimeout(() => {
      onCloseHandler()
    }, 5000)
  }, [state.isOpen])

  const toaste = (data: Partial<ToasterProps>) => {
    setState({ ...data, onClose: onCloseHandler, isOpen: true })
  }

  const onCloseHandler = () => {
    setState(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <ToasterContext.Provider value={toaste}>
      {children}
      <Toaster {...state} />
    </ToasterContext.Provider>
  )
}

export default function useToast() {
  return useContext(ToasterContext)
}
