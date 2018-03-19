#!/usr/bin/env node
var b = require('bonescript');
var awsIot = require('aws-iot-device-sdk');


var device = awsIot.device({
   keyPath: '../aws/Mlinzi.private.key',
  certPath: '../aws/Mlinzi.cert.pem',
    caPath: '../aws/root-CA.crt',
  clientId: 'Mlinzi',
      host: 'axtgjcco57kze.iot.us-west-2.amazonaws.com'
});




device
  .on('connect', function() {
    console.log('connect');
    device.subscribe('arm');
    device.subscribe('disarm');
    device.subscribe('state');
    device.publish('alarm', JSON.stringify({ alarm: false}));
  });

device
  .on('message', function(topic, payload) {
    
    switch(topic){
      
      case 'arm' :
        console.log('arm Event Detected\t', payload.toString())    
        break;
        
      case 'disarm' :
        console.log('disarm Event Detected', payload.toString())    
        
        break;
        
      case 'state':
        console.log('state Event Detected', payload.toString())    
        
        break;
        
      case 'alarm':
        console.log('alarm Event Detected', payload.toString())    
        break;
        
      default:
      
        console.log('Unknown Event Detected', payload.toString())    
        break;

      
      
      
    }
    
    console.log('message', topic, payload.toString());
  });
  
  
  


var leds = ["USR0", "USR1", "USR2", "USR3", "P9_14"];

for(var i in leds) {
    b.pinMode(leds[i], b.OUTPUT);
}

var state = b.LOW;
for(var i in leds) {
    b.digitalWrite(leds[i], state);
}

setInterval(toggle, 500);

function toggle() {
    if(state == b.LOW) state = b.HIGH;
    else state = b.LOW;
    for(var i in leds) {
        b.digitalWrite(leds[i], state);
    }
}
