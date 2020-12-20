require('../lib/node-entry');

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
let gestureArray;

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

setInterval(function() {
    detectGestureDirection();
    lastHand = currentHand;
    let detectedGesture = new SwipeObject(lastHand,currentHand);
    if (detectedGesture.velocity > DETECTION_THRESHOLD){
        gestureArray.push(detectedGesture);
    }
  }, REFRESHRATE);

  function detectGestureDirection() {
      if (currentHand != null && lastHand != null) {
        console.log(currentHand.palmPosition);
        console.log(lastHand.palmPosition);
        let direction=[0,0,0];
        for(let i = 0;i< currentHand.palmPosition.length; i++){
            direction[i] = currentHand.palmPosition[i]-lastHand.palmPosition[i];
        }
        detectSwipeDirection(direction);
      }
  }

  function detectSwipeDirection(vector){
      if(vector[0]>0){
          if(onSwipeRightFunc){onSwipeRightFunc(); console.log("right Swipe");}
      }
      else{
          if(onSwipeLeftFunc){onSwipeLeftFunc(); console.log("left Swipe");}
      }
  }

  class SwipeObject{
      constructor(position1, position2) {
          this.detectionTime = Date.now();
          this.handPosition1 = position1;
          this.handPosition2 = position2;
          this.calculateDirection(this.handPosition1, this.handPosition2);
          //this.Dir = 0 for right and this.Dir = 1 for left 
          if (this.direction[0] > 0){
              this.Dir = 0;
          }
          else{
              this.Dir = 1;
          }
      }

      get velocity(){
          return this.calculateVelocity();
      }
      get direction(){
          return this.Dir;
      }
      get time(){
          return this.detectionTime;
      }
      get directionVector(){
          return this.direction;
      }

      calculateDirection(pos1,pos2){
          for (let i = 0 ; i < pos1.length; i++){
              this.direction.push(pos2[i]-pos1[i]);
          }
      }

      calculateVelocity(direction){
          let temp = 0;
          for(let i = 0 ; i <direction.length; i++){
              temp += direction[i]*direction[i];
          }
          return Math.sqrt(temp);

      }
  }

/*
function calcVectorMagnitude(vector){
      let magnitude = 0 ;
      for(let i = 0 ; i < vector.length ; i++){
          magnitude += (vector[i]*vector[i]);
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
*/

let controller = new Leap.Controller({enableGestures: true});
/*
controller.on('gesture', function (gesture) {
    console.log(gesture);
    if(gesture.type === 'swipe'){
        detect_direction(gesture);
    }
});
*/

//calculates the angle of the direction vector
/*function calculate_angle(gesture) {
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
        if(onSwipeUpFunc){onSwipeUpFunc();}
    }
    if(phi >= (3*Math.PI)/4 +delta || phi <= -((3*Math.PI)/4 + delta)){
        console.log("Swipedirection is Left");
        if(onSwipeLeftFunc){onSwipeLeftFunc();}
    }
    if(-(3*Math.PI)/4 +delta <= phi && phi <= -Math.PI/4 -delta){
        console.log("Swipedirection is Down");
        if(onSwipeDownFunc){onSwipeDownFunc();}
    }
    if(-Math.PI/4 +delta <= phi && phi <= Math.PI/4 -delta){
        console.log("Swipedirection is Right");
        if(onSwipeRightFunc){onSwipeRightFunc();}
    }
}*/


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


if(process.env.HTTP_EVENT_TRIGGERS=1){
	const DEBUG_EVENT_TRIGGER_PORT=3100;
	console.log('http event triggers enabled, port:'+DEBUG_EVENT_TRIGGER_PORT);
	const express = require('express')
	const app= express();
	app.listen(DEBUG_EVENT_TRIGGER_PORT);
	app.get('/',(_,res)=>res.sendFile(__dirname + '/public/debug_http_trigger_form.html'))
	app.get('/w',(_,res)=>{onWakeUpFunc(); return res.sendFile(__dirname + '/public/debug_http_trigger_form.html')})
	app.get('/l',(_,res)=>{onSwipeLeftFunc(); return res.sendFile(__dirname + '/public/debug_http_trigger_form.html')})
	app.get('/r',(_,res)=>{onSwipeRightFunc(); return res.sendFile(__dirname + '/public/debug_http_trigger_form.html')})
	app.get('/u',(_,res)=>{onSwipeUpFunc(); return res.sendFile(__dirname + '/public/debug_http_trigger_form.html')})
	app.get('/d',(_,res)=>{onSwipeDownFunc(); return res.sendFile(__dirname + '/public/debug_http_trigger_form.html')})
}
