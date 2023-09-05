const mysql = require("mysql")

const connection = mysql.createConnection({

    host:"localhost",    
    user:"root",
    password:"manager",
    port:"3306",
    database:"Library_Management",
})

    connection.connect()
    module.exports = connection