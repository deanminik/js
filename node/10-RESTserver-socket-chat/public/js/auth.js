const myForm = document.querySelector('form');

const myURL = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8079/api/auth/'
    : '<domain/api/auth/>'


myForm.addEventListener('submit', e => {
    e.preventDefault();//-> Avoid to make a refresh of the browser
    const formData = {};//This will be the info to send to our backend

    for (let element of myForm.elements) {//-> Read every element of the form in index.html
        if (element.name.length > 0) {// -> Ignore the button, because this doesn't have the property name 
            formData[element.name] = element.value;
        }
    }
    // console.log(formData); 
    //Send id to our backend
    fetch(myURL + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),//Serialize into JSON  
        headers: { 'Content-Type': 'application/json' }//To indicate our backend this is a JSON
    })
        .then(resp => resp.json())
        .then(data => {
            // console.log(data);
            if (data.msg) {
                return console.error(data.msg);
            }
            localStorage.setItem('token', data.token);
        })
        .catch(err => {
            console.log(err);
        })
});

function handleCredentialResponse(response) {

    //    const responsePayload = decodeJwtResponse(response.credential);

    //    console.log("ID: " + responsePayload.sub);
    //    console.log('Full Name: ' + responsePayload.name);
    //    console.log('Given Name: ' + responsePayload.given_name);
    //    console.log('Family Name: ' + responsePayload.family_name);
    //    console.log("Image URL: " + responsePayload.picture);
    //    console.log("Email: " + responsePayload.email);

    //google token :ID:token
    // console.log('id_token', response.credential);

    const body = { id_token: response.credential };//this "response.credential" came from google

    fetch(myURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)// The body has to be serialized, so we use stringify()
    })
        .then(resp => resp.json())
        .then(resp => {
            //console.log(resp);//This is the response from our backend
            console.log(resp.token);//This is the response from our backend
            localStorage.setItem('email', resp.user.email);
            localStorage.setItem('token', resp.token);
        })
        .catch(console.warn);
}

const button = document.getElementById('google_signout');
button.onclick = () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem('email'), trigger_this_callback_done => {
        localStorage.clear();
        location.reload();
    });


}