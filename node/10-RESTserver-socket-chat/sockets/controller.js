const { Socket } = require("socket.io");
const { checkJWT } = require("../helpers");

const socketController = async (socket = new Socket) => { // = new Socket() -> we are going to help visual code to call the all functions related with socket
    // console.log('Client connected ', socket);
    // console.log('Client connected ', socket.id);

    // console.log('Client connected: ', socket.handshake.headers['x-token']);
    const user = await checkJWT(socket.handshake.headers['x-token']);
    if (!user) {
        return socket.disconnect();
    }

    console.log(`The user: ${user.name} has connected`);

}

module.exports = {
    socketController
}