const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/beatmarketdb");

const beatSeed = [
  {
    title: "The Dead Zone",
    filename: "file1"
  },
  {
    title: "McCalic",
    filename: "file2"
  },
  {
    title: "The Catcher",
    filename: "file3"
  }
];

const licenseSeed = [
  { name: "Basic", text: "1000 streams", price: 29.99 },
  { name: "Premium", text: "10000 streams", price: 59.99 },
  { name: "Exclusive", text: "100000 streams", price: 499.99 }
  // { name: "Cool", text: "999 streams", price: 39.99 },
  // { name: "Super", text: "9999 streams", price: 69.99 },
  // { name: "Duper", text: "99999 streams", price: 399.99 },
  // { name: "Basic", text: "2000 streams", price: 27.99 },
  // { name: "Premium", text: "20000 streams", price: 57.99 },
  // { name: "Exclusive", text: "200000 streams", price: 477.99 }
];

const producerSeed = [
  {
    name: "rumothy"
    // user: "",
    // beats: [],
    // licences: []
  },
  {
    name: "michie"
    // user: "",
    // beats: [],
    // licences: []
  },
  {
    name: "diablita"
    // user: "",
    // beats: [],
    // licences: []
  }
];

const userSeed = [
  { email: "rumothy@place.com" },
  { email: "michie@home.com" },
  { email: "diablita@heat.com" }
];

db.Beat.remove({})
  .then(() => db.Beat.collection.insertMany(beatSeed))
  .then(data => {
    console.log(data.result.n + " Beat records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.License.remove({})
  .then(() => db.License.collection.insertMany(licenseSeed))
  .then(data => {
    console.log(data.result.n + " License records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.Producer.remove({})
  .then(() => db.Producer.collection.insertMany(producerSeed))
  .then(data => {
    console.log(data.result.n + " Producer records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " User records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
