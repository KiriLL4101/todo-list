import React from 'react'
import TodoListItem from './components/TaskListItem'
import type { Task } from 'App'
import EditIcon from 'icon:../../assets/img/edit.svg'

import * as styles from './TaskList.module.css'

interface TodoListProps {
  tasks: Task[]
  title?: string
}

const TaskList: React.FC<TodoListProps> = ({ title, tasks }) => {

  return (
    <>
      {title && <h1 className={styles.title}>{title} <EditIcon className={styles.edit} /></h1>}
      <ul className={styles.list}>
        {
          tasks && tasks.map(task => <TodoListItem key={task.id} {...task} />)
        }
      </ul>
    </>
  )
}

export default TaskList