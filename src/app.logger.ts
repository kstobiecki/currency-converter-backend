import {LoggerService} from '@nestjs/common';
import {createLogger, format, Logger, transports} from 'winston';
import {config} from './config';

export class AppLogger implements LoggerService {
    private readonly logger: Logger;

    constructor(name: string, stream?: string) {
      this.logger = createLogger({
          level: config.logger.level,
          format: format.combine(
            format.label({
                label: `${process.env.HOSTNAME}|${name ? name : 'Nest'}`
            }),
            format.timestamp(),
            format.printf(nfo => `${nfo.timestamp} [${nfo.label}] ${nfo.level.toUpperCase()}: ${nfo.message}`)
          ),
          transports: [
              new transports.Console()
          ]
      });
    }

    error(message: string, trace?: string) {
        this.logger.error(message, JSON.stringify(trace));
    }

    warn(message: string) {
        this.logger.warn(message);
    }

    log(message: string) {
        this.logger.info(message);
    }

    verbose(message: string) {
        this.logger.verbose(message);
    }

    debug(message: string | object) {
        this.logger.debug(typeof message === 'object' ? JSON.stringify(message) : message);
    }

    silly(message: string) {
        this.logger.silly(message);
    }
}
