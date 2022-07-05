require("dotenv").config();

const PORT = process.env.SERVER_PORT || 8000;
const express = require("express");
const app = express();

const userRouter = require("./routers/user-router");
const dbconnect = require("./models/index");

app.listen(PORT, function () {
    console.log(`listening on  http://localhost:${PORT}`);
});

app.use("/users", userRouter);
app.get("/", function (req, res) {
    res.send("<h1>welcome page</h1>");
});
