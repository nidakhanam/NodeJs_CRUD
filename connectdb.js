var prop = require('./db_prop');
var mysql = require('mysql2');
module.exports = {
    getConnection : () => {
        return mysql.createConnection(prop);
    }
}