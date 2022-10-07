import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import Badge from '../../common/Badge/Badge'
import AddFolderPopup from '../AddFolderPopup/AddFolderPopup'
import type { FolderItem } from '../../App'

import ListIcon from 'icon:../../assets/img/list.svg'
import RemoveIcon from 'icon:../../assets/img/remove.svg'
import Plus from 'icon:../../assets/img/add.svg'

import * as styles from './FolderList.module.css'

interface FolderListProps {
  getTasks: (folder: FolderItem[]) => void
  lists: FolderItem[]
  refresh: () => void
}

const FolderList: React.FC<FolderListProps> = ({ lists, getTasks, refresh }) => {
  const [activeId, setActiveId] = useState<FolderItem['id']>(lists[0]?.id || 0)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    getTasks([lists[0]])
  }, [])

  const onClickFolder = (folder: FolderItem[]) => {
    getTasks(folder)
    setActiveId(folder.length <= 1 ? folder[0].id : 0)
  }

  const onCloseHandler = () => {
    setIsOpen(false)
  }

  const onRemoveFolder = (id: FolderItem['id']) => {
   fetch('http://localhost:3001/lists/' + id, {
    method: 'DELETE'
   }).then(() => {
     refresh()
     setActiveId(lists[0]?.id)
   })
  }
   
  return <aside className={styles.aside}>
    <button className={classNames(styles.folderItem, styles.allFolders, {[styles.activeItem]: activeId === 0})} onClick={() => onClickFolder(lists)}>
      <ListIcon />
      Все задачи
    </button>
    <div className='flex flex-col gap-y-1.5 mb-12'>
    {
      lists && lists.map(folder => {
        return <button key={folder.id} className={classNames(styles.folderItem, {[styles.activeItem]: activeId === folder.id})} onClick={() => onClickFolder([folder])}>
          <Badge color={folder.color.name} />
          <span className='grow truncate text-start'>{folder.name}</span>
          <RemoveIcon className={styles.removeIcon} onClick={() => onRemoveFolder(folder.id)} />
        </button>
      })
    }
    </div>
    <button className={styles.addFolder} onClick={() => setIsOpen(true)}>
      <Plus />
      Добавить папку
    </button>
    {isOpen && <AddFolderPopup onClose={onCloseHandler} refresh={refresh} />}
  </aside>
}

export default FolderList
