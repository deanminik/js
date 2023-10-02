const { response } = require('express');//To help us with the typing->tipado 
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { uploadFile } = require('../helpers');



const loadFiles = async (req, resp = response) => {


    if (!req.files || Object.keys(req.files).length === 0) {
        resp.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    if (!req.files.file) {
        resp.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    try {
        const name = await uploadFile(req.files, ['txt', 'md'], 'myFolder');
        resp.json({ name });

    } catch (msg) {
        resp.status(400).json({ msg });
    }



}

module.exports = {
    loadFiles
}