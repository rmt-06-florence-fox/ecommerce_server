const app = require('./app')
const http = require('http')
const port = 3000

const server = http.createServer(app)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})