import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import { Badge } from 'common/Badge'
import { useConfirm } from 'common/Confirm'
import { useToast } from 'common/Toaster'
import { removeFolder } from 'services/folderService'
import { AddFolderPopup } from '../AddFolderPopup/AddFolderPopup'
import { useStore } from '../../store/store.context'

import ListIcon from 'icon:../../assets/img/list.svg'
import RemoveIcon from 'icon:../../assets/img/remove.svg'
import Plus from 'icon:../../assets/img/add.svg'

import * as styles from './FolderList.module.css'

const FolderList: React.FC = () => {
  const {
    folders,
    selectedFolder,
    actions: { onSelectFolder, onRemoveFolder },
  } = useStore()

  const [activeId, setActiveId] = useState<FolderItem['id']>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const confirm = useConfirm()

  const toaster = useToast()

  useEffect(() => {
    if (selectedFolder.length > 1) {
      setActiveId(0)
    } else {
      setActiveId(selectedFolder[0]?.id || 0)
    }
  }, [selectedFolder])

  const onClickFolder = (id: FolderItem['id'] | null) => {
    onSelectFolder(id)
  }

  const onCloseHandler = () => {
    setIsOpen(false)
  }

  const onRemoveFolderHandler = async (id: FolderItem['id']) => {
    const choice = await confirm({
      title: 'Вы уверены что хотите удалить папку?',
    })

    if (choice) {
      removeFolder(id)
        .then(() => {
          onRemoveFolder(id)

          toaster({
            message: 'Задача успешно удалена',
          })
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
        onClick={() => onClickFolder(null)}
      >
        <ListIcon />
        Все задачи
      </button>
      <div className={styles.wrapper}>
        {folders.length > 0 &&
          folders.map(folder => {
            return (
              <button
                key={folder.id}
                className={classNames(styles.folderItem, {
                  [styles.activeItem]: activeId === folder.id,
                })}
                onClick={() => onClickFolder(folder.id)}
              >
                {folder?.color && <Badge color={folder?.color.name} />}
                <span className={styles.name} dangerouslySetInnerHTML={{ __html: folder.name }} />
                <RemoveIcon
                  className={styles.removeIcon}
                  onClick={() => onRemoveFolderHandler(folder.id)}
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
