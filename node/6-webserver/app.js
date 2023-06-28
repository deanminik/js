const express = require('express');
const hbs = require('hbs');

const app = express();


//HANDLEBARS
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) { });

//Middleware -> It is just a function that executes before doing something

/*
*use()-> This is the function to call our middleware
* And here we say, Hi express! take my public folder
*/
//Share static content
app.use(express.static('public')); //This calls the index 

/**
 * The code below with this "app.get('/', function (req, res)" never execute after the middleware
 */
//Middleware END



app.get('/', function (req, res) {
    // res.send('Hello World');
    //render() -> comes from app.set('view engine', 'hbs');
    res.render('home', {
        name: 'Dean',
        title: 'Node Course'
    });
});

app.get('/elements', function (req, res) {
    res.render('elements', {
        name: 'Dean',
        title: 'Node Course'
    });
});

app.get('/generic', function (req, res) {
    res.render('generic', {
        name: 'Dean',
        title: 'Node Course'
    });
});

// app.get('/elements', function (req, res) {
//     res.sendFile(__dirname + '/public/elements.html');
// });
// app.get('/generic', function (req, res) {
//     res.sendFile(__dirname + '/public/generic.html');
// });

// app.get('*', function (req, res) {
//     res.send('page not found 404')
// })
//This should be always at the end of all paths 
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/404.html');//__dirname -> To add a absolute path 
})

app.listen(8080)