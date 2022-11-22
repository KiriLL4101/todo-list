import type { FolderItem } from '../components/App'

const requestFolderList = (): Promise<FolderItem[]> => {
  return fetch('/api/lists').then(res => res.json())
}

const removeFolder = (id: number): Promise<unknown> => {
  return fetch('/api/lists/' + id, {
    method: 'DELETE',
  }).then(res => res.json())
}

const createNewFolder = ({
  name,
  colorId,
}: {
  name: string
  colorId: number
}): Promise<{ name: string; colorId: number; id: number }> => {
  return fetch('/api/lists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      colorId,
    }),
  }).then(res => res.json())
}

const editTitleFolder = (id: number, name: string) => {
  return fetch('/api/lists/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  }).then(res => res.json())
}

export { requestFolderList, removeFolder, createNewFolder, editTitleFolder }
