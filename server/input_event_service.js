const clients = [];

function init(server, port) {
    var io = require('socket.io')(server, { cors: { origin: '*' } });

    console.log("listening for raspy on port " + port)
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
    clients.forEach((client, index) => {
        if (client.id === clientId) {
            clients.splice(index, 1);
        }
    });
}

function sendInputEventToAllClients(event) {
    clients.forEach(client => {
        client.emit("input-event", event);
        console.log("emited event: " + event + " to client: " + client.id);
    });
}

function sendWakeUp() {
    sendInputEventToAllClients("wake-up");
}

function sendLeftSwipe() {
    sendInputEventToAllClients("left-swipe");
}

function sendRightSwipe() {
    sendInputEventToAllClients("right-swipe");
}

function sendUpSwipe() {
    sendInputEventToAllClients("up-swipe");
}

function sendDownSwipe() {
    sendInputEventToAllClients("down-swipe");
}

const InputEventService = {
    init,
    sendWakeUp,
    sendLeftSwipe,
    sendRightSwipe,
    sendUpSwipe,
    sendDownSwipe,
};

module.exports = InputEventService;