let express = require("express");
let connection = require("../database/model");
let bodyParser = require('body-parser')
let router = express.Router({mergeParams: true});
let dev = process.env.NODE_ENV !== "production"
let next = require('next')
let app = next({dev}) 
let upload = require("../Helpers/File")
let handle = app.getRequestHandler()

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/", jsonParser, (req, res, next) => {
    upload(req, res, (err) => {
        const nameEN = req.body.nameEN;
        const nameBN = req.body.nameBN;
        const inStockQuantity = req.body.inStockQuantity;
        const measurementUnit = req.body.measurementUnit;
        const price = req.body.price;
        const discount = req.body.discount;
        const image = req.file.filename;
        console.log(image)

        const sql = `INSERT INTO products_details (PRODUCT_NAME_EN, PRODUCT_NAME_BN, PRODUCT_IN_STOCK_QUANTITY,` +
                    ` PRODUCT_MEASUREMENT_UNIT, PRODUCT_AGRO_PRICE, PRODUCT_DISCOUNT) VALUES ` +
                    `("${nameEN}", "${nameBN}", ${inStockQuantity}, "${measurementUnit}", ${price}, ${discount})`

        connection.query(sql, (err, result) => {
            if(err){
                console.log(err)
                app.render(req, res, "/Products");
            }
            else {
                app.render(req, res, "/Products");
            }
        })
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
