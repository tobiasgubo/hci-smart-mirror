require('../lib/node-entry');
const SwipeObject = require('./swipe_Object');

console.log("start");

let onWakeUpFunc;
let onSwipeLeftFunc;
let onSwipeRightFunc;
let onSwipeUpFunc;
let onSwipeDownFunc;

let currentHand = null;
let lastHand = null;

let DETECTION_THRESHOLD = 500;
let REFRESHRATE = 500;
let gestureArray = [];

const controllerGestures = Leap.loop({enableGestures: true}, function (frame) {
    if (frame.valid && frame.hands.length > 0) {
        currentHand = frame.hands[0];
    } else {
        currentHand = null;
    }
    /*
    console.log(frame.gestures);
    if(frame.valid && frame.gestures && frame.gestures.length > 0) {
        frame.gestures.forEach(gesture => detect_direction(gesture));
    }
    */
});

setInterval(function () {
    if (currentHand != null && lastHand != null) {
        detectGestureDirection();
        addGesture();
    }
    lastHand = currentHand;
}, REFRESHRATE);

function addGesture() {
    let detectedGesture = new SwipeObject(lastHand, currentHand);
    if (detectedGesture.velocity > DETECTION_THRESHOLD) {
        gestureArray.push(detectedGesture);
    }
}

function detectGestureDirection() {
    console.log(currentHand.palmPosition);
    console.log(lastHand.palmPosition);
    let direction = [0, 0, 0];
    for (let i = 0; i < currentHand.palmPosition.length; i++) {
        direction[i] = currentHand.palmPosition[i] - lastHand.palmPosition[i];
    }
    detectSwipeDirection(direction);
}

function detectSwipeDirection(vector) {
    if (vector[0] > 0) {
        if (onSwipeRightFunc) {
            onSwipeRightFunc();
            console.log("right Swipe");
        }
    } else {
        if (onSwipeLeftFunc) {
            onSwipeLeftFunc();
            console.log("left Swipe");
        }
    }
}

let controller = new Leap.Controller({enableGestures: true});
/*
controller.on('gesture', function (gesture) {
    console.log(gesture);
    if(gesture.type === 'swipe'){
        detect_direction(gesture);
    }
});
*/


/*
var controller = new Leap.Controller()
controller.on("frame", function(frame) {
  console.log("Frame: " + frame.id + " @ " + frame.timestamp);
});
 */

controller.on('ready', function () {
    console.log("ready");
});
controller.on('connect', function () {
    console.log("connect");
});
controller.on('disconnect', function () {
    console.log("disconnect");
});
controller.on('focus', function () {
    console.log("focus");
});
controller.on('blur', function () {
    console.log("blur");
});
controller.on('deviceConnected', function () {
    console.log("deviceConnected");
});
controller.on('deviceDisconnected', function () {
    console.log("deviceDisconnected");
});

controller.connect();
console.log("\nWaiting for device to connect...");

function on(onWakeUp, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown) {
    onWakeUpFunc = onWakeUp;
    onSwipeLeftFunc = onSwipeLeft;
    onSwipeRightFunc = onSwipeRight;
    onSwipeUpFunc = onSwipeUp;
    onSwipeDownFunc = onSwipeDown;
}

const LeapService = {
    on,
};

module.exports = LeapService;


if (process.env.HTTP_EVENT_TRIGGERS = 1) {
    const DEBUG_EVENT_TRIGGER_PORT = 3100;
    console.log('http event triggers enabled, port:' + DEBUG_EVENT_TRIGGER_PORT);
    const express = require('express')
    const app = express();
    app.listen(DEBUG_EVENT_TRIGGER_PORT);
    app.get('/', (_, res) => res.sendFile(__dirname + '/public/debug_http_trigger_form.html'))
    app.get('/w', (_, res) => {
        onWakeUpFunc();
        return res.sendFile(__dirname + '/public/debug_http_trigger_form.html')
    })
    app.get('/l', (_, res) => {
        onSwipeLeftFunc();
        return res.sendFile(__dirname + '/public/debug_http_trigger_form.html')
    })
    app.get('/r', (_, res) => {
        onSwipeRightFunc();
        return res.sendFile(__dirname + '/public/debug_http_trigger_form.html')
    })
    app.get('/u', (_, res) => {
        onSwipeUpFunc();
        return res.sendFile(__dirname + '/public/debug_http_trigger_form.html')
    })
    app.get('/d', (_, res) => {
        onSwipeDownFunc();
        return res.sendFile(__dirname + '/public/debug_http_trigger_form.html')
    })
}
