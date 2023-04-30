import {body, matchedData, validationResult} from 'express-validator';


const finalizeVaidation = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    req.params = matchedData(req, {includeOptionals: false, locations: ['params']});
    req.query = matchedData(req, {includeOptionals: false, locations: ['query']});
    req.body = matchedData(req, {includeOptionals: false, locations: ['body']});

    next();

}

const signupUser = async (req, res, next) => {

    await body('name', 'Name is required').notEmpty().run(req);
    await body('email', 'Please provide a valid email').isEmail().run(req);
    await body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }).run(req);

    finalizeVaidation(req, res, next);

}

const loginUser = async (req, res, next) => {

    await body('email', 'Please provide a valid email').isEmail().run(req);
    await body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }).run(req);

    finalizeVaidation(req, res, next);

}

const updatePassword = async (req, res, next) => {

    await body('email', 'Please provide a valid email').isEmail().run(req);
    await body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }).run(req);

    finalizeVaidation(req, res, next);

}

const deleteAccount = async (req, res, next) => {

    await body('email', 'Please provide a valid email').isEmail().run(req);

    finalizeVaidation(req, res, next);

}


export default {
    signupUser,
    loginUser,
    updatePassword,
    deleteAccount
}