const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: String,
  isAdmin: { type: Boolean, default: false }
},
{
  versionKey: false
});

module.exports = mongoose.model("User", userSchema);
