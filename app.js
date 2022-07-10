const express = require('express');
const https = require('https');

const app = express();



app.get("/", function (req, res) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=34c3c8850bcd7da597e179834ef9c8c5';
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on('data', function (data) {   
            console.log(JSON.parse(data));
        // res.send(response);
    });
        res.send("server working");
    })
})


app.listen(3000, function () {
    console.log("Server is running on port 3000");
})