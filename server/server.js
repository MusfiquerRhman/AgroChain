import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from "dotenv";
import session from 'express-session'

let app = express()
let PORT = process.env.PORT || 5000;
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

app.use(session({
    secret: process.env.SESSIONS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 3600000
    }
}));

app.use(express.static('public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json())
app.use(cors())

import userRoute from './server/user.js'
import productRoute from './server/products.js'

app.use("/api/products", productRoute);
app.use("/api/user", userRoute);

// const adminRoute = require("./server/admin");
// app.use(`/api/avater`, adminRoute);

app.listen(PORT, err => {
    if(err) throw err;
    console.log("server jas started");
})