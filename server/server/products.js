import express from 'express';
let router = express.Router({mergeParams: true});
import fs from 'fs';

import connection from '../database/model.js';
import upload from "../Helpers/File.js";
import {isLoggedIn, isAdmin, verifyJWT} from "./middlewear.js";

router.get("/", (req, res) => {
    let sql = `SELECT * FROM products_details where IS_AVAILABLE = 1`;
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
    let sql = `SELECT * FROM products_details WHERE PRODUCT_ID = ?`;
    connection.query(sql, [id], (err, data) => {
        if(err){
            res.status(500).send();
        } else {
            res.status(200).json({data})
        }
    })
})

export default router;
