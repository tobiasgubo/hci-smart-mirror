import { io } from 'socket.io-client';



function init() {
    const socket = io('localhost:3000');

    socket.on('connect', function () {
        console.log('connected to server');
    });

    socket.on('event', function (data: any) {
        console.log(data);
    });
    socket.on('disconnect', function () {
        console.log('disconnected from server');
    });
}

const InputEventService = {
    init,
};

export default InputEventService;