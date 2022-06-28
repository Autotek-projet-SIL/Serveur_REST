// Variables Declarations
const winston = require("winston");
const { combine, timestamp, printf, label, colorize, align, json, errors } =
  winston.format;
const { format } = require("logform");

// The 2 types of loggers declaration

// (1) Logger for display erreurs in console
const loggerConsole = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    format.align(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [new winston.transports.Console({})],
});

// (2) Logger for redirect erreurs to a log file
const loggerFile = winston.createLogger({
  level: "info",
  format: combine(
    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    format.align(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: "LogFiles/logErrors.log",
      level: "error",
    }),
  ],
});

// Export the loggers
module.exports = {
  loggerConsole,
  loggerFile,
};
