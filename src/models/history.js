const mongoose = require("mongoose");
const { Schema } = mongoose;

const historySchema = new Schema({
  historyname: {
    type: String,
  },
  historydate: {
    type: Date
  }
});

module.exports = mongoose.model("history", historySchema);
