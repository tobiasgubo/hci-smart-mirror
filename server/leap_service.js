//require('../lib/node-entry');
const Leap = require("leapjs");
const SwipeObject = require('./swipe_Object');

console.log("start");

let onWakeUpFunc;
let onSwipeLeftFunc;
let onSwipeRightFunc;
let onSwipeUpFunc;
let onSwipeDownFunc;

let currentHand = null;
let lastHand = null;

let DETECTION_MIN_THRESHOLD = 20;
let DETECTION_MAX_THRESHOLD = 100;
let REFRESHRATE = 250;
let TIME_THRESHOLD = 2000;
let GESTURE_DISTANCE = 130;

let gestureArray = [];
let seperatedGestures = [];

let controller = new Leap.Controller({enableGestures: true});

//controller.use('screenPosition');

controller.on('frame', function(frame){
    if (frame.valid && frame.hands.length > 0) {
        currentHand = frame.hands[0];
    }
});

setInterval(function () {
    if (currentHand != null && lastHand != null) {
        addGesture();
        detectGestureWithFixedDistance();
    }
    lastHand = currentHand;
}, REFRESHRATE);

function addGesture() {
    let detectedGesture = new SwipeObject(lastHand.palmPosition, currentHand.palmPosition);
    if (detectedGesture.velocity > DETECTION_MIN_THRESHOLD && detectedGesture.velocity < DETECTION_MAX_THRESHOLD) {
        gestureArray.push(detectedGesture);
    } else {
        console.log("swipe not in threshold")
    }
}

function differenciateGestures(gestureArray) {
    if (gestureArray.length > 0) {
        let currentSwipe = gestureArray[0];
        seperatedGestures.push(currentSwipe);
        gestureArray.splice(0,1);
        for (let i = 0 ; i < gestureArray.length; i++){
            let deltaTime = gestureArray[i].time - currentSwipe.time;
            if (gestureArray[i].dir == currentSwipe.dir){
                if (deltaTime > TIME_THRESHOLD){
                    currentSwipe = gestureArray[i];
                    seperatedGestures.push(currentSwipe);
                }
            }else {
                currentSwipe = gestureArray[i];
                seperatedGestures.push(currentSwipe);
            }
            gestureArray.splice(i,1);
        }
    }
}

const DIRECTION = 0;
function detectGestureWithFixedDistance() {
    console.log("gestures: " + gestureArray.length);
    if (gestureArray.length > 0) {
        let totalDistance = 0;
        for (let i = 0; i < gestureArray.length; i++) {
            totalDistance = totalDistance + gestureArray[i].directionVector[DIRECTION];
            console.log("total distance: " + totalDistance);
            if (Math.abs(totalDistance) > GESTURE_DISTANCE) {
                if (totalDistance > 0) {
                    console.log("left swipe");
                    onSwipeLeftFunc();
                } else {
                    console.log("right swipe");
                    onSwipeRightFunc();
                }
                if (i >= 0) {
                    gestureArray.splice(0, i);
                    console.log(gestureArray.length)
                }
            }
        }
    }
}

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
