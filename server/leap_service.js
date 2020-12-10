require('../lib/node-entry');

console.log("start");

var currentHand = null;
var lastHand = null;

var controllerGestures = Leap.loop({enableGestures: true}, function(frame){
    if(frame.valid && frame.hands.length > 0) {
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

  setInterval(function() {
    detectGesture();
    lastHand = currentHand;
  }, 500);

  function detectGesture() {
      console.log("Entry");
      if (currentHand != null && lastHand != null) {
        console.log(currentHand.palmPosition);
        console.log(lastHand.palmPosition);
        let direction=[0,0,0];
        for(let i = 0;i< currentHand.palmPosition.length; i++){
            direction[i] = currentHand.palmPosition[i]-lastHand.palmPosition[i];
        }
        console.log(direction);
      }
      console.log("exit");
  }

function calcVectorMagnitude(vector){
      let magnitude = 0 ;
      for(let i = 0 ; i < vector.length ; i++){
          magnitude += vector[i]*vector[i];
      }
      return Math.sqrt(magnitude);
}

function normalizeVector(vector){
      let magnitude = calcVectorMagnitude(vector);
      for(let i = 0 ; i < vector.length; i++){
          vector[i] /= magnitude;
      }
      return vector;
}

var controller = new Leap.Controller({enableGestures: true});
/*
controller.on('gesture', function (gesture) {
    console.log(gesture);
    if(gesture.type === 'swipe'){
        detect_direction(gesture);
    }
});
*/

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


/*
var controller = new Leap.Controller()
controller.on("frame", function(frame) {
  console.log("Frame: " + frame.id + " @ " + frame.timestamp);
});
 */

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