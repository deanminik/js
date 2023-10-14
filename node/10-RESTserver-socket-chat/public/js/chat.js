
const myURL = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8079/api/auth/'
    : '<domain/api/auth/>'


let user = null;
let socket = null;

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

    const socket = io({
        'extraHeaders':{
            'x-token': localStorage.getItem('token')
        }
    });
}

const main = async () => {


    await validateJWT();

}

main();

//Add the instance of the io 
// const socket = io();