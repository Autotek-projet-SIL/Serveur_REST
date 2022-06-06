// Declaration de variables
const winston = require("winston");
const { combine, timestamp, printf, label, colorize, align, json, errors } =
  winston.format;
const { format } = require("logform");

// Declaration de 2 types de loggers
// Logger pour afficher les erreurs dans la console
const loggerConsole = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    format.align(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [new winston.transports.Console({})],
});

// Logger pour rediriger les erreurs dans un fichier log
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

// Exporter les loggers
module.exports = {
  loggerConsole,
  loggerFile,
};
