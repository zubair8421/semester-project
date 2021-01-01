const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Room model
const Room = require("../../modles/Room");
//user model
const User = require("../../modles/User");

//mainschema model
const roomarr = require("../../modles/mainSchema");
//validation
const validateRoomInput = require("../../validation/room");

//for testing purpose
router.get("/test", (req, res) => {
  res.json({ msg: "In the Rooms Area!" });
});

// @route Get api/router/Room
// @disc it'll create a room.
// @acces and its access is private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRoomInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    console.log(req.user);
    const newRoom = new Room({
      name: req.body.name,
      user: req.user
    });
    // addin newroom to the array
    // roomarr.require;
    // roomarr.RoomList.unshift(newRoom);
    // console.log(req.user);
    //saving current room
    newRoom.save().then(room => res.json(room));
  }
);

// @route   DELETE api/room/:id
// @desc    Delete rooom
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Room.findById(req.params.id)
        .then(room => {
          // Check for post owner
          if (room.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          room.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ roomnotfound: "Room not found" }));
    });
  }
);

// @route post /message/:id
// @disc 'll send message in room with the id.
// @acces and its access is private

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Room.find({}, rooms => {
      const roommap = [];
      roomarr.ad;
      // let i = 0;
      // rooms.forEach(room => {
      //   roommap[i++] = room;
      // });
      // Room.aggregate([{ $group: { user: "$name" } }]);
      res.json(roommap);
      console.log(roomarr.RoomList);
    });
  }
);
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//add message

router.post(
  "/message/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Room.findById(req.params.id)
      .then(room => {
        //check to see if the comment exist
        const newMessage = {
          user: req.user,
          text: req.body.text
        };
        //push is used here which will add message at the end of the array
        console.log(req.body.text), room.message.push(newMessage);
        // console.log(room.message);
        room.save().then(room => res.json(room));
      })
      .catch(err => res.status(404).json({ roomnotfound: "Room not found!" }));
  }
);

//route Delete api/route/room/message/:id/:message_id
// delete message

router.delete(
  "/message/:id/message_id",
  // "/:id/message_id", :id will be the room id
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Room.findById(req.params.id)
      .then(room => {
        // Check to see if comment exists
        if (
          room.message.filter(
            message => message._id.toString() === req.params.message_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ messagenotexists: "message does not exist" });
        }

        // Get remove index
        const removeIndex = room.message
          .map(item => item._id.toString())
          .indexOf(req.params.message_id);

        // Splice comment out of array
        room.message.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ roomnotfound: "Room not found!" }));
  }
);

module.exports = router;
