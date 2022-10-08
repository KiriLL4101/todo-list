import React, { useState } from 'react'
import Button from '../../../../common/Button/Button'
import Field from '../../../../common/Field/Field'

import * as styles from './TaskForm.module.css'

interface TaskFormProps {
  onClose: () => void
  listId: number
  refresh: () => void
}

const TaskForm: React.FC<TaskFormProps> = ({ listId, onClose, refresh }) => {
  const [value, setValue] = useState<string>('')

  const addTask = () => {
    if (value) {
      const newTask = {
        listId: listId,
        text: value,
        complited: false,
      }
      fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      }).then(() => {
        onClose()
        refresh()
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
