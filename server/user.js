let express = require("express");
let bodyParser = require('body-parser')
let router = express.Router({mergeParams: true});
let dev = process.env.NODE_ENV !== "production"
let next = require('next')
let app = next({dev})
const fs = require('fs');

let connection = require("../database/model");
let upload = require("../Helpers/File")


// router.get("/login", (req, res) => {


//     connection.query(sql, (err, result) => {
//         if(err){
//             res.status(500);
//         }
//         else {
//             res.status(201).json({result});
//         }
//     })   
// })


router.post("/registration", upload, (req, res) => {
    const name = req.body.name;
    const businessName = req.body.businessName;
    const password = req.body.password;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;
    const address = req.body.address;

    const checkExistingUser = `SELECT USER_ID FROM user_details WHERE USER_PHONE = "${phoneNo}" || USER_EMAIL = "${email}"`;
    connection.query(checkExistingUser, (err, result) => {
        if(err){
            res.status(500).send({message: "Server error"});
            console.log(err);
        } 
        else if(result[0] !== undefined){
            res.status(205).send({message: "Email or password aleady exist!"});
        }
        else {
            const insertUserSQL = `INSERT INTO user_details (USER_NAME, USER_PASSWORD, USER_PHONE, USER_EMAIL) VALUES ("${name}" , "${password}", "${phoneNo}", "${email}")`;
            connection.query(insertUserSQL, (err, result) => {
                if(err){
                    res.status(500).send({message: "Server error"});
                    console.log(err);
                }
                else {
                    const getUserIdSQL = `SELECT USER_ID FROM user_details WHERE USER_PHONE = "${phoneNo}" && USER_EMAIL = "${email}"`
                    connection.query(getUserIdSQL, (err, result) => {
                        if(err){
                            res.status(500).send({message: "Failed to add restaurent details"});
                            console.log(err);
                        }
                        else {
                            let userid = result[0].USER_ID;
                            const insertRestaurentSQL = `INSERT INTO restaurents_details (USER_ID, RESTAURENTS_NAME, RESTAURENTS_ADDRESS) VALUES ("${userid}", "${businessName}", "${address}")`
                            connection.query(insertRestaurentSQL, (err, result) => {
                                if(err){
                                    res.status(500).send({message: "Failed to add restaurent details"});
                                    console.log(err);
                                }
                                else {
                                    res.status(201).send({result});
                                    // res.render() 
                                    return app.render(req, res, "/")  
                                                                   
                                }
                            })
                        }
                    })
                }
            })   
        } 
    })
})

module.exports = router;