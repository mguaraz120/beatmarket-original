// Producer
// _id: number
// name: String
// user: user
// beats: beat[]
// licenses: license[]
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const beatSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true }
});

const producerSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 6
    },

    beats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Beat"
      }
    ]
  },
  {
    timestamps: true
  }
);

const Producer = mongoose.model("Producer", producerSchema);

module.exports = Producer;
