const fs = require('node:fs');

const createFile = async (number = 5, list = false) => {
    try {
        let exit = '';
        for (let index = 1; index <= 10; index++) {
            result = index * number;
            exit += `${number} x ${index} = ${result} \n`;
        }
        if (list) {
            console.log(exit);
        }

        fs.writeFileSync(`table-${number}.txt`, exit);

        return `table-${number}.txt`;
    } catch (err) {
        throw err;
    }

};

module.exports = { createFile };// The only way in node.js if you want to import this function in another file