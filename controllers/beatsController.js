const db = require("../models");

// Defining methods for the beatsController
module.exports = {
  findAll: function(req, res) {
    console.log("beatsController findAll");
    console.log(req.query);
    db.Beat.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Beat.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    const { producerId, beatData } = req.body;
    console.log(
      `beatsController create(producerId: ${producerId}, beatData: ${beatData})`
    );
    db.Beat.create(beatData)
      .then(dbModel => {
        return db.Producer.findOneAndUpdate(
          { _id: producerId },
          { $push: { beats: dbModel._id } },
          { new: true }
        );
        // res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Beat.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Beat.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createAudioFile: function(req, res) {
    console.log(`beatsController createAudioFile ${req.body.name}`);
    res.send("success");
  }
};
