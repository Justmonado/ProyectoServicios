const zone = require('../services/zoneService');

class zoneController{
    async getAll(req,res,next){
        try{
            const zones = await zone.getAll();
            res.json({
                success:true,
                data:zones
            });
        }catch(error){
            next(error)
        }
    };
    async getById(req,res,next){
        try{
            const zones = await zone.getById(req.params.id);
            res.json({
                success:true,
                data:zones
            });
        }catch(error){
            next(error)
        }
    };
    async create(req,res,next){
        try{
            const newZone = await zone.create(req.body);
            res.json({
                success:true,
                data:newZone
            });
        }catch(error){
            next(error)
        }
    };
    async update(req,res,next){
        try{
            const updateZone = await zone.update(req.params.id,req.body);
            res.json({
                success:true,
                data:updateZone
            });
        }catch(error){
            next(error)
        }
    };
    async delete(req,res,next){
        try{
            const deleteZone = await zone.delete(req.params.id);
            res.json({
                success:true,
                data:deleteZone
            });
        }catch(error){
            next(error)
        }
    }
}
module.exports = new zoneController();