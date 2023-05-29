
const { createFile } = require('./helpers/multiply');
const argv = require('yargs')
                .option('b', {
                    alias: 'base',
                    type:'number',
                    demandOption: true,
                })
                .check((argv, options) => {
                    // console.log('yargs', argv)
                    if(isNaN(argv.b)){
                        throw 'The base must be a number'
                    }
                    return true;
                })
                .argv; 


// const number = 8;
// console.log(process.argv);
// console.log('base: yargs', argv.number);
console.log(argv);

createFile(argv.b)
    .then(fileName => console.log(fileName, 'created successfully'))
    .then(err => console.log(err));



