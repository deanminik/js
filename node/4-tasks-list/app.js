const { inquireMenu, pause} = require('./helpers/from-inquirer-handle-messages/inquirer.js');

require('colors');

// const { showMenu, pause } = require('./helpers/manually-handle-messages/messages');




console.clear();


const main = async () => {

    let opt = '';

    do {
        opt = await inquireMenu();//await = Hey!! wait here until we get a result(resolve())

        console.log({ opt });

        await pause();

    } while (opt !== '0');// if I press zero, the program finishes immediately

    // pause();

}

main();