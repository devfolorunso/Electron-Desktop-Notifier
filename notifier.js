const notifier = require('node-notifier')
const path = require('path')
const open = require('open')

module.exports = {
    run(message){
            notifier.notify(
            {
                title: 'Attendance Reminder',
                message: message,
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