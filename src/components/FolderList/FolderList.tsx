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
  getTasks: (id: number) => void
  lists: FolderItem[]
}

const FolderList: React.FC<FolderListProps> = ({ lists, getTasks }) => {
  const [activeId, setActiveId] = useState<FolderItem['id']>(lists[0]?.id || 0)

  useEffect(() => {
    getTasks(activeId)
  }, [])

  const onClickFolder = (id: number) => {
    getTasks(id)
    setActiveId(id)
  }
  
  return <aside className={styles.aside}>
    <button className={classNames(styles.folderItem, styles.allFolders, {[styles.activeItem]: activeId === 0})} onClick={() => onClickFolder(0)}>
      <ListIcon />
      Все задачи
    </button>
    <div className='flex flex-col gap-y-1.5 mb-12'>
    {
      lists && lists.map(folder => {
        return <button key={folder.id} className={classNames(styles.folderItem, {[styles.activeItem]: activeId === folder.id})} onClick={() => onClickFolder(folder.id)}>
          <Badge color={folder.color.name} />
          <span className='grow truncate text-start'>{folder.name}</span>
          <RemoveIcon className={styles.removeIcon} />
        </button>
      })
    }
    </div>
    <button className={styles.addFolder}>
      <Plus />
      Добавить папку
    </button>
    <AddFolderPopup />
  </aside>
}

export default FolderList
