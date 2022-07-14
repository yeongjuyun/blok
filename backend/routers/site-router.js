import { loginRequired, oauthBlocker } from "../middlewares";
import { Router } from "express";
import { siteService } from "../services";
const siteRouter = Router();

siteRouter.post("/addsite", loginRequired, async (req, res) => {
  const { siteName, siteDomain, siteTheme, siteFont } = req.body;
  const newSite = await siteService.addSite({
    siteName,
    siteDomain,
    siteTheme,
    siteFont,
  });
  return res.status(201).json(newSite);
});

siteRouter.get("/:siteName", async (req, res) => {
  const siteName = req.params.siteName;
  const site = await siteService.getSiteInfo(siteName);
  res.status(200).json(site);
});

siteRouter.get("/", async (req, res) => {
  const userinfo = req.params.userinfo;
  const sites = await siteService.getSites(userinfo);
  res.status(200).json(sites);
});

export { siteRouter };
