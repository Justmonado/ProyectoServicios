const userRouter = require ('./users')
const readingRouter = require ('./readings')
const zoneRouter = require ('./zones')
const sensorRouter = require ('./sensors')
const deviceRouter = require('./devices')



function RouterApi (app){
  app.use ('/users',userRouter);
  app.use ('/readings', readingRouter);
  app.use ('/zones', zoneRouter);
  app.use ('/sensors', sensorRouter);
  app.use ('/devices', deviceRouter);
}

module.exports = RouterApi;