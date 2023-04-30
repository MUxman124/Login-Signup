const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase').then(() => {
    console.log('Connected to MongoDB' + mongoose.connection.readyState);
}).catch((err) => {
    console.log(err, err.reasone);
})

const route = require('../backend/route.js')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', route);

// error 404
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

//error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
