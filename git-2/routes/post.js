const express = require("express");
const bodyParser = require('body-parser');
const Post = require("../models/posts");

const router = express.Router();
router.use(bodyParser.json());


router.post("/posts", async (req, res) => {
    try{
        const posts = await Post.create({
            title: req.body.title,
            body: req.body.body,
            image:req.body.image,
            user: req.user
        });

        res.json({
            status: "Success",
            posts
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }

});

router.get("/posts", async (req, res) => {
    try{
        const posts = await Post.find();
        res.json({
            status: "Success",
            posts
        })

    }catch(e){
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

router.patch("/posts/:id", async (req, res) => {
    try{
        await Post.updateOne({_id : req.params.id}, req.body);
        const posts =  await Post.findOne({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            posts
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});
router.delete("/posts/:id", async (req, res) => {
    try{
        const posts = await Post.deleteOne({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            posts
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

module.exports = router;