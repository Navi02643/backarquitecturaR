const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema({
  rolename: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  }
});

module.exports = mongoose.model("role", roleSchema);
