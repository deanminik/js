const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})
app.get('/page-2', function (req, res) {
    res.send('Welcome to the page 2')
})
app.get('*', function (req, res) {
    res.send('page not found 404')
})

app.listen(8080)