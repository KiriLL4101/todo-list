import React, { useState } from 'react'
import Checkbox from '../../../../common/Checkbox/Checkbox'
import useConfirm from '../../../../common/Confirm/Confirm.context'
import useStore from '../../../../store/store.context'

import RemoveIcon from 'icon:../../../../assets/img/remove.svg'

import * as styles from './TaskItem.module.css'

interface TaskItemProps {
  id: number
  listId: number
  text: string
  completed: boolean
}

const TaskItem: React.FC<TaskItemProps> = ({ id, text, completed }) => {
  const [isChecked, setIsChecked] = useState<boolean>(completed)

  const confirm = useConfirm()

  const { completedTask, removeTask } = useStore()

  const onCompletedTodo = () => {
    setIsChecked(prev => !prev)
    completedTask(id, !isChecked).catch(() => {
      alert('Не удалось обновить задачу')
    })
  }

  const onRemoveHandler = async () => {
    const choice = await confirm()

    if (choice) {
      removeTask(id).catch(() => {
        alert('Не удалось обновить задачу')
      })
    }
  }

  return (
    <li className={styles.item}>
      <Checkbox isChecked={isChecked} onClick={onCompletedTodo} />
      <span className={'grow'}>{text}</span>
      <RemoveIcon className={styles.remove} onClick={onRemoveHandler} />
    </li>
  )
}

export default TaskItem
