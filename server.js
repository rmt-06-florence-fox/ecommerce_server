// kenapa dipisah ? karena nanti ada case ketika butuh 2 server di jalankan
// if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
//     require('dotenv').config() // jangan lupa nanti dikasih kondisi untuk deploy
// }

const http = require("http")
const app = require("./app")
const PORT = process.env.PORT || 3000

const server = http.createServer(app)

// server.listen(PORT, () => {
//     console.log("I LOVE YOU " + PORT)
// })