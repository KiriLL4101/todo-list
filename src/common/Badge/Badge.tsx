import React from 'react'
import classNames from 'classnames'

import * as styles from './Badge.module.css'

const Badge: React.FC<{ color: string, onClick?: () => void, className?: string | boolean }> = ({ color, onClick, className }) => 
    (<i onClick={onClick} className={classNames(styles.badge, { [styles[`badge--${color}`]]: color }, className)}></i >)

export default Badge
