const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');


class Server {
    constructor() {
        //Variables
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories',
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads'
        }

        // this.userPath = '/api/users';
        // this.authPath = '/api/auth';

        //Connect to DataBase
        this.connectDB();

        //Middleware
        this.middlewares();

        //Functions
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {//This executes before our routes section 
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

        //Middleware from npm express-upload 
        //This is to load files
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    // routes() {
    //     this.app.get('/api', (req, res) => {
    //         res.send('Hello World');//send -> return a html web site 
    //     })
    // }

    routes() {
        // this.app.use(this.authPath, require('../routes/auth.route'));
        // this.app.use(this.userPath, require('../routes/users.route'));
        this.app.use(this.paths.auth, require('../routes/auth.route'));
        this.app.use(this.paths.users, require('../routes/users.route'));
        this.app.use(this.paths.categories, require('../routes/categories.route'));
        this.app.use(this.paths.products, require('../routes/products.route'));
        this.app.use(this.paths.search, require('../routes/search.route'));
        this.app.use(this.paths.uploads, require('../routes/uploads.route'));

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