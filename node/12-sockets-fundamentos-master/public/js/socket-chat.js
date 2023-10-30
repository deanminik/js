var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {

    window.location = 'index.html';
    throw new Error('The name and room are necessary');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function () {
    console.log('Connected to the server');

    socket.emit('joinChat', user, function(resp){
        console.log('Users, connected: ', resp);
        renderUsers(resp);

    }); //This "emit('joinChat'" emits the message, and the server will know who I am 
    // We'll use this "joinChat" here /12-sockets-fundamentos-master/server/sockets/socket.js

});

// listen
socket.on('disconnect', function () {

    console.log('Lost connection to the server');

});


// Send information
// socket.emit('createMessage', {
//     user: 'Fernando',
//     message: 'Hello World'
// }, function (resp) {
//     console.log('server response: ', resp);
// });

// Listen for information
socket.on('createMessage', function (message) {

    console.log('Server:', message);

});

//Listen when an user join or left the chat 
socket.on('personList', function (persons) {

    console.log('Server:', persons);
    renderUsers(resp);

});

//Private messages
socket.on('privateMessage', function(message){
   console.log('Private message: ', message);
});


// emit = diffusion
// on = listen