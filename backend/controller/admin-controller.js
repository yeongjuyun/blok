import { adminService, userService } from "../services";
import { asyncHandler, s3Uploadv2 } from "../utils";

const adminController = {
  getUsersInfoByPagenation: asyncHandler(async (req, res) => {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);
    const [totalCount, users] = await adminService.getUsersInfoByPagenation(
      page,
      perPage
    );
    const totalPage = Math.ceil(totalCount / perPage);
    res.status(200).json({ users, page, perPage, totalPage });
  }),

  editUserInfo: asyncHandler(async (req, res) => {
    const _id = req.params._id;
    const results = await s3Uploadv2(req.file);
    const profileImage = results.Location;
    const toUpdateUser = {
      ...req.body,
      profileImage: profileImage,
    };
    const updatedUser = await adminService.editUserInfo(_id, toUpdateUser);
    res.status(201).json(updatedUser);
  }),

  deleteUser: asyncHandler(async (req, res) => {
    const _id = req.params._id;
    const deletedUser = await userService.deleteUser(_id);
    res.status(204).json(deletedUser);
  }),
};

export { adminController };
