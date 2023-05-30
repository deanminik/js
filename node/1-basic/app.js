
const { createFile } = require('./helpers/multiply');
const argv = require('./config/yargs');


console.log(argv);

createFile(argv.b, argv.l)
    .then(fileName => console.log(fileName, 'created successfully'))
    .then(err => console.log(err));



