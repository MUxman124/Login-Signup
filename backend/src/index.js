import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import corsOptions from './configs/cors.js';
import morgan from './middlewares/morgan.js';
import router from './routers/route.js';
import configs from './configs/configs.js';
import logger from './utils/logger.js';
import database from './utils/database.js';
import errorHandler from './middlewares/error.handler.js';

const initApp = async () => {

    await database.connect(configs.database.dbms);

    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.options('*', cors());
    app.use(cors(corsOptions));
    app.use(morgan);
    app.use(helmet());
    app.use(router);
    app.use(errorHandler);

    const server = app.listen(
        configs.api.port,
        () => {
            logger.info(`Listening on HTTP port ${configs.api.port}`)
            console.log(`Listening on HTTP port ${configs.api.port}`)
        }
    );
    
    process.on('SIGINT',function(){
        logger.info(`Closed Listening on HTTP port ${configs.api.port}`)
        server.close();
    });

    return app;

}

const app = await initApp().catch(error => logger.error(error));

export default app;