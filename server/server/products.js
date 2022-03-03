import express from 'express';
let router = express.Router({mergeParams: true});
import fs from 'fs';

import connection from '../database/model.js';
import upload from "../Helpers/File.js";
import {isLoggedIn, isAdmin, verifyJWT} from "./middlewear.js";

router.get('/season', (req, res) => {
    let sql = `SELECT * FROM seasons`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {
            console.log(result)
            res.status(200).json({ result })
        }
    })
})

router.get("/", (req, res) => {
    let sql = `SELECT PRODUCT_ID, PRODUCT_NAME_EN, PRODUCT_NAME_BN, PRODUCT_IN_STOCK_QUANTITY, PRODUCT_MEASUREMENT_UNIT, PRODUCT_AGRO_PRICE, PRODUCT_DISCOUNT, PRODUCT_IMG FROM products_details where IS_AVAILABLE = 1 LIMIT 0, 20`;
    connection.query(sql, (err, data) => {
        if(err){
            res.status(500).send();
        } else {
            res.status(200).json(data)
        }
    })
})

router.get("/:id", (req, res) => {
    var id = req.params.id;
    let sql = `SELECT PRODUCT_ID, PRODUCT_NAME_EN, PRODUCT_NAME_BN, PRODUCT_IN_STOCK_QUANTITY, PRODUCT_MEASUREMENT_UNIT, PRODUCT_AGRO_PRICE, PRODUCT_DISCOUNT, PRODUCT_IMG, PRODUCT_DETAILS FROM products_details WHERE PRODUCT_ID = ? LIMIT 0, 20`;
    connection.query(sql, [id], (err, data) => {
        if(err){
            res.status(500).send();
        } else {
            res.status(200).json({data})
        }
    })
})


export default router;
