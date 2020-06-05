const mongoose = require("mongoose");
const { Schema } = mongoose;


const selectedBooksSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  book: { type: Schema.ObjectId, ref: 'Book' },
},
{
  versionKey: false
});

module.exports = mongoose.model("SelectedBook", selectedBooksSchema);