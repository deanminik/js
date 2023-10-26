"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../routes/user.route"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            users: '/api/users'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8001';
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
                throw new Error('Database connection failed');
            }
        });
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