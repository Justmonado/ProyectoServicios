const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require ('swagger-ui-express')

const swaggerDefinition ={
  openapi:'3.0.0',
  info:{
    title:'Documentación de la API',
    version:'1.0.0',
    description:'Documentación de la API con Swagger',
  },
  servers:[
  {
    url: 'https://proyectoservicios-production-bec1.up.railway.app',
    description: 'Servidor de producción'
  },
],
};
const options = {
  swaggerDefinition,
  apis: [
  './routes/*.js',           
  './src/routes/*.js',       
  '**/routes/*.js'           
],
};
const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app){
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

module.exports = setupSwagger
