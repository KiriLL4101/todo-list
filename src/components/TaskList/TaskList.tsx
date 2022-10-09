import React, { useState } from 'react'
import TaskItem from './components/TaskItem/TaskItem'
import TaskForm from './components/TaskForm/TaskForm'
import type { Task } from 'App'

import EditIcon from 'icon:../../assets/img/edit.svg'
import Plus from 'icon:../../assets/img/add.svg'

import * as styles from './TaskList.module.css'

interface TodoListProps {
  tasks: Task[]
  title?: string
  listId: number
}

const TaskList: React.FC<TodoListProps> = ({ listId, title, tasks }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onCloseHandler = () => {
    setIsOpen(false)
  }
  return (
    <div className={'mb-5'}>
      {title && (
        <h1 className={styles.title}>
          {title} <EditIcon className={styles.edit} />
        </h1>
      )}
      <ul className={styles.list}>
        {tasks && tasks.map(task => <TaskItem key={task.id} {...task} />)}
      </ul>

      {isOpen ? (
        <TaskForm onClose={onCloseHandler} listId={listId} />
      ) : (
        <button className={styles.addTaskBtn} onClick={() => setIsOpen(true)}>
          <Plus />
          Новая задача
        </button>
      )}
    </div>
  )
}

export default TaskList
