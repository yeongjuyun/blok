import { model } from "mongoose";
import { SiteSchema } from "../schemas/site-schema";

const Site = model("sites", SiteSchema);

export class SiteModel {
    async findAll() {
        const sites = await Site.find({});
        return sites;
    }
}

const siteModel = new SiteModel();

export { siteModel };
