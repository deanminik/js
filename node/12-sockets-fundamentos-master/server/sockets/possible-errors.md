# Possible errors 

## Undefine callback 

If you get an error like this: 

>/home/linuxlite/Documents/js/js/node/12-sockets-fundamentos-master/server/sockets/socket.js:10
>            return callback({
>                   ^
>
>TypeError: callback is not a function
>    at Socket.<anonymous> (/home/linuxlite/Documents/js/js/node/12-sockets-fundamentos-master/server/sockets/socket.js:10:20)
>    at Socket.emit (node:events:513:28)
>    at /home/linuxlite/Documents/js/js/node/12-sockets-fundamentos-master/node_modules/socket.io/lib/socket.js:531:14
>    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)
>
>Node.js v18.16.0

When your are using this code: 

```
callback(persons)
```

### Solution:

join chat The error is due to leaving the pages open in the browser. When you make the change in socket-chat.js the browser stays with the previous version which did not have the callback function. Now when they edit the socket.js to call the callback and save the changes the node server restarts which causes the active clients in the browser to lose the connection and when the node server starts the clients reconnect but they do not have the callback change, this is why callback arrives as undefined to the server and gives them the error that callback is not a function. Just reload the pages they have open in the browser in chat.html.

Translated with www.DeepL.com/Translator (free version)