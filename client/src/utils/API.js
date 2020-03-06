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
  }
};
