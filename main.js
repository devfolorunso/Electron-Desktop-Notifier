const notify = require('./notifier');
const internal = require('internal-ip');
const axios = require('axios');


setInterval(async () => {
    let ip =  await internal.v4();
    let url =`http://127.0.0.1:8000/api/checkAttendance?system_ip=${ip}`;

    await axios.get(url)
    .then(res => {
        if(res.data.message){
            notify.run(res.data.message);
        }
        if(res.data.success){
            return;
        }
    })
    .catch(err => {
        console.log(err);
    });
}, 5000);


