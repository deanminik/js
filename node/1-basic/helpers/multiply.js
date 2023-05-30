const fs = require('node:fs');
const colors = require('colors');

const createFile = async (number = 5, list = false, boundary) => {
    try {
        let exitConsole, exitTXT = '';
        for (let index = 1; index <= boundary; index++) {
            result = index * number;
            exitConsole += `${colors.green(number)} ${colors.bgMagenta('x')} ${index} = ${result} \n`;
            exitTXT += `${number} x ${index} = ${result} \n`;
        }
        if (list) {
            console.log(exitConsole);
        }

        fs.writeFileSync(`./exit/table-${number}.txt`, exitTXT);

        return `table-${number}.txt`;
    } catch (err) {
        throw err;
    }

};

module.exports = { createFile };// The only way in node.js if you want to import this function in another file