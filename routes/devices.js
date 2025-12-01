const express = require('express');
const router = express.Router();
const deviceController = require('../controller/deviceController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del dispositivo
 *         serialNumber:
 *           type: string
 *           description: Número de serie único
 *         model:
 *           type: string
 *           description: Modelo del dispositivo
 *         ownerId:
 *           $ref: '#/components/schemas/User'
 *         zoneId:
 *           $ref: '#/components/schemas/Zone'
 *         installedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de instalación
 *         status:
 *           type: string
 *           enum: [active, offline, maintenance]
 *           description: Estado del dispositivo
 *         sensors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Sensor'
 *       example:
 *         _id: 64ghi789jkl012
 *         serialNumber: DEV-001
 *         model: IoT-Gateway-V2
 *         ownerId: 
 *           _id: 64abc123def456
 *           name: Ana García
 *           email: ana@smartcity.com
 *         zoneId:
 *           _id: 64def456abc123
 *           name: Centro Histórico
 *         status: active
 *         sensors: []
 */

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Obtener todos los dispositivos
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: Lista de dispositivos obtenida exitosamente
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
 *                     $ref: '#/components/schemas/Device'
 */
router.get("/", deviceController.getAll);

/**
 * @swagger
 * /devices/{id}:
 *   get:
 *     summary: Obtener dispositivo por ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del dispositivo
 *     responses:
 *       200:
 *         description: Dispositivo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Device'
 *       404:
 *         description: Dispositivo no encontrado
 */
router.get("/:id", deviceController.getById);

/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Crear nuevo dispositivo
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serialNumber
 *               - model
 *               - ownerId
 *               - zoneId
 *             properties:
 *               serialNumber:
 *                 type: string
 *                 example: DEV-IND-001
 *               model:
 *                 type: string
 *                 example: Gateway-Industrial
 *               ownerId:
 *                 type: string
 *                 example: 64abc123def456
 *               zoneId:
 *                 type: string
 *                 example: 64def456abc123
 *               status:
 *                 type: string
 *                 enum: [active, offline, maintenance]
 *                 example: active
 *               sensors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64jkl012mno345"]
 *     responses:
 *       200:
 *         description: Dispositivo creado exitosamente
 *       400:
 *         description: Error de validación o referencias no existen
 */
router.post("/", deviceController.create);

/**
 * @swagger
 * /devices/{id}:
 *   patch:
 *     summary: Actualizar dispositivo
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serialNumber:
 *                 type: string
 *               model:
 *                 type: string
 *               ownerId:          // ← Agregar si quieres permitir
 *                 type: string
 *               zoneId:           // ← Agregar si quieres permitir  
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, offline, maintenance]
 *     responses:
 *       200:
 *         description: Dispositivo actualizado
 *       404:
 *         description: Dispositivo no encontrado
 */
router.patch("/:id", deviceController.update);

/**
 * @swagger
 * /devices/{id}:
 *   delete:
 *     summary: Eliminar dispositivo
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del dispositivo
 *     responses:
 *       200:
 *         description: Dispositivo eliminado exitosamente
 *       404:
 *         description: Dispositivo no encontrado
 *       400:
 *         description: No se puede eliminar (tiene sensores asignados)
 */
router.delete("/:id", deviceController.delete);

module.exports = router;