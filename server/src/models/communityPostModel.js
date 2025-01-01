const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const communityPostSchema = new mongoose.Schema(
    {
        caption: { type: String, required: true },
        photo: { type: String, required: true },
        timestamp: { type: String, required: true },
        date: { type: String, required: true },
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
        postedBy: {
          id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
          username: { type: String, required: true },
          role: { type: String, required: true },
        },
});

module.exports = mongoose.model("communityPost", communityPostSchema);
