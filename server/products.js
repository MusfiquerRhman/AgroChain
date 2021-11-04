let express = require("express");
let bodyParser = require('body-parser')
let router = express.Router({mergeParams: true});
let dev = process.env.NODE_ENV !== "production"
let next = require('next')
let app = next({dev})
const fs = require('fs');

let connection = require("../database/model");
let upload = require("../Helpers/File")

// let handle = app.getRequestHandler()
// var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/", upload, (req, res) => {
    console.log(req.file)
    const nameEN = req.body.nameEN;
    const nameBN = req.body.nameBN;
    const inStockQuantity = req.body.inStockQuantity;
    const measurementUnit = req.body.measurementUnit;
    const price = req.body.price;
    const discount = req.body.discount;
    const addedBy = req.body.addedBy;
    const image = req.file.filename;

    const sql = `INSERT INTO products_details (ADMIN_ID, PRODUCT_NAME_EN, PRODUCT_NAME_BN, PRODUCT_IN_STOCK_QUANTITY,` +
                ` PRODUCT_MEASUREMENT_UNIT, PRODUCT_AGRO_PRICE, PRODUCT_DISCOUNT, PRODUCT_IMG) VALUES ` +
                `(?, ?, ?, ?, ?, ?, ?, ?)`
            
    connection.query(sql, [addedBy, nameEN, nameBN, inStockQuantity, measurementUnit, price, discount, image], (err, result) => {
        if(err){
            res.status(500).json({result});
        }
        else {
            res.status(201).json({result});
        }
    })   
})


router.get("/", (req, res) => {
    let sql = `SELECT * FROM products_details`;
    connection.query(sql, (err, data) => {
        if(err){
            console.error(err);
        } else {
            res.status(200).json(data)
        }
    })
})


router.get("/:id", (req, res) => {
    var id = req.params.id;
    let sql = `SELECT * FROM products_details WHERE PRODUCT_ID = ?`;
    connection.query(sql, [id], (err, data) => {
        if(err){
            console.error(err);
        } else {
            res.status(200).json({data})
        }
    })
})

module.exports = router;
