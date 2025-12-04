const Device = require('../models/device');
const User = require('../models/user'); 
const Zone = require('../models/zone');
const Sensor = require('../models/sensor')

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
    if (!zone.isActive){ 
        throw new Error('La zona no está activa');

    } 
    if (deviceData.sensors && deviceData.sensors.length > 0) {
        for (const sensorId of deviceData.sensors) {
            const sensor = await Sensor.findById(sensorId);
            if(!sensor){
                throw new Error(`El sensor no existe`);
            }
            if(!sensor.isActive) {  
                throw new Error(`El sensor no está activo`);
            }
        }
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
    if (deviceData.zoneId) {
        const zone = await Zone.findById(deviceData.zoneId);
        if (!zone) throw new Error('La zona no existe');
        if (!zone.isActive) throw new Error('La zona no está activa');
    }

    if (deviceData.sensors && deviceData.sensors.$push) {
        const newSensorId = deviceData.sensors.$push;
        const sensor = await Sensor.findById(newSensorId);
        if (!sensor) throw new Error('El sensor no existe');
        if (!sensor.isActive) throw new Error('El sensor no está activo');
    } 

    else if (deviceData.sensors && Array.isArray(deviceData.sensors)) {
        for (const sensorId of deviceData.sensors) {
            const sensor = await Sensor.findById(sensorId);
            if (!sensor) throw new Error(`El sensor no existe`);
            if (!sensor.isActive) throw new Error(`El sensor no está activo`);
        }
    }

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
    
    return await Device.findByIdAndDelete(id);
}
}

module.exports = new deviceService(); 