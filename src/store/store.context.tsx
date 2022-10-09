import { createContext, useContext, useEffect, useState } from 'react'
import type { FolderItem, Color } from 'App'

interface Store {
  folders: FolderItem[]
  requestFolderList: () => void
  removeFolderById: (id: number) => void
  requestColorList: () => Promise<Color[]>
  createNewFolder: ({
    name,
    colorId,
  }: {
    name: string
    colorId: number
  }) => Promise<any>
  createTask: ({
    listId,
    text,
    complited,
  }: {
    listId: number
    text: string
    complited: boolean
  }) => Promise<any>
  completedTask: (id: number, isChecked: boolean) => Promise<any>
  removeTask: (id: number) => Promise<any>
}

const Store = createContext<Store>(null)

export function StoreProvider({ children }) {
  const [folders, setFolders] = useState<FolderItem[]>([])

  useEffect(() => {
    requestFolderList()
  }, [])

  const requestFolderList = () => {
    return fetch('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(res => res.json())
      .then(data => {
        setFolders(data)
      })
  }

  const removeFolderById = (id: number) => {
    return fetch('http://localhost:3001/lists/' + id, {
      method: 'DELETE',
    }).then(() => {
      setFolders(prev => prev.filter(v => v.id !== id))
    })
  }

  const requestColorList = () => {
    return fetch('http://localhost:3001/colors').then(res => res.json())
  }

  const createNewFolder = ({ name, colorId }) => {
    return fetch('http://localhost:3001/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        colorId,
      }),
    })
  }

  const createTask = newTask => {
    return fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
  }

  const completedTask = (id: number, isChecked: boolean) => {
    return fetch('http://localhost:3001/tasks/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: isChecked,
      }),
    })
  }

  const removeTask = (id: number) => {
    return fetch('http://localhost:3001/tasks/' + id, {
      method: 'DELETE',
    })
  }

  return (
    <Store.Provider
      value={{
        folders,
        requestFolderList,
        removeFolderById,
        requestColorList,
        createNewFolder,
        createTask,
        completedTask,
        removeTask,
      }}
    >
      {children}
    </Store.Provider>
  )
}

export default function useStore() {
  return useContext(Store)
}
