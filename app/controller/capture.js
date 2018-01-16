module.exports = function (events, models, config){
    var Capture = {
        create: (capture) =>{
            events.emit
            return models.Capture.create(capture);
        },
        getCurrent: ()=>{
            return models.Capture.findOne({
                include: [models.Team],
                where: {
                    time: {$lt: new Date()}
                },
                order: [ ['time', 'DESC'] ]
            });
        }
    }
    return Capture;
}