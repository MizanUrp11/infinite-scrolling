const axios = require("axios");
const db = require("./db");

//Pull information and save the response to the database
async function insertPostIntoDb() { 
    const dbInstance = db.getDbInsance();
    const connection = dbInstance.getConnection();

    const response =await axios.get('https://jsonplaceholder.typicode.com/posts');

    const posts = response.data;
    const postsLength = posts.length;

    let query = "INSERT INTO posts (title, body) VALUES ";

    posts.forEach((post,index) => {
        query += `("${post.title}", "${post.body}")`;
        if (index + 1 != postsLength){
            query += ",";
        }
    });
    // console.log(query);
    connection.query(query,(err,result)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(result);
    })
 }

insertPostIntoDb();