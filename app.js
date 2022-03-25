//jshint esversion6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){
  let today = new Date();
let dd = today.getDate();

let mm = today.getMonth()+1; 
const yyyy = today.getFullYear();
if(dd<10) 
{
    dd=`0${dd}`;
} 

if(mm<10) 
{
    mm=`0${mm}`;
} 
today = `${mm}-${dd}-${yyyy}`;



var num1 = Number(req.body.num1);
var num2 = Number(req.body.num2);
var num3 = Number(req.body.num3);
var num4 = Number(req.body.num4);
var num5 = Number(req.body.num5);

var height = num5;
var area = num1 * num2 * 5.5;
var squares = num1 * num2;
var gutter = num3 * 15;
var coping = num4 * 12;

if (num5 > 2){
  height = height * 1000;
}
else{height=0};

var result = area + num3 + gutter + coping + height;
let ob = new Intl.NumberFormat('en-US');
squares = ob.format(squares);
area = ob.format(area);
gutter = ob.format(gutter);
coping = ob.format(coping);
result = ob.format(result);
res.write('<head><style>body{background-color:darkgrey; text-align:center;}hr{background-color:red;}</style></head>');
res.write('<body>');
res.write('<h1>Valid thru 30 days from: ' + today + ': </h1>');
res.write('<h1>' + squares + ' sq ft</h1>');


res.write('<h1>Before termination(s) and watershed: <span style="color:green">$</span>' + area + '</h1><hr>');
if (gutter >= 1) {
  res.write('<h1>Gutters: <span style="color:green">$</span>' + gutter + '</h1>');  
}
if (coping >= 1) {
  res.write('<h1>Coping: <span style="color:green">$</span>' + coping + '</h1>');  
}
if (height >= 1) {
  res.write('<h1>' + num5 + ' story hazard: <span style="color:green">$</span>' + height + '</h1>');
  
}

res.write('<h1 style="text-decoration:underline">Total: <span style="color:green">$</span>' + '<span style="color:red">' + result + '</span></h1>');
res.write('</body>' + '<footer>');
res.write('<img src="https://scontent.fdet1-1.fna.fbcdn.net/v/t1.6435-9/122760339_422026922489519_6417623735746863165_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=uTlQ-O9OijcAX98A3Fh&_nc_oc=AQkAH02PoTwcDSYYYP9lFtcfgEjxaJsyphVuQuUcUj6hvXxQyk80JdTxO4mjPbo8Vt4&_nc_ht=scontent.fdet1-1.fna&oh=00_AT_wD6qOn7rgEIDYC1gU67Ce35FZLmQKpms_Cx0Vq6aXEA&oe=6249EEFB" alt="">');
  res.send();
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running");
})
