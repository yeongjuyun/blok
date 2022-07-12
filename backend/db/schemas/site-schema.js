import { Schema } from "mongoose";

const SiteSchema = new Schema(
    {
        siteName: {
            type: String,
            required: false,
        },
        siteUrl: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        siteThema: {
            type: String,
            required: false,
        },
        siteFont: {
            type: String,
            required: false,
        },
        siteColor: {
            type: new Schema({
                primaryColor: String,
                secondaryColor: String,
                backgroundColor: String,
                surfaceColor: String,
            })
        },
    }
)

export { SiteSchema };
