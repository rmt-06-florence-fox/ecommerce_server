if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const http = require("http")
const app = require("./app")
const port = process.env.PORT || 3000
console.log(process.env.PORT)

const server = http.createServer(app)
server.listen(port, () => console.log("listen on http://localhost:" + port))