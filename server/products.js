let express = require("express");
let bodyParser = require('body-parser')
let router = express.Router({mergeParams: true});
let dev = process.env.NODE_ENV !== "production"
let next = require('next')
let app = next({dev})
const fs = require('fs');

let connection = require("../database/model");
let upload = require("../Helpers/File")

let handle = app.getRequestHandler()
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//let multer = require("multer")
//let upload = multer();

router.post("/", upload, (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const nameEN = req.body.nameEN;
    const nameBN = req.body.nameBN;
    const inStockQuantity = req.body.inStockQuantity;
    const measurementUnit = req.body.measurementUnit;
    const price = req.body.price;
    const discount = req.body.discount;
    const image = req.file.filename;
            
    const sql = `INSERT INTO products_details (PRODUCT_NAME_EN, PRODUCT_NAME_BN, PRODUCT_IN_STOCK_QUANTITY,` +
                    ` PRODUCT_MEASUREMENT_UNIT, PRODUCT_AGRO_PRICE, PRODUCT_DISCOUNT, PRODUCT_IMG) VALUES ` +
                    `("${nameEN}", "${nameBN}", ${inStockQuantity}, "${measurementUnit}", ${price}, ${discount}), ${image}`
            
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }
        else {
            res.status(200).send({msg: "Product Added!"});
        }
    })   
})


router.get("/", (req, res) => {
    let sql = `SELECT * FROM products_details`;
    connection.query(sql, (err, data) => {
        if(err){
            console.error(err);
            app.render(req, res, '/');
        } else {
            res.status(200).json(data)
        }
    })
})

module.exports = router;
