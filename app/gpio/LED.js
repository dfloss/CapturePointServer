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
var LEDstatus = 20;
var LEDshutOut = 6;
var LEDshutRead = 5;
var LEDR = 19;
var LEDG = 26;
var LEDB = 13;

var LEDcontroller = {
   start: function() {
	    this.setLow();
        this.output(LEDpower, 1);
		this.output(LEDstatus, 0);
        this.shutdownButton();
		this.capture(1, 1);
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
		var that = this;
        this.output(LEDshutOut, 1);
        this.input(LEDshutRead);
        function pollpn(pin){
            if (rpio.read(pin)){
				that.output(LEDpower, 0);
				that.output(LEDstatus, 1);
				exec('/usr/bin/sudo /sbin/shutdown -h now', function(error){
					console.log(error);
				});
            }
          }
        rpio.poll(LEDshutRead, pollpn);
    },
	red: function(){
		this.output(LEDR, 1);
		this.output(LEDG, 0);
		this.output(LEDB, 0);
	},
	purple: function(){
		this.output(LEDR, 1);
		this.output(LEDG, 0);
		this.output(LEDB, 1);		
	},
	blue: function(){
		this.output(LEDR, 0);
		this.output(LEDG, 0);
		this.output(LEDB, 1);
	},
	turqoise: function(){
		this.output(LEDR, 0);
		this.output(LEDG, 1);
		this.output(LEDB, 1);
	},
	green: function(){
		this.output(LEDR, 0);
		this.output(LEDG, 1);
		this.output(LEDB, 0);
	},
	yellow: function(){
		this.output(LEDR, 1);
		this.output(LEDG, 1);
		this.output(LEDB, 0);
	},
	white: function(){
		this.output(LEDR, 1);
		this.output(LEDG, 1);
		this.output(LEDB, 1);
	},
	black: function(){
		this.output(LEDR, 0);
		this.output(LEDG, 0);
		this.output(LEDB, 0);
	},
	capture: function(iteration, type, iter = 0){
		//type: 1 = rainbow, 2 = police
		var that = this;
		var time = 1000;	//time for each color, currently 1s
		var curr = iter;
		switch(type){
			case 1:
				setTimeout(function(){ that.red();
				setTimeout(function(){ that.purple();
				setTimeout(function(){ that.blue();
				setTimeout(function(){ that.turqoise();
				setTimeout(function(){ that.green();
				setTimeout(function(){ that.yellow();
					curr++
					if (curr < iteration){
						that.capture(iteration, type, curr);
					}
					} else{
						setTimeout(function(){ that.black();},time);
					}	
				}, time);}, time);}, time);}, time);}, time);}, time);
				break;
			case 2:
				setTimeout(function(){ that.red();
				setTimeout(function(){ that.blue();
				setTimeout(function(){ that.black();
					curr++
					if (curr < iteration){
						that.capture(iteration, type, curr);
					} else{
						setTimeout(function(){ that.black();},time);
					}					
				}, time);}, time);}, time);
				break;
			default:
				console.log('how did you even get here?');
				break;
		}
};

module.exports = function(controller, config){
    controller.events.on("boot", function(data){



    });
    controller.events.on("shutdown", function(data){


    });
    controller.events.on("capturing", function(data){



    });
    controller.events.on("captured", function(data){



    });
}