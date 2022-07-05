require("dotenv").config();

const PORT = process.env.SERVER_PORT || 8000;
const express = require("express");
const app = express();

app.listen(PORT, function () {
    console.log(`listening on  http://localhost:${PORT}`);
});

app.get("/", function (req, res) {
    res.send("<h1>welcome page</h1>");
});
