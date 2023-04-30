
/****************************************************************************
 * This middleware deals with Cross Origin Resource Sharing Policy.
 * It describes what request origins, request methods, and resquest/response
 * headers are allowed explicitly.
 ****************************************************************************/

 import configs from "./configs.js";

 const allowedOrigins = configs.api.cors.allowedOrigins;

 const corsOptions = {

   origin:  (origin, callback) => {

        if(allowedOrigins === "*"){

            callback(null, true)

        }else{

            if (allowedOrigins.toLowerCase().includes(origin.toLowerCase())) {

                callback(null, true);

            } else {

                callback(new Error('Not allowed by CORS'));
            }

        }

   },

   methods: ['GET', 'PUT', 'POST'],

    //allowedHeaders: ['Content-Type', 'Authorization']

}
 
export default corsOptions;