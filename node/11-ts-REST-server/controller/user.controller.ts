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
            msg: `The user with the ID: ${id} doesn't exists`
        });
    }

    res.json(user);
}

export const postUser = async (req: Request, res: Response) => {

    const { body } = req;

    // res.json({
    //     msg: 'postUser',
    //     body
    // });
    try {
        const existsEmail = await User.findOne({
            where: {
                email: body.email
            }
        });
        if (existsEmail) {
            return res.status(400).json({
                msg: 'There is an user with this email: ' + body.email
            });
        }

        const user = new User(body);
        await user.save();

        res.json(user);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the Admin',
        });
    }
}

export const putUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    // res.json({
    //     msg: 'putUser',
    //     body,
    //     id
    // });
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: 'There is not user with this ID ' + id
            });
        }

        await user.update(body);

        res.json(user);

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk with the Admin',
        });
    }
}


export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: 'There is not user with this ID ' + id
        });
    }

    // res.json({
    //     msg: 'deleteUser',
    //     id
    // });


      //DELETE A REGISTER PHYSICALLY 
    //   await user.destroy();
      
    //DELETE A REGISTER LOGICALLY -> THis is the recommended way 
    await user.update({state:false});


      res.json(user);

}