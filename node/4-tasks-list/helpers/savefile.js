const fs = require('node:fs');//FILE SYSTEM

const saveDB = (data) => {
    const file = './db/data.json';
    fs.writeFileSync(file, JSON.stringify(data)); //JSON.stringify -> convert JSON to string value
}

module.exports = saveDB;