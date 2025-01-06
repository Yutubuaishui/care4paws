const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const communityPostSchema = new mongoose.Schema(
    {
        caption: { 
            type: String, 
            required: true },
        photo: { 
            type: String, 
            required: true },
        timestamp: { 
            type: String, 
            required: true },
        date: { 
            type: String, 
            required: true },
        likes: [{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        // comments: [{
        //     type:mongoose.Types.ObjectId, 
        //     ref:'comment' }],
        postedBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true },
});

module.exports = mongoose.model("communityPost", communityPostSchema);
