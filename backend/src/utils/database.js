import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import configs from '../configs/configs.js';
import logger from '../utils/logger.js';

class Database {

    constructor() {
        this.setup();
    }

    setup() {

        this.mongoURI = `mongodb://${configs.database.databaseHost}:${configs.database.databasePort}/${configs.database.databaseName}`;

        mongoose.connection
        .once('open', () => logger.info(`Connected to MongoDb at ${this.mongoURI}`))
        .once('disconnected', () => logger.info(`Disconnected from MongoDB at ${this.mongoURI}`))
        .on('error', (error) => logger.error(error));

        const mysqlURI = `${configs.database.databaseHost}:${configs.database.databasePort}/${configs.database.databaseName}`;

        this.sequelize = new Sequelize(
            configs.database.databaseName, 
            configs.database.databaseUsername, 
            configs.database.databasePassword, 
            {
                logging: false,
                dialect: "mysql",
                host:  configs.database.databaseHost,
                port: configs.database.databasePort, 
            }
        );

        this.sequelize.afterConnect(async (config) => {
            logger.info(`Connected to Mysql at ${mysqlURI}`)
        });

        this.sequelize.afterDisconnect(async (config) => {
            logger.info(`Disconnected from Mysql at ${mysqlURI}`)
        })
        

    }

    async connect(dbms) {

        if(dbms === "mongodb"){
            await mongoose.connect(this.mongoURI);
            return;
        }

        if(dbms === "mysql"){

            await this.sequelize.authenticate();
            return;
        }

    }

    getDB(dbms) {

        const dbs = {
            mongodb: mongoose.connection,
            mysql: this.sequelize,
        }

       return dbs[dbms];
    }
}

export default new Database();