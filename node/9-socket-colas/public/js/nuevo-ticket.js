
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCreate = document.querySelector('button');

const socket = io();



socket.on('connect', () => {

    btnCreate.disabled = false;

});

socket.on('disconnect', () => {
    btnCreate.disabled = true;

});


socket.on('last-ticket', (lastTicket) => {
    lblNuevoTicket.innerText = 'Ticket ' + lastTicket;
});


btnCreate.addEventListener('click', () => {

    socket.emit('next-ticket', null, (ticket) => {
        // console.log('From the server', ticket);
        lblNuevoTicket.innerText = ticket;
    });

});