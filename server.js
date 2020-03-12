const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const fs = require("fs");
const keys = require("./constants/keys");

const mongoose = require("mongoose");
// const routes = require("./routes");

const path = require("path");
const bodyParser = require("body-parser");

const beatsController = require("./controllers/beatsController");
const producersController = require("./controllers/producersController");
const customersController = require("./controllers/customersController");
const licensesController = require("./controllers/licensesController");
const usersController = require("./controllers/usersController");

const PORT = process.env.PORT || 3001;

const app = express();
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
// app.use(routes);

// Connect to the Mongo DB
const dbUri = "mongodb://localhost/beatmarketdb";
mongoose.connect(process.env.MONGODB_URI || dbUri);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

AWS.config.update({
  accessKeyId: keys.iam_access_id,
  secretAccessKey: keys.iam_secret,
  region: keys.bucket_region
});

const s3 = new AWS.S3();

app.post("/api/files", upload.single("file"), function(req, res) {
  uploadFile(req.file.path, req.file.filename, res, req.headers.referer);
});

app.get("/api/files/:filename", (req, res) => {
  retrieveFile(req.params.filename, res);
});

app.get("/api/files/", (req, res) => {
  const getParams = {
    Bucket: keys.bucket_name,
    MaxKeys: 20
  };

  s3.listObjectsV2(getParams, (err, data) => {
    if (err) {
      return res.status(400).send({ success: false, err: err });
    }
    res.json(data.Contents);
  });
});

// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/requests-using-stream-objects.html
app.get("/api/audio/:filename", (req, res) => {
  const getParams = {
    Bucket: keys.bucket_name,
    Key: req.params.filename
  };
  let s3Stream = s3.getObject(getParams).createReadStream();
  s3Stream.on("error", err => {
    console.error(err);
  });

  s3Stream
    .pipe(res)
    .on("error", err => {
      console.error("File Stream:", err);
    })
    .on("close", () => {
      console.log("Done.");
    });
});

function uploadFile(source, filename, res, referer) {
  console.log("preparing to upload...");
  fs.readFile(source, function(err, filedata) {
    if (!err) {
      const putParams = {
        Bucket: keys.bucket_name,
        Key: filename,
        Body: filedata
      };
      s3.putObject(putParams, function(err, data) {
        if (err) {
          console.log("Could not upload the file", err);
          return res.send({ success: false });
        } else {
          fs.unlink(source, () => {});
          return res.redirect("/producerAdmin/" + getProducerId(referer));
        }
      });
    } else {
      console.log({ err: err });
    }
  });
}
function getProducerId(referer) {
  // const referer = "http://localhost:3000/producerAdmin/5e66ad42768dd5009dd161b1";
  const refererArray = referer.split("/");
  return refererArray.pop();
}

function retrieveFile(filename, res) {
  const getParams = {
    Bucket: keys.bucket_name,
    Key: filename
  };
  s3.getObject(getParams, function(err, data) {
    if (err) {
      return res.status(400).send({ success: false, err: err });
    } else {
      return res.send(data.Body);
    }
  });
}

// -------------------------------------------------------
// Beat Routing
app.get("/api/beats", beatsController.findAll);
app.get("/api/beats/:id", beatsController.findById);
app.post("/api/beats", beatsController.create);
app.delete("/api/beats/:id", beatsController.remove);

// Customer routing
app.get("/api/customers/:id", customersController.findById);
app.post("/api/customers", customersController.create);

// License Routing
app.get("/api/licenses", licensesController.findAll);

// Producer Routing
app.get("/api/producers/", producersController.findAll);
app.get("/api/producers/:id", producersController.findById);

// mock User Routing
app.get("/api/users/:id", usersController.findById);
app.post("/api/users", usersController.create);

// ------------------------------------------------------- end Routing
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎 ==> API Server listening on PORT ${PORT}!`);
});
