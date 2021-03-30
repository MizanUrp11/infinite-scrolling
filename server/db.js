const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
let instance = null;

const connection = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

connection.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Database connected");
})

class Db{
    static getDbInsance(){
        return instance ? instance : new Db();
    }
    getConnection(){
        return connection;
    }
}

module.exports = Db;