const { Socket } = require("socket.io");

const socketController = (socket = new Socket) =>{ // = new Socket() -> we are going to help visual code to call the all functions related with socket

console.log('Client connected ', socket.id);

}

module.exports = {
    socketController
}