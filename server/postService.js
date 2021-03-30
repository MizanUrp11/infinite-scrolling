const db = require("./db");

async function getPosts(offset) { 
    const limit = 10;

    if(!offset){
        offset = 0;
    }

    const dbInstance = db.getDbInsance();
    const connection = dbInstance.getConnection();

    let query = "SELECT * FROM posts LIMIT 10 OFFSET " + offset;
    const response = await new Promise((resolve,reject)=>{
        connection.query(query,(err,results)=>{
            if (err) reject(err);
            resolve(results);
        });
    });
    return response;
 }

module.exports = { getPosts };



