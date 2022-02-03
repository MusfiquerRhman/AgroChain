import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import connection from '../database/model.js';
import dotenv from "dotenv";
import upload from "../Helpers/File.js";
import {isLoggedIn, verifyJWT} from "./middlewear.js";

let router = express.Router();
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

router.get('/isLoggedIn', async (req, res) => {
    try{
        if(!req.session.userId){
            res.status(200).send({code: 100});
        }
        else if(req.session.userId && req.session.userType !== "AVATER"){
            res.status(200).send({code: 200});
        }
        else if(req.session.userId && req.session.userType === "AVATER"){
            res.status(200).send({code: 970904});
        }
    }
    catch {
        res.status(401).send()
    }
});

router.post("/registration", upload, async (req, res) => {
    try {
        const name = req.body.name;
        const businessName = req.body.businessName;
        const password = req.body.password;
        const email = req.body.email;
        const phoneNo = req.body.phoneNo;
        const address = req.body.address;

        const hashedPassword = await bcrypt.hash(password, 10);

        const checkExistingUser = `SELECT USER_ID FROM user_details WHERE USER_PHONE = ? || USER_EMAIL = ?`;
        connection.query(checkExistingUser, [phoneNo, email],  (err, result) => {
            if(err){
                res.status(500).send();
                console.log(err);
            } 
            else if(result[0] !== undefined){
                res.status(205).send();
            }
            else {
                const insertUserSQL = `INSERT INTO user_details (USER_NAME, USER_PASSWORD, USER_PHONE, USER_EMAIL)` +
                                     ` VALUES (?, ?, ?, ?)`;

                connection.query(insertUserSQL, [name, hashedPassword, phoneNo, email], (err, result) => {
                    if(err){
                        res.status(500).send();
                        console.log(err);
                    }
                    else {
                        if(typeof businessName === undefined){
                            res.status(201).json({result}); 
                        } 
                        else {
                            const getUserIdSQL = `SELECT USER_ID FROM user_details WHERE USER_PHONE = ? && USER_EMAIL = ?`
                            connection.query(getUserIdSQL, [phoneNo, email], (err, result) => {
                                if(err){
                                    res.status(500).send();
                                    console.log(err);
                                }
                                else {
                                    let userid = result[0].USER_ID;
                                    const insertRestaurentSQL = `INSERT INTO restaurents_details (USER_ID, RESTAURENTS_NAME, RESTAURENTS_ADDRESS)` +
                                                                ` VALUES (?, ?, ?)`
    
                                    connection.query(insertRestaurentSQL, [userid, businessName, address], (err, result) => {
                                        if(err){
                                            res.status(500).send();
                                            console.log(err);
                                        }
                                        else {
                                            res.status(201).json({result});                          
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            } 
        })
    } 
    catch (e) {
        res.status(500).send();
    }
});


router.post("/login", upload, async (req, res) => {
    const userEmail = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM user_details WHERE USER_EMAIL = ?`;
    connection.query(sql, [userEmail], (err, users) => {
        if(err){
            res.status(500).send();
            console.log(err);
        }
        else {
            if(users.length > 0){
                if(bcrypt.compareSync(password, users[0].USER_PASSWORD)){
                    const user = {
                        userId: users[0].USER_ID
                    }
                    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 60*60*14});
                    req.session.userId = users[0].USER_ID;
                    req.session.userType = users[0].USER_TYPE;

                    req.session.save((err) => {
                        if(err){
                            console.log(err);
                        }
                        else {
                            res.status(200).json({
                                token: token, 
                                userId: users[0].USER_ID,
                                userName: users[0].USER_NAME,
                                userEmail: users[0].USER_EMAIL,
                                userPhone: users[0].USER_PHONE,
                                userType: users[0].USER_TYPE,
                                userJoinDate: users[0].USER_JOIN_DATE
                            })
                        }
                    })
                } 
                else {
                    res.status(205).send();
                }
            } 
            else {
                res.status(204).send();
            }
        }
    })
})


router.post("/logout", isLoggedIn, (req, res) => {
    req.session.destroy();
    res.status(200).send();
})


router.get("/cart/:id", isLoggedIn, verifyJWT, async (req, res) => {
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
            res.status(500).send();
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
            res.status(500).send();
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
            res.status(500).send();
        }
        else {
            res.status(200).send();
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
            res.status(500).send();
        }
        else {
            let sql = `INSERT INTO orders (RESRESTAURENT_ID) VALUES ('${details[0].RESTAURENT_ID}');`

            connection.query(sql, (err, result) => {
                if(err){
                    console.log(err)
                    res.status(500).send();
                }
                else {
                    let sql = `SELECT ORDER_ID FROM orders WHERE RESRESTAURENT_ID = '${details[0].RESTAURENT_ID}'  ORDER BY ORDER_DATE DESC LIMIT 1`;
                    
                    connection.query(sql, (err, data) => {
                        if(err){
                            console.log(err)
                            res.status(500).send();
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
                                    res.status(500).send();
                                }
                                else {
                                    sql = `DELETE FROM cart_details WHERE USER_ID = '${userId}';`
                                    connection.query(sql, (err, output) => {
                                        if(err){
                                            res.status(500).send();
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


export default router;
