const express = require('express');
//const request = require('request');
const cheerio = require('cheerio');
const got = require('got');
var iconv = require('iconv-lite');
const anvaad = require('anvaad-js');
const app = express();


app.get('/hukamnama.js', function(req, res){

  const today = new Date();
  var month
  var date
  var year

  if(Object.keys(req.query).length === 0)
  {
    console.log(today);
    month = (today.getMonth() + 1);
    date = today.getDate();
    year = (today.getYear() + 1900);
  }
  else{
    month = req.query.month;
    date = req.query.date;
    year = req.query.year;
  }

  console.log("month:", month, " date: ", date, " year:", year);

  got.post('https://old.sgpc.net/hukumnama/oldhukumnama.asp', {
    form: {
      month: month,
      date: date,
      year: year,
    }
  }).then(response => {
    var conresponse = iconv.decode(response.body, 'windows-1252');
     var $ = cheerio.load(conresponse);
     var data = $('p','center').map(function()
     {
       return $(this).text();
     }).get();

     var hukamnamaOrig = data[0];
     var hukamnamaUni = anvaad.unicode(data[0]);
     var punjabiTranslationOrig = data[1];
     var punjabiTranslationUni = anvaad.unicode(data[1]);
     var englishTranslation = data[2];

     var json = {
       hukamnamaOrig: hukamnamaOrig,
       hukamnamaUni: hukamnamaUni,
       punjabiTranslationOrig: punjabiTranslationOrig,
       punjabiTranslationUni: punjabiTranslationUni,
       englishTranslation: englishTranslation,
      };


      res.send(json);

 }).catch(err => {
     console.log(err);
 });







  //old request library.
  /* var options = {
    url: 'https://old.sgpc.net/hukumnama/oldhukumnama.asp',
    method: 'POST',
    form: {
      'month':month,
      'date':date,
      'year':year
    }
  } */

  //console.log('options:', options);

  /*
  request(options, function(error, response, html) {
    encoding:'binary';
    if (error) {
      console.log(error);
    }
    else {
      console.log('html received: ');
      //res.send(html)

      var $ = cheerio.load(html, {decodeEntities: false});
      var data = $('p','center').map(function()
      {
        return $(this).html();
      }).get();

      var hukamnama = data[0];
      var punjabiTranslation = data[1];
      var englishTranslation = data[2];

      res.send(punjabiTranslation);
    }
  }); */

});

app.listen('8080');
console.log('Hukamnama-API is running on http://localhost:8080');
module.exports = app;
