const device = require('../services/deviceService');

class deviceController{
    async getAll (req,res,next){
        try{
            const devices = await device.getAll();
            res.json({
                success:true,
                data:devices
            });
        }catch(error){
            next(error)
        }
    };
    async getById(req,res,next){
        try{
            const devices = await device.getById(req.params.id)
            res.json({
                success:true,
                data:devices
            });
        }catch(error){
            next(error)
        }
    };
    async create (req,res,next){
        try{
            const newDevice = await device.create(req.body);
            res.json({
                success:true,
                data:newDevice
            });
        }catch(error){
            next(error)
        }
    };
    async update (req,res,next){
        try{
            const updateDevice = await device.update(req.params.id,req.body);
            res.json({
                success:true,
                data:updateDevice
            });
        }catch(error){
            next(error)
        }
    };
    async delete (req,res,next){
        try{
            const deleteDevice = await device.delete(req.params.id);
            res.json({
                success:true,
                data:deleteDevice
            });
        }catch(error){
            next(error)
        }
    }
}

module.exports = new deviceController();