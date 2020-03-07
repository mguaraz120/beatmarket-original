const beatController = require("./controllers/beatsController");
const axios = require("axios");

function create() {
  return axios.post("http://localhost:3000/api/beats", {
    title: "beat1",
    filename: "file1"
  });
}
create()
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.log(err);
  });
