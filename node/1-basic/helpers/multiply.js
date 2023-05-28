const fs = require('node:fs');

const createFile = (number = 5) => {

    return new Promise((resolve, reject) => {
        let exit = '';
        for (let index = 1; index <= 10; index++) {
            result = index * number;
            exit += `${number} x ${index} = ${result} \n`;
        }
        fs.writeFileSync(`table-${number}.txt`, exit);

        resolve(`table-${number}.txt`);

    });
};



module.exports = { createFile };// The only way in node.js if you want to import this function in another file