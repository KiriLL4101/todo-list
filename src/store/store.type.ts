export interface Store {
  folders: FolderItem[]
}

export interface Actions {
  onAddFolder: (payload: FolderItem) => void
  onRemoveFolder: (payload: FolderItem['id']) => void
  onSelectFolder: (id: FolderItem['id'] | null) => void
  onSetFolder: (payload: FolderItem[]) => void
  onEditTitle: (payload: { id: FolderItem['id']; name: FolderItem['name'] }) => void
  onAddNewTask: (payload: { folderId: FolderItem['id']; task: Task }) => void
  onRemoveTask: (payload: { folderId: FolderItem['id']; taskId: Task['id'] }) => void
  onCompletedTask: (payload: { folderId: FolderItem['id']; taskId: Task['id'] }) => void
}

export interface StoreContextValue extends Store {
  actions: Actions
  selectedFolder: FolderItem[]
}
