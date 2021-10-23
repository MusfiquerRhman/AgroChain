require("dotenv").config()
let express = require("express");
let router = express.Router({mergeParams: true});
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const fs = require('fs');

let connection = require("../database/model");
let upload = require("../Helpers/File")

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token){
        res.status(204).send();
    }
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err){
                res.status(403).json("Failed to authenticate");
            }
            else {
                req.user = user;
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

        const checkExistingUser = `SELECT USER_ID FROM user_details WHERE USER_PHONE = "${phoneNo}" || USER_EMAIL = "${email}"`;
        connection.query(checkExistingUser, (err, result) => {
            if(err){
                res.status(500).send();
                console.log(err);
            } 
            else if(result[0] !== undefined){
                res.status(205).send();
            }
            else {
                const insertUserSQL = `INSERT INTO user_details (USER_NAME, USER_PASSWORD, USER_PHONE, USER_EMAIL)` +
                                     ` VALUES ("${name}" , "${hashedPassword}", "${phoneNo}", "${email}")`;

                connection.query(insertUserSQL, (err, result) => {
                    if(err){
                        res.status(500).send();
                        console.log(err);
                    }
                    else {
                        const getUserIdSQL = `SELECT USER_ID FROM user_details WHERE USER_PHONE = "${phoneNo}" && USER_EMAIL = "${email}"`
                        connection.query(getUserIdSQL, (err, result) => {
                            if(err){
                                res.status(500).send();
                                console.log(err);
                            }
                            else {
                                let userid = result[0].USER_ID;
                                const insertRestaurentSQL = `INSERT INTO restaurents_details (USER_ID, RESTAURENTS_NAME, RESTAURENTS_ADDRESS)` +
                                                            ` VALUES ("${userid}", "${businessName}", "${address}")`

                                connection.query(insertRestaurentSQL, (err, result) => {
                                    if(err){
                                        res.status(500).send();
                                        console.log(err);
                                    }
                                    else {
                                        res.status(201).send({result});                          
                                    }
                                })
                            }
                        })
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

    const sql = `SELECT * FROM user_details WHERE USER_EMAIL = "${userEmail}"`;
    connection.query(sql, (err, result) => {
        if(err){
            res.status(500).send();
            console.log(err);
        }
        else {
            console.log(result);
            if(result.length > 0){
                if(bcrypt.compareSync(password, result[0].USER_PASSWORD)){
                    const user = {
                        userId: result[0].USER_ID,
                    }
                    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 1800});
                    const refreshToken = jwt.sign(user, process.env.REFRASH_TOKEN_SECRET);

                    const sql = `UPDATE user_details SET USER_REFRESH_TOKEN = "${refreshToken}" WHERE USER_ID = "${result[0].USER_ID}"`;
                    connection.query(sql, (err, result) => {
                        if(err){
                            res.status(500).send();
                        }
                        else {
                            res.status(200).json({
                                token: token, 
                                refreshToken: refreshToken,
                                userName: result[0].USER_NAME,
                                userId: result[0].USER_ID,
                                userEmail: result[0].USER_EMAIL,
                                userPhone: result[0].USER_PHONE,
                                userType: result[0].USER_TYPE,
                                userJoinDate: result[0].USER_JOIN_DATE
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

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

router.get("/token", (req, res) => {
    const refreshToken = req.body.refreshToken;
    const userId = req.body.userId;
    if(refreshToken == null){
        res.status(401).send();
    }
    else {
        let sql = `SELECT USER_REFRESH_TOKEN FROM user_details WHERE USER_ID = "${userId}"`
        connection.query(sql, (err, result) => {
            if(err){
                res.status(500).send()
            }
            else if(refreshToken !== result[0].USER_REFRESH_TOKEN){
                res.status(500).send();
            }
            else {
                jwt.verify(refreshToken, process.env.REFRASH_TOKEN_SECRET, (err, user) => {
                    if(err){
                        res.status(403).send();
                    }
                    else{
                        const accessToken = generateAccessToken({
                            userId: user.userId
                        });
                        res.json({accessToken: accessToken});
                    }
                })
            }
        })
    }
})

module.exports = router;


// const accessToken = generateAccessToken({
//     userName: user.userName,
//     userId: user.userId,
//     userEmail: user.userEmail,
//     userPhone: user.userPhone,
//     userType: user.userType,
//     userJoinDate: user.userJoinDate
// });


// const user = {
//     userId: result[0].USER_ID,
//     userName: result[0].USER_NAME,
//     userEmail: result[0].USER_EMAIL,
//     userPhone: result[0].USER_PHONE,
//     userType: result[0].USER_TYPE,
//     userJoinDate: result[0].USER_JOIN_DATE
// }