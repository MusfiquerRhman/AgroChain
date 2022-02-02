import express from 'express';
let router = express.Router({mergeParams: true});
import fs from 'fs';

import connection from '../database/model.js';
import upload from "../Helpers/File.js";
import {isAdmin, verifyJWT} from "./middlewear.js";

router.post("/add", isAdmin, verifyJWT, upload, (req, res) => {
    const nameEN = req.body.nameEN;
    const nameBN = req.body.nameBN;
    const inStockQuantity = req.body.inStockQuantity;
    const measurementUnit = req.body.measurementUnit;
    const price = req.body.price;
    const discount = req.body.discount;
    const addedBy = req.body.addedBy;
    const image = req.file.filename;
    const details = req.body.details;
    let isAvailable = req.body.isAvailable;
    if(isAvailable){
        isAvailable = 1;
    }
    else {
        isAvailable = 0;
    }

    const sql = `INSERT INTO products_details (ADMIN_ID, PRODUCT_NAME_EN, PRODUCT_NAME_BN, PRODUCT_IN_STOCK_QUANTITY, PRODUCT_MEASUREMENT_UNIT, 
        PRODUCT_AGRO_PRICE, PRODUCT_DISCOUNT, PRODUCT_IMG, PRODUCT_DETAILS, IS_AVAILABLE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            
    connection.query(sql, [addedBy, nameEN, nameBN, inStockQuantity, measurementUnit, price, discount, image, details, isAvailable], (err, result) => {
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


router.post('/season', upload, isAdmin, verifyJWT, (req, res) => {
    let sql = `INSERT INTO seasons (SEASON_NAME,SEASON_START_DAY,SEASON_START_MONTH,SEASON_END_DAY,SEASON_END_MONTH) VALUES (?, ?, ?, ?, ?)`
    let seasonName = req.body.seasonName;
    let startDay = req.body.startDay;
    let endDay = req.body.endDay;
    let startMonth = req.body.startMonth;
    let endMonth = req.body.endMonth;

    connection.query(sql, [seasonName, startDay, startMonth, endDay, endMonth], (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send();
        }
        else {
            res.status(200).send()
        }
    })
})


router.get('/season', isAdmin, verifyJWT, (req, res) => {
    let sql = `SELECT SEASON_ID, SEASON_NAME FROM seasons`
})

export default router;
