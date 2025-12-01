function logErrors(err, req, res, next) {
  console.error('Error:', err.message);
  next(err);
}

function errorHandler(err, req, res, next) {
  if (err.message.includes('no encontrado') || err.message.includes('no encontrada')) {
    return res.status(404).json({
      success:false,
      message: err.message
    });
  }
  
  res.status(500).json({
    success:false,
    message: err.message
  });
}

module.exports = { logErrors, errorHandler };