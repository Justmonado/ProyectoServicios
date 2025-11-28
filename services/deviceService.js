const Device = require('../models/device');
const User = require('../models/user'); 
const Zone = require('../models/zone');

class deviceService{
    async getAll(){
        return await Device.find()
            .populate('ownerId', 'name email')
            .populate('zoneId', 'name')
            .populate('sensors', 'type model');
    }

    async getById(id){ 
        const device = await Device.findById(id)
            .populate('ownerId', 'name email')
            .populate('zoneId', 'name description')
            .populate('sensors', 'type model unit');
        if(!device){
            throw new Error('Dispositivo no encontrado');
        }
        return device;
    }

    async create(deviceData){
        const owner = await User.findById(deviceData.ownerId);
        if(!owner){
            throw new Error('El usuario propietario no existe');
        }

        const zone = await Zone.findById(deviceData.zoneId);
        if(!zone){
            throw new Error('La zona no existe');
        }

        const existingDevice = await Device.findOne({
            serialNumber: deviceData.serialNumber
        });
        if(existingDevice){
            throw new Error('El número de serie ya está registrado');
        }

        const device = new Device(deviceData);
        return await device.save(); 
    }

    async update(id, deviceData){
        const device = await Device.findByIdAndUpdate(
            id,
            deviceData,
            { new: true, runValidators: true }
        ).populate('ownerId zoneId sensors');
        
        if(!device){
            throw new Error('Dispositivo no encontrado');
        }
        return device;
    }

    async delete(id){
        const device = await Device.findById(id);
        if(!device){
            throw new Error('Dispositivo no encontrado');
        }

        if(device.sensors && device.sensors.length > 0){
            throw new Error('No se puede eliminar el dispositivo porque tiene sensores asignados');
        }

        return await Device.findByIdAndDelete(id);
    }
}

module.exports = new deviceService(); 