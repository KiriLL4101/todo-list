import React, { useEffect, useState } from "react"
import TaskList from "./components/TaskList/TaskList"
import FolderList from "./components/FolderList/FolderList"

export interface FolderItem {
  id: number 
  colorId: number
  name: string
  color?: Color
  tasks?: Task[]
}

export interface Task {
  id: number
  listId: number
  text: string
  completed: boolean
}

export interface Color {
  hex: string
  id: number
  name: string
}

export const App: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<FolderItem[]>([])
  const [folderLists, setFolderLists] = useState<FolderItem[]>([])

  const getTasks = (folder: FolderItem[]) => {
    setSelectedFolder(folder)
  }

  useEffect(() => {
    refresh()
  }, [])

  const refresh = () => {
    fetch('http://localhost:3001/lists?_expand=color&_embed=tasks').then(res => res.json()).then(data => {      
      setFolderLists(data)
      getTasks(data[0]?.id)
    })
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <main className="flex w-[800px] shadow-lg">
        {folderLists.length > 0 && <FolderList lists={folderLists} getTasks={getTasks} refresh={refresh} />}
        <section className="p-14 w-full h-[650px] overflow-y-scroll">
          {
            selectedFolder.length > 0 && selectedFolder.map(folder => <TaskList title={folder.name} tasks={folder.tasks} />)
          }
        </section>
      </main>
    </div>
  )
}
