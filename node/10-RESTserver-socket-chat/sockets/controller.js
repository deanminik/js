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
    io.emit('active-users', chatMessages.usersArray); //active-users -> /public/js/chat.js
    io.emit('receive-message', chatMessages.last10Messages);

    //Clean the user disconnected from the array  
    socket.on('disconnect', () => {
        chatMessages.disconnectUser(user.id);
        io.emit('active-users', chatMessages.usersArray);
    })

    // socket.on('send-message', (payload) =>{
    //     console.log(payload);
    // })
    socket.on('send-message', ({ uid, message }) => {
        chatMessages.sendMessage(user.id, user.name, message);
        //Send the message to all 
        io.emit('receive-message', chatMessages.last10Messages);

    })

}

module.exports = {
    socketController
}