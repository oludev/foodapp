const { application } = require('express');
const express = require('express');
const port = process.env.PORT || 3000
const path = require('path');
const dotenv= require('dotenv');
const mysql = require("mysql"); 

dotenv.config({ path: './.env'});

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD ,
    database: process.env.DATABASE
});

db.connect( (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
})



const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// parse JSON bodies (as sent by API clients)
app.use(express.json());
app.set('view engine', 'hbs');


app.use('/', require('./routes/pages'));
app.use('/products', require('./routes/products'));
app.use('/order', require('./routes/order'));
// app.use('/auth', require('./routes/auth'));




app.listen(port, () => {
    console.log("server is running on port 3000");
})
