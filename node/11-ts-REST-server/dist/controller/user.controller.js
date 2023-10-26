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
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll(); // -> This findAll returns a promise like mongoose too | Remember in every promise we can use async and await, because we are waiting for an answer, good or bad
    // res.json({
    //     msg: 'getUsers'
    // });
    res.json(users);
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    // res.json({
    //     msg: 'getUser',
    //     id
    // });
    if (!user) {
        return res.status(404).json({
            msg: `The user with the ID: ${id} doesn't exists`
        });
    }
    res.json(user);
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    // res.json({
    //     msg: 'postUser',
    //     body
    // });
    try {
        const existsEmail = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existsEmail) {
            return res.status(400).json({
                msg: 'There is an user with this email: ' + body.email
            });
        }
        const user = new user_1.default(body);
        yield user.save();
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk with the Admin',
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    // res.json({
    //     msg: 'putUser',
    //     body,
    //     id
    // });
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: 'There is not user with this ID ' + id
            });
        }
        yield user.update(body);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk with the Admin',
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'deleteUser',
        id
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map