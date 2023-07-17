const { response } = require('express');//To help us with the typing->tipado 
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res = response) => {

    const { email, password } = req.body;
    try {

        //is the email exists?
        const user = await User.findOne({ email }); //Remember, our user model has a property called email
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password are not correct - email'
            });
        }

        //is the user active?
        //this-> if(user.state === false) and this -> !user.state are the same 
        if (!user.state) {
            return res.status(400).json({
                msg: 'User / Password are not correct - state: false'
            });
        }


        //verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password are not correct - password: false'
            });
        }


        //Is everything is correct generate the JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token

        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'status: 500 internal server error | There is something wrong'
        })
    }

}

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {

        // const googleUser = await googleVerify(id_token);
        const { name, img, email } = await googleVerify(id_token);

        res.json({
            msg: 'Everything looks ok!',
            id_token
        });
        // console.log(googleUser);
    } catch (error) {
        json.status(400).json({
            ok: false,
            msg: 'We could not verify the token'
        })
    }



}

module.exports = {
    login,
    googleSignIn
}