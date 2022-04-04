require("dotenv").config({ path:"./config.env"});
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/books');
const req = require("express/lib/request");
const res = require("express/lib/response");

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'/mern_a_to_z_client/build')));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'mern_a_to_z_client','build','index.html'));
    })
}else{
    app.get("/",(req,res) => {
        res.send("Api running");
    });
}
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));