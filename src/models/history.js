const mongoose = require("mongoose");
const { Schema } = mongoose;

const historySchema = new Schema({
  historynameproject: {
    type: Schema.Types.ObjectId,
    ref: "project",
  },
  historynamehomework: {
    type: Schema.Types.ObjectId,
    ref: "homework",
  },
  historydate: {
    type: Date,
  },
});

module.exports = mongoose.model("history", historySchema);
