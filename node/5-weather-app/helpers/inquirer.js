const inquirer = require('inquirer');



require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [{
            value: 1,
            name: `${'1'.green}. Search City`
        }, {
            value: 2,
            name: `${'2'.green}. History`
        }, {
            value: 0,
            name: `${'0'.green}. Exit`
        }

        ]
    }
]
const inquireMenu = async () => {

    console.log('========================'.green);
    console.log('====Select an option===='.green);
    console.log('========================\n'.green);

    const { option } = await inquirer.prompt(questions);

    return option;
}

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'enter'.green} to continue`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question); // with the "await" the console wait till the user press the enter

}

const readInput = async (message_from_user) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message: message_from_user,
        validate(value) {
            if (value.length === 0) {
                return 'Please type a value';
            }
            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listPlaces = async (places = []) => {
    // {example
    //     value: task.id
    //     name: `${'2'.green}. List tasks`
    // }
    const choices = places.map((place, index) => {//Map->  loop every element and I can do anything with the value, and return a new array with the changes of every element
        const idx = `${index + 1}`.green;

        return {
            // msg: 'hello' 
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });
    // console.log(choices);
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select the place',
            choices

        }]
    const { id } = await inquirer.prompt(questions);

    return id;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const showListedCheckList = async (tasks = []) => {

    const choices = tasks.map((task, index) => {
        const idx = `${index + 1}`.green;

        return {

            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completedIn) ? true : false
        }
    });



    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices

        }]
    const { ids } = await inquirer.prompt(question);

    return ids;
}
module.exports = {
    inquireMenu,
    pause,
    readInput,
    listPlaces,
    confirm,
    showListedCheckList
}