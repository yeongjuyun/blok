import { loginRequired, oauthBlocker } from "../middlewares";
import { siteController } from "../controller";
import { Router } from "express";
import { siteService } from "../services";
const siteRouter = Router();

siteRouter.post("/addsite", siteController.addsite);

siteRouter.get("/:siteIdentifier", async (req, res) => {
  const siteIdentifier = req.params.siteIdentifier;
  const site = await siteService.getSiteInfo(siteIdentifier);
  res.status(200).json(site);
});

siteRouter.get("/", async (req, res) => {
  const sites = await siteService.getSitesInfo();
  res.status(200).json(sites);
});

siteRouter.patch("/update/:siteIdentifier", async (req, res) => {
  const siteIdentifier = req.params.siteIdentifier;

  const editName = req.body.name;
  const editDomain = req.body.domain;
  const editTheme = req.body.theme;
  const editFont = req.body.font;
  const editColor = req.body.colorset;
  const editBlocks = req.body.blocks;

  const toUpdate = {
    ...(editName && { editName }),
    ...(editDomain && { editDomain }),
    ...(editTheme && { editTheme }),
    ...(editFont && { editFont }),
    ...(editColor && { editColor }),
    ...(editBlocks && { editBlocks }),
  };

  const updatedSiteInfo = await siteService.updateSite(siteName, toUpdate);

  res.status(200).json(updatedSiteInfo);
});

siteRouter.delete("/delete/:siteIdentifier", async (req, res, next) => {
  const siteIdentifier = req.params.siteIdentifier;
  const deleteSite = await siteService.deleteSite(siteIdentifier);
  res.status(200).json(deleteSite);
});
export { siteRouter };
