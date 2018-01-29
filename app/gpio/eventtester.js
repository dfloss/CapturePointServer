module.exports = (controller, config)=>{
    controller.events.on("capture",(input)=>{
        //console.log(`capture event with data: ${JSON.stringify(input)}`)
        console.log(`capture event with data:`)
        console.log(input);
    });
    controller.events.on("startCapturing",(input)=>{
        //console.log(`startCapture event with data: ${JSON.stringify(input)}`)
        console.log(`startCapture event with data: ${input}`)
        console.log(input);
    });
    controller.events.on("stopCapturing",(input)=>{
        //console.log(`capture event with data: ${JSON.stringify(input)}`)
        console.log(`stopCapture event with data:`);
        console.log(input);
    });
    controller.events.on("boot", function(data){
        console.log(`boot event with data:`);
        console.log(data);
    });
    controller.events.on("shutdown", function(data){
        console.log(`shutdown event with data:`)
        console.log(data);
    });
}