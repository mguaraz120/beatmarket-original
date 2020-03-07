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
// mongoose.connect(process.env.MONGODB_URI || dbUri);
let gfs;
var conn = mongoose.createConnection(process.env.MONGODB_URI || dbUri);
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

// app.get("/", (req, res) => {
//   gfs.files.find({}).toArray((err, files) => {
//     if (!files || files.length === 0) {
//       res.render("index", { files: false });
//     } else {
//       files.map(file => {
//         if (file.contentType === "audio/mp3") {
//           file.isAudio = true;
//         } else {
//           file.isAudio = false;
//         }
//       });
//       res.render("index", { files: files });
//     }
//   });
// });

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

// upload file
app.post("/api/beats/upload", upload.single("file"), (req, res) => {
  console.log(`app.post /upload ${req.file}`);
  res.json({ file: req.file });
});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
