const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;
const RoomSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  message: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        require: true
      },
      Date: {
        type: Date,
        Default: Date.now
      }
    }
  ],
  Date: {
    type: Date,
    Default: Date.now
  }
});

module.exports = Room = mongoose.model("roomSchema", RoomSchema);
