const Sensor = require('../models/sensor');

class sensorService{
    async getAll(){
        return await Sensor.find();
    }
    async getById(id){
        const sensor = await Sensor.findById(id);
        if(!sensor){
            throw new Error ('Sensor no encontrado');
        }
        return sensor;
    }
    async create(sensorData){
        const newSensor = new Sensor(sensorData);
        return await newSensor.save()
    }
    async update(id,sensorData){
        const sensor = await Sensor.findByIdAndUpdate(
            id,
            sensorData,
            {new:true,runValidators:true}
        );
        if(!sensor){
            throw new Error ('Sensor no encontrado');
        }
        return sensor;
    }
   async delete(id){
    const sensor = await Sensor.findById(id);
    if(!sensor) throw new Error('Sensor no encontrado');

    if (sensor.isActive) {
        const Device = require('../models/device');
        const Reading = require('../models/reading');
        
        const sensorDevices = await Device.find({ sensors: id });
        const sensorReadings = await Reading.find({ sensorId: id });
        
        if (sensorDevices.length > 0 || sensorReadings.length > 0) { 
            throw new Error('No se puede borrar sensor activo en uso');
        }
    }
    
    return await Sensor.findByIdAndDelete(id);
}
}
module.exports = new sensorService();