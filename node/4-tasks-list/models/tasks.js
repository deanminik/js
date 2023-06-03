const { v4: uuidv4 } = require('uuid');
const Task = require('./task.js');

class Tasks {
    _listed = {};

    constructor() {
        this._listed = {};

    }

    createTask(desc = '') {
        const task = new Task(desc);
        this._listed[task.id] = task;
    }

}


module.exports = Tasks;