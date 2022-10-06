import React, { useState } from 'react'
import Checkbox from '../../../common/Checkbox/Checkbox'

import RemoveIcon from 'icon:../../../assets/img/remove.svg'

import * as styles from './TodoListItem.module.css'

interface TodoListItemProps {
  id: number,
  listId: number,
  text: string,
  completed: boolean
}

const TodoListItem: React.FC<TodoListItemProps> = ({ text, completed }) => {
  const [isChecked, setIsChecked] = useState<boolean>(completed)
  
  return (
    <li className={styles.item}>
        <Checkbox isChecked={isChecked} onClick={() => setIsChecked(prev => !prev)} />
        <span className={'grow'}>{text}</span>
        <RemoveIcon className={styles.remove} />
    </li>
  )
}

export default TodoListItem