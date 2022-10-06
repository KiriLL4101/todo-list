import React from 'react'

import * as styles from './Button.module.css';

interface ButtonProps {
    children: string
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className={styles.button}>{children}</button>
  )
}

export default Button