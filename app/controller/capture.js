module.exports = function (events, models, config){
    var Capture = {
        create: (capture) =>{
            return models.Capture.create(capture);
        },
        getCurrent: ()=>{
            return models.Capture.getCurrent();
        }
    }
    return Capture;
}