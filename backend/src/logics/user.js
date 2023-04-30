import UserModel from '../models/user.mdb.js';
import UserModelSQL from '../models/user.sql.js';

const createUser = async (data = {}, options = {}) => {

    const { name, email, password } = data;
    
    if(!name || !email || !password) {
        throw new Error('Please provide all the required data to create user');
    }

    if(!options?.dbms){
        throw new Error('Please provide DBMS option to use')
    }

    if(options?.dbms === 'mongodb'){

        const user = await UserModel.create({ 
            name: name, 
            email: email, 
            password: password 
        });

        return user;

    }

    if(options?.dbms === 'mysql'){
        
        const user = await UserModelSQL.create({ 
            name: name, 
            email: email, 
            password: password 
        });

        return user;

    }

    throw new Error('Invalid DBMS option. Expected one of: mysql, mongodb')

} 

const getUser = async (email = null, options = {}) => {

    if(!email) throw new Error('Please provide a valid email adddress');

    if(!options?.dbms){
        throw new Error('Please provide DBMS option to use')
    }

    if(options?.dbms === 'mongodb'){

        const user = await UserModel.findOne({ email: email });

        return user;

    }

    if(options?.dbms === 'mysql'){

        const user = await UserModelSQL.findOne({ 
            where: { email: email } 
        });

        return user;

    }

    throw new Error('Invalid DBMS option. Expected one of: mysql, mongodb')

}

const updateUser = async (email = null, data = {}, options = {}) => {

    if(!email) throw new Error('Please provide a valid email adddress');

    if(!options?.dbms){
        throw new Error('Please provide DBMS option to use')
    }

    if(data.email) delete data.email;

    if(options?.dbms === 'mongodb'){

        const response = await UserModel.updateOne({ email: email }, data);

        return response;

    }

    if(options?.dbms === 'mysql'){

        const response = await UserModelSQL.update(data, 
            {
                where: {
                    email: email,
                },
            }
        );

        return response;

    }

    throw new Error('Invalid DBMS option. Expected one of: mysql, mongodb')

}

const deleteUser = async (email = null, options = {}) => {

    if(!email) throw new Error('Please provide a valid email adddress');

    if(!options?.dbms){
        throw new Error('Please provide DBMS option to use')
    }

    if(options?.dbms === 'mongodb'){

        const response = await UserModel.deleteOne({ email: email });

        return response;

    }

    if(options?.dbms === 'mysql'){

        const response = await UserModelSQL.destroy({
            where: {
                email: email
            }
        });

        return response;

    }

    throw new Error('Invalid DBMS option. Expected one of: mysql, mongodb')
}

export default {
    createUser,
    getUser,
    updateUser,
    deleteUser
}