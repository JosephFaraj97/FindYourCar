import { createLogger, transports, format } from 'winston'

const getWinstonLogger = () => {
  return createLogger({
    level: process.env.LOGGING_LEVEL || 'info',
    format: format.simple(),
    transports: [new transports.Console()]
  })
}

export const logger = getWinstonLogger()
