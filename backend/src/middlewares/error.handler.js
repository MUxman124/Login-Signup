import logger from "../utils/logger.js";

const errorHandler = (error, req, res, next) => {

    logger.error({
        route: req.path,
        error
    });

    let httpCode = 500;
    let message = "Internal Server Error";

    if(!res.headersSent){
        return res.status(httpCode).send(message); 
    }

}

export default errorHandler;