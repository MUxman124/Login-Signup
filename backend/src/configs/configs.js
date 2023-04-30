import Joi from 'joi';

const envVarsSchema = Joi.object({

    NODE_ENV: Joi.string()
    .default('development')
    .required(),
    PORT: Joi.number()
    .required(),
    JWT_SECRET: Joi.string()
    .required(),
    JWT_EXPIRES_IN: Joi.string()
    .required(),
    ALLOWED_ORIGINS: Joi.string()
    .required(),
    DBMS: Joi.string()
    .required(),
    DATABASE_HOST: Joi.string()
    .required(),
    DATABASE_PORT: Joi.number()
    .required(),
    DATABASE_NAME: Joi.string()
    .required(),
    DATABASE_USERNAME: Joi.string(),
    DATABASE_PASSWORD: Joi.string(),
    LOGS_PATH: Joi.string()
    .required(),
    LOGS_ERROR_PATH: Joi.string()
    .required(),
    LOGS_ACCESS_PATH: Joi.string()
    .required(),
})
.unknown()
.required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const configs = {

    api: {
       
        port: envVars.PORT,

        cors: {
            allowedOrigins: envVars.ALLOWED_ORIGINS,
        }
    
    },

    logging: {
        
        logsPath: envVars.LOGS_PATH,
        errorLogsPath: envVars.LOGS_ERROR_PATH,
        accessLogsPath: envVars.LOGS_ACCESS_PATH
    },
    
    database: {

        dbms: envVars.DBMS,
        databaseHost: envVars.DATABASE_HOST,
        databasePort: envVars.DATABASE_PORT,
        databaseName: envVars.DATABASE_NAME,
        databaseUsername: envVars.DATABASE_USERNAME,
        databasePassword: envVars.DATABASE_PASSWORD,
    },

    misc: {
        nodeEnv: envVars.NODE_ENV,
        jwtSecret: envVars.JWT_SECRET,
        jwtExpiresIn: envVars.JWT_EXPIRES_IN,
    },


}

export default configs;