const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("User Router");
});

router.get("/all", async (req, res) => {
    const result = await User.find({}).exec();
    return res.json(result);
});

router.post("/adduser", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const userdata = new User({
        name: name,
        email: email,
        password: password,
    });
    await userdata.save();
    res.redirect("/");
});
module.exports = router;
