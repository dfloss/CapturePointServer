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
var LEDpower = 21;
var LEDshutOut = 26;
var LEDshutRead = 19;
var LEDR = 5;
var LEDG = 6;
var LEDB = 13;

module.exports = {
   start: function() {
	    this.setLow();
        this.output(LEDpower, 1);
        this.shutdownButton();
   },
   stop: function(){
        this.output(LEDpower, 0);
   },
   output: function(pin, value){
        rpio.open(pin, rpio.OUTPUT, value == 1 ? rpio.HIGH : rpio.LOW);
   },
   input: function(pin){
        rpio.open(pin, rpio.INPUT, rpio.PULL_DOWN);
   },
   setLow(){
	    this.output(LEDpower, 0);
		this.output(LEDshutOut, 0);
		this.output(LEDshutRead, 0);
		this.output(LEDR, 0);
		this.output(LEDG, 0);
		this.output(LEDB, 0);
		
   },
   shutdownButton: function(){
        this.output(LEDshutOut, 1);
        this.input(LEDshutRead);
        function pollpn(pin){
            if (rpio.read(pin)){
				exec('/usr/bin/sudo /sbin/shutdown -h now', function(error){
					console.log(error);
				});
            }
          }
        rpio.poll(LEDshutRead, pollpn);
    },
	capture: function(iter){
		var that = this;
		var time = 1000;	//time for each color, currently 1s
		var iterations = 1;  //Set to determine length of capture flashing (x6 time);
		var curr = iter;
		that.output(LEDB, 1);
		setTimeout(function(){ that.output(LEDG, 1);
			setTimeout(function(){ that.output(LEDB, 0);
				setTimeout(function(){ that.output(LEDR, 1);
					setTimeout(function(){ that.output(LEDG, 0);
						setTimeout(function(){ that.output(LEDB, 1);
							setTimeout(function(){ that.output(LEDR, 0);
								setTimeout(function(){ that.output(LEDB, 0);
									curr++
									if (curr < iterations){
										that.capture(curr);
									}
								}, time);
							}, time);
						}, time);
					}, time);
				}, time);
			}, time);
		}, time);
		
		//for (i = 0; i < loops; i++){
			//this.output(13, 1);
			//this.output(6, 1);
			//this.output(13, 0);
			//this.output(5, 1);
			//this.output(6, 0);
			//this.output(13, 1);
			//this.output(5, 0);
		//}		
		//this.output(13, 0);
	}
};