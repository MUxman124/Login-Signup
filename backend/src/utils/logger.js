import winston from 'winston';
import {format} from 'winston';
import configs from '../configs/configs.js';

const { combine, timestamp, prettyPrint, colorize, errors } = format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors)

const infoLogger = winston.createLogger({

    level: 'info',
    levels,
    format: combine(

        timestamp({
          format: "DD-MMM-YYYY HH:mm:ss:ms",
        }),

        prettyPrint()
    ),
    transports: [

        new winston.transports.File({ 
            filename: configs.logging.logsPath,
            level: 'info'
        }),

      
    ],

});

const httpLogger = winston.createLogger({

    level: 'http',
    levels,
    format: combine(

        timestamp({
          format: "DD-MMM-YYYY HH:mm:ss:ms",
        }),

        prettyPrint()
    ),
    transports: [

        new winston.transports.File({ 
            filename: configs.logging.accessLogsPath,
            level: 'http'
        }),

      
    ],

});

const errorLogger = winston.createLogger({

    level: 'info',
    levels,
    format: combine(

        errors({ stack: true }),

        timestamp({
          format: "DD-MMM-YYYY HH:mm:ss:ms",
        }),

        prettyPrint()
    ),
    transports: [

        new winston.transports.File({
            name: "error",
            filename: configs.logging.errorLogsPath , 
            level: 'error',
            handleRejections: true
        })

    ],

    exitOnError: false

});


const logger = {
    info: (params) => {        
        return infoLogger.info(params);
    },
    http: (params) => {        
        return httpLogger.http(params);
    },
    error: (params) => {

        if(params.error){

            if(params.error?.request) {
                delete params.error?.request;
                delete params.error?.response;
                params.error.config = {
                    url: params.error?.config?.url,
                    method: params.error?.config?.method,
                }
            }

        }

        return errorLogger.error(params);
    }
};

export default logger;
