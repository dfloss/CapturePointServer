module.exports = function(router, models, config){
    router.get('/', function(req, res){
        res.json({message: 'Router is working!'})
    })
    router.post('/jsontest', function(req, res){
        object = req.body;
        console.log(req.body);
        res.json({
            object: object
        });
    })
}