const { response } = require('express');//To help us with the typing->tipado 
const path = require('path');


const loadFiles = (req, resp = response) => {

    // console.log(req.files);

    // resp.json({ msg: 'Load Files controller' });



    if (!req.files || Object.keys(req.files).length === 0) {
        resp.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    if (!req.files.file) {
        resp.status(400).json({ msg: 'No files were uploaded.' });
        return;
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const { file } = req.files;

    const splitFileName = file.name.split('.');
    const extensionOfTheFile = splitFileName[splitFileName.length - 1];

    // console.log(splitFileName);

    //Validate extension 
    const validatedExtension = ['png', 'jpg', 'jpeg', 'gif'];

    if (!validatedExtension.includes(extensionOfTheFile)) {

        return resp.status(400).json({
            msg: `The extension: ${extensionOfTheFile} is not allowed. These are the available extensions: ${validatedExtension} `
        });
    }

    resp.json({ extensionOfTheFile });


    // const uploadPath = path.join(__dirname, '../uploads/', file.name);

    // // Use the mv() method to place the file somewhere on your server
    // file.mv(uploadPath, (err) => {
    //     if (err) {
    //         console.log(err);
    //         return resp.status(500).json({ err });
    //     }


    //     resp.json({ msg: 'File uploaded!' + uploadPath });
    // });
}

module.exports = {
    loadFiles
}