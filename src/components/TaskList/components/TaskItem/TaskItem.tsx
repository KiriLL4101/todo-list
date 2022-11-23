import React, { useState } from 'react'

import Checkbox from '../../../../common/Checkbox/Checkbox'
import useConfirm from '../../../../package/Confirm/Confirm.context'
import useToast from '../../../../package/Toaster/Toaster.context'
import useStore from '../../../../store/store.context'
import { completedTask, removeTask } from '../../../../api/taskService'
import type { FolderItem } from '../../../App'

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

  const confirm = useConfirm()

  const toaster = useToast()

  const { setFolders, setSelectedFolder } = useStore()

  const onCompletedTodo = () => {
    setIsChecked(prev => !prev)

    completedTask(id, !isChecked)
      .then(data => {
        const { listId } = data
        setFolders(prev =>
          prev.map(folder =>
            folder.id === listId
              ? { ...folder, tasks: [...folder.tasks, data] }
              : folder
          )
        )
      })
      .catch(() => {
        toaster({
          type: 'danger',
          message: 'Не удалось обновить задачу',
        })
      })
  }

  const removeTaskFromList = (value: FolderItem[]) =>
    value.map(folder => {
      if (folder.id === listId) {
        return {
          ...folder,
          tasks: [...folder.tasks.filter(task => task.id !== id)],
        }
      }
      return folder
    })

  const onRemoveHandler = async () => {
    const choice = await confirm()

    if (choice) {
      removeTask(id)
        .then(() => {
          setFolders(removeTaskFromList)
          setSelectedFolder(removeTaskFromList)
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
