const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

/**
 * In our  constructor we have two kind of servers:
 * express -> this.app
 * socket.io -> this.io | This is different to the express server, but both are connected
 */


class Server {
    constructor() {
        //Variables
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server); // Here this.io, we keep the all data of my sockets connected 

        this.paths = {}

        //Middleware
        this.middlewares();

        //Functions
        this.routes();

        //Event sockets
        this.sockets();
    }



    middlewares() {//This executes before our routes section 
        //CORS
        this.app.use(cors());//Useful is someone needs to send request to our server 


        // Public Directory 
        this.app.use(express.static('public')) //use() -> the key word to indicate this is a middleware | Also to keep clients

    }


    routes() {
        // this.app.use(this.paths.auth, require('../routes/auth.route'));
    }

    sockets() {
        // this.io -> makes reference to our socket server on the line 13
        this.io.on('connection',socketController);
    }

    //To put our server to listen requests
    listen() {
        this.server.listen(this.port, () => {
            console.log('This server is running in the port', this.port);
        });
    }
    I
}


module.exports = Server;

/*
TERMS:
on-> listener event to hear clients 
emit-> to sending event to clients 
*/