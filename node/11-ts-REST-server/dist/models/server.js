"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../routes/user.route"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.apiPaths = {
            users: '/api/users'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8001';
        this.middlewares();
        this.routes();
    }
    middlewares() {
        //Just functions before to executes our routes 
        //CORS:
        this.app.use((0, cors_1.default)());
        //Parse the body to read it
        this.app.use(express_1.default.json()); //So with this, express parse for me, the body when we send in the request post, put, delete etc 
        //Public directory -> To share static content Example: web site 
        this.app.use(express_1.default.static('public')); //public -> /11-ts-REST-server/public/
    }
    routes() {
        this.app.use(this.apiPaths.users, user_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in ' + this.port);
        });
    }
}
exports.default = Server;
/*NOTE:*/
//-> process.env.PORT 
//If this is process.env.PORT is undefine, then use 8001
//# sourceMappingURL=server.js.map