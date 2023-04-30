const express = require('express');
const bcrypt =  require('bcrypt');
const {check, validationResult} = require('express-validator');
const router = express.Router();
let userModule = require('../backend/user.js');
const app = express();

router.route('/login').post( async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email, password)
        let user = await userModule.findOne({ email: email });
        if (user) {
            console.log(user)
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.status(200).json({ message: 'User found', user: user });
            } else {
                res.status(400).send('Invalid password');
            }
        } else {
            res.status(400).send('User not found');
        }
    } catch (error) {
        next(error);
    }
});

router.route('/signup').post( [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password must be at least 8 characters long').isLength({ min: 4 })
], async (req, res, next) => {
    try {
        console.log("aaaa gyaaaa")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        console.log(name, email, password)
        const existingUser = await userModule.findOne({ email: email });
        if (existingUser) {
            res.status(400).send('User already exists');
            console.log("User already exists")
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await userModule.create({ name: name, email: email, password: hashedPassword });
            console.log(newUser)
            res.status(200).json({ message: 'User created', user: newUser });
        }
    } catch (error) {
        console.log("error" , error)
        next(error);
    }
});

module.exports = router
