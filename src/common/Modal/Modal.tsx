import React from 'react'
import Portal from '../Portal/Portal'

import * as styles from './Modal.module.css'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null
  }

  return (
    <Portal>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>{children}</div>
    </Portal>
  )
}

export default Modal
