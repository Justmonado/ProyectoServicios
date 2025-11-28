const express = require('express');
const router = express.Router();
const zoneController = require('../controller/zoneController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Zone:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único de la zona
 *         name:
 *           type: string
 *           description: Nombre de la zona
 *         description:
 *           type: string
 *           description: Descripción de la zona
 *         isActive:
 *           type: boolean
 *           description: Estado de la zona
 *       example:
 *         _id: 64def456abc123
 *         name: Centro Histórico
 *         description: Área del centro histórico
 *         isActive: true
 */

/**
 * @swagger
 * /zones:
 *   get:
 *     summary: Obtener todas las zonas
 *     tags: [Zones]
 *     responses:
 *       200:
 *         description: Lista de zonas obtenida exitosamente
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
 *                     $ref: '#/components/schemas/Zone'
 */
router.get("/", zoneController.getAll);

/**
 * @swagger
 * /zones/{id}:
 *   get:
 *     summary: Obtener zona por ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la zona
 *     responses:
 *       200:
 *         description: Zona encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Zone'
 *       404:
 *         description: Zona no encontrada
 */
router.get("/:id", zoneController.getById);

/**
 * @swagger
 * /zones:
 *   post:
 *     summary: Crear nueva zona
 *     tags: [Zones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Parque Industrial
 *               description:
 *                 type: string
 *                 example: Zona industrial norte
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Zona creada exitosamente
 *       400:
 *         description: Error de validación
 */
router.post("/", zoneController.create);

/**
 * @swagger
 * /zones/{id}:
 *   patch:
 *     summary: Actualizar zona
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la zona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Parque Industrial Actualizado
 *               description:
 *                 type: string
 *                 example: Zona industrial norte expandida
 *               isActive:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Zona actualizada
 *       404:
 *         description: Zona no encontrada
 */
router.patch("/:id", zoneController.update);

/**
 * @swagger
 * /zones/{id}:
 *   delete:
 *     summary: Eliminar zona
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la zona
 *     responses:
 *       200:
 *         description: Zona eliminada exitosamente
 *       404:
 *         description: Zona no encontrada
 *       400:
 *         description: No se puede eliminar (tiene dispositivos asignados)
 */
router.delete("/:id", zoneController.delete);

module.exports = router;