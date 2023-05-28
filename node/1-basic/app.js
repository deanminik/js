const fs = require('node:fs');

const number = 5;
let exit = '';
for (let index = 1; index <= 10; index++) {
    result = index * number;
    exit += `${number} x ${index} = ${result} \n`;
}

fs.writeFile('table-5.txt', exit, (err) => {
    if (err) throw err;

    console.log('file created');
});