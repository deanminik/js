
const { createFile } = require('./helpers/multiply');

const number = r;

createFile(number)
    .then(fileName => console.log(fileName, 'created successfully'))
    .then(err => console.log(err));

