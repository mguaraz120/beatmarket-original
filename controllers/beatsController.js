const db = require("../models");

module.exports = {
  findAll: function(req, res) {
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
    db.Beat.create(beatData)
      .then(dbModel => {
        return db.Producer.findOneAndUpdate(
          { _id: producerId },
          { $push: { beats: dbModel._id } },
          { new: true }
        );
      })
      .then(dbProducer => res.json(dbProducer))
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
    res.send("success");
  }
};
