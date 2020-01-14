// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

let myNotification = new Notification('Attendance Reminder', {
    icon: './gitIcon.png',
    body: 'Hey There!! Have you signed your attendance today?',
  });
  

  
  myNotification.onclick = () => {
    window.open("https://google.com")
  }