const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
//post request from the form
app.post("/", function (req, res) {
    let city = req.body.cityName;
    const apiKey="34c3c8850bcd7da597e179834ef9c8c5";
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=34c3c8850bcd7da597e179834ef9c8c5";
    https.get(url, function (response) {
        response.on("data", function (data) {
            let weatherData = JSON.parse(data);
            let weatherDescription = weatherData.weather[0].description;
            let weatherTemp = weatherData.main.temp;
            let weatherTempF = weatherTemp * 9 / 5 - 459.67;
            let weatherTempF2 = Math.round(weatherTempF);
            let weatherTempC = weatherTemp - 273.15;
            let weatherTempC2 = Math.round(weatherTempC);
            res.write("<h1>The weather in " + city + " is " + weatherDescription + "</h1>");
            res.write("<h2>The temperature in " + city + " is " + weatherTempC2 + " degrees Celsius</h2>");
            res.write("<h2>The temperature in " + city + " is " + weatherTempF2 + " degrees Fahrenheit</h2>");
        });
    });
}
);


// app.post("/", function (req, res) { 
//     console.log(req.body.cityName);
// })

    // const query ='Paris';
    // const apiKey="34c3c8850bcd7da597e179834ef9c8c5";
    // const url = 'https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+apiKey;
    // https.get(url, function (response) {
    //     console.log(response.statusCode);
    //     response.on('data', function (data) {   
    //         console.log(JSON.parse(data));
    //     // res.send(response);
    // });
    // })



app.listen(3000, function () {
    console.log("Server is running on port 3000");
})