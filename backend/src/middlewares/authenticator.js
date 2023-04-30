import jwt from 'jsonwebtoken';
import configs from '../configs/configs.js';
import UserLogic from '../logics/user.js';
import logger from '../utils/logger.js';

const verifyAuthToken = async (req, res, next) => {

    try{

        if(!req.headers.authorization) {
            throw { name: "MissingAuthHeaderError" }
        }
        console.log(req.headers.authorization)
        const authHeader = req.headers.authorization.split(' ');
        const authScheme = authHeader[0];
        const authToken = authHeader[1];

        if(authScheme.toLowerCase() !== "bearer"){

            throw {
                name: "InvalidAuthSchemeError",
                message: {
                    msg: "Invalid authorization scheme",
                    received: authScheme,
                    expected: "bearer"
                }
            }
                        
        }

        const payload = jwt.verify(authToken, configs.misc.jwtSecret);
        console.log("payload",payload)

        const user = await UserLogic.getUser(payload.email,{ dbms: configs.database.dbms });
        console.log("user",user)
        if(user.authTokenNonce !== payload.nonce){
            throw { name: "JsonWebTokenError" }
        }

        req.body.email = payload.email;

        next();

    }catch(error){

        if(error.name){

            const errors = {
                "MissingAuthHeaderError": {
                    message: "Authorization header is missing",
                    code: 401
                },
                "TokenExpiredError": {
                    message: "Authentication token expired",
                    code: 401
                },
                "JsonWebTokenError": {
                    message: "Invalid authentication token",
                    code: 401
                }, 
                "InvalidAuthSchemeError": {
                    message: error.message,
                    code: 401
                },
            }

            if(!errors[error.name]?.code){
                logger.error(error);
            }

            return res.status(errors[error.name]?.code || 500).send(errors[error.name]?.message || "Internal server error");
                
        }
    }

}

export default verifyAuthToken;