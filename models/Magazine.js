import mongoose from "mongoose";

const magazineShema = new mongoose.Schema({
  title: { type: String, require: true },
  issueNumber: { type: Number, require: true },
  publissher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publisher",
  },
});

const Magazine = mongoose.model("Magazine", magazineShema);

export default Magazine;
