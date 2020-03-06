const mongoose = require("mongoose");
const db = require("../models");


mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/beats-store_DB"
);

const beatSeed = [
  {
    title: "The Dead Zone",
    author: "Stephen King",
  },
  {
    title: "Lord of the Flies",
    author: "William Golding",

  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",

  }
];

const producerSeed = [
  {
    username: "Alex",
    beats: ["Dark", "Project"]
  },
  {
    title: "Mario",
    beats: ["Damn", "shit"]
  }
 
];

db.Beat
  .remove({})
  .then(() => db.Beat.collection.insertMany(beatSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
  db.Producer
  .remove({})
  .then(() => db.Producer.collection.insertMany(producerSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });