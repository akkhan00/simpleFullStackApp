const express = require("express");
const router = express.Router();
const verifyUser = require("../middlewares/verifyUser");
const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");

router.post("/uploadpost",
    body("description", "maximun description is upto 200 char long").isLength({ max: 200 }),
    verifyUser, async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.send(400).json({ errors: errors });
            }
            // save post in database
            const post = await Post.create({
                description: req.body.description,
                imgUrl: req.body.imgUrl,
                user: req.user.id,
            })
            return res.json(post);
        } catch (error) {
            console.log(error);
            return res.send(500).json({ errors: "Internal Server Error" });
        }
    })

router.delete("/deletepost/:id", verifyUser, async (req, res) => {
    try {
        // find the post with id
        let post = await Post.findById(req.params.id)
        if (!post) return res.status(404).json({ errors: "no post found" })

        // match the user id and the post id . for security purpose
        if (post.user.toString() !== req.user.id) return res.status(400).json({ errors: "Don't have permission" });

        // delete the post from database
        post = await Post.findByIdAndDelete(req.params.id);

        // send response to client
        res.status(200).json({ msg: "successfully deleted", post: post })
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

router.put("/updatepost/:id", verifyUser, async (req, res) => {
    try {
        // find the post with id
        let post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ errors: "no post found" })

        // match the user id and the post onwer id.
        if (post.user.toString() !== req.user.id) return res.status(400).json({ errors: "Don't have permissions" })

        // update the post in database
        const newPost = {};
        let { imgUrl, description } = req.body;
        if (imgUrl) { newPost.imgUrl = imgUrl }
        if (description) { newPost.description = description }
        // now update it
        post = await Post.findByIdAndUpdate(req.params.id, { $set: newPost }, { $new: true });

        // send response back to client
        res.status(200).json({ msg: "succesfuly updated", post: post })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = router;