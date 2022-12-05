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

module.exports = router;