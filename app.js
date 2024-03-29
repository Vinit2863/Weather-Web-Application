const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req,res){
    const query = req.body.cityName;
    const apikey = "7cdb3c75c60d1cd57bcf38e2f0d4af49";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"; 
            res.write("<p>The weather is currently "+weatherDescription + "</p>");
            res.write("<h1>The temperature in "+ query +" is "+ temp + " degree celsius.</h1>");
            res.write("<img src=" +imageUrl+">");
            res.send();
        });
    });
});


app.listen(3000, function(){
    console.log("Server is runnig on port 3000.");
});