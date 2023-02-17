import React, { useState } from 'react'

import { Button } from '../../../../common/Button'
import { Field } from '../../../../common/Field'
import { useStore } from '../../../../store/store.context'
import { createTask } from '../../../../services/taskService'

import * as styles from './TaskForm.module.css'

interface TaskFormProps {
  onClose: () => void
  listId: number
}

const TaskForm: React.FC<TaskFormProps> = ({ listId, onClose }) => {
  const [value, setValue] = useState<string>('')

  const { actions } = useStore()

  const addTask = () => {
    if (!value.trim()) return

    createTask({
      listId: listId,
      text: value,
      completed: false,
    }).then(data => {
      const { listId } = data

      // actions.onAddNewTask(listId, data)

      onClose()
    })
  }

  return (
    <div className={styles.form}>
      <Field placeholder={'Текст задачи'} value={value} onChange={e => setValue(e.target.value)} />
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
