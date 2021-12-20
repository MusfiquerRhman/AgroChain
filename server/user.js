require("dotenv").config()
let express = require("express");
let router = express.Router({mergeParams: true});
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const fs = require('fs');

let connection = require("../database/model");
let upload = require("../Helpers/File");
const session = require("express-session");

const isLoggedIn = (req, res, next) => {
    if(!req.session.userId){
        res.status(403).send();
    }
    else {
        next();
    }
}

const isAdmin = (req, res, next) => {
    if(!req.session.userId || req.session.userType !== "ADMIN"){
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
                res.status(403).json("Failed to authenticate");
            }
            else {
                req.userId = user.userId;
                next()
            }
        })
    }
}

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


router.post("/login",  upload, async (req, res) => {
    const userEmail = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM user_details WHERE USER_EMAIL = ?`;
    connection.query(sql, [userEmail], (err, users) => {
        if(err){
            res.status(500).send();
            console.log(err);
        }
        else {
            console.log(users);
            if(users.length > 0){
                if(bcrypt.compareSync(password, users[0].USER_PASSWORD)){
                    const user = {
                        userId: users[0].USER_ID
                    }
                    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 60*60*14});
                    req.session.userId = users[0].USER_ID;
                    req.session.userType = users[0].USER_TYPE;
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

module.exports = router;

