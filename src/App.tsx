import React, { useState } from 'react'
import TaskList from './components/TaskList/TaskList'
import FolderList from './components/FolderList/FolderList'
import useStore from './store/store.context'

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

  const { folders } = useStore()

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <main className="flex w-[800px] shadow-lg">
        {folders.length > 0 && (
          <FolderList lists={folders} setSelectedFolder={setSelectedFolder} />
        )}
        <section className="p-14 w-full h-[650px] overflow-y-scroll">
          {selectedFolder.length > 0 && folders.length > 0 ? (
            selectedFolder.map(folder => (
              <TaskList
                key={folder.id}
                listId={folder.id}
                title={folder.name}
                tasks={folder.tasks}
                color={folder.color}
              />
            ))
          ) : (
            <div>Задачи отсутствуют</div>
          )}
        </section>
      </main>
    </div>
  )
}
