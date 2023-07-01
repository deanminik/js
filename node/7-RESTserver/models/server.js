const express = require('express');
const cors = require('cors');


class Server {
    constructor() {
        //Variables
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        //Middleware
        this.middlewares();

        //Functions
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());//use() -> the key word to indicate this is a middleware

        //Parsing and reading the body
        this.app.use(express.json());//use() -> the key word to indicate this is a middleware
        /**
         * express.json()
         * Any information that comes from a POST, PUT, or DELETE 
         * will try to be translated into a JSON format.
         */

        // Public Directory 
        this.app.use(express.static('public')) //use() -> the key word to indicate this is a middleware
    }

    // routes() {
    //     this.app.get('/api', (req, res) => {
    //         res.send('Hello World');//send -> return a html web site 
    //     })
    // }

    routes() {
        this.app.use(this.userPath, require('../routes/users.route'));
    }


    // routes() {
    //     this.app.get('/api', (req, res) => {
    //         res.status(403).json('Hello World');//send -> return a json error 
    //     })
    // }

    listen() {
        this.app.listen(this.port, () => {
            console.log('This server is running in the port', this.port);
        });
    }
    I
}


module.exports = Server;