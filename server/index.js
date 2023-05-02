'use strict';

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

require('dotenv').config();
const App = express();

const bodyParser = require('body-parser');
App.use(bodyParser.urlencoded({extended:false}))
App.use("/images", express.static('public'));
App.use(cors());
App.use(express.json());


const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'public')
    },
    filename : (req, file,cb) => {
        cb(null, file != undefined ? file.originalname : '')
    }
})

const upload = multer({
    storage : storage
})


const connection = mysql.createConnection({
    host: process.env.MY_SQL_HOSTNAME,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE,
});

App.get('/', (req, res) => {
    res.send("Server Started !!")
})

App.get('/getProductList', (req, res) => {
    let query = `SELECT * FROM product`;
    connection.query(query, (err, result) => {
        if (err) {
            console.log("Error in Get Data");
        }
        else{
            console.log("Data get Successfully");
            return res.json(result);
        }
    })
})

App.post('/crateProduct',upload.single('image'), (req, res) => {


    let query = `INSERT INTO product (Product_Name, Product_Price, Product_Image, Product_CreatedAt) VALUES (?)`;
    let values = [
        req.body.productName,
        req.body.productPrice,
        req.file != undefined ? req.file.originalname : null,
        new Date()
    ]

    connection.query(query, [values], (err, result) => {
        if (err) {
            console.log("Error Create Data", err);
        }
        else{
            console.log("Record Created Successfully");
            result = {
                status : 200,
                message : 'Record Created Successfully'
            }
            return res.json(result);
        }
    })
})

App.post('/getSingleProduct/:id', (req, res) => {
    let query = `SELECT * FROM product WHERE Product_ID = ?`;
    let Product_ID = req.params.id
    connection.query(query, [Product_ID], (err, result) => {
        if (err) {
            console.log("Error in Get Single Data");
        }
        else{
            console.log("Single Record Get Successfully");
            
            return res.json(result);
        }
    })
})

App.post('/updateProduct/:id',upload.single('image'), (req, res) => {
    let query = 'UPDATE product SET `Product_Name` = ?, Product_Price = ?, Product_Image = ? WHERE Product_ID = ?';
   
    let Product_ID = req.params.id;
    connection.query(query, [req.body.productName,req.body.productPrice, req.file != undefined ? req.file.originalname : null, Product_ID], (err, result) => {
        if (err) {
            console.log("Error While Update Data");
        }
        else{
            console.log("Product Updated Successsfully");
            
            result = {
                status : 200,
                message : 'Product Updated Successsfully'
            }
            return res.json(result);
        }
    })
})




App.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`)
})