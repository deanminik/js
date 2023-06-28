const express = require('express')
const app = express()

//Middleware -> It is just a function that executes before doing something

/*
*use()-> This is the function to call our middleware
* And here we say, Hi express! take my public folder
*/
//Share static content
app.use(express.static('public'));

/**
 * The code below with this "app.get('/', function (req, res)" never execute after the middleware
 */
//Middleware END



app.get('/', function (req, res) {
    res.send('Hello World')
})
app.get('/page-2', function (req, res) {
    res.send('Welcome to the page 2')
})
// app.get('*', function (req, res) {
//     res.send('page not found 404')
// })
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/404.html');//__dirname -> To add a absolute path 
})

app.get('/helloworld', function (req, res) {
    res.send();
})
app.listen(8080)