import express, { Application } from 'express';

class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8001';
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