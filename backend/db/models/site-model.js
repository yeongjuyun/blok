import { model } from "mongoose";
import { SiteSchema } from "../schemas/site-schema";

const Site = model("sites", SiteSchema);

export class SiteModel {
    async findAll() {
        const sites = await Site.find({});
        return sites;
    }
    async create(siteInfo) {
        const createdNewSite = await Site.create(siteInfo);
        return createdNewSite;
      }
}

const siteModel = new SiteModel();

export { siteModel };
