const oauthBlocker = (req, res, next) => {
  if (req.user.oauth !== "local-user") {
    throw new Error("소셜 계정은 이용할 수 없는 기능입니다.");
  }
  next();
};

export { oauthBlocker };
