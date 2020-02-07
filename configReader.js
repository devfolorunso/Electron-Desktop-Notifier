const path = require("path");
const fs = require("fs");

var filename = "config.json";

var fullpath = __dirname + "/config/" + filename;

fs.readFile(fullpath, "utf8", (err, data) => {
  if (err) throw err;
  let config = JSON.parse(data);
  console.log(config);
});

module.exports = config;
