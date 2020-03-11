const express = require("express");
const mongoose = require("mongoose");
// const routes = require("./routes");

const path = require("path");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

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
app.use(methodOverride("_method"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
// app.use(routes);

// Connect to the Mongo DB
const dbUri = "mongodb://localhost/beatmarketdb";
mongoose.connect(process.env.MONGODB_URI || dbUri);
let gfs;
const conn = mongoose.createConnection(process.env.MONGODB_URI || dbUri, {
  useNewUrlParser: true
});
conn.once("open", function() {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: dbUri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// File routing
// get files
app.get("/api/files", (req, res) => {
  gfs.files.find({}).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist"
      });
    }
    return res.json(files);
  });
});

//get file
app.get("/api/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }
    return res.json(file);
  });
});

// delete file
app.delete("/api/files/:filename", (req, res) => {
  console.log(`app.delete /api/files/${req.params.filename}`);
  gfs.files.remove({ filename: req.params.filename }, function(err, gridStore) {
    if (err) throw err;
    return res.json({
      deleted: req.params.filename
    });
  });
});

// play file
app.get("/api/audio/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }
    if (file.contentType === "audio/mp3") {
      //read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not a mp3 audio"
      });
    }
  });
});

// "file": {
//   "fieldname": "file",
//   "originalname": "[iSongs.info] 01 - Mind Block.mp3",
//   "encoding": "7bit",
//   "mimetype": "audio/mp3",
//   "id": "5e630af59c19a85cc49e6324",
//   "filename": "60ec4a14d0a3e16827e99fd3952b6f8e.mp3",
//   "metadata": null,
//   "bucketName": "uploads",
//   "chunkSize": 261120,
//   "size": 4275614,
//   "md5": "42b06b3b772be11730e5a5db6e39aaae",
//   "uploadDate": "2020-03-07T02:46:13.469Z",
//   "contentType": "audio/mp3"
//   }

// upload file

app.post("/api/beats/upload", upload.single("file"), (req, res) => {
  res.send(`${req.file.originalname} uploaded.`);
});

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
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
