import React from 'react'

import * as styles from './Field.module.css'

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Field: React.FC<FieldProps> = ({...props}) => {
  return (
    <input {...props} className={styles.field} />
  )
}

export default Field