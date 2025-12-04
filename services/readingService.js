const Reading = require('../models/reading')
const Sensor = require ('../models/sensor');


class readingService{

    
    async getAll(){
        return await Reading.find()
        .populate('sensorId','type model unit location')
        .sort({time:-1});
    }
    async getById(id){
        const reading = await Reading.findById(id)
        .populate('sensorId','type model unit location')
        if(!reading){
            throw new Error('Lectura no encontrada')
        }
        return reading;
    }


    async create(readingData){
        const sensor = await Sensor.findById(readingData.sensorId);
        if(!sensor){
            throw new Error('El sensor no existe')
        }
         if (!sensor.isActive) {  
        throw new Error('El sensor no está activo');
    }
        const reading = new Reading(readingData);
        return await  reading.save();
    }


    async update(id, readingData) {
    if (readingData.sensorId && readingData.sensorId !== undefined) {
        const sensor = await Sensor.findById(readingData.sensorId);
        if (!sensor) {
            throw new Error('El sensor no existe');
        }
        if(!sensor.isActive){
            throw new Error('El sensor no está activo')
        }
        
    }

    const reading = await Reading.findByIdAndUpdate(
        id, 
        readingData, 
        { new: true, runValidators: true }
    ).populate('sensorId', 'type model unit');
    
    if (!reading) throw new Error('Lectura no encontrada');
    return reading;
    }


    async delete(id){
        const reading = await Reading.findByIdAndDelete(id);
        if(!reading){
            throw new Error('Lectura no encontrada')
        }
        return reading;
    }
}

module.exports = new readingService();