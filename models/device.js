const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    serialNumber:{
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: String
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    zoneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone',
        required: true
    },
    installatedAt: {
        type: Date
    },
    status: {
        type: String,
        enum: ['active', 'offline', 'maintenance']

    },
   sensors: [{
    type: mongoose.Schema.Types.ObjectId,    
    ref: 'Sensor'
}]
});

module.exports = mongoose.model('Device', deviceSchema);