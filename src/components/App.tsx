import React from 'react'
import useStore from '../store/store.context'
import TaskList from './TaskList/TaskList'
import FolderList from './FolderList/FolderList'

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
  const { folders, selectedFolder } = useStore()

  return (
    <div className={'flex justify-center items-center h-screen w-screen'}>
      <main className={'flex w-[800px] shadow-lg'}>
        <FolderList />
        <section className={'p-14 w-full h-[650px] overflow-y-scroll'}>
          {selectedFolder.length > 0 && folders.length > 0 ? (
            selectedFolder.map(folder => (
              <TaskList key={folder.id} {...folder} />
            ))
          ) : (
            <div>Задачи отсутствуют</div>
          )}
        </section>
      </main>
    </div>
  )
}
