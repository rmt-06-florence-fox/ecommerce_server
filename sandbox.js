const axios = require('axios')
let access_token;
let user = require('./data/user.json');


axios({
    method: 'post',
    url: 'http://localhost:3000/login',
    data: {
        email: user.email,
        password: user.password,
        role: user.role
    }
})
.then(response => {
    console.log(response)
})
.catch(error => {
    console.log(error)
})
