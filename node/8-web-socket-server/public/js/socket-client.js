//REFERENCE OG HTML 
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const socket_of_a_client = io();

//These are listeners
socket_of_a_client.on('connect',() =>{
     console.log("I'm a client and I'm connected");
     lblOffline.style.display = 'none';
     lblOnline.style.display = '';
});

socket_of_a_client.on('disconnect',() =>{
console.log("I'm a client and I'm disconnected");
lblOnline.style.display = 'none';
lblOffline.style.display = '';
});