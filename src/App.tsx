import React, { useEffect } from 'react'

import TaskList from './components/TaskList/TaskList'
import FolderList from './components/FolderList/FolderList'
import { useStore } from './store/store.context'
import { requestFolderList } from './services/folderService'

export const App: React.FC = () => {
  const {
    selectedFolder,
    actions: { onSetFolder },
  } = useStore()

  useEffect(() => {
    requestFolderList().then(data => {
      onSetFolder(data)
    })
  }, [])

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
