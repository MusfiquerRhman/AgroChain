import express from 'express';
let router = express.Router({ mergeParams: true });
import fs from 'fs';

import connection from '../database/model.js';
import upload from "../Helpers/File.js";
import { isAdmin, verifyJWT } from "./middlewear.js";

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
    const seasons = req.body.seasons;
    const tags = req.body.tags;
    let isAvailable = req.body.isAvailable;
    if (isAvailable) {
        isAvailable = 1;
    }
    else {
        isAvailable = 0;
    }

    const sql = `INSERT INTO products_details (ADMIN_ID, PRODUCT_NAME_EN, PRODUCT_NAME_BN, PRODUCT_IN_STOCK_QUANTITY, PRODUCT_MEASUREMENT_UNIT, 
        PRODUCT_AGRO_PRICE, PRODUCT_DISCOUNT, PRODUCT_IMG, PRODUCT_DETAILS, IS_AVAILABLE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    connection.query(sql, [addedBy, nameEN, nameBN, inStockQuantity, measurementUnit, price, discount, image, details, isAvailable], (err, result) => {
        if (err) {
            res.status(500).json({ result });
        }
        else {
            let sql = "SELECT `PRODUCT_ID` FROM `products_details` WHERE ADMIN_ID = ? ORDER BY `ADDED_AT` DESC LIMIT 1"
            connection.query(sql, [addedBy], (err, productId) => {
                if (err) {
                    res.status(500).send();
                }
                else {
                    let seasonCount = 0, tagscount = 0;
                    seasons.map(season => {
                        let sql = 'INSERT INTO seasons_map (PRODUCT_ID, SEASON_ID) VALUES (?, ?)';
                        connection.query(sql, [productId[0].PRODUCT_ID, season], (err, result) => {
                            if (err) {
                                res.status(201).send("seasons");
                            }
                            else {
                                seasonCount++;
                                if (seasonCount === seasons.length) {
                                    tags.map(tag => {
                                        let sql = "INSERT INTO tags_map (`TAG_ID`, `PRODUCT_ID`) VALUES (?, ?)";
                                        connection.query(sql, [productId[0].PRODUCT_ID, tag], (err, result) => {
                                            if(err){
                                                res.status(201).send();
                                            }
                                            else {
                                                tagscount++;
                                                if(tagscount === tags.length){
                                                    res.status(200).send("tags");
                                                }
                                            }
                                        })
                                    })
                                }
                            }
                        })
                    })
                }
            })
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
        if (err) {
            res.status(500).json({ result });
        }
        else {
            res.status(201).json({ result });
        }
    })
})


router.post('/season', upload, isAdmin, verifyJWT, (req, res) => {
    let sql = `INSERT INTO seasons (SEASON_NAME,SEASON_START_DAY,SEASON_START_MONTH,SEASON_END_DAY,SEASON_END_MONTH,SEASON_DESCRIPTION) VALUES (?, ?, ?, ?, ?, ?)`
    let seasonName = req.body.seasonName;
    let startDay = req.body.startDay;
    let endDay = req.body.endDay;
    let startMonth = req.body.startMonth;
    let endMonth = req.body.endMonth;
    let description = req.body.description;

    connection.query(sql, [seasonName, startDay, startMonth, endDay, endMonth, description], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send();
        }
        else {
            res.status(200).send()
        }
    })
})


router.get('/season', isAdmin, verifyJWT, (req, res) => {
    let sql = `SELECT * FROM seasons`;

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {
            res.status(200).json({ result })
        }
    })
})

router.delete('/season/:id', isAdmin, verifyJWT, (req, res) => {
    const seasonId = req.params.id;
    let sql = "DELETE FROM seasons WHERE SEASON_ID = ?"

    connection.query(sql, [seasonId], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {
            res.status(200).send();
        }
    })
})


router.put('/season/:id', isAdmin, verifyJWT, upload, (req, res) => {
    const id = req.params.id;
    const seasonName = req.body.seasonName;
    const startDay = req.body.startDay;
    const endDay = req.body.endDay;
    const startMonth = req.body.startMonth;
    const endMonth = req.body.endMonth;
    const description = req.body.description;

    const sql = "UPDATE seasons SET SEASON_NAME = ?, SEASON_START_DAY = ?, SEASON_START_MONTH = ?, SEASON_END_DAY = ?, SEASON_END_MONTH = ?, SEASON_DESCRIPTION = ? WHERE SEASON_ID = ?";

    connection.query(sql, [seasonName, startDay, startMonth, endDay, endMonth, description, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {
            res.status(200).send();
        }
    })
})

router.get("/seasonshort", isAdmin, verifyJWT, (req, res) => {
    const sql = "SELECT `SEASON_ID`, `SEASON_NAME` FROM `seasons`";
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send()
        }
        else {
            res.status(200).send(result)
        }
    })
})


router.get("/tags", isAdmin, verifyJWT, upload, (req, res) => {
    const sql = "SELECT `TAG_ID`,`TAG_NAME`,`TAG_DESCRIPTION` FROM tags";
    connection.query(sql, (err, result) => {
        if(err){
            res.send(500).send();
        }
        else{
            res.status(200).send(result);
        }
    })
})


router.post("/tags", isAdmin, verifyJWT, upload, (req, res) => {
    const tagName = req.body.tagName;
    const tagDescription = req.body.tagDescription;
    const sql = "INSERT INTO tags (`TAG_NAME`, `TAG_DESCRIPTION`) VALUES (?, ?)";
    connection.query(sql, [tagName, tagDescription], (err, result) => {
        if(err){
            res.status(500).send();
        }
        else {
            res.status(200).send();
        }
    })
})


router.put("/tags/:id", isAdmin, verifyJWT, upload, (req, res) => {
    const tagName = req.body.tagName;
    const tagDescription = req.body.tagDescription;
    const tagId = req.params.id;
    const sql = "UPDATE tags SET TAG_NAME = ?, TAG_DESCRIPTION = ? WHERE TAG_ID = ?";
    connection.query(sql, [tagName, tagDescription, tagId], (err, result) => {
        if(err){
            res.status(500).send();
        }
        else{
            res.status(200).send();
        }
    })
})

router.delete("/tags/:id", isAdmin, verifyJWT, upload, (req, res) => {
    const tagId = req.params.id;
    const sql = "DELETE from tags WHERE `TAG_ID` = ?";
    connection.query(sql, [tagId], (err, results) => {
        if(err){
            res.status(500).send();
        }
        else{
            res.status(200).send();
        }
    })
})


export default router;
