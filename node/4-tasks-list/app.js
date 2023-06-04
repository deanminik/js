const {
    inquireMenu,
    pause,
    readInput,
    listedTaskDelete
} = require('./helpers/from-inquirer-handle-messages/inquirer.js');

const { saveDB, readDB } = require('./helpers/savefile.js');
//CLASSES 
const Task = require('./models/task.js');
const Tasks = require('./models/tasks.js');



require('colors');

// const { showMenu, pause } = require('./helpers/manually-handle-messages/messages');

console.clear();


const main = async () => {

    let opt = '';
    const tasks = new Tasks();
    // console.log(tasks);

    const tasksDB = readDB();

    if (tasksDB) {//load tasks
        tasks.loadTasksFromArray(tasksDB);
    }


    // await pause();

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
                // console.log(tasks.listedArr);
                tasks.completedList();
                break;
            case '3':

                tasks.listPendingCompleted(true);
                break;
            case '4':

                tasks.listPendingCompleted(false);
                break;
            case '6':

                const id = await listedTaskDelete(tasks.listedArr);
                console.log({ id });
                break;
            default:
                break;
        }

        saveDB(tasks.listedArr);


        await pause();

    } while (opt !== '0');// if I press zero, the program finishes immediately

    // pause();

}

main();