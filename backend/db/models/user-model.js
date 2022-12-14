import mongoose, { model } from "mongoose";
import { UserSchema } from "../schemas/user-schema";

const User = model("users", UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.aggregate([
      {
        $match: {
          email,
        },
      },
      {
        $addFields: {
          userId: "$_id",
        },
      },
      { $project: { _id: 0 } },
    ]);
    return user[0];
  }

  async findById(userId) {
    const user = await User.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $addFields: {
          userId: "$_id",
        },
      },
      { $project: { _id: 0 } },
    ]);
    return user[0];
  }

  async createSiteById(userId, siteId) {
    const user = await User.findOne({ _id: userId });
    const addSite = await User.update(
      { _id: userId },
      { $push: { sites: siteId } }
    );
    return user;
  }

  async deleteSiteById(userId, siteId) {
    const user = await User.findOne({ _id: userId });
    const deleteSite = await User.update(
      { _id: userId },
      { $pull: { sites: siteId } }
    );
    return deleteSite;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async countTotalUsers(searchKey, searchValue) {
    const pipeline = {};
    if (searchKey && searchValue) {
      pipeline[searchKey] = { $regex: searchValue, $options: "i" };
    }
    const totalCount = await User.countDocuments(pipeline);
    return totalCount;
  }

  async pagination(page, perPage, searchKey, searchValue) {
    const pipeline = [
      {
        $addFields: {
          userId: "$_id",
        },
      },
      { $project: { _id: 0 } },
    ];
    if (searchKey && searchValue) {
      pipeline.push({
        $match: {
          [searchKey]: { $regex: searchValue, $options: "i" },
        },
      });
    }
    const users = await User.aggregate(pipeline)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    return users;
  }

  async update(userId, update) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };
    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async delete(userId) {
    const filter = { _id: userId };
    const deletedUser = await User.findOneAndDelete(filter);
    return deletedUser;
  }
}

const userModel = new UserModel();

export { userModel };
