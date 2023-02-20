import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

import { useMethods } from '../hooks/useMethods'
import { Store, StoreContextValue } from './store.type'

const StoreContext = createContext<StoreContextValue | null>(null)

interface StoreProviderProps {
  children: ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null)

  const [{ folders }, actions] = useMethods(
    () => ({
      onSetFolder(state, payload) {
        return { ...state, folders: payload }
      },
      onAddFolder(state, payload) {
        return { ...state, folders: [...state.folders, payload] }
      },
      onRemoveFolder(state, payload) {
        return { ...state, folders: state.folders.filter(folder => folder.id !== payload) }
      },
      onEditTitle(state, { id, name }) {
        return { ...state, folders: state.folders.map(v => (v.id === id ? { ...v, name } : v)) }
      },
      onAddNewTask: (state, { folderId, task }) => {
        const folders = state.folders.map(val => {
          if (val.id === folderId) {
            return { ...val, tasks: [...(val?.tasks || []), task] }
          }
          return val
        })
        return { ...state, folders }
      },
      onRemoveTask: (state, { folderId, taskId }) => {
        const folders = state.folders.map(val => {
          if (val.id === folderId) {
            return { ...val, tasks: (val?.tasks || []).filter(folder => folder.id !== taskId) }
          }
          return val
        })
        return { ...state, folders }
      },
      onCompletedTask: (state, { folderId, taskId }) => {
        const folders = state.folders.map(val => {
          if (val.id === folderId) {
            return {
              ...val,
              tasks: (val?.tasks || []).map(task => {
                if (task.id === taskId) {
                  return { ...task, completed: !task.completed }
                }
                return task
              }),
            }
          }
          return val
        })
        return { ...state, folders }
      },
    }),
    { folders: [] } as Store,
  )

  const selectedFolder = useMemo(() => {
    if (selectedFolderId === null) return folders

    return folders.filter(folder => folder.id === selectedFolderId)
  }, [folders, selectedFolderId])

  const onSelectFolder = (id: FolderItem['id'] | null) => {
    setSelectedFolderId(id)
  }

  return (
    <StoreContext.Provider
      value={{ folders, selectedFolder, actions: { ...actions, onSelectFolder } }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error('useStore hook must be used within a Context Provider')
  }

  return context
}
