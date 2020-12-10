const app = require('./app')
const http = require('http')
const server = http.createServer(app)
const port = 3000
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('Socket io client connected');
})

server.listen(port, () => {
    console.log(`http://localhost:${port}`);
})