'use strict';
//please ref https://github.com/jperkin/node-rpio
var rpio = require('rpio');
var exec = require('child_process').exec;
rpio.init({mapping: 'gpio'}); //use GPIO numbering scheme

console.log('running GPIO');
//pin 21 power LED
//pin 26 shutdown button out
//pin 19 shutdown power read
//pin 5 capture LED R
//Pin 6 capture LED G
//pin 13 capture LED B

module.exports = {
   start: function() {
        this.output(21, 1);
        this.shutdownButton();
   },
   stop: function(){
        this.output(21, 0);
   },
   output: function(pin, value){
        rpio.open(pin, rpio.OUTPUT, value = 1 ? rpio.HIGH : rpio.LOW);
   },
   input: function(pin){
        rpio.open(pin, rpio.INPUT, rpio.PULL_DOWN);
   },
   shutdownButton: function(){
        this.output(26, 1);
        this.input(19);
        function pollpn(pin){
            if (rpio.read(pin)){
                console.log('shutting down');
				exec('/usr/bin/sudo /sbin/shutdown -h now', function(error){
					console.log(error);
				});
            }
          }
        rpio.poll(19, pollpn);
    }
};