import { createContext, useContext, useEffect, useState } from 'react'
import { requestFolderList } from '../api/folderService'
import type { FolderItem } from 'App'

interface Store {
  folders: FolderItem[]
  selectedFolder: FolderItem[]
  setFolders: React.Dispatch<React.SetStateAction<FolderItem[]>>
  setSelectedFolder: React.Dispatch<React.SetStateAction<FolderItem[]>>
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

  return (
    <Store.Provider
      value={{
        folders,
        selectedFolder,
        setFolders,
        setSelectedFolder,
      }}
    >
      {children}
    </Store.Provider>
  )
}

export default function useStore() {
  return useContext(Store)
}
