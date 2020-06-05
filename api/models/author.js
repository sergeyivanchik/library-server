const mongoose = require("mongoose");
const { Schema } = mongoose;


const authorSchema = new Schema({
  name: String,
  photo: String
},
{
  versionKey: false
});

module.exports = mongoose.model("Author", authorSchema);
