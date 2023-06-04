const { v4: uuidv4 } = require('uuid');

class Task {
    id = '';
    desc = '';
    completedIn = null;

    constructor(desc) {

        this.id = uuidv4();// output-> f76e3532-4143-421e-8ba5-2c293f13ebe9 unique identification npm 
        this.desc = desc;
        this.completedIn = null;

    }

}


module.exports = Task;