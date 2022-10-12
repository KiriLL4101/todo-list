import type { Color } from 'App'

const requestColorList = (): Promise<Color[]> => {
  return fetch('http://localhost:3001/colors').then(res => res.json())
}

export { requestColorList }
