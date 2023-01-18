const express = require("express");
const conn = require("./connection/conn");
conn();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const secret = "ASSIGNMENTS";
const jwt = require('jsonwebtoken');

const app = express();

app.use("/posts", (req, res, next) => {
    const token = req.headers.authorization?.split("test ")[1];
    // console.log(token);
    if(token){
        console.log(req.user);
        jwt.verify(token, secret, function(err, decoded) {
            if(err) {
                console.log(err);
               return res.status(403).json({
                status: "Failed",
                message: "Token is not valid"
                });
            }
            req.user = decoded.data;
            next();
          });

    }else {
        res.status(403).json({
            status: "Failed",
            message: "User is not authenticated"
        })
    }
})

app.use("/", userRoutes);
app.use("/", postRoutes);

app.get("*", (req, res) => {
    res.status(404).send("API IS NOT FOUND");
})


app.listen(3000, () => console.log("Our server is up and running at port 3000"));