
const myURL = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8079/api/auth/'
    : '<domain/api/auth/>'


let user = null;
let socket = null;

//REFERENCES 
const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessages = document.querySelector('#ulMessages');
const btnExit = document.querySelector('#btnExit');

//validate the token from the local storage 
const validateJWT = async () => {

    const token = localStorage.getItem('token') || '';

    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('There is not token in the server');
    }

    const resp = await fetch(myURL, {
        headers: { 'x-token': token }
    });

    const { user: userDB, token: tokenDB } = await resp.json();
    console.log(userDB, tokenDB);

    localStorage.setItem('token', tokenDB); //-> this is if you want renovate the token, for example extending its time 
    user = userDB;
    document.title = user.name;

    await connectSocket();


};

const connectSocket = async () => {

    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Sockets online');
    });

    socket.on('disconnect', () => {
        console.log('Sockets offline');
    });

    // socket.on('receive-message', (payload) => {
    //     //TODO:
    //     console.log(payload)

    // });
    socket.on('receive-message', printMessages); // Doing in this way is the same when we are adding "payload" as an argument

    // socket.on('active-users', (payload) => {
    //     //TODO: 
    //     console.log(payload); //Payload -> List of users connected   
    // });
    socket.on('active-users', printUsers);

    socket.on('receive-private-message', () => {
        //TODO:

    });
}

const printUsers = (users = []) => {
    let usersHTML = '';
    users.forEach(({ name, uid }) => {

        usersHTML += `
        <li>
            <p>
                <h5 class="text-success">${name}</h5>
                <span class="fs-6 text-muted">${uid}</span>
            </p>
        </li>
        `;
    });

    ulUsers.innerHTML = usersHTML;

}


const printMessages = (messages = []) => {
    let messagesHTML = '';
    messages.forEach(({ name, message }) => {

        messagesHTML += `
        <li>
            <p>
                <span class="text-primary">${name}:</span>
                <span>${message}</span>
            </p>
        </li>
        `;
    });

    ulMessages.innerHTML = messagesHTML;

}

txtMessage.addEventListener('keyup', ({ keyCode }) => {
    const message = txtMessage.value;
    const uid = txtUid;

    if (keyCode !== 13) { return; }
    if (message.length === 0) { return; }

    socket.emit('send-message', { message, uid });

    txtMessage.value = '';


})

const main = async () => {


    await validateJWT();

}

main();

//Add the instance of the io 
// const socket = io();