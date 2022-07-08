import User from "../models/User";
import { Router } from "express";
import { s3Uploadv2, upload } from "../controller";

const router = Router();

router.get("/", (req, res) => {
    res.send("User Router");
});

router.get("/all", async (req, res) => {
    const result = await User.find({}).exec();
    return res.json(result);
});

router.post("/adduser", upload.single("file"), async (req, res) => {
    // S3 이미지 처리 process
    const profileImg = [];
    const results = await s3Uploadv2(req.file);

    profileImg.push(results.Location);
    // S3 이미지 저장 주소
    await console.log(profileImg);
    // Mongo DB 저장
    const userdata = new User({
        profileImg: profileImg,
    });
    await userdata.save();
    res.redirect("/");
});
module.exports = router;
