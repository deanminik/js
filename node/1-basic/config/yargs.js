const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Is the base of the multiply table'
    })
    .option('l', {
        alias: 'list',
        type: 'boolean',
        demandOption: true,
        default: false,
        describe: 'show the list of the multiplication'

    })
    .option('f', {
        alias: 'fence',
        type: 'number',
        demandOption: true,
        describe: 'Add the limit of this multiplication'

    })
    .check((argv, options) => {
        // console.log('yargs', argv)
        if (isNaN(argv.b)) {
            throw 'The base must be a number'
        }
        return true;
    })
    .argv;


module.exports = argv;