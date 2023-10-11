const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validatedExtension = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    /*
    Here is better to work with promises when we want to know if something was correct or not 
    */

    return new Promise((resolve, reject) => {

        const { file } = files;

        const splitFileName = file.name.split('.');
        const extensionOfTheFile = splitFileName[splitFileName.length - 1];


        if (!validatedExtension.includes(extensionOfTheFile)) {
            return reject(`The extension: ${extensionOfTheFile} is not allowed. These are the available extensions: ${validatedExtension} `);
        }


        const temporalName = uuidv4() + '.' + extensionOfTheFile;
        const uploadPath = path.join(__dirname, '../uploads/', folder, temporalName);

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve(temporalName);
        });
    });

};


module.exports = {
    uploadFile
}