import React from 'react'
import useStore from '../store/store.context'
import TaskList from './TaskList/TaskList'
import FolderList from './FolderList/FolderList'

export const App: React.FC = () => {
  const { selectedFolder } = useStore()

  return (
    <div className={'flex justify-center items-center h-screen w-screen'}>
      <main className={'flex w-[800px] shadow-lg'}>
        <FolderList />
        <section className={'p-14 w-full h-[650px] overflow-y-scroll'}>
          {selectedFolder.length > 0 ? (
            selectedFolder.map(folder => <TaskList key={folder.id} {...folder} />)
          ) : (
            <div>Задачи отсутствуют</div>
          )}
        </section>
      </main>
    </div>
  )
}
