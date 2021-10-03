const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'agrochain',
});

module.exports = connection;