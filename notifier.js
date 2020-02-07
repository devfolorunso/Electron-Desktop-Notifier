const notifier = require("node-notifier");
const path = require("path");
const open = require("open");
const config = require("./config/config.json");
notifier.on("click", function(notifierObject, options, event) {
  open(config.cmsURL);
});

module.exports = {
  run(message) {
    notifier.notify({
      title: "Attendance Reminder",
      message: message,
      icon: path.join(__dirname, config.notificationIcon),
      sound: true,
      wait: true
    });
  }
};

//module.exports = run;
