const sensor = require('../services/sensorService')

class sensorController{
    async getAll(req,res,next){
        try{
           const sensors = await sensor.getAll();
        res.json({
            success:true,
            data:sensors
        }); 
        }catch(error){
            next(error)
        }
    };
    async getById(req,res,next){
        try{
            const sensors = await sensor.getById(req.params.id);
            res.json({
                success:true,
                data:sensors
            });
        }catch(error){
            next(error)
        }
    };
    async create(req,res,next){
        try{
            const newSensor = await sensor.create(req.body);
            res.json({
                success:true,
                data:newSensor
            });
        }catch(error){
            next(error)
        }
    };
    async update(req,res,next){
        try{
            const updateSensor = await sensor.update(req.params.id,req.body);
            res.json({
                success:true,
                data:updateSensor
            });
        }catch(error){
            next(error)
        }
    };
    async delete(req,res,next){
        try{
            const deleteSensor = await sensor.delete(req.params.id);
            res.json({
                success:true,
                data:deleteSensor
            });
        }catch(error){
            next(error)
        }
    };
}
module.exports = new sensorController;