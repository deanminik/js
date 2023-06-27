const http = require('http');

//Create a http Server
http.createServer((request, response) => {
    // console.log(request);

    

    response.write('Hello word');
    response.end();

})
    .listen(8080);

console.log('Listening the port', 8080);