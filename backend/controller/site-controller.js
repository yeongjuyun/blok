import is from "@sindresorhus/is";
import { siteService } from "../services";
import { asyncHandler } from "../utils";

import { BadRequestError, ForbiddenError } from "../errors";

const siteController = {
  addsite: asyncHandler(async (req, res, next) => {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    const { owner, name, domain } = req.body;
    const newSite = await siteService.addSite({
      owner,
      name,
      domain,
    });
    return res.status(201).json(newSite);
  }),
};

export { siteController };
