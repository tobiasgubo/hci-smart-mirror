const InputEventService = require("./input_event_service");
const SocketService = require("./input_event_service");
const listenForClient = require("./input_event_service")

require("./input_event_service")

InputEventService.init();

setTimeout(InputEventService.sendWakeUp, 1500);