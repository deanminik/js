import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {

    const users = await User.findAll(); // -> This findAll returns a promise like mongoose too | Remember in every promise we can use async and await, because we are waiting for an answer, good or bad

    // res.json({
    //     msg: 'getUsers'
    // });

    res.json(users);
}


export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk(id);

    // res.json({
    //     msg: 'getUser',
    //     id
    // });

    if (!user) {
        return res.status(404).json({
            msg:`The user with the ID: ${id} doesn't exists`
        });
    }

    res.json(user);
}

export const postUser = (req: Request, res: Response) => {

    const { body } = req;

    res.json({
        msg: 'postUser',
        body
    });
}

export const putUser = (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'putUser',
        body,
        id
    });
}


export const deleteUser = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'deleteUser',
        id
    });
}