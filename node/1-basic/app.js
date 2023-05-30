
const { createFile } = require('./helpers/multiply');
const argv = require('./config/yargs');
const colors = require('colors');


console.log(argv);

createFile(argv.b, argv.l, argv.f)
    .then(fileName => console.log(fileName.rainbow, 'created successfully'))
    .then(err => console.log(err));



// Open the terminal and this example
// node app -b 77 -l -f 15

