const express = require("express");
const mongoose = require("mongoose");
// const routes = require("./routes");

const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");

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
