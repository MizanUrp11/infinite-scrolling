const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const app = express();

dotEnv.config();


app.use(cors());
app.use(express.json());

const postService = require("./postService");

app.get('/list', (req, res) => {

    const offset = req.query.offset;

    const promise = postService.getPosts(offset);
    promise.then(posts=>{
        res.json(posts);
    });
});

app.get("/listCount", (req, res) => {
    res.json({
        success: true
    });
});


app.listen(process.env.SERVER_PORT, () => {
    console.log('server connected');
})