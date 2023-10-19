const { Socket } = require("socket.io");
const { checkJWT } = require("../helpers");
const { ChatMessages } = require("../models");

const chatMessages = new ChatMessages();

const socketController = async (socket = new Socket, io) => { // = new Socket() -> we are going to help visual code to call the all functions related with socket
    // console.log('Client connected ', socket);
    // console.log('Client connected ', socket.id);

    // console.log('Client connected: ', socket.handshake.headers['x-token']);
    const user = await checkJWT(socket.handshake.headers['x-token']);
    if (!user) {
        return socket.disconnect();
    }
  
    console.log(`The user: ${user.name} has connected`);

    //Add the user connected
    chatMessages.connectUser(user)
    io.emit('active-users', chatMessages.usersArray ); //active-users -> /public/js/chat.js

    //Clean the user disconnected from the array  
    socket.on('disconnect', () =>{
        chatMessages.disconnectUser(user.id);
        io.emit('active-users', chatMessages.usersArray );
    })

}

module.exports = {
    socketController
}