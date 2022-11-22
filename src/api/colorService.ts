import type { Color } from 'components/App'

const requestColorList = (): Promise<Color[]> => {
  return fetch('/api/colors').then(res => res.json())
}

export { requestColorList }
