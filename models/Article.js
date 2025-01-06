import mongoose from "mongoose";

const articleShema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});
const Article = mongoose.model("Article", articleShema);

export default Article;
