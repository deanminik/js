const fs = require('node:fs');//FILE SYSTEM 

const file = './db/data.json';

const saveDB = (data) => {

    fs.writeFileSync(file, JSON.stringify(data)); //JSON.stringify -> convert JSON to string value
}

const readDB = () => {
    if (!fs.existsSync(file)) {
        return null;
    }
    const info = fs.readFileSync(file, { encoding: 'utf-8' });
    // console.log(info);
    const data = JSON.parse(info);// JSON.parse converts JSON content into object instead string 
    // console.log(data);

    // return null;
    return data;
}

module.exports = {
    saveDB,
    readDB
};