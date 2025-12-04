const Zone = require ('../models/zone')
const Device = require('../models/device')

class zoneService{
    async getAll(){
        return await Zone.find();
    }
    async getById(id){
        const zone = await Zone.findById(id);
        if(!zone){
            throw new Error ('Zona no encontrada');
        }
        return zone;
    }
    async create(zoneData){
        const newzone = new Zone(zoneData);
        return await newzone.save(); 
    }
    async update(id,zoneData){
        const zone = await Zone.findByIdAndUpdate(
            id,
            zoneData,
            {new: true, runValidators: true}
        )
        if(!zone){
            throw new Error('Zona no encontrada')

        };
        return zone;
    }
    async delete(id){
    const zone = await Zone.findById(id);
    if(!zone) throw new Error('Zona no encontrada');

    if (zone.isActive) {
        const zoneDevices = await Device.find({
            zoneId: id,
            status: { $in: ['active', 'maintenance'] }
        });
        
        if (zoneDevices.length > 0) {
            throw new Error('No se puede eliminar zona activa con dispositivos activos');
        }
    }
    
    return await Zone.findByIdAndDelete(id);
}
}
module.exports = new zoneService(); 