const user = require('../services/userService');

class userController{
     async getAll (req, res, next)  {
        try {
            const users = await user.getAll();
            res.json({
                success: true,
                data: users
            });
        } catch (error) {
            next(error);
        }
    };
    async getById(req,res,next){
        try{
            const users = await user.getById(req.params.id);
            res.json({
                success:true,
                data:users
            });
        }catch(error){
            next(error);
        }
    }
    async create(req,res,next){
        try{
            const newUser = await user.create(req.body);
            res.json({
            success: true,
            data: newUser
        });
    } catch (error) {
        next(error);
    }
};
    async update(req,res,next){
        try{
            const updateUser = await user.update(req.params.id,req.body);
            res.json({
                success:true,
                data:updateUser
            });
        }catch(error){
            next(error)
        }
    }
    async delete(req,res,next){
        try{
            const deleteUser = await user.delete(req.params.id);
            res.json({
            success:true,
            data:deleteUser
         });
        }catch(error){
            next(error)
        }

       
    }
}
module.exports = new userController;
    

