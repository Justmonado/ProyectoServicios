const reading = require ('../services/readingService')

class readingController{
    async getAll(req,res,next){
        try{
            const readings = await reading.getAll();
            res.json({
                success:true,
                data:readings
            });
        }catch(error){
            next(error)
        }
    };
    async getById(req,res,next){
        try{
            const readings = await reading.getById(req.params.id);
            res.json({
                success:true,
                data:readings
            });
        }catch(error){
            next(error)
        }
    };
    async create(req,res,next){
        try{
            const newReading = await reading.create(req.body);
            res.json({
                success:true,
                data:newReading
            });
        }catch(error){
            next(error)
        }
    };
    async update(req,res,next){
        try{
            const updateReading = await reading.update(req.params.id,req.body);
            res.json({
                success:true,
                data:updateReading
            });
        }catch(error){
            next(error)
        }
    }
    async delete(req,res,next){
        try{
            const deleteReading = await reading.delete(req.params.id);
            res.json({
                success:true,
                data:deleteReading
            });
        }catch(error){
            next(error)
        }
    }
}

module.exports = new readingController();