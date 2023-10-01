const { response } = require('express');//To help us with the typing->tipado 



const loadFiles = (req, resp = response) => {
    resp.json({ msg: 'Load Files controller' });
}

module.exports = {
    loadFiles
}