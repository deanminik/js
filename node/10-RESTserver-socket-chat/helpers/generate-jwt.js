const jwt = require('jsonwebtoken');

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


module.exports = {
    generateJWT
}