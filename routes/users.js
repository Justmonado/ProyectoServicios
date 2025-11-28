const express = require('express');
const router = express.Router();
const userController = require('../controller/userControler');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del usuario
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Email del usuario
 *         role:
 *           type: string
 *           enum: [admin, technician, viewer]
 *           description: Rol del usuario
 *       example:
 *         _id: 64abc123def456
 *         name: Ana García
 *         email: ana@smartcity.com
 *         role: admin
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
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
 *                     $ref: '#/components/schemas/User'
 */
router.get("/", userController.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", userController.getById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Carlos López
 *               email:
 *                 type: string
 *                 example: carlos@smartcity.com
 *               password:
 *                 type: string
 *                 example: securepassword123
 *               role:
 *                 type: string
 *                 enum: [admin, technician, viewer]
 *                 example: technician
 *     responses:
 *       200:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de validación
 */
router.post("/", userController.create);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualizar usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Carlos López Updated
 *               email:
 *                 type: string
 *                 example: carlos.updated@smartcity.com
 *               role:
 *                 type: string
 *                 enum: [admin, technician, viewer]
 *                 example: admin
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.patch("/:id", userController.update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: No se puede eliminar (tiene dispositivos asignados)
 */
router.delete("/:id", userController.delete);

module.exports = router;