const mongoose = require("mongoose");

// schema for spPosts
const postsSchema = new mongoose.Schema(
  {
   
   title:{ type: String},
   description: { type: String},
   date:{type:String},
},
  { timestamps: true }
);

const Post = mongoose.model("Post", postsSchema);

module.exports = Post;