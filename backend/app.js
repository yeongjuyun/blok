require("dotenv").config();

const PORT = process.env.SERVER_PORT || 8000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.listen(PORT, function () {
    console.log(`listening on http://localhost:${PORT}`);
});

const DB_URL =
    process.env.MONGODB_URL ||
    "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요. \n.env 파일도 필요합니다.\n";

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () =>
    console.log("정상적으로 MongoDB 서버에 연결되었습니다. " + DB_URL)
);
db.on("error", (error) =>
    console.error(
        "\nMongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error
    )
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRouter = require("./routers/user-router");

app.use("/users", userRouter);
app.get("/", function (req, res) {
    res.send("<h1>welcome page</h1>");
});
