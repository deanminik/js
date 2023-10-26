import express, { Application } from 'express';
import userRoutes from '../routes/user.route';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8001';

        this.dbConnection();

        this.middlewares();

        this.routes();

    }
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');

        } catch (error:any) {
            console.error('Unable to connect to the database:', error);
            throw new Error('Database connection failed');
       
        }
    }
    middlewares() {
        //Just functions before to executes our routes 

        //CORS:
        this.app.use(cors());

        //Parse the body to read it
        this.app.use(express.json()); //So with this, express parse for me, the body when we send in the request post, put, delete etc 


        //Public directory -> To share static content Example: web site 
        this.app.use(express.static('public')) //public -> /11-ts-REST-server/public/



    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in ' + this.port);
        });
    }
}


export default Server;


/*NOTE:*/

//-> process.env.PORT 
//If this is process.env.PORT is undefine, then use 8001