const { response } = require("express");

const validateFileUpload = (req, resp = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return resp.status(400).json({
            msg: 'No files were uploaded. | Middleware'
        });

    }
    //If the condition was successful, then continue using next, to start with the next operation
    next();

}


module.exports = {
    validateFileUpload
}