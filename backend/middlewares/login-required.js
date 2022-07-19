import passport from "passport";
import { InternalServerError, ForbiddenError } from "../errors";

function loginRequired(req, res, next) {
  return passport.authenticate("jwt", { session: false }, (authErr, user) => {
    if (authErr) {
      throw new InternalServerError("Internal Server Error: " + authErr);
    }
    if (!user) {
      throw new ForbiddenError("로그인한 유저만 사용할 수 있는 서비스입니다.");
    }
    req.user = user;
    next();
  })(req, res, next);
}

export { loginRequired };
