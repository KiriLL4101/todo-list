import React, { useState } from 'react'
import classNames from 'classnames'

import Badge from '../../common/Badge/Badge'
import AddFolderPopup from '../AddFolderPopup/AddFolderPopup'
import useConfirm from '../../package/Confirm/Confirm.context'
import useToast from '../../package/Toaster/Toaster.context'
import useStore from '../../store/store.context'
import { removeFolder } from '../../api/folderService'
import type { FolderItem } from '../../App'

import ListIcon from 'icon:../../assets/img/list.svg'
import RemoveIcon from 'icon:../../assets/img/remove.svg'
import Plus from 'icon:../../assets/img/add.svg'

import * as styles from './FolderList.module.css'

const FolderList: React.FC = () => {
  const { folders, setFolders, setSelectedFolder } = useStore()

  const [activeId, setActiveId] = useState<FolderItem['id']>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const confirm = useConfirm()

  const toaster = useToast()

  const onClickFolder = (folder: FolderItem[]) => {
    setSelectedFolder(folder)
    setActiveId(folder.length <= 1 ? folder[0].id : 0)
  }

  const onCloseHandler = () => {
    setIsOpen(false)
  }

  const onRemoveFolder = async (id: FolderItem['id']) => {
    const choice = await confirm()

    if (choice) {
      removeFolder(id)
        .then(() => {
          setFolders(prev => prev.filter(folder => folder.id !== id))
          setSelectedFolder([folders[0]])
          setActiveId(0)
        })
        .catch(() => {
          toaster({
            type: 'danger',
            message: 'Не удалось удалить папку',
          })
        })
    }
  }

  return (
    <aside className={styles.aside}>
      <button
        className={classNames(styles.folderItem, styles.allFolders, {
          [styles.activeItem]: activeId === 0,
        })}
        onClick={() => onClickFolder(folders)}
      >
        <ListIcon />
        Все задачи
      </button>
      <div className="flex flex-col gap-y-1.5 mb-12">
        {folders &&
          folders.map(folder => {
            return (
              <button
                key={folder.id}
                className={classNames(styles.folderItem, {
                  [styles.activeItem]: activeId === folder.id,
                })}
                onClick={() => onClickFolder([folder])}
              >
                <Badge color={folder?.color.name} />
                <span className="grow truncate text-start">{folder.name}</span>
                <RemoveIcon
                  className={styles.removeIcon}
                  onClick={() => onRemoveFolder(folder.id)}
                />
              </button>
            )
          })}
      </div>
      <button className={styles.addFolder} onClick={() => setIsOpen(true)}>
        <Plus />
        Добавить папку
      </button>
      {isOpen && <AddFolderPopup onClose={onCloseHandler} />}
    </aside>
  )
}

export default FolderList
