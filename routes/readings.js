const express = require('express');
const router = express.Router();
const readingController = require('../controller/readingController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Reading:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único de la lectura
 *         sensorId:
 *           $ref: '#/components/schemas/Sensor'
 *         value:
 *           type: number
 *           description: Valor de la lectura
 *         time:
 *           type: string
 *           format: date-time
 *           description: Timestamp de la lectura
 *       example:
 *         _id: 64mno345pqr678
 *         sensorId:
 *           _id: 64jkl012mno345
 *           type: temperature
 *           unit: °C
 *           model: TempPro-X1
 *         value: 25.5
 *         time: 2024-10-20T10:30:00.000Z
 */

/**
 * @swagger
 * /readings:
 *   get:
 *     summary: Obtener todas las lecturas
 *     tags: [Readings]
 *     responses:
 *       200:
 *         description: Lista de lecturas obtenida exitosamente
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
 *                     $ref: '#/components/schemas/Reading'
 */
router.get("/", readingController.getAll);

/**
 * @swagger
 * /readings/{id}:
 *   get:
 *     summary: Obtener lectura por ID
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la lectura
 *     responses:
 *       200:
 *         description: Lectura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Reading'
 *       404:
 *         description: Lectura no encontrada
 */
router.get("/:id", readingController.getById);

/**
 * @swagger
 * /readings:
 *   post:
 *     summary: Crear nueva lectura
 *     tags: [Readings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sensorId
 *               - value
 *             properties:
 *               sensorId:
 *                 type: string
 *                 example: 64jkl012mno345
 *               value:
 *                 type: number
 *                 example: 25.5
 *               time:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-10-20T10:30:00.000Z
 *     responses:
 *       200:
 *         description: Lectura creada exitosamente
 *       400:
 *         description: Error de validación o sensor no existe
 */
router.post("/", readingController.create);

/**
 * @swagger
 * /readings/{id}:
 *   patch:
 *     summary: Actualizar lectura
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la lectura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sensorId:
 *                 type: string
 *                 example: 64jkl012mno345
 *               value:
 *                 type: number
 *                 example: 26.8
 *               time:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-10-20T11:45:00.000Z
 *     responses:
 *       200:
 *         description: Lectura actualizada
 *       404:
 *         description: Lectura no encontrada
 */
router.patch("/:id", readingController.update);

/**
 * @swagger
 * /readings/{id}:
 *   delete:
 *     summary: Eliminar lectura
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la lectura
 *     responses:
 *       200:
 *         description: Lectura eliminada exitosamente
 *       404:
 *         description: Lectura no encontrada
 */
router.delete("/:id", readingController.delete);

module.exports = router;