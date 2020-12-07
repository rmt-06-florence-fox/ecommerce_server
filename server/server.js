const app = require('./app')
const http = require('http')
const port = 3000

const server = http.createServer(app)
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})