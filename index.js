require('dotenv').config();
const Express = require("express")
const routerApi = require('./routes/routes');
const { logErrors, errorHandler } = require("./Middleware/errorHandler");
const bodyParser = require("body-parser");
const cors = require("cors"); // ← SOLO UNA VEZ
const mongoose = require("mongoose");
const setupSwagger = require("./swagger");

const app = Express();
const port = process.env.PORT || 3000; 

// ✅ Configuración CORS CORRECTA
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://proyectoservicios-production-4c25.up.railway.app' 
  ],
  credentials: true
};

app.use(cors(corsOptions)); 
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