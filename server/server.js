const InputEventService = require("./input_event_service");
const KeyInputService = require("./key_input_service");
const SocketService = require("./input_event_service");
const listenForClient = require("./input_event_service");
const express = require('express');
const LeapService = require("./leap_service")

require("./input_event_service")

const PORT = 3000;
const app = express();
const server = app.listen(PORT);

app.use(express.static(__dirname + '/public/'));
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));


//KeyInputService.init();
//InputEventService.init(server, PORT);

//setInterval(InputEventService.sendWakeUp, 1500);

/*setInterval(InputEventService.sendLeftSwipe, 1500);
setInterval(InputEventService.sendRightSwipe, 1500);
setInterval(InputEventService.sendUpSwipe, 1500);
setInterval(InputEventService.sendDownSwipe, 1500);*/