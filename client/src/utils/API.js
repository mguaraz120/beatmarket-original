import axios from "axios";

export default {
  // Gets all beats
  getBeats: function() {
    return axios.get("/api/beats");
  },
  // Gets the beat with the given id
  getBeat: function(id) {
    return axios.get("/api/beats/" + id);
  },
  // Deletes the beat with the given id
  deleteBeat: function(id) {
    return axios.delete("/api/beats/" + id);
  },
  // Saves a beat to the database
  saveBeat: function(beatData) {
    return axios.post("/api/beats", beatData);
  },

  getProducers: function() {
    return axios.get("/api/producers/");
  },
  getProducer: function(id) {
    return axios.get("/api/producers/" + id);
  },
  deleteBeatByProducer: function(producerId, beatIn) {
    console.log("deleteBeatByProducer");
  },
  getFiles: function() {
    console.log("getFiles");
  },
  saveBeat: function(producerId, beatData) {
    console.log("saveBeat");
  },

  getCustomers: function() {
    console.log("getCustomers");
  },
  saveCustomer: function(customerData) {
    console.log("saveCustomer");
  },
  getBeats: function() {
    console.log("getBeats");
  },
  getFile: function(filename) {
    return axios.get("/api/files" + filename);
  },
  deleteFile: function(filename) {
    return axios.delete("/api/files" + filename);
  }
};
