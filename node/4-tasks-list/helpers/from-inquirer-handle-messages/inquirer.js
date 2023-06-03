const inquirer = require('inquirer');



require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [{
            value: '1',
            name: '1. Create task'
        }, {
            value: '2',
            name: '2. List tasks'
        }, {
            value: '3',
            name: '3. Completed tasks'
        }, {
            value: '4',
            name: '4. Pending tasks'
        }, {
            value: '5',
            name: '5. Complete task(s)'
        }, {
            value: '6',
            name: '6. Delete task'
        }, {
            value: '0',
            name: '0. Exit'
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

module.exports = { inquireMenu, pause }