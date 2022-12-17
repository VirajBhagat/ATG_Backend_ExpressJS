require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(
    process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
    }
);

const db=mongoose.connection
db.on('error',(error)=>{console.error(error);})
db.once('open',()=>{console.error('Connection succeeded')});

app.use(express.json());

const apiRoutes= require('./routes/ATG_API')
app.use('/atg', apiRoutes)

const socialPostRoutes= require('./routes/Social_Posts')
app.use('/atg/social_posts', socialPostRoutes)

app.listen(3001,()=>{
    console.log("Running on port 3001");
});