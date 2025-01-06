import mongoose from "mongoose";

const publisherShema = new mongoose.Schema({
  name: { type: String, require: true },
  location: { type: Number, require: true },
});

const Publisher = mongoose.model("Publisher", publisherShema);

export default Publisher;
