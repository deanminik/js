const jwt = require('jsonwebtoken');
const { User } = require('../models'); //Calling the index

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        //The only thing to save in the payload, is the uid
        //You can save whatever you want, but ir recommended to only add non-sensitive content 
        //Remember somebody can get your token and extract the content 
        const payload = { uid };


        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('We could not generate the JWT');
            } else {
                resolve(token);

            }
        });
    });

}

//For more details visit this web site https://www.npmjs.com/package/jsonwebtoken

const checkJWT = async (token = '') => {
    try {
        if (token.length < 10) {
            return null;
        }
        //Can we decrypt ? 
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); // if this works, that the uid exists
        const user = await User.findById(uid);

        if (user) {
            if (user.state) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }

    } catch (error) {
        return null;

    }
}
module.exports = {
    generateJWT,
    checkJWT
}