import React, { useEffect, useState } from 'react'

import TaskList from './components/TaskList/TaskList'
import FolderList from './components/FolderList/FolderList'
import { useStore } from './store/store.context'
import { requestFolderList } from './services/folderService'
import { Loader } from 'common/Loader/Loader'

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const {
    selectedFolder,
    actions: { onSetFolder },
  } = useStore()

  useEffect(() => {
    setIsLoading(true)
    requestFolderList()
      .then(data => {
        onSetFolder(data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className={'flex justify-center items-center h-screen w-screen'}>
      <main className={'flex w-[800px] h-[650px] bg-white shadow-lg rounded-lg'}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <FolderList />
            <section className={'p-14 w-full max-h-[650px] overflow-y-auto bg-white rounded-r-lg'}>
              {selectedFolder.length > 0 ? (
                selectedFolder.map(folder => <TaskList key={folder.id} {...folder} />)
              ) : (
                <div>Задачи отсутствуют</div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}
