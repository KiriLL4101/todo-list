import React, { forwardRef } from 'react'

import * as styles from './Field.module.css'

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement>

const Field: React.FC<FieldProps> = forwardRef(({ ...props }, ref) => {
  return <input {...props} ref={ref} className={styles.field} />
})

export default Field
