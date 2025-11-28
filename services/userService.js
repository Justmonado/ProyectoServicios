const User = require('../models/user');

class userService {
    async getAll() {
        return await User.find().select('-password');
    }
    async getById(id) {
     const user = await User.findById(id).select('-password');
      if (!user) {
        throw new Error('Usuario no encontrado');
      }  
      return user;
    }
    async create(userData){
        const existingEmail = await User.findOne({email:userData.email});
        if (existingEmail){
            throw new Error('El correo ya está en uso');
        }
        const newUser = new User(userData);
        return await newUser.save();
    }

    async update(id,userData){
        if(userData.email){
            const existeEmail = await User.findOne({
                email:userData.email,
                _id:{$ne:id}
            });
            if(existeEmail){
                throw new Error('El correo ya está en uso')
            }
        }
        const user = await User.findByIdAndUpdate(
            id,
            userData,
            {new:true, runValidators:true}
        ).select('-password');
        if(!user){
            throw new Error('Usuario no encontrado');
        }
        return user;
    }
    async delete(id){
        const user = await User.findById(id).select('-password');
        if(!user){
            throw new Error('Usuario no encontrado');
        }
        const Device = require('../models/device');
        const userDevices = await Device.findOne({ownerId:id});
        if(userDevices){
            throw new Error('No se puede eliminar un usuario con dispositivos asignados');
        }
        return await User.findByIdAndDelete(id);
}
        
}   
module.exports = new userService();