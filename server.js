const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./src/assets/db.json')
const middlewares = jsonServer.defaults({
  static: './build',
})

const PORT = process.env.PORT || 3001

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
)

server.use(middlewares)
server.use(router)

server.listen(PORT, () => {
  console.log('Server is running ' + PORT)
})
