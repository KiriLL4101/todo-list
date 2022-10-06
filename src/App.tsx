import React, { useEffect, useState } from "react"
import TodoList from "./components/TodoList/TodoList"
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
  const [tasks, setTasks] = useState<Task[]>([])
  const [lists, setLists] = useState<FolderItem[]>([])
  const [title, setTitle] = useState<string>('')

  const getTasks = (id: number) => {
    setTasks(lists.find(v => v.id === id)?.tasks || [])
    setTitle(lists.find(v => v.id === id)?.name || '')
  }

  useEffect(() => {
    fetch('http://localhost:3001/lists?_expand=color&_embed=tasks').then(res => res.json()).then(data => {      
      setLists(data)
    })
  }, [])

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <main className="flex w-[800px] shadow-lg">
        {lists.length > 0 && <FolderList lists={lists} getTasks={getTasks} />}
        <section className="p-14 w-full">
          <TodoList title={title} tasks={tasks} />
        </section>
      </main>
    </div>
  )
}
