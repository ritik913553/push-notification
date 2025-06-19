const express = require('express');
const connectDB = require('./src/config/dbConfig');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());

const PORT = 3000;
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.get('/',(req,res)=>{
    res.send("hello World!");
})

const router = require('./src/routes/FirebaseRoutes')

app.use('/api',router)

connectDB()






app.listen(PORT,()=>{
    console.log(`App is listening at http://localhost:${PORT}`);
})