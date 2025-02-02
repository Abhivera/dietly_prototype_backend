import logger from '../config/logger.js';

const requestLogger = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  logger.info(`IP: ${ip} - ${req.method} ${req.url}`);
  next();
};

export default requestLogger;
