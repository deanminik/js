const {
    inquireMenu,
    pause,
    readInput,
    listedTaskDelete,
    confirm,
    showListedCheckList
} = require('./helpers/inquirer.js');


const main = async () => {
    let opt;

    do {
        opt = await inquireMenu();
        console.log({opt});

        await pause();

    } while (opt !== 0);
}

main();