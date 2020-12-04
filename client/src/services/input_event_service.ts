import { io } from 'socket.io-client';

let onWakeUpFunc: Function;
let onSwipeLeftFunc: Function;
let onSwipeRightFunc: Function;
let onSwipeUpFunc: Function;
let onSwipeDownFunc: Function;

function parseEvent(event: string) {
    switch (event) {
        case "wake-up":
            onWakeUpFunc();
            break;
        case "left-swipe":
            onSwipeLeftFunc();
            break;
        case "right-swipe":
            onSwipeRightFunc();
            break;
        case "up-swipe":
            onSwipeUpFunc();
            break;
        case "down-swipe":
            onSwipeDownFunc();
            break;
    }
}

function init() {
    const socket = io('localhost:3000');

    socket.on('connect', function () {
        console.log('connected to server');
    });

    socket.on("input-event", function (data: any) {
        parseEvent(data);
    });
    socket.on('disconnect', function () {
        console.log('disconnected from server');
    });
}

function on(onWakeUp: Function, onSwipeLeft: Function, onSwipeRight: Function, onSwipeUp: Function, onSwipeDown: Function, ) {
    onWakeUpFunc = onWakeUp;
    onSwipeLeftFunc = onSwipeLeft;
    onSwipeRightFunc = onSwipeRight;
    onSwipeUpFunc = onSwipeUp;
    onSwipeDownFunc = onSwipeDown;
}

const InputEventService = {
    init,
    on,
};

export default InputEventService;