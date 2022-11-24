import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { requestFolderList } from '../api/folderService'
import type { FolderItem, Task } from '../components/App'

interface Action {
  onAddNewFolder: (folder: FolderItem) => void
  onSelectFolder: (folder: FolderItem[]) => void
  onRemoveFolder: (id: FolderItem['id']) => void
  onEditTitle: (id: FolderItem['id'], name: FolderItem['name']) => void
  onCompletedTask: (id: FolderItem['id'], task: Task) => void
  onRemoveTask: (listId: FolderItem['id'], task: Task['id']) => void
  onAddNewTask: (listId: FolderItem['id'], task: Task) => void
}
interface Store {
  folders: FolderItem[]
  selectedFolder: FolderItem[]
  actions: Action
}

const Store = createContext<Store>(null)

export function StoreProvider({ children }) {
  const [folders, setFolders] = useState<FolderItem[]>([])
  const [selectedFolder, setSelectedFolder] = useState<FolderItem[]>([])

  useEffect(() => {
    requestFolderList().then(data => {
      setFolders(data)
      setSelectedFolder(data)
    })
  }, [])

  const removeTask = (folderId: FolderItem['id'], taskId: Task['id']) => item =>
    item.id === folderId
      ? {
          ...item,
          tasks: item.tasks.filter(v => v.id !== taskId),
        }
      : item

  const addTask = (folderId: FolderItem['id'], task: Task) => item =>
    item.id === folderId
      ? {
          ...item,
          tasks: [...item?.tasks, task],
        }
      : item

  const completedTask = (id: FolderItem['id'], task: Task) => item =>
    item.id === id ? { ...item, tasks: item?.tasks.map(v => (v.id === task.id ? task : v)) } : item

  const actions = useMemo(
    () => ({
      onAddNewFolder: (folder: FolderItem) => {
        setFolders(prev => [...prev, folder])
      },

      onRemoveFolder: (id: FolderItem['id']) => {
        setFolders(prev => prev.filter(folder => folder.id !== id))
        setSelectedFolder(prev => prev.filter(folder => folder.id !== id))
      },

      onEditTitle: (id: FolderItem['id'], name: FolderItem['name']) => {
        setFolders(prev => prev.map(v => (v.id === id ? { ...v, name } : v)))
      },

      onSelectFolder: (folders: FolderItem[]) => {
        setSelectedFolder(folders)
      },

      onCompletedTask: (id: FolderItem['id'], task: Task) => {
        setFolders(prev => prev.map(completedTask(id, task)))
        setSelectedFolder(prev => prev.map(completedTask(id, task)))
      },

      onRemoveTask: (folderId: FolderItem['id'], taskId: Task['id']) => {
        setFolders(prev => prev.map(removeTask(folderId, taskId)))
        setSelectedFolder(prev => prev.map(removeTask(folderId, taskId)))
      },

      onAddNewTask: (folderId: FolderItem['id'], task: Task) => {
        setFolders(prev => prev.map(addTask(folderId, task)))
        setSelectedFolder(prev => prev.map(addTask(folderId, task)))
      },
    }),
    [folders, selectedFolder]
  )

  return <Store.Provider value={{ folders, selectedFolder, actions }}>{children}</Store.Provider>
}

export default function useStore() {
  const context = useContext(Store)
  if (context === undefined) {
    throw new Error('Store hook must be used within a Context Provider')
  }
  return context
}
