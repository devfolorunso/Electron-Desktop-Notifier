const electronInstaller = require("electron-winstaller");

// In this case, we can use relative paths
const settings = {
  // Specify the folder where the built app is located
  appDirectory: "./fofx-notifier-app-win32-x64",
  // Specify the existing folder where
  outputDirectory: "./fofx-installers",
  // The name of the Author of the app (the name of your company)
  authors: "dipoleDiamond LTD",
  // The name of the executable of your built
  exe: "./fofx-notifier-app.exe",

  //   The name to use for the generated Setup.exe file
  setupExe: "fofxAcademy Attendance Reminder"
};

resultPromise = electronInstaller.createWindowsInstaller(settings);

resultPromise.then(
  () => {
    console.log(
      "The installers of your application were succesfully created !"
    );
  },
  e => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`);
  }
);
