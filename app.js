const express = require('express');
const app = express();
const dotenv=require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
mongoose.connect(process.env.DB_CONECTION, { useNewUrlParser: true, useUnifiedTopology: true },()=>console.log('connected to database'))

app.use(express.json())

const authrouter = require('./routers/auth');

app.use('/api/user', authrouter);

app.listen(3000, ()=> console.log('Server is  running'));
//console.log('node is running');