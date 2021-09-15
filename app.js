const express = require('express');
//const request = require('request');
const cheerio = require('cheerio');
const got = require('got');
var iconv = require('iconv-lite');
const anvaad = require('anvaad-js');
const app = express();


app.get('/hukamnama/', function (req, res) {

  const today = new Date();
  var month
  var date
  var year

  if (Object.keys(req.query).length === 0) {
    console.log(today);
    month = (today.getMonth() + 1);
    date = today.getDate();
    year = (today.getYear() + 1900);
  }
  else {
    month = req.query.month;
    date = req.query.date;
    year = req.query.year;
  }

  console.log("month:", month, " date: ", date, " year:", year);

  got.post('https://old.sgpc.net/hukumnama/oldhukumnama.asp', {
    responseType: 'buffer',
    form: {
      month: month,
      date: date,
      year: year,
    }
  }).then(response => {
    var conresponse = iconv.decode(response.body, 'windows-1252');
    var $ = cheerio.load(conresponse);

    //obtain paragraph data
    var data = $('p', 'center').map(function () {
      return $(this).text();
    }).get();

    //obtain missing hukamnama data
    var data_b = $('strong', 'center').map(function () {
      return $(this).text();
    }).get();


    //obtain missing punjabi translation data
    var data_c = $('strong', 'span').map(function () {
      return $(this).text();
    }).get();

    //obtain missing english translation data
    var data_d = $('div', 'td').map(function () {
      return $(this).text();
    }).get();

    //res.send(data_d[10]);

    //prepare hukamnama data by adding data strings and removing '\n'
    var hukamnamaData = data_b[1] + ' ' + data_b[2] + ' ' + data[0];
    var hukamnamaOrig = hukamnamaData.replace(/\n/g, '');

    //convert hukamana data to unicode
    var hukamnamaUni = anvaad.unicode(hukamnamaOrig);


    //prepare punjabi translation data
    var punjabiTranslationData = data_c[0] + ' ' + data_c[1] + ' ' + data[1];
    var punjabiTranslationOrig = punjabiTranslationData.replace(/\n/g, '');
    var punjabiTranslationUni = anvaad.unicode(punjabiTranslationOrig);

    //prepare english translation
    var englishTranslationData = data_d[10] + ' ' + data_d[11] + ' ' + data[2];
    var englishTranslation = englishTranslationData.replace(/\n/g, '');

    var json = {
      month: month,
      date: date,
      year: year,
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

});

app.listen('3000');
console.log('Hukamnama-API is running');
module.exports = app;
