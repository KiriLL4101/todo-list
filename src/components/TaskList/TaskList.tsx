import React, { useState } from 'react'

import Field from '../../common/Field/Field'
import useStore from '../../store/store.context'
import useToast from '../../package/Toaster/Toaster.context'
import TaskForm from './components/TaskForm/TaskForm'
import TaskItem from './components/TaskItem/TaskItem'
import { editTitleFolder } from '../../api/folderService'

import type { FolderItem } from '../App'

import EditIcon from 'icon:../../assets/img/edit.svg'
import Plus from 'icon:../../assets/img/add.svg'

import * as styles from './TaskList.module.css'

type TodoListProps = FolderItem

const TaskList: React.FC<TodoListProps> = props => {
  const { id, name, tasks, color } = props

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState<string>(name)

  const { actions } = useStore()

  const toaster = useToast()

  const onCloseHandler = () => {
    setIsOpen(false)
  }

  const onEditHandler = () => {
    setIsEditable(true)
    setNewTitle(name)
  }

  const onBlurInput = () => {
    setIsEditable(false)
    setNewTitle(name)
  }

  const onSubmitInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.which !== 13) return

    editTitleFolder(id, newTitle)
      .then(() => {
        actions.onEditTitle(id, newTitle)
        setIsEditable(false)
      })
      .catch(() => {
        toaster({
          type: 'danger',
          message: 'Не удалось обновить название списка',
        })
      })
  }

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value)
  }

  return (
    <div className={'mb-5'}>
      {name && (
        <h1 className={styles.title} style={{ color: color.hex }}>
          {isEditable ? (
            <Field
              autoFocus={true}
              value={newTitle}
              onKeyDown={onSubmitInput}
              onChange={onChangeTitle}
              onBlur={onBlurInput}
            />
          ) : (
            <>
              {newTitle}{' '}
              <EditIcon className={styles.edit} onClick={onEditHandler} />{' '}
            </>
          )}
        </h1>
      )}
      <ul className={styles.list}>
        {tasks && tasks.map(task => <TaskItem key={task.id} {...task} />)}
      </ul>

      {isOpen ? (
        <TaskForm onClose={onCloseHandler} listId={id} />
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
