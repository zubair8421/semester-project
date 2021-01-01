const mongoose = require("mongoose");
const Room = require("./Room");
const User = require("./User");

const Schema = mongoose.Schema;

const mainSchema = new Schema({
  RoomList: [
    {
      Room: {
        type: Schema.Types.ObjectId,
        ref: "Room"
      },
      Admin: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ]
});
// function addroom(oneroom){
//   mainSchema.RoomList.u
// }
module.exports = roomsarray = mongoose.model("roomsArray", mainSchema);
