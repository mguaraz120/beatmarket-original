const db = connect("127.0.0.1:27017/beatmarketdb");

function attachUserToProducer(useremail, producername) {
  let dbUser = db.users.find({ email: useremail }).next();
  db.producers.findOneAndUpdate(
    { name: producername },
    { $set: { user: dbUser._id } },
    { new: true }
  );
}

function attachLicenseToProducer(licensePrice, producername) {
  let dbLicense = db.licenses.find({ price: licensePrice }).next();
  db.producers.findOneAndUpdate(
    { name: producername },
    { $push: { licenses: dbLicense._id } },
    { new: true }
  );
}

function attachBeatToProducer(beatTitle, producername) {
  let dbBeat = db.beats.find({ title: beatTitle }).next();
  db.producers.findOneAndUpdate(
    { name: producername },
    { $push: { beats: dbBeat._id } },
    { new: true }
  );
}

attachUserToProducer("producer1@site.com", "producer1");
attachUserToProducer("producer2@site.com", "producer2");
attachUserToProducer("producer3@site.com", "producer3");

attachLicenseToProducer(29.99, "producer1");
attachLicenseToProducer(59.99, "producer1");
attachLicenseToProducer(499.99, "producer1");

attachLicenseToProducer(39.99, "producer2");
attachLicenseToProducer(69.99, "producer2");
attachLicenseToProducer(399.99, "producer2");

attachLicenseToProducer(27.99, "producer3");
attachLicenseToProducer(57.99, "producer3");
attachLicenseToProducer(477.99, "producer3");

attachBeatToProducer("abc", "producer1");
attachBeatToProducer("def", "producer1");
attachBeatToProducer("ghi", "producer1");

attachBeatToProducer("zyx", "producer2");
attachBeatToProducer("wvu", "producer2");

attachBeatToProducer("tsr", "producer3");
attachBeatToProducer("qpo", "producer3");
attachBeatToProducer("nml", "producer3");
