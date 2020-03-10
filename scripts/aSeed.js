//$ mongo mongoSeed
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/beatmarketdb");

print("-----------users");
try {
  db.users.remove({});
  db.users.insertMany([
    { email: "producer1@site.com", created: ISODate(), __v: 0 },
    { email: "producer2@site.com", created: ISODate(), __v: 0 },
    { email: "producer3@site.com", created: ISODate(), __v: 0 }
  ]);

  const userDocs = db.users.find({});
  while (userDocs.hasNext()) {
    printjson(userDocs.next());
  }
  print("end users seed");
} catch (e) {
  print(e);
}

print("-----------licenses");
try {
  db.licenses.remove({});
  db.licenses.insertMany([
    { name: "Basic", text: "1000 streams", price: 29.99, __v: 0 },
    { name: "Premium", text: "10000 streams", price: 59.99, __v: 0 },
    { name: "Exclusive", text: "100000 streams", price: 499.99, __v: 0 },
    { name: "Cool", text: "999 streams", price: 39.99, __v: 0 },
    { name: "Super", text: "9999 streams", price: 69.99, __v: 0 },
    { name: "Duper", text: "99999 streams", price: 399.99, __v: 0 },
    { name: "Basic", text: "2000 streams", price: 27.99, __v: 0 },
    { name: "Premium", text: "20000 streams", price: 57.99, __v: 0 },
    { name: "Exclusive", text: "200000 streams", price: 477.99, __v: 0 }
  ]);

  const licenseDocs = db.licenses.find({});
  while (licenseDocs.hasNext()) {
    printjson(licenseDocs.next());
  }

  print("end license seed.");
} catch (e) {
  print(e);
}

print("-----------beats");
try {
  db.beats.remove({});
  db.beats.insertMany([
    { title: "abc", filename: "", __v: 0 },
    { title: "def", filename: "", __v: 0 },
    { title: "ghi", filename: "", __v: 0 },

    { title: "zyx", filename: "", __v: 0 },
    { title: "wvu", filename: "", __v: 0 },

    { title: "tsr", filename: "", __v: 0 },
    { title: "qpo", filename: "", __v: 0 },
    { title: "nml", filename: "", __v: 0 }
  ]);

  const beatDocs = db.beats.find({});
  while (beatDocs.hasNext()) {
    printjson(beatDocs.next());
  }
  print("end beats seed");
} catch (e) {
  print(e);
}

print("-----------producers");
try {
  db.producers.remove({});
  db.producers.insertMany([
    { name: "producer1", __v: 0 },
    { name: "producer2", __v: 0 },
    { name: "producer3", __v: 0 }
  ]);

  const producerDocs = db.producers.find({});
  while (producerDocs.hasNext()) {
    printjson(producerDocs.next());
  }
  print("end producers seed");
} catch (e) {
  print(e);
}
