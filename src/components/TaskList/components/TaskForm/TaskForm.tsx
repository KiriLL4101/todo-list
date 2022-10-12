import React, { useState } from 'react'
import Button from '../../../../common/Button/Button'
import Field from '../../../../common/Field/Field'
import { createTask } from '../../../../api/taskService'
import useToast from '../../../../package/Toaster/Toaster.context'
import useStore from '../../../../store/store.context'

import * as styles from './TaskForm.module.css'

interface TaskFormProps {
  onClose: () => void
  listId: number
}

const TaskForm: React.FC<TaskFormProps> = ({ listId, onClose }) => {
  const [value, setValue] = useState<string>('')

  const { setFolders, setSelectedFolder } = useStore()

  const toaste = useToast()

  const addNewTask = (folders, data) => {
    return folders.map(folder => {
      if (folder.id === listId) {
        return {
          ...folder,
          tasks: [...folder.tasks, data],
        }
      }
      return folder
    })
  }

  const addTask = () => {
    if (value.trim()) {
      createTask({
        listId: listId,
        text: value,
        completed: false,
      }).then(data => {
        setFolders(prev => addNewTask(prev, data))
        setSelectedFolder(prev => addNewTask(prev, data))
        toaste({ message: 'Задача создана' })
        onClose()
      })
    }
  }

  return (
    <div className={styles.form}>
      <Field
        placeholder={'Текст задачи'}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div className={styles.btnWrapper}>
        <Button onClick={addTask}>Добавить задачу</Button>
        <Button variant={'secondary'} onClick={() => onClose()}>
          Отмена
        </Button>
      </div>
    </div>
  )
}

export default TaskForm
