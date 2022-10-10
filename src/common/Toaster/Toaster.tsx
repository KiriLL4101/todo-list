import React from 'react'
import Portal from '../Portal/Portal'

import * as styles from './Toaster.module.css'

export interface ToasterProps {
  isOpen: boolean
  message?: string
  type?: 'success' | 'danger' | 'info'
  onClose?: () => void
}

const VARIANTS = {
  danger: {
    message: 'An error has occurred.',
    icon: (
      <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg">
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Error icon</span>
      </div>
    ),
  },

  success: {
    message: 'The operation has been successful.',
    icon: (
      <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg">
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Check icon</span>
      </div>
    ),
  },
}

const Toaster: React.FC<ToasterProps> = ({
  isOpen,
  message,
  type,
  onClose,
}) => {
  if (!isOpen) {
    return null
  }

  const variant = type ? VARIANTS[type] : VARIANTS['success']

  return (
    <Portal>
      <div className={styles.wrapper} role="alert" onClick={() => onClose?.()}>
        {variant.icon}
        <div className={styles.message}>{message || variant.message}</div>
      </div>
    </Portal>
  )
}

export default Toaster
