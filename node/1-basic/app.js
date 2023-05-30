
const { createFile } = require('./helpers/multiply');
const argv = require('./config/yargs');
const colors = require('colors');


console.log(argv);

createFile(argv.b, argv.l, argv.f)
    .then(fileName => console.log(fileName.rainbow, 'created successfully'))
    .then(err => console.log(err));



