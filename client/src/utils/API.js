import axios from "axios";

export default {
  getBeats: function() {
    return axios.get("/api/beats");
  },
  getBeat: function(id) {
    return axios.get("/api/beats/" + id);
  },
  deleteBeat: function(id) {
    return axios.delete("/api/beats/" + id);
  },
  createBeat: function(producerId, beatData) {
    return axios.post("/api/beats", beatData);
  },
  deleteBeatByProducer: function(producerId, beatIn) {
    // remove beat from beats
    // remove beat from producer
    return axios.delete("/api/beats/");
  },

  getLicenses: function() {
    return axios.get("/api/licenses");
  },

  getProducers: function() {
    return axios.get("/api/producers/");
  },
  getProducer: function(id) {
    return axios.get("/api/producers/" + id);
  },
  createProducer: function(producerData) {
    return axios.post("/api/producers", producerData);
  },

  getFiles: function() {
    return axios.get("/api/files");
  },
  getFile: function(filename) {
    return axios.get("/api/files" + filename);
  },
  deleteFile: function(filename) {
    return axios.delete("/api/files" + filename);
  },

  getCustomers: function() {
    return axios.get("/api/customers");
  },
  createCustomer: function(customerData) {
    return axios.post("/api/customers", customerData);
  }
};
