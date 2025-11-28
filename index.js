require('dotenv').config();
const Express = require("express")
const routerApi = require('./routes/routes');
const { logErrors, errorHandler } = require("./Middleware/errorHandler");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const setupSwagger = require("./swagger");


const app = Express();
const port = process.env.PORT || 3000; 


const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'proyectoservicios-production-bec1.up.railway.app', // ← Tu URL de Railway
    'proyectoservicios-production-bec1.up.railway.app'
  ],
  credentials: true
};

app.use(cors(corsOptions)); // ← Usa las opciones de CORS

app.use(cors());
app.use(Express.json());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartcity-iot')
  .then(() => {
    console.log(' Conectado a MongoDB');
  })
  .catch((error) => {
    console.error(' Error conectando a MongoDB:', error);
    process.exit(1); 
  });


setupSwagger(app)
routerApi(app);
app.use(logErrors);
app.use(errorHandler);


app.listen(port, () => {
  console.log(" Servidor funcionando en puerto: " + port);
  console.log(" Documentación: http://localhost:" + port + "/api-docs");
});