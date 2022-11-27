export interface Store {
  folders: FolderItem[]
  selectedFolder: FolderItem[]
  actions: Actions
}

export interface Actions {
  onAddNewFolder: (folder: FolderItem) => void
  onSelectFolder: (folder: FolderItem[]) => void
  onRemoveFolder: (id: FolderItem['id']) => void
  onEditTitle: (id: FolderItem['id'], name: FolderItem['name']) => void
  onCompletedTask: (id: FolderItem['id'], task: Task) => void
  onRemoveTask: (listId: FolderItem['id'], task: Task['id']) => void
  onAddNewTask: (listId: FolderItem['id'], task: Task) => void
}
