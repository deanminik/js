"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); // Similar to mongoose
const connection_1 = __importDefault(require("../db/connection"));
const User = connection_1.default.define('users', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    state: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
});
exports.default = User;
// HERE: -> 
// state:{
//     type:DataTypes.BOOLEAN
// },
// In the database the property state is using TINYINT, that represents: 0 or 1 
//And here we can use BOOLEAN because sequelize will handle those values to transform true or false into 1 or 0
//# sourceMappingURL=user.js.map