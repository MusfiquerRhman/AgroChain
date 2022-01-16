import express from 'express'
import bodyParser from 'body-parser'
let router = express.Router({mergeParams: true});
import jwt from 'jsonwebtoken'
import fs from 'fs'

import connection from '../database/model.js'
import upload from "../Helpers/File.js"

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

router.get('/orders', isAdmin, verifyJWT, (req, res) => {
    let sql = `SELECT o.ORDER_DATE, r.RESTAURENTS_NAME, r.RESTAURENTS_ADDRESS, op.ORDER_QUANTITY, op.ORDER_DISCOUNT, p.PRODUCT_NAME_EN, p.PRODUCT_AGRO_PRICE, p.PRODUCT_MEASUREMENT_UNIT, p.PRODUCT_NAME_BN
                FROM orders as o 
                JOIN restaurents_details as r 
                    ON o.RESRESTAURENT_ID = r.RESTAURENT_ID
                JOIN orders_map as op
                    ON o.ORDER_ID = op.ORDER_ID
                JOIN products_details as p
                    ON p.PRODUCT_ID = op.PRODUCT_ID
                ORDER BY o.ORDER_DATE`;

    connection.query(sql, (err, result) => {
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

export default router;
