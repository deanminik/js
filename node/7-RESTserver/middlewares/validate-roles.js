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

const hasRole = (...allKindOfRoles) => {
    return (req, res = response, next) => {
        // console.log(allKindOfRoles, req.user.rol);

        if (!req.user) {
            return res.status(500).json({
                msg: 'Verify the token first, before the role verification'
            });
        }
        if (!allKindOfRoles.includes(req.user.rol)) {
            return res.status(401).json({
                msg: `The service require one of this roles: ${allKindOfRoles}`
            })
        }

        next();
    }

}


module.exports = {
    isAdminRole,
    hasRole
}