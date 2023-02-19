import React, { type DetailedHTMLProps, type InputHTMLAttributes } from 'react'

import * as styles from './Field.module.css'

type FieldProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Field: React.FC<FieldProps> = ({ ...props }) => {
  return <input {...props} className={styles.field} />
}
