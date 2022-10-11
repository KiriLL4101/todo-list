import React from 'react'
import Button from '../../common/Button/Button'
import Modal from '../Modal/Modal'

import * as styles from './Confirm.module.css'

interface ConfirmPopup {
  title?: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const Confirm: React.FC<ConfirmPopup> = props => {
  const { isOpen, title = 'Are you sure?', onClose, onConfirm } = props

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <span className={styles.title}>{title}</span>
        <div className={styles.footer}>
          <Button onClick={onConfirm}>Ok</Button>
          <Button variant={'secondary'} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default Confirm
