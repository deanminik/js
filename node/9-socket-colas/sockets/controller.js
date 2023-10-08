const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl;

const socketController = (socket) => {
    
    socket.emit('last-ticket', ticketControl.lastTicket); //last-ticket -> name of the event | 

    socket.on('next-ticket', ( payload, callback ) => { //next-ticket -> name of the event 
   
        const next = ticketControl.nextTicket();
        callback(next);
        
        //Notify there is a new ticket to assign 
      

    })

}



module.exports = {
    socketController
}
