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

    createTask(desc = '') {
        const task = new Task(desc);
        this._listed[task.id] = task;
    }

}


module.exports = Tasks;