const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImg: {
        type: [String],
        required: false,
    },
});

const userData = mongoose.model("team12user", user);
module.exports = userData;
