import { model } from "mongoose";
import { SiteSchema } from "../schemas/site-schema";

const Site = model("sites", SiteSchema);

export class SiteModel {
    async create(siteInfo) {
        const createdNewSite = await Site.create(siteInfo);
        return createdNewSite;
    }
    async findAll() {
        const sites = await Site.find({});
        return sites;
    }
    async findBySiteName(siteId) {
        const site = await Site.findOne({ siteName: siteId });
        return site;
    }
    async update(siteId, update) {
        const filter = { siteName: siteId };
        const option = { returnOriginal: false };
        const updatedSite = await Site.findOneAndUpdate(filter, update, option);
        return updatedSite;
    }
    async delete(siteId) {
        const filter = { siteName: siteId };
        const deletedSite = await Site.findOneAndDelete(filter);
        return deletedSite;
    }
}

const siteModel = new SiteModel();

export { siteModel };
