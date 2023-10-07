//REFERENCE OG HTML 
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const textMessage = document.querySelector('#textMessage');
const btnSend = document.querySelector('#btnSend');

const socket_of_a_client = io();

//These are listeners
//on-> the on function is to listen events 

socket_of_a_client.on('connect', () => {
    console.log("I'm a client and I'm connected");
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket_of_a_client.on('disconnect', () => {
    console.log("I'm a client and I'm disconnected");
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

btnSend.addEventListener('click', () => {
    const message = textMessage.value;
    const payload = {
        message,
        id:'123abc',
        date: new Date().getTime()
    }

    socket_of_a_client.emit('send-message', payload);
    
});