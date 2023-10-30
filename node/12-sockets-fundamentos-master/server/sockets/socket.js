const { Users } = require('../classes/users');
const { io } = require('../server');
const { createMessage } = require('../utils/utilities');


const users = new Users();

io.on('connection', (client) => {

    client.on('joinChat', (data, callback) => {
        // console.log(data);
        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: 'The name and room are required'
            });
        }
        client.join(data.room);

        users.addPerson(client.id, data.name, data.room);
        // console.log(user); //Every time the page is loaded or someone open that windows, you'll see the user on the terminal of the server, not the terminal of the browser 

        // client.broadcast.emit('personList', users.getAllPersons()); //-> This is emitting messages to everybody globally 

        client.broadcast.to(data.room).emit('personList', users.getPersonsByRoom(data.room)); //-> This is emitting messages to everybody globally 
        client.broadcast.to(data.room).emit('createMessage', createMessage('Admin', `${data.name} joined`));
        callback(users.getPersonsByRoom(data.room)); //This show me the persons connected to the chat -> browser terminal
        //   console.log( callback ); 
    });
    //This "joinChat" cam from  /12-sockets-fundamentos-master/public/js/socket-chat.js

    client.on('createMessage', (data, callback) => {

        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.room).emit('createMessage', message);
        callback(message);
    });
    client.on('disconnect', () => {
        let deletedPerson = users.deletePerson(client.id);

        // client.broadcast.emit('createMessage',{user: 'Admin', message: `${deletedPerson.name} left the room chat `}); 
        client.broadcast.to(deletedPerson.room).emit('createMessage', createMessage('Admin', `${deletedPerson.name} left`));
        //broadcast -> to inform all users
        //createMessage -> This is an event, so the idea is that every client is listening this event, so go here /public/js/socket-chat.js
        client.broadcast.to(deletedPerson.room).emit('personList', users.getPersonsByRoom(deletedPerson.room));
    });

    //Private Messages
    client.on('privateMessage', data => {
        let person = users.getPerson(client.id);
        client.broadcast.to(data.para).emit('privateMessage', createMessage(person.name, data.message));
    });

});


