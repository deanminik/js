const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl;

const socketController = (socket) => {
    //Remember these events will activate when a client connects
    socket.emit('last-ticket', ticketControl.lastTicket); //last-ticket -> name of the event | 
    socket.emit('current-state', ticketControl.lastFourTickets);
    socket.emit('pending-tickets', ticketControl.pendingTickets.length);

    socket.on('next-ticket', (payload, callback) => { //next-ticket -> name of the event 

        const next = ticketControl.nextTicket();
        callback(next);
        socket.broadcast.emit('pending-tickets', ticketControl.pendingTickets.length);



    });

    socket.on('attend-ticket', ({ desktop }, callback) => {
        // console.log(payload);
        if (!desktop) {
            return callback({
                ok: false,
                msg: 'The desktop is mandatory'
            });
        }
        //What is the ticket to attend?
        const ticket = ticketControl.attendTicket(desktop);

        //Notify changes in the last 4 tickets 
        // socket.emit('current-state', ticketControl.lastFourTickets); //This only affect one layout 
        socket.broadcast.emit('current-state', ticketControl.lastFourTickets);//affect all layout
        socket.emit('pending-tickets', ticketControl.pendingTickets.length);
        socket.broadcast.emit('pending-tickets', ticketControl.pendingTickets.length);

        if (!ticket) {
            callback({
                ok: false,
                mgs: 'There are not pending tickets'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    });


}



module.exports = {
    socketController
}

