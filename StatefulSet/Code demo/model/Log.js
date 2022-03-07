const { model, Schema } = require("mongoose");

const logSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
});

const Log = model("Log", logSchema);
module.exports = Log;
