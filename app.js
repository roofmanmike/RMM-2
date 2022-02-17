const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const sunny = false;
// import { Config } from 'config.js';
// add comment for push

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
  postFunc();
});

// postFunc();
function postFunc(){
app.post("/", function(req, res){
    // const apiKey = Config.MY_KEY;
    const apiKey = "379bf63134d46434dd821bc2b954bd92#";
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=imperial&appid=" + apiKey;
    https.get(url, function(response){

      console.log(response.statusCode);
      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const icon = weatherData.weather[0].icon;
        const weatherDescription = weatherData.weather[0].description;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<body style = 'background-image:url(https://scontent.fdet1-1.fna.fbcdn.net/v/t1.6435-9/73425136_145568173468730_7728657992609955840_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=O15AcfXqLIsAX9WEkXG&_nc_ht=scontent.fdet1-1.fna&oh=00_AT_XyFPX_UpmtY2Lg0-jNrEzbt6MpiXYv01BKRBfzyfyVQ&oe=62318059)'></body>");
        res.write("<h1>Right now:  " + weatherDescription + "</h1>");
        res.write("<h1>The temperature in " + query + " is " + temp + " degrees</h1>");
        res.write("<img src=" + imageURL + ">");
        res.write("<br>");
        res.write("<h1><a href='https://www.roofmanmike.com'>RoofManMike</a><h1></body>");
        res.send();
      });
    });
})
}

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
})
