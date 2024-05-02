const mongo = require("mongoose");
const Schema = mongo.Schema;
const Chatmessage = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  RoomId:Number,
  message: String,
  SentAt: Date,
});
module.exports = mongo.model("chatmessage", Chatmessage);
