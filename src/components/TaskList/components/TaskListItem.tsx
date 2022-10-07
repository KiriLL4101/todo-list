import React, { useState } from 'react'
import Checkbox from '../../../common/Checkbox/Checkbox'

import RemoveIcon from 'icon:../../../assets/img/remove.svg'

import * as styles from './TaskListItem.module.css'

interface TaskListItemProps {
  id: number,
  listId: number,
  text: string,
  completed: boolean
}

const TaskListItem: React.FC<TaskListItemProps> = ({ id, text, completed }) => {
  const [isChecked, setIsChecked] = useState<boolean>(completed)

  const onCompletedTodo = () => {
    setIsChecked(prev => !prev)
    fetch('http://localhost:3001/tasks/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !isChecked
      })
    })
      .catch(() => {
        alert('Не удалось обновить задачу');
      });
  }
  
  return (
    <li className={styles.item}>
        <Checkbox isChecked={isChecked} onClick={onCompletedTodo} />
        <span className={'grow'}>{text}</span>
        <RemoveIcon className={styles.remove} />
    </li>
  )
}

export default TaskListItem