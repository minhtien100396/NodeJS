import express from "express";
import bodyParser from "body-parser"; // Hỗ trợ lấy tham số từ phía client gửi về
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
// import cors from 'cors';
// Giúp chúng ta lấy được các tham số trong file .env(file môi trường)
require('dotenv').config();
let app = express();
// // Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // 3000: cổng của client
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.port || 6969;
//port === underfine  => port = 6969
app.listen(port, () => {
    //callback
    console.log("Backend NodeJs is running on the port " + port)
});
