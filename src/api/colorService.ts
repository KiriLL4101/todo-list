import type { Color } from 'App'

const requestColorList = (): Promise<Color[]> => {
  return fetch('/api/colors').then(res => res.json())
}

export { requestColorList }
