const { response, request } = require('express');// To have the typing, this is better if we are not working with typescript

const isAdminRole = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Verify the token first, before the role verification'
        });
    }
    const { rol, name } = req.user;//req.user created based in the jwt 

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not an administrator - Can't do this`
        });
    }
    next();
}


module.exports = {
    isAdminRole
}