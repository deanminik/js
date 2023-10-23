"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../routes/user.route"));
class Server {
    constructor() {
        this.apiPaths = {
            users: '/api/users'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8001';
        //Define my routes
        this.routes();
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