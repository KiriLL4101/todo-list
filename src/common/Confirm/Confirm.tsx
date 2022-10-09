import React from 'react'
import Button from '../Button/Button'
import Modal from '../Modal/Modal'

import * as styles from './Confirm.module.css'

interface ConfirmPopup {
  title?: string
  description?: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const Confirm: React.FC<ConfirmPopup> = props => {
  const { isOpen, title, description, onClose, onConfirm } = props

  return (
    <Modal title={title || 'Are you sure?'} onClose={onClose} isOpen={isOpen}>
      {description && <span>{description}</span>}
      <div className={styles.footer}>
        <Button onClick={onConfirm}>Ok</Button>
        <Button variant={'secondary'} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  )
}

export default Confirm
