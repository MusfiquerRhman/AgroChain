let express = require("express");
let bodyParser = require('body-parser')
let router = express.Router({mergeParams: true});
let dev = process.env.NODE_ENV !== "production"
let next = require('next')
let jwt = require("jsonwebtoken");
let app = next({dev})
const fs = require('fs');

let connection = require("../database/model");
let upload = require("../Helpers/File")

// var jsonParser = bodyParser.json()
// let handle = app.getRequestHandler()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

const isLoggedIn = (req, res, next) => {
    if(!req.session.userId){
        res.status(403).send();
    }
    else {
        next();
    }
}

const isAdmin = (req, res, next) => {
    if(!req.session.userId || req.session.userType !== "AVATER"){
        res.status(403).send();
    }
    else {
        next();
    }
}

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token){
        res.status(403).send();
    }
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err){
                res.status(403).json({auth: false});
            }
            else {
                next()
            }
        })
    }
}

router.post("/", isAdmin, verifyJWT, upload, (req, res) => {
    console.log(req.file)
    const nameEN = req.body.nameEN;
    const nameBN = req.body.nameBN;
    const inStockQuantity = req.body.inStockQuantity;
    const measurementUnit = req.body.measurementUnit;
    const price = req.body.price;
    const discount = req.body.discount;
    const addedBy = req.body.addedBy;
    const image = req.file.filename;

    const sql = `INSERT INTO products_details (ADMIN_ID, PRODUCT_NAME_EN, PRODUCT_NAME_BN, PRODUCT_IN_STOCK_QUANTITY,
                 PRODUCT_MEASUREMENT_UNIT, PRODUCT_AGRO_PRICE, PRODUCT_DISCOUNT, PRODUCT_IMG) VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?)`
            
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
            res.status(500);
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
            res.status(500);
        } else {
            res.status(200).json({data})
        }
    })
})

router.get("/cart/:id", isLoggedIn, verifyJWT, (req, res) => {
    const userId = req.params.id;
    let sql = `SELECT C.CART_ID, C.CART_QUANTITY, P.PRODUCT_NAME_EN, P.PRODUCT_NAME_BN, P.PRODUCT_AGRO_PRICE, P.PRODUCT_DISCOUNT, P.PRODUCT_MEASUREMENT_UNIT, P.PRODUCT_IMG 
                FROM cart_details as C 
                JOIN user_details as U 
                    ON C.USER_ID = U.USER_ID 
                JOIN products_details as P 
                    ON P.PRODUCT_ID = C.PRODUCT_ID 
                WHERE C.USER_ID = ?`;
    connection.query(sql, [userId], (err, result) => {
        if(err){
            res.status(500);
        }
        else {
            res.status(200).json(result);
        }
    })
})

router.post("/cart", isLoggedIn, verifyJWT, upload, (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    console.log(req)

    const sql = "INSERT INTO cart_details (USER_ID, PRODUCT_ID, CART_QUANTITY) VALUES (?, ?, ?)"
    connection.query(sql, [userId, productId, quantity], (err, result) => {
        if(err){
            res.status(500).json({result});
        }
        else {
            res.status(201).json({result});
        }
    })
})

router.post("/cart/update/:id", isLoggedIn, verifyJWT, upload, (req, res) => {
    const cartId = req.params.id;
    const quantity = req.body.quantity;
    let sql = "UPDATE cart_details SET CART_QUANTITY = ? WHERE CART_ID = ?";
    connection.query(sql, [quantity, cartId], (err, results) => {
        if(err){
            res.status(500);
        }
        else {
            res.status(200).json(results);
        }
    })
})

router.get("/cart/delete/:id", isLoggedIn, verifyJWT, upload, (req, res) => {
    const cartId = req.params.id;
    let sql = `DELETE FROM cart_details WHERE CART_ID = ?`;
    connection.query(sql, [cartId], (err, results) => {
        if(err){
            res.status(500);
        }
        else {
            res.status(200);
        }
    })
})

router.post("/cart/submit/:id", isLoggedIn, verifyJWT, upload, (req, res) => {
    const userId = req.params.id;
    let sql = `SELECT R.RESTAURENT_ID, P.PRODUCT_ID, C.CART_QUANTITY, P.PRODUCT_DISCOUNT
                FROM cart_details as C 
                JOIN products_details as P 
                    ON P.PRODUCT_ID = C.PRODUCT_ID 
                JOIN restaurents_details as R
                    ON R.USER_ID = C.USER_ID
                WHERE C.USER_ID = ?`

    connection.query(sql, [userId], (err, details) => {
        if(err){
            res.status(500);
        }
        else {
            let sql = `INSERT INTO orders (RESRESTAURENT_ID) VALUES ('${details[0].RESTAURENT_ID}');`

            connection.query(sql, (err, result) => {
                if(err){
                    console.log(err)
                    res.status(500);
                }
                else {
                    let sql = `SELECT ORDER_ID FROM orders WHERE RESRESTAURENT_ID = '${details[0].RESTAURENT_ID}'  ORDER BY ORDER_DATE DESC LIMIT 1`;
                    
                    connection.query(sql, (err, data) => {
                        if(err){
                            console.log(err)
                            res.status(500);
                        }
                        else {
                            let orderId = data[0].ORDER_ID;
                            let sql = `INSERT INTO orders_map (ORDER_ID, PRODUCT_ID, ORDER_QUANTITY, ORDER_DISCOUNT) VALUES`;
    
                            for(let i = 0; i < details.length; i++){
                                sql += ` ('${orderId}', '${details[i].PRODUCT_ID}', ${details[i].CART_QUANTITY}, ${details[i].PRODUCT_DISCOUNT}),`;
                            }
                            sql = sql.slice(0, -1) + ';';
    
                            connection.query(sql, (err, output) => {
                                if(err){
                                    console.log(err)
                                    res.status(500);
                                }
                                else {
                                    sql = `DELETE FROM cart_details WHERE USER_ID = '${userId}';`
                                    connection.query(sql, (err, output) => {
                                        if(err){
                                            res.status(500);
                                        }
                                        else {
                                            res.status(200).json(output);
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

module.exports = router;
