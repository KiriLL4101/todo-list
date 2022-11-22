import React, { createContext, useContext, useEffect, useState } from 'react'
import { useToast } from '../package/Toaster'
import type { Color, FolderItem } from '../components/App'
import { requestFolderList } from '../api/folderService'
import { requestColorList } from '../api/colorService'

interface Store {
  colors: Color[]
  folders: FolderItem[]
  selectedFolder: FolderItem[]
  setFolders: React.Dispatch<React.SetStateAction<FolderItem[]>>
  setSelectedFolder: React.Dispatch<React.SetStateAction<FolderItem[]>>
}

const Store = createContext<Store>(null)

export function StoreProvider({ children }) {
  const [folders, setFolders] = useState<FolderItem[]>([])
  const [colors, setColors] = useState<Color[]>([])
  const [selectedFolder, setSelectedFolder] = useState<FolderItem[]>([])

  const toaster = useToast()

  useEffect(() => {
    requestFolderList()
      .then(data => {
        setFolders(data)
        setSelectedFolder(data)
      })
      .catch(() => {
        toaster({
          type: 'danger',
          message: 'Ошибка на получении папок',
        })
      })

    requestColorList()
      .then(data => setColors(data))
      .catch(() => {
        toaster({
          type: 'danger',
          message: 'Ошибка загрузки цветов',
        })
      })
  }, [])

  return (
    <Store.Provider
      value={{
        folders,
        selectedFolder,
        setFolders,
        setSelectedFolder,
        colors,
      }}
    >
      {children}
    </Store.Provider>
  )
}

export default function useStore() {
  return useContext(Store)
}
