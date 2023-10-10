//REFERENCE HTML 
const lblDesktop = document.querySelector('h1');
const btn = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');


const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('The desktop is mandatory');
}

const desktop = searchParams.get('escritorio');
lblDesktop.innerText = desktop;
// console.log({desktop});

divAlert.style.display = 'none';

const socket = io();



socket.on('connect', () => {

    btn.disabled = false;

});

socket.on('disconnect', () => {
    btn.disabled = true;

});


socket.on('last-ticket', (lastTicket) => {
    // lblNuevoTicket.innerText = 'Ticket ' + lastTicket;
});


btn.addEventListener('click', () => {

    lblTicket
    // socket.emit('attend-ticket', {desktop}, (payload) =>{
    socket.emit('attend-ticket', { desktop }, ({ ok, ticket, msg }) => {
        // console.log(payload);
        if(!ok){
            lblTicket.innerText = 'There is nobody to attend';
            return divAlert.style.display = '';
        }
        lblTicket.innerText = `Ticket ${ticket.number}`;

    });
    // socket.emit('next-ticket', null, (ticket) => {
    //     // console.log('From the server', ticket);
    //     lblNuevoTicket.innerText = ticket;
    // });

});