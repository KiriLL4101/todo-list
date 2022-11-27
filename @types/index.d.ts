declare module '*.module.css'

declare module '*.svg' {
  import React from 'react'
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { className?: any }>
  export default ReactComponent
}

interface FolderItem {
  id: number
  colorId: number
  name: string
  color?: Color
  tasks?: Task[]
}

interface Task {
  id: number
  listId: number
  text: string
  completed: boolean
}

interface Color {
  hex: string
  id: number
  name: string
}
