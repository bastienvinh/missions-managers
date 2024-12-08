import winston from 'winston'

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.colorize(),
        winston.format.printf(({timestamp, level, message, ...metadata}) => {
          const formattedMetadata = Object.keys(metadata).length > 0 ? ` | ${JSON.stringify(metadata)}` : ''
          return ` ${timestamp} [${level}]: ${message} ${formattedMetadata}`
        })
      ),
    })
  ]
})