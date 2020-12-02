const io = require('socket.io')();

const PORT = 3000;

const clients = [];

const SocketService = {
    listenForClient: function () {
        console.log("listening for raspy on port " + PORT)
        io.on('connection', client => { 
            console.log("new connection: " + client);

            clients.apppend(client);

            socket.on('disconnect', () => {
                console('client disconnected: ' + client);
              });
         });
        io.listen(PORT);
    },

    sendWakeUp: function () {

    }
};

module.exports = SocketService;