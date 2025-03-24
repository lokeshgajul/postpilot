import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const PostModel = mongoose.model("Posts", postSchema);
export default PostModel;
