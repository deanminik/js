const { Users } = require('../classes/users');
const { io } = require('../server');
const { createMessage } = require('../utils/utilities');


const users = new Users();

io.on('connection', (client) => {

    client.on('joinChat', (data, callback) => {
        console.log(data);
        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: 'The name and room are required'
            });
        }
        client.join(data.room);

        let persons = users.addPerson(client.id, data.name, data.room);
        // console.log(user); //Every time the page is loaded or someone open that windows, you'll see the user on the terminal of the server, not the terminal of the browser 

        client.broadcast.emit('personList', users.getAllPersons());

        callback(persons); //This show me the persons connected to the chat -> browser terminal
        //   console.log( callback ); 
    });
    //This "joinChat" cam from  /12-sockets-fundamentos-master/public/js/socket-chat.js

    client.on('createMessage', (data) => {

        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.emit('createMessage', message);
    });
    client.on('disconnect', () => {
        let deletedPerson = users.deletePerson(client.id);

        // client.broadcast.emit('createMessage',{user: 'Admin', message: `${deletedPerson.name} left the room chat `}); 
        client.broadcast.emit('createMessage', createMessage('Admin', `${deletedPerson.name} left`));
        //broadcast -> to inform all users
        //createMessage -> This is an event, so the idea is that every client is listening this event, so go here /public/js/socket-chat.js
        client.broadcast.emit('personList', users.getAllPersons());
    });

    //Private Messages
    client.on('privateMessage', data => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.para).emit('privateMessage', createMessage(person.name, data.message));
    });

});


