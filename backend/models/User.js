const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    name: String,
    email: String,
    password: String,
});

const userData = mongoose.model("userinfo", user);
module.exports = userData;
