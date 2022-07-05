const express = require("express");
const UserSchema = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("User Router");
});

router.post("/adduser", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const user = new UserSchema({
        name: name,
        email: email,
        password: password,
    });
    user.save((err, user) => {
        if (err) {
            res.send(err);
        }
        res.send(user);
    });
});
module.exports = router;
