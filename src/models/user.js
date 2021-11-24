const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  usernames: {
    type: String,
  },
  userlastname: {
    type: String,
  },
  useremail: {
    type: String,
  },
  userphonenumber: {
    type: String,
  },
  useridrole: {
    type: Schema.Types.ObjectId,
    ref: "role",
  },
  userpassword: {
    type: String,
  },
  userstatus: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("user", userSchema);
