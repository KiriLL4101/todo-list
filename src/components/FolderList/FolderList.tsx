import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import Badge from '../../common/Badge/Badge'
import AddFolderPopup from '../AddFolderPopup/AddFolderPopup'
import useConfirm from '../../common/Confirm/Confirm.context'
import useStore from '../../store/store.context'
import type { FolderItem } from '../../App'

import ListIcon from 'icon:../../assets/img/list.svg'
import RemoveIcon from 'icon:../../assets/img/remove.svg'
import Plus from 'icon:../../assets/img/add.svg'

import * as styles from './FolderList.module.css'

interface FolderListProps {
  lists: FolderItem[]
  setSelectedFolder: React.Dispatch<React.SetStateAction<FolderItem[]>>
}

const FolderList: React.FC<FolderListProps> = ({
  lists,
  setSelectedFolder,
}) => {
  const [activeId, setActiveId] = useState<FolderItem['id']>(lists[0]?.id || 0)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const confirm = useConfirm()

  useEffect(() => {
    setSelectedFolder([lists[0]])
  }, [])

  const { removeFolderById } = useStore()

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
      removeFolderById(id)
    }
  }

  return (
    <aside className={styles.aside}>
      <button
        className={classNames(styles.folderItem, styles.allFolders, {
          [styles.activeItem]: activeId === 0,
        })}
        onClick={() => onClickFolder(lists)}
      >
        <ListIcon />
        Все задачи
      </button>
      <div className="flex flex-col gap-y-1.5 mb-12">
        {lists &&
          lists.map(folder => {
            return (
              <button
                key={folder.id}
                className={classNames(styles.folderItem, {
                  [styles.activeItem]: activeId === folder.id,
                })}
                onClick={() => onClickFolder([folder])}
              >
                <Badge color={folder.color.name} />
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
