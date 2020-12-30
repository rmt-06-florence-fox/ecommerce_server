const app = require('./index')
const http = require('http')
const port = process.env.PORT || 3000

http
    .createServer(app)
    .listen(port, () => console.log(`running on port ${port}`))