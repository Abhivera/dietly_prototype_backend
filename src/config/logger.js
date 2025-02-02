import winston from 'winston';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// Create logger instance
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: logFormat,
  transports: [
    // Log to the console
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
    // Log errors to a separate file
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Log all messages to a general log file
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

export default logger;
