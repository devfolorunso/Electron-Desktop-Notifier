const electron = require("electron");
const notify = require("./notifier");
const internal = require("internal-ip");
const axios = require("axios");
const config = require("./config/config.json");
const app = electron.app;

if (handleSquirrelEvent(app)) {
  return;
}

var hour = new Date().getHours();
var minutes = new Date().getMinutes();
var secs = new Date().getSeconds();
var currentTime = hour.toString() + ":" + minutes.toString();
var start_Time = config.startTime;
var end_Time = config.endTime;

if (currentTime >= start_Time && currentTime <= end_Time) {
  setInterval(async () => {
    let ip = await internal.v4();
    let url = `${config.endPoint + "" + ip}`;

    await axios
      .get(url)
      .then(res => {
        if (res.data.message) {
          notify.run(res.data.message);
        }
        if (res.data.success) {
          return;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, config.popUpInterval);
} else {
}

function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
    return false;
  }

  const ChildProcess = require("child_process");
  const path = require("path");
  const appFolder = path.resolve(process.execPath, "..");
  const rootAtomFolder = path.resolve(appFolder, "..");
  const updateDotExe = path.resolve(path.join(rootAtomFolder, "Update.exe"));
  const exeName = path.basename(process.execPath);
  const spawn = function(command, args) {
    let spawnedProcess, error;
    try {
      spawnedProcess = ChildProcess.spawn(command, args, {
        detached: true
      });
    } catch (error) {}
    return spawnedProcess;
  };
  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };
  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case "--squirrel-install":
    case "--squirrel-updated":
      // Optionally do things such as:
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus
      // Install desktop and start menu shortcuts
      spawnUpdate(["--createShortcut", exeName]);
      setTimeout(application.quit, 1000);
      return true;
    case "--squirrel-uninstall":
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers
      // Remove desktop and start menu shortcuts
      spawnUpdate(["--removeShortcut", exeName]);
      setTimeout(application.quit, 1000);
      return true;
    case "--squirrel-obsolete":
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated
      application.quit();
      return true;
  }
}
