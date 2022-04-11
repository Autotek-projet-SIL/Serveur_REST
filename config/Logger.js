// Declaration de variables
const winston = require("winston");
const { combine, timestamp, printf, label, colorize, align } = winston.format;

// Logger pour afficher les erreurs dans la console
const loggerConsole = winston.createLogger({
  level: "info",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

// Logger pour rediriger les erreurs dans un fichier log
const loggerFile = winston.createLogger({
  level: "info",
  format: combine(timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({
      filename: "LogFiles/logErrors.log",
      level: "error",
    }),
  ],
});

module.exports = {
  loggerConsole,
  loggerFile,
};
