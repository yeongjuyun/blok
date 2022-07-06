const express = require("express");
const UserSchema = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("User Router");
});

router.get("/all", async (req, res) => {
    const result = await UserSchema.find({}).exec();
    return res.json(result);
});

router.post("/adduser", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const userdata = new UserSchema({
        name: name,
        email: email,
        password: password,
    });
    const result = await userdata.save();
    res.redirect("/");
});
module.exports = router;
