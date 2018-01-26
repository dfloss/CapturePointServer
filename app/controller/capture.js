module.exports = function (events, models, config){
    var Capture = {
        create: (capture) =>{
//            events.emit('capture',capture);
            return models.Capture.create(capture);
        },
        get: (id) =>{
            return models.Capture.findOne({
                where: {
                    id: id
                }
            });
        },
        getAll: ()=>{
            return models.Capture.findAll();
        },
        getAllTeam: ()=>{
            return models.Capture.findAll({
                include: [{model: models.Team, attributes: ['name','webColor']}]
            });
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