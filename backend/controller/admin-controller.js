import { userService } from "../services";
import { asyncHandler } from "../utils";

const adminController = {
  getUserList: asyncHandler(async (req, res, next) => {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();
    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(users);
  }),
};

export { adminController };
