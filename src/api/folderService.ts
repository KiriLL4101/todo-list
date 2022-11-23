const requestFolderList = (): Promise<FolderItem[]> => {
  return fetch(process.env.API_URL + '/lists?_expand=color&_embed=tasks').then(
    res => res.json()
  )
}

const removeFolder = (id: number): Promise<unknown> => {
  return fetch(process.env.API_URL + '/lists/' + id, {
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
  return fetch(process.env.API_URL + '/lists', {
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
  return fetch(process.env.API_URL + '/lists/' + id, {
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
