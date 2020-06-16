const mongoose = require("mongoose");
const { Schema } = mongoose;


const commentSchema = new Schema({
  title: String,
  user: { type: Schema.ObjectId, ref: "User" },
  book: { type: Schema.ObjectId, ref: "Book" },
  date: String,
  comment: String
},
{
  versionKey: false
});

module.exports = mongoose.model("Comment", commentSchema);
