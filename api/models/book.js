const mongoose = require("mongoose");
const { Schema } = mongoose;


const bookSchema = new Schema({
  title: String,
  author: { type: Schema.ObjectId, ref: "Author" },
  genres: { type: Array },
  publishing: Number,
  publisher: String,
  image: String,
  story: String
},
{
  versionKey: false
});

module.exports = mongoose.model("Book", bookSchema);
