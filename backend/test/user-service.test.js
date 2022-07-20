import mongoose from "mongoose";
import "dotenv/config";
import { userService } from "../services";
import { BadRequestError } from "../errors";
import bcrypt from "bcrypt";
import { userModel } from "../db";

describe("userService 테스트", () => {
  let userId;
  let mockUser;
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL + "test");
    mockUser = {
      email: "test@example.com",
      userName: "test",
      password: "123123",
    };
  });
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
  test("addUser", async () => {
    const user = await userService.addUser(mockUser);
    userId = user._id;
    // 이메일, 유저네임은 동일하지만, 비밀번호는 hashedPassword이기 때문에 달라야 한다.
    expect(user).toEqual(
      expect.objectContaining({
        email: mockUser.email,
        userName: mockUser.userName,
      })
    );
    const isPasswordCorrect = await bcrypt.compare(
      mockUser.password,
      user.password
    );
    expect(isPasswordCorrect).toEqual(true);
    // 같은 이메일로 등록한 경우 BadRequestError throw
    // expect(async () => {
    //   await userService.addUser(mockUser);
    // }).toThrow(BadRequestError);
  });

  test("getUserInfo", async () => {
    const user = await userService.getUserInfo(userId);
    expect(user).toEqual(expect.objectContaining({ userId }));
  });

  test("changeProfileImage", async () => {
    const toUpdateImage = { profileImage: "test-image" };
    const user = await userService.changeProfileImage(userId, toUpdateImage);
    expect(user.profileImage).toEqual(toUpdateImage.profileImage);
  });

  test("changeUserPassword", async () => {
    const userInfoRequired = {
      userId,
      userName: mockUser.userName,
      currentPassword: mockUser.password,
    };
    const editPassword = "1231231";
    const toUpdate = { password: editPassword };
    const user = await userService.changeUserPassword(
      userInfoRequired,
      toUpdate
    );
    expect(user.passwordReset).toEqual(false);

    const isChangedCorrect = await bcrypt.compare(editPassword, user.password);
    expect(isChangedCorrect).toEqual(true);
    user.password = editPassword;
  });

  test("passwordReset", async () => {
    const user = await userService.passwordReset(
      mockUser.userName,
      mockUser.email
    );
    const isChangedCorrect = await bcrypt.compare(
      mockUser.password,
      user.password
    );
    expect(isChangedCorrect).toEqual(false);
    expect(user.passwordReset).toEqual(true);
  });

  test("deleteUser", async () => {
    let checkDeleteUser = await userModel.findById(userId);
    expect(checkDeleteUser).not.toEqual(undefined);
    await userService.deleteUser(userId);
    checkDeleteUser = await userModel.findById(userId);
    expect(checkDeleteUser).toEqual(undefined);
  });
});
