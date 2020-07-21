const mongoose = require("mongoose");
const { Schema } = mongoose;


const bookSchema = new Schema({
  title: String,
  author: { type: Schema.ObjectId, ref: "Author" },
  genres: { type: Array },
  publishing: Number,
  publisher: String,
  image: String,
  story: String,
  rates: [{
    user: { type: Schema.ObjectId, ref: "User" },
    rate: Number
  }]
},
{
  versionKey: false
});

module.exports = mongoose.model("Book", bookSchema);
