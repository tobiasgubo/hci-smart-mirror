require('../lib/node-entry');

console.log("start");

var controllerGestures = Leap.loop({enableGestures: true}, function(frame){
    //console.log(frame);
    if(frame.valid && frame.gestures.length > 0) {
        frame.gestures.forEach(gesture => detect_direction(gesture));
    }
  });

//calculates the angle of the direction vector
function calculate_angle(gesture) {
    let x = gesture.direction[0];
    let y = gesture.direction[1];
    let angle;
    if(y >= 0){
        angle = Math.acos(x);
    }
    else{
        angle = -Math.acos(x);
    }
    return angle;
}
//computes small angle spacing of n degree
function delta(n){
    return del = (Math.PI*n)/180;
}

//returns the direction of the swipe
function detect_direction(gesture) {
    let phi = calculate_angle(gesture);
    let delta = delta(5);
    if(Math.PI/4 + delta <= phi && phi <= (3*Math.PI)/4 - delta){
        console.log("Swipedirection is Up");
    }
    if(phi >= (3*Math.PI)/4 +delta || phi <= -((3*Math.PI)/4 + delta)){
        console.log("Swipedirection is Left");
    }
    if(-(3*Math.PI)/4 +delta <= phi && phi <= -Math.PI/4 -delta){
        console.log("Swipedirection is Down");
    }
    if(-Math.PI/4 +delta <= phi && phi <= Math.PI/4 -delta){
        console.log("Swipedirection is Right");
    }
}



var controller = new Leap.Controller()
controller.on("frame", function(frame) {
  console.log("Frame: " + frame.id + " @ " + frame.timestamp);
});

var frameCount = 0;
controller.on("frame", function(frame) {
  frameCount++;
});

setInterval(function() {
  var time = frameCount/2;
  //console.log("received " + frameCount + " frames @ " + time + "fps");
  frameCount = 0;
}, 2000);

controller.on('ready', function() {
    console.log("ready");
});
controller.on('connect', function() {
    console.log("connect");
});
controller.on('disconnect', function() {
    console.log("disconnect");
});
controller.on('focus', function() {
    console.log("focus");
});
controller.on('blur', function() {
    console.log("blur");
});
controller.on('deviceConnected', function() {
    console.log("deviceConnected");
});
controller.on('deviceDisconnected', function() {
    console.log("deviceDisconnected");
});

controller.connect();
console.log("\nWaiting for device to connect...");