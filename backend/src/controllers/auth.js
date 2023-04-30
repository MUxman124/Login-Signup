
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import configs from '../configs/configs.js';
import UserLogic from "../logics/user.js";

const signupUser = async (req, res, next) => {

    try{

        const { name, email, password } = req.body;

        const existingUser = await UserLogic.getUser(email, { dbms: configs.database.dbms });

        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        let newUser = await UserLogic.createUser(
            { 
                name: name, 
                email: email, 
                password: bcrypt.hashSync(password, 10) 
            },
            { dbms: configs.database.dbms }
        );

        newUser = newUser.toJSON()

        delete newUser.password;
        

        res.status(200).json({ message: 'User created', user: newUser });

    }catch(error){
        next (error);
    }


}

const loginUser = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        let user = await UserLogic.getUser(email, { dbms: configs.database.dbms });

        if (!user) {
            return res.status(404).send('User not found');
        }
        
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send('Invalid password');
        }

        const nonce = crypto.randomBytes(20).toString('hex');
        console.log("nonce", nonce)
        const authToken = jwt.sign(
            {
                email: user.email,
                nonce: nonce
            }, 
            configs.misc.jwtSecret, 
            { expiresIn: configs.misc.jwtExpiresIn}
        );

        user = user.toJSON()

        delete user.password;
        delete user.authTokenNonce;
        
        user.authToken = authToken;

        await UserLogic.updateUser(user.email, { authTokenNonce: nonce }, { dbms: configs.database.dbms });

        res.status(200).json(user);
        
    } catch (error) {
        next(error);
    }
}

const updatePassword = async (req, res, next) => {

    try{

        const { email, password } = req.body;

        const user = await UserLogic.getUser(email, { dbms: configs.database.dbms });

        if (!user) {
            return res.status(404).send('User not found');
        }

        await UserLogic.updateUser(
            email, 
            { password: bcrypt.hashSync(password, 10) },
            { dbms: configs.database.dbms }
        );

        res.status(200).send(`Password of the account with email ${email} has been updated`);

    } catch (error) {
        next(error);
    }

}

const deleteAccount = async (req, res, next) => {

    try{

        const { email } = req.body;

        const user = await UserLogic.getUser(email, { dbms: configs.database.dbms });

        if (!user) {
            return res.status(404).send('Account not found');
        }

        await UserLogic.deleteUser(email, { dbms: configs.database.dbms });

        res.status(200).send(`Account with email ${email} has been deleted`);

    } catch (error) {
        next(error);
    }

}

export default {
    signupUser,
    loginUser,
    updatePassword,
    deleteAccount
}