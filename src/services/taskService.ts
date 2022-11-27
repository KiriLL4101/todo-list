interface NewTask {
  listId: number
  text: string
  completed: boolean
}

interface TaskItem {
  listId: number
  text: string
  completed: boolean
  id: number
}

const createTask = ({ listId, text, completed }: NewTask): Promise<TaskItem> => {
  return fetch(process.env.API_URL + '/tasks', {
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

const completedTask = (id: number, isChecked: boolean): Promise<TaskItem> => {
  return fetch(process.env.API_URL + '/tasks/' + id, {
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
  return fetch(process.env.API_URL + '/tasks/' + id, {
    method: 'DELETE',
  }).then(res => res.json())
}

export { createTask, completedTask, removeTask }
