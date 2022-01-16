import mysql from 'mysql'

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'agrochain',
});

export default connection;