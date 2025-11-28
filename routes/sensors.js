const express = require('express');
const router = express.Router();
const sensorController = require('../controller/sensorController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Sensor:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del sensor
 *         type:
 *           type: string
 *           enum: [temperature, humidity, co2, noise]
 *           description: Tipo de sensor
 *         unit:
 *           type: string
 *           enum: [°C, %, ppm, dB]
 *           description: Unidad de medida
 *         model:
 *           type: string
 *           description: Modelo del sensor
 *         location:
 *           type: string
 *           description: Ubicación (lat,lng)
 *         isActive:
 *           type: boolean
 *           description: Estado del sensor
 *       example:
 *         _id: 64jkl012mno345
 *         type: temperature
 *         unit: °C
 *         model: TempPro-X1
 *         location: 19.4326,-99.1332
 *         isActive: true
 */

/**
 * @swagger
 * /sensors:
 *   get:
 *     summary: Obtener todos los sensores
 *     tags: [Sensors]
 *     responses:
 *       200:
 *         description: Lista de sensores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Sensor'
 */
router.get("/", sensorController.getAll);

/**
 * @swagger
 * /sensors/{id}:
 *   get:
 *     summary: Obtener sensor por ID
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del sensor
 *     responses:
 *       200:
 *         description: Sensor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Sensor'
 *       404:
 *         description: Sensor no encontrado
 */
router.get("/:id", sensorController.getById);

/**
 * @swagger
 * /sensors:
 *   post:
 *     summary: Crear nuevo sensor
 *     tags: [Sensors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - unit
 *               - model
 *               - location
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [temperature, humidity, co2, noise]
 *                 example: temperature
 *               unit:
 *                 type: string
 *                 enum: [°C, %, ppm, dB]
 *                 example: °C
 *               model:
 *                 type: string
 *                 example: TempPro-X1
 *               location:
 *                 type: string
 *                 example: 19.4326,-99.1332
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Sensor creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post("/", sensorController.create);

/**
 * @swagger
 * /sensors/{id}:
 *   patch:
 *     summary: Actualizar sensor
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del sensor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [temperature, humidity, co2, noise]
 *                 example: humidity
 *               unit:
 *                 type: string
 *                 enum: [°C, %, ppm, dB]
 *                 example: %
 *               model:
 *                 type: string
 *                 example: HumiSense-Pro
 *               location:
 *                 type: string
 *                 example: 19.4389,-99.1406
 *               isActive:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Sensor actualizado
 *       404:
 *         description: Sensor no encontrado
 */
router.patch("/:id", sensorController.update);

/**
 * @swagger
 * /sensors/{id}:
 *   delete:
 *     summary: Eliminar sensor
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del sensor
 *     responses:
 *       200:
 *         description: Sensor eliminado exitosamente
 *       404:
 *         description: Sensor no encontrado
 *       400:
 *         description: No se puede eliminar (está en uso)
 */
router.delete("/:id", sensorController.delete);

module.exports = router;