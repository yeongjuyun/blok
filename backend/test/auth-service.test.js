import { BadRequestError } from "../errors";
import { authService } from "../services";
import mongoose from "mongoose";
import "dotenv/config";

describe("userService 테스트", () => {
  let mockUser;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL + "test");
    mockUser = {
      email: "test@gmail.com",
      userName: "test",
      profileImage: "test-image",
    };
  });
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
  test("findOrCreateUser", async () => {
    const oauth = "google";
    const createdUser = await authService.findOrCreateUser(mockUser, oauth);
    expect(createdUser).toEqual(
      expect.objectContaining({ ...mockUser, oauth, password: "OAUTH" })
    );
    const loginedUser = await authService.findOrCreateUser(mockUser, oauth);
    // findByEmail aggregate에 의해 이미 등록된 계정은 _id가 userId로 전달됨
    // createdUser는 userModel.create로 만들어졌기 때문에 _id
    expect(loginedUser.userId).toEqual(createdUser._id);
  });
});
