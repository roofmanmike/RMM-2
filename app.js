//jshint esversion6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static('staticFolder'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/new_index.html");
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

var drains = Number(req.body.dr1);

var height = num5;
var area = num1 * num2 * 5.5;

var squares = num1 * num2;
var gutter = num3 * 21;
var drainCount = drains * 750;
var coping = num4 * 12;


if (num5 > 2){
  height = height * 1000;
}
else{height=0};
let bgi1 = "https://scontent.fdet1-1.fna.fbcdn.net/v/t39.30808-6/270068506_772985370727004_4273636596333034815_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=fLdQouKzm0gAX_ZiZXY&_nc_ht=scontent.fdet1-1.fna&oh=00_AT-px2ALzQRCrtmvBL4AA9dIJEAdlbTuNJlWSJSaJ6m2vQ&oe=6243E74F";
var result = area + num3 + gutter + coping + height;
let ob = new Intl.NumberFormat('en-US');
squares = ob.format(squares);
area = ob.format(area);
result = ob.format(result);
drainCount = ob.format(drainCount);
res.write('<head><style>body{background-color:darkgrey; text-align:center;}hr{background-color:red;}</style></head>');
res.write('<h1>Valid thru 30 days from: ' + today + ': </h1>');
res.write('<h1>' + squares + ' sq ft</h1>');


res.write('<h1>Before termination(s) and watershed: <span style="color:green">$</span>' + area + '</h1><hr>');
if (gutter >= 1) {
  gutter = ob.format(gutter);
  res.write('<h1>Gutters: <span style="color:green">$</span>' + gutter + '</h1>');
}
if (drains > 0){
  res.write('<h1>Detail for ' + drains + ' sumps: <span style="color:green">$</span>' + drainCount);
}
if (coping >= 1) {
  coping = ob.format(coping);
  res.write('<h1>Coping: <span style="color:green">$</span>' + coping + '</h1>');
}
if (height >= 1) {
  height = ob.format(height);
  res.write('<h1>' + num5 + ' story hazard: <span style="color:green">$</span>' + height + '</h1>');
}
res.write('<h1 style="text-decoration:underline">Total: <span style="color:green">$</span>' + '<span style="color:red">' + result + '</span></h1>');
res.write('</body>' + '<footer>');
res.write('<h3>Confirm this price and schedule your new roof with a core test~</h3>');
res.write('<h1><a href="tel:248-678-7663">(248)678-ROOF</a></h1>');
res.write('<h1>Web and App Development by <a href="https://www.roofmanmike.com">RoofManMike&copy</a></h1></footer>');
res.write('<img src="https://scontent.fdet1-1.fna.fbcdn.net/v/t1.6435-9/74634680_145568873468660_1633695294703009792_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=DDrxN9mAx_YAX_zWiA7&_nc_ht=scontent.fdet1-1.fna&oh=00_AT-cV634psUtaGfeNXYkHkuG4hZS8fhucxiKucP5AZC3tw&oe=6274AE19">');
res.send();
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running");
})
