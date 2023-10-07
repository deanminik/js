

const socketController = (socket) => {
    console.log('Client connected', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });

    //->Server is hearing clients
    socket.on('send-message', (payload, callback) => {

        const id = 123456;
        callback(id);

        //socket.emit('send-message', payload);  // -> send an event to same client 
        socket.broadcast.emit('send-message', payload); // -> broadcast send a message to every body 


    });

};

module.exports = {
    socketController
}