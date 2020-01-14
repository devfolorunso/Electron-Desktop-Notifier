const notifier = require('node-notifier')
const path = require('path')
const open = require('open')

module.exports = {
    run(){
            notifier.notify(
            {
                title: 'Attendance Reminder',
                message: 'Hey Geek! Have you signed your attendance today?',
                icon: path.join(__dirname, 'fofx.png'),
                sound: true,
                wait: true, 
            },
            function() {
                open("https://fofxacademy.com")
            }
            );    
    }
}

   

//module.exports = run;