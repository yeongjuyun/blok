import { loginRequired, oauthBlocker } from "../middlewares";
import { siteController } from "../controller";
import { Router } from "express";
import { siteService } from "../services";
const siteRouter = Router();

siteRouter.post("/addsite", siteController.addsite);

siteRouter.get("/:siteIdentifier", siteController.getSiteInfo);

siteRouter.patch("/update/:siteIdentifier", siteController.updateSite);

siteRouter.delete("/delete/:siteIdentifier", siteController.deleteSite);

export { siteRouter };
