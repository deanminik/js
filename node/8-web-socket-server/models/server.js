const express = require('express');
const cors = require('cors');




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

    //To put our server to listen requests
    listen() {
        this.server.listen(this.port, () => {
            console.log('This server is running in the port', this.port);
        });
    }
    I
}


module.exports = Server;