require("dotenv").config()
let express = require("express");
let router = express.Router({mergeParams: true});
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const fs = require('fs');







module.exports = router;