const { createLogger, format, transports } = require('winston');
const WinstonDaily = require('winston-daily-rotate-file');
const path = require('path');
const { combine, timestamp, json } = format;
const logDir = `../logs`;

const productionLogger = () => {
  return createLogger({
    level: 'debug',
    format: combine(timestamp(), json()),
    transports: [
      new transports.Console(),
      // error 레벨 로그 - 파일저장
      new WinstonDaily({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: path.join(__dirname, logDir, '/error'),
        filename: '%DATE%.error.log',
        maxFiles: 30,
        zippedArchive: true,
      }),
      // 모든 레벨 로그 - 파일저장
      new WinstonDaily({
        level: 'debug',
        datePattern: 'YYYY-MM-DD',
        dirname: path.join(__dirname, logDir, '/all'),
        filename: '%DATE%.all.log',
        maxFiles: 7,
        zippedArchive: true,
      }),
    ],
  });
};

module.exports = productionLogger;