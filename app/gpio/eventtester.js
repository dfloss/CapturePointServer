module.exports = (controller, config)=>{
    controller.events.on("capture",(input)=>{
        //console.log(`capture event with data: ${JSON.stringify(input)}`)
        console.log(`capture event with data: ${input}`)
    });
    controller.events.on("startCapturing",(input)=>{
        //console.log(`startCapture event with data: ${JSON.stringify(input)}`)
        console.log(`startCapture event with data: ${input}`)
    });
    controller.events.on("stopCapturing",(input)=>{
        //console.log(`capture event with data: ${JSON.stringify(input)}`)
        console.log(`capture event with data: ${input}`)
    });
}