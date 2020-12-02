const express = require('express');

const PORT = 3000;
const app = express();
const server = app.listen(PORT);
var io = require('socket.io')(server, { cors: { origin: '*' } });

const clients = [];

function init() {
    console.log("listening for raspy on port " + PORT)
        io.on('connection', client => { 
            console.log("new connection: " + client.id);

            clients.push(client);

            client.on('disconnect', () => {
                console.log('client disconnected: ' + client.id);
                removeClient(client.id);
              });
         });
}

function removeClient(clientId) {

}

function sendInputEventToAllClients(event) {
    clients.forEach(client => {
        client.emit(event);
    });
}

function sendWakeUp() {
    sendInputEventToAllClients("wake-up");
}

const InputEventService = {
    init,
    sendWakeUp,
};

module.exports = InputEventService;