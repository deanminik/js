const express = require('express');
const cors = require('cors');


class Server {
    constructor() {
        //Variables
        this.app = express();
        this.port = process.env.PORT;

        //Middleware
        this.middlewares();

        //Functions
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        // Public Directory 
        this.app.use(express.static('public')) //use() -> the key word to indicate this a middleware
    }

    // routes() {
    //     this.app.get('/api', (req, res) => {
    //         res.send('Hello World');//send -> return a html web site 
    //     })
    // }

    routes() {
        this.app.get('/api', (req, res) => {
            // res.json('Hello World');//send -> return a json data 

            //Normally we send an object like this:
            res.json({
                msg: 'get API'
            });
        });
        this.app.put('/api', (req, res) => {
            res.json({
                msg: 'put API'
            });
        });
        this.app.post('/api', (req, res) => {
            res.json({
                msg: 'post API'
            });
        });
        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'delete API'
            });
        });
        this.app.patch('/api', (req, res) => {
            res.json({
                msg: 'patch API'
            });
        });
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