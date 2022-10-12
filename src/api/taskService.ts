interface newTask {
  listId: number
  text: string
  completed: boolean
}

interface taskItem {
  listId: number
  text: string
  completed: boolean
  id: number
}

const createTask = ({ listId, text, completed }: newTask): Promise<taskItem> => {
  return fetch('http://localhost:3001/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      listId,
      text,
      completed,
    }),
  }).then(res => res.json())
}

const completedTask = (id: number, isChecked: boolean): Promise<taskItem> => {
  return fetch('http://localhost:3001/tasks/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completed: isChecked,
    }),
  }).then(res => res.json())
}

const removeTask = (id: number): Promise<unknown> => {
  return fetch('http://localhost:3001/tasks/' + id, {
    method: 'DELETE',
  }).then(res => res.json())
}

export { createTask, completedTask, removeTask }
