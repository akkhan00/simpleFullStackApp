const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator"); // to validate the data
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.post("/signup",
    body("username", "username must be 5 char long").isLength({ min: 5 }),
    body("password", "password must be 5 char long").isLength({ min: 5 }),
    body("email", "please use a valid email address").isEmail(),
    async (req, res) => {
        try {
            // check weither error exist in body data
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors });
            }

            // Check wither the email address already exist or not
            const isExistInDB = await User.findOne({ email: req.body.email });
            if (isExistInDB) {
                return res.status(400).send({ success: false, errors: "User with this email already Exist" })
            }

            // Encrypt the password and then store in db
            const salt = bcrypt.genSaltSync(10);
            const encryptPassword = bcrypt.hashSync(req.body.password, salt);
            // add data to database
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: encryptPassword
            })

            // after added to db with send authtoken in order to stay login secure
            const data = {
                user: {
                    id: user.id
                }
            }
            // create jwt token
            const token = jwt.sign(data, process.env.JWT_SECRET_KEY);

            // send token to client
            res.json({ success: true, authtoken: token })

        } catch (err) {
            console.log(err);
        }
    })

router.post("/login",
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    async (req, res) => {
        try {
            // check whether error exist in user sended data
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors });
            }

            // check whether the user exist in database
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ success: false, errors: "User with this email doesn't Exist" })
            }

            // match the password of user sended pass and database encrypted pass
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({ success: false, errors: "Invalid UserName or Password" });
            }

            // create jwt token
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, process.env.JWT_SECRET_KEY);

            // send token back to client
            return res.status(200).json({ success: true, authtoken: token });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, errors: "Internal Server Error" });
        }
    })

module.exports = router;