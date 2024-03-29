import React, { useState } from 'react'

import { Checkbox } from '../../../../common/Checkbox'
import { useConfirm } from '../../../../common/Confirm'
import { useToast } from '../../../../common/Toaster'
import { useStore } from '../../../../store/store.context'
import { completedTask, removeTask } from '../../../../services/taskService'

import RemoveIcon from 'icon:../../../../assets/img/remove.svg'

import * as styles from './TaskItem.module.css'

interface TaskItemProps {
  id: number
  listId: number
  text: string
  completed: boolean
}

const TaskItem: React.FC<TaskItemProps> = props => {
  const { id, text, completed, listId } = props

  const [isChecked, setIsChecked] = useState<boolean>(completed)

  const { actions } = useStore()

  const confirm = useConfirm()

  const toaster = useToast()

  const onCompletedTodo = () => {
    setIsChecked(prev => !prev)

    completedTask(id, !isChecked)
      .then(data => {
        const { listId } = data
        actions.onCompletedTask({ folderId: listId, taskId: data.id })
      })
      .catch(() => {
        toaster({
          type: 'danger',
          message: 'Не удалось обновить задачу',
        })
      })
  }

  const onRemoveHandler = async () => {
    const choice = await confirm()

    if (choice) {
      removeTask(id)
        .then(() => {
          actions.onRemoveTask({ folderId: listId, taskId: id })
          toaster({
            message: 'Задача успешно удалена',
          })
        })
        .catch(() => {
          toaster({
            type: 'danger',
            message: 'Не удалось удалить задачу',
          })
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
