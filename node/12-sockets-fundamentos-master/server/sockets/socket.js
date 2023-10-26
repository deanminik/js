const { Users } = require('../classes/users');
const { io } = require('../server');

const users = new Users();

io.on('connection', (client) => {

    client.on('joinChat', (data, callback) => {
        if (!data.name) {
            return callback({
                error: true,
                message: 'The name ir required'
            });
        }
        let persons = users.addPerson(client.id, data.name);
        // console.log(user); //Every time the page is loaded or someone open that windows, you'll see the user on the terminal of the server, not the terminal of the browser 

          callback(persons); //This show me the persons connected to the chat -> browser terminal
        //   console.log( callback ); 
    });
    //This "joinChat" cam from  /12-sockets-fundamentos-master/public/js/socket-chat.js


});


