// Producer
// name: String
// user: user
// beats: beat[]
// licenses: license[]
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const producerSchema = new Schema(
  {
    name: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    beats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Beat"
      }
    ],
    licenses: [
      {
        type: Schema.Types.ObjectId,
        ref: "License"
      }
    ]
  },
  {
    timestamps: true
  }
);

const Producer = mongoose.model("Producer", producerSchema);

module.exports = Producer;
