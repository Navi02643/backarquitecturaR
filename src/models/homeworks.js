const mongoose = require("mongoose");
const { Schema } = mongoose;

const homeworkSchema = new Schema({
  homeworkproject: {
    type: Schema.Types.ObjectId,
    ref: "project",
  },
  homeworkuser: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  homeworkname: {
    type: String,
  },
  homeworkdescriptionn: {
    type: String,
  },
  homeworkstatus: {
    type: String,
  },
});

module.exports = mongoose.model("homework", homeworkSchema);
