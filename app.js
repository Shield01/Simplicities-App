//security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//imports
require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser')

const app = express();

const db = require('./Database/connectDb');

const fileUpload = require(`express-fileupload`);

const imageRoutes = require(`./routes/image.routes`);

const userRoutes = require('./routes/user.routes')

app.use(express.json());

app.use(bodyParser.json());

app.use(fileUpload());

app.set('trust proxy', 1);

app.use(rateLimiter({
    windowMs: 15 * 50 * 1000, //15 Minutes
    max: 100 //Limit each Ip to 100 request per millisecond
}));
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
    res.status(200).send("Hello Simplicity !!");
})

app.use('/api/v1/users', userRoutes);

app.use(`/api/v1/images`, imageRoutes);

const port = process.env.PORT || 5000

const start = async()=>{
    try{
        await db(process.env.mongo_db_uri)
        app.listen((port), ()=>{
            console.log(`Server listening at port ${port}....`)
        })
    }catch(err){
        console.log(err)
    }
}

start();