const { response } = require('express');


const search = (req, resp = response) =>{

    resp.json({ msg: 'Search....'});

}

module.exports = {
    search
}