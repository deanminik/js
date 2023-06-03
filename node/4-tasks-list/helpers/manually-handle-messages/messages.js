const { resolve } = require('path');
require('colors');

/**
 * Displays a menu with options and prompts the user to select an option.
 * Returns a promise that resolves with the selected option.
 */
const showMenu = () => {
  return new Promise(resolve => {
    console.clear();
    console.log('========================'.green);
    console.log('====Select an option===='.green);
    console.log('========================\n'.green);

    console.log(`${'1'.green}. Create a task`);
    console.log(`${'2'.green}. Listing tasks`);
    console.log(`${'3'.green}. Completed tasks`);
    console.log(`${'4'.green}. Pending tasks`);
    console.log(`${'5'.green}. Complete task(s)`);
    console.log(`${'6'.green}. Delete task`);
    console.log(`${'0'.green}. Exit \n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question('Select an option: ', (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

/**
 * Pauses the execution and waits for the user to press the ENTER key.
 * Returns a promise that resolves when the user presses ENTER.
 */
const pause = () => {
  return new Promise(resolve => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(`\nPress ${'ENTER'.green} to continue\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

// Exporting the functions as an object
module.exports = {
  showMenu,
  pause
};
