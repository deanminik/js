require('colors');
const { showMenu, pause } = require('./helpers/messages');



console.clear();


const main = async () => {

    let opt = '';

    do {
        opt = await showMenu();//await = Hey!! wait here until we get a result(resolve())

        console.log({ opt });


        if (opt !== '0') await pause();

    } while (opt !== '0');// if I press zero, the program finishes immediately

    // pause();

}

main();