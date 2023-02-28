/**
 *  Database connection core file
 */
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12601683',
    password: 'FmtXPbkp2L',
    database: 'sql12601683',
    port: 3306
});

conn.connect((err)=> {
    if(err) {
        console.log(err);
        return;
    }

    console.log("Connected successfully. Connection information:" + conn);

});

module.exports = {
    conn
};