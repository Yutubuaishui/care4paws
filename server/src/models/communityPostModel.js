const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const communityPostSchema = new mongoose.Schema(
    {
        caption: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            default: "no photo"
        },
        postedBy: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            username: { type: String },
            role: { type: String },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("communityPost", communityPostSchema);
