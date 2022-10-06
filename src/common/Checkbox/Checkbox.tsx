import React from 'react'
import classNames from 'classnames'
import CheckIcon from 'icon:../../assets/img/check.svg'

import * as styles from './Checkbox.module.css'

interface CheckboxProps {
  isChecked: boolean
  onClick: () => void
}

const Checkbox:React.FC<CheckboxProps> = ({ isChecked, onClick }) => {
  return (
    <div className={classNames(styles.checkbox, {[styles.checkboxActive]: isChecked})} onClick={onClick}>
        <CheckIcon className={styles.check}/>
    </div>
  )
}

export default Checkbox