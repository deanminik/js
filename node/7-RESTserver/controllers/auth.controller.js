const { response } = require('express');//To help us with the typing->tipado 

const login = (req, res = response ) =>{
    res.json({
        msg:'Login ok'
    })
}

module.exports = {
    login
}