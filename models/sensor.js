const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'El tipo de sensor es requerido'],
    enum: ['temperature', 'humidity', 'co2', 'noise']
  },
  unit: {
    type: String,
    required: [true, 'La unidad es requerida'],
    enum: ['°C', '%', 'ppm', 'dB']
  },
  model: {
    type: String,
    required: [true, 'El modelo es requerido']
  },
  location: {
    type: String, // Formato: "lat,lng"
    required: [true, 'La ubicación es requerida'] 
 },
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Sensor', sensorSchema);