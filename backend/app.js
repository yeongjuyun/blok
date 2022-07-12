import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routers";
import { errorHandler, getUserFromJWT } from "./middlewares";
import passport from "passport";
import passportStrategies from "./passport";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.SERVER_PORT || 8000;
const app = express();

const DB_URL = process.env.MONGODB_URL;
mongoose.connect(DB_URL);
mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
});

mongoose.connection.on("error", () => {
    console.log("MongoDB error");
});

// CORS 에러 방지
app.use(cors());

// cookieParser 사용
app.use(cookieParser());

// passport 전략 사용
passportStrategies();

// body parser 부분
app.use(express.json());

app.listen(PORT, function () {
    console.log(`listening on http://localhost:${PORT}`);
});

// 테스팅용 라우터, 제거예정
app.get("/", function (req, res) {
    res.send("<h1>welcome page</h1>");
});

// passport 사용
app.use(passport.initialize());

// api 라우팅
app.use("/api/user", userRouter);

// errorHandler
app.use(errorHandler);

export { app };
