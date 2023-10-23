import express, { Application } from 'express';
import userRoutes from '../routes/user.route';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8001';

        //Define my routes
        this.routes();

    }

    routes(){
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