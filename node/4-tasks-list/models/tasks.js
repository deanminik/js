const { v4: uuidv4 } = require('uuid');
const Task = require('./task.js');

class Tasks {
    _listed = {};

    get listedArr() {
        const listed = [];
        //Object.keys returns an array of keys from my array; 
        Object.keys(this._listed).forEach(key => {// loop my key's array with forEach
            // console.log(key);// output-> f76e3532-4143-421e-8ba5-2c293f13ebe9
            const task = this._listed[key];
            // console.log(task);
            listed.push(task);
        });
        return listed;
    }
    constructor() {
        this._listed = {};

    }

    loadTasksFromArray(tasks = []) {
        // console.log((typeof tasks));
        // console.log(tasks);
        if (!Array.isArray(tasks)) {
            throw new Error(`Tasks must be an array.`);
        }

        tasks.forEach(task => {
            this._listed[task.id] = task;
        });
    }

    createTask(desc = '') {
        const task = new Task(desc);
        this._listed[task.id] = task;
    }

    completedList() {
        //Example:
        //1: In green
        //Completed: green
        //Pending: red

        //1. Name of the task :: Complete | Pending 
        this.listedArr.forEach((task, index) => {
            const idx = `${index + 1}`.green;
            // console.log(idx);

            const { desc, completedIn } = task;
            const state = (completedIn) ? 'Completed'.green : 'Pending'.red;

            console.log(`${idx} ${desc} :: ${state}`);


        });
    }


    listPendingCompleted(completed = true) {
        let counter = 0;
        this.listedArr.forEach((task) => {

            const { desc, completedIn } = task;
            const state = (completedIn) ? completedIn.green : 'Pending'.red;
            if (completed) {
                if (completedIn) {
                    counter += 1;
                    console.log(`${counter.toString().green}. ${desc} :: ${state}`);
                }
            } else {
                if (!completedIn) {
                    counter += 1;
                    console.log(`${counter.toString().green}. ${desc} :: ${state}`);
                }
            }
        });
    }

    deleteTask(id = '') {
        if (this._listed[id]) {
            delete this._listed[id];
        }
    }
    toggleCompleted(ids = []) {
        ids.forEach(id => {
            const task = this._listed[id];
            if (!task.completedIn) {
                task.completedIn = new Date().toISOString();
            }
        });

        this.listedArr.forEach(task => {
            if (!ids.includes(task.id)) {
                this._listed[task.id];
                task.completedIn = null
            }
        });
    }
}


module.exports = Tasks;