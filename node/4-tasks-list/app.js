const {
    inquireMenu,
    pause,
    readInput
} = require('./helpers/from-inquirer-handle-messages/inquirer.js');

const Task = require('./models/task.js');
const Tasks = require('./models/tasks.js');

const saveDB = require('./helpers/savefile.js');

require('colors');

// const { showMenu, pause } = require('./helpers/manually-handle-messages/messages');

console.clear();


const main = async () => {

    let opt = '';
    const tasks = new Tasks();
    // console.log(tasks);
    do {
        opt = await inquireMenu();//await = Hey!! wait here until we get a result(resolve())

        // console.log({ opt });
        // const tasks = new Tasks();
        // console.log(tasks);
        // const task = new Task('Buy food');
        // console.log(task);

        switch (opt) {
            case '1':
                const desc = await readInput('Description: ');
                // console.log(desc);
                tasks.createTask(desc);
                break;
            case '2':
                // console.log(tasks._listed);
                console.log(tasks.listedArr);
                break;

            default:
                break;
        }

        saveDB(tasks);


        await pause();

    } while (opt !== '0');// if I press zero, the program finishes immediately

    // pause();

}

main();