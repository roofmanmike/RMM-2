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
        res.write("<head><meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />");
        res.write("<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>");
        res.write("<meta charset='utf-8'>");
        res.write("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3' crossorigin='anonymous'>");
        res.write("</head>")
        res.write("<body style= 'background-image:url(https://scontent.fdet1-1.fna.fbcdn.net/v/t1.6435-9/67644064_107197060639175_7781083183763685376_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=KJWmbJNLkekAX-9r7V0&_nc_ht=scontent.fdet1-1.fna&oh=00_AT_uYdcASVyhzyDs_d90vXcYmjTfjbsSZArCrEgXXSvWlw&oe=623492BB)'></body>");
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
