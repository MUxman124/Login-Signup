import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(
      {
        format: "DD-MMM-YYYY HH:mm:ss:ms",
      }
    ),
    prettyPrint()
  ),
  transports: [new transports.Console()]
})

logger.log({
  level: 'info',
  message: 'What time is the testing at?'
});
logger.info('hey there')