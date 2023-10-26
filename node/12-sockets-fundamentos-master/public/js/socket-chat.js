var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name')) {

    window.location = 'index.html';
    throw new Error('The name is necessary');
}

var user = {
    name: params.get('name')
}

socket.on('connect', function () {
    console.log('Connected to the server');

    socket.emit('joinChat', user, function(resp){
        console.log('Users, connected: ', resp);

    }); //This "emit('joinChat'" emits the message, and the server will know who I am 
    // We'll use this "joinChat" here /12-sockets-fundamentos-master/server/sockets/socket.js

});

// listen
socket.on('disconnect', function () {

    console.log('Lost connection to the server');

});


// Send information
socket.emit('sendMessage', {
    user: 'Fernando',
    message: 'Hello World'
}, function (resp) {
    console.log('server response: ', resp);
});

// Listen for information
socket.on('sendMessage', function (message) {

    console.log('Server:', message);

});