const mongoose = require("mongoose");
const models = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/beatmarketdb");

const beatSeed = [
  { title: "abc", filename: "" },
  { title: "def", filename: "" },
  { title: "ghi", filename: "" },

  { title: "zyx", filename: "" },
  { title: "wvu", filename: "" },

  { title: "tsr", filename: "" },
  { title: "qpo", filename: "" },
  { title: "nml", filename: "" }
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
  { name: "producer1" },
  { name: "producer2" },
  { name: "producer3" }
];

const userSeed = [
  // { email: "producer1@site.com", created: ISODate() },
  // { email: "producer2@site.com", created: ISODate() },
  // { email: "producer3@site.com", created: ISODate() }
  { email: "producer1@site.com" },
  { email: "producer2@site.com" },
  { email: "producer3@site.com" }
];

models.Beat.collection.remove({});
models.License.collection.remove({});
models.Producer.collection.remove({});
models.Customer.collection.remove({});
models.User.collection.remove({});

console.log("collections gone!");

models.Beat.remove({})
  .then(() => models.Beat.collection.insertMany(beatSeed))
  .then(data => {
    console.log(data.result.n + " Beat records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

models.License.remove({})
  .then(() => models.License.collection.insertMany(licenseSeed))
  .then(data => {
    console.log(data.result.n + " License records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

models.Producer.remove({})
  .then(() => models.Producer.collection.insertMany(producerSeed))
  .then(data => {
    console.log(data.result.n + " Producer records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

models.User.remove({})
  .then(() => models.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " User records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

// attach
// models.Beat.find({})
//   .then(beats => {
//     console.log(`beats: ${beats}`);
//     // return db.Library.findOneAndUpdate({}, { $push: { books: dbBook._id } }, { new: true });
//     const beat = beats[0];
//     return models.Producer.findOneAndUpdate(
//       { name: "producer1" },
//       { $push: { beats: beat._id } },
//       { new: true }
//     );
//   })
//   .then(producer => {
//     console.log(producer);
//     process.exit(0);
//   })
//   .catch(err => {
//     console.log(err);
//     process.exit(1);
//   });
