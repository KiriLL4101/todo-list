import React from 'react'
import Portal from '../Portal/Portal'

import * as styles from './Modal.module.css'

interface ModalProps {
  children: React.ReactNode
  title?: string
  isOpen: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) {
    return null
  }

  return (
    <Portal>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </div>
    </Portal>
  )
}

export default Modal
