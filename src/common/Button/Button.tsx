import React from 'react'
import classNames from 'classnames'

import * as styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  return (
    <button
      className={classNames(styles.button, {
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'secondary',
      })}
      {...props}
    >
      {children}
    </button>
  )
}
