// import axios from "axios"; SyntaxError: Cannot use import statement outside a module
const axios = require("axios");
function getFiles() {
  return axios
    .get("http://localhost:3000/api/files")
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}

getFiles();
