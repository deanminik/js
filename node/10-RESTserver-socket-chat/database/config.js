const mongoose = require('mongoose');


const dbConnection = async () => {
    try {
        // await -> to indicate wait till the connection is ready | this is possibly with Promises -> connect() is a promise
        await mongoose.connect(process.env.MONGO_CNN);
        
        console.log('DataBase Online :) ');


    } catch (error) {
        console.log(error);


        // new Error, handle the errors process 
        throw new Error('Error while initializing the database ');
    }

}


//We export by names, because maybe in the future can have more than one connection 
module.exports = {
    dbConnection
}