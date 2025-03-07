//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const admin = require('./routes/admin');
const user = require('./routes/user');
const cors = require('cors');

app.use(express.json());
app.use(cors())

const secret = process.env.JWT_SECRET;  // This should be in an environment variable in a real application
const port = process.env.PORT;

// Connect to MongoDB
mongoose.connect('mongodb+srv://db1:Wz1RooAnST2lcCim@cluster0.6bcdr.mongodb.net/'); 

app.use('/admin', admin);
app.use('/user', user);

app.listen(port, () => {
    console.log('Server is listening on port 3300');
});