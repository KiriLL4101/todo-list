import React, { useState } from 'react'
import useStore from '../../../../store/store.context'
import Button from '../../../../common/Button/Button'
import Field from '../../../../common/Field/Field'

import * as styles from './TaskForm.module.css'

interface TaskFormProps {
  onClose: () => void
  listId: number
}

const TaskForm: React.FC<TaskFormProps> = ({ listId, onClose }) => {
  const [value, setValue] = useState<string>('')

  const { createTask } = useStore()

  const addTask = () => {
    if (value.trim()) {
      createTask({
        listId: listId,
        text: value,
        complited: false,
      }).then(() => {
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
