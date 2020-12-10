const InputEventService = require("./input_event_service");
const KeyInputService = require("./key_input_service");
const SocketService = require("./input_event_service");
const listenForClient = require("./input_event_service");
const LeapService = require("./leap_service")

require("./input_event_service")

KeyInputService.init();
//InputEventService.init();

setInterval(InputEventService.sendWakeUp, 1500);

/*setInterval(InputEventService.sendLeftSwipe, 1500);
setInterval(InputEventService.sendRightSwipe, 1500);
setInterval(InputEventService.sendUpSwipe, 1500);
setInterval(InputEventService.sendDownSwipe, 1500);*/