if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const http = require("http")
const app = require("./app")
const port = process.env.PORT || 3000
const server = http.createServer(app)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})