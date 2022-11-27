const requestColorList = (): Promise<Color[]> => {
  return fetch(process.env.API_URL + '/colors').then(res => res.json())
}

export { requestColorList }
