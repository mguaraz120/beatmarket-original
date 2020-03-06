import axios from "axios";
const data = require("./Data");

export default {
  getProducers: function() {
    return data.producers;
  },
  deleteBeatByProducer: function(producerId, beatId) {
    data.beats = data.beats.filter(beat => beat._id !== beatId._id);
    let producer = data.producers.find(producer => producerId === producer._id);
    if (!producer) return;
    producer.beats = producer.beats.filter(beat => beat._id !== beatId);
  },
  getCustomers: function() {
    return data.customers;
  },
  saveCustomer: function(customerData) {
    if (data.customers.length < 1) return;
    const reversedCustomers = data.customers.reverse();
    customerData._id = reversedCustomers[0]._id + 1;
    data.customers.push(customerData);
  },
  getBeats: function() {
    return data.beats;
  },

  saveBeat: function(producerId, beatData) {
    incrementBeatId(beatData);
    data.beats.push(beatData);
    let producer = data.producers.find(producer => producerId === producer._id);
    if (!producer) return;
    producer.beats.push(beatData);
  },
  getFiles: function() {
    return axios.get("/api/files");
  }
};

function incrementBeatId(beatData) {
  beatData._id = data.beats.reverse()[0]._id + 1;
}
