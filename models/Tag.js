import mongoose from "mongoose";

const tagShema = new mongoose.Shema({
  name: { type: String, require: true },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
});

const Tag = mongoose.model("Tag", tagShema);

export default Tag;
