var echarts = require('echarts');
var request = require('request');
var url = require('url');

exports.root = function(req, res) {
  var params = url.parse(req.url, true).query;
  if (JSON.stringify(params) == "{}" ) {
    res.render('index', {title: "", code: "", startDate: "", endDate: "", date: [], stockData: [], err: false});
  } else {
    var stockRequestUrl = "http://q.stock.sohu.com/hisHq?code=cn_" + params.code + "&start=" + params.startDate+ "&end=" + params.endDate;
    request(stockRequestUrl, function (err, response, body) {
      if (err) console.log("Fail to request " + url);
      if (!err && response.statusCode == 200) {
        try {
          var data = JSON.parse( body.substring(1, body.length - 2) );
          var code = data['code'];
          var title = '股票代码: ' + code.substring(3,9);
          var stockData = new Array();
          var date = new Array();
          var len = data['hq'].length;
          for(i in data['hq']) {
            stockData[len - 1 - i] = data['hq'][i][1];
            date[len - 1 - i] = '"' + data['hq'][i][0].substring(0,10) + '"';
          }
          res.render('index', {title: title, code: params.code, startDate: params.startDate, endDate: params.endDate, date: date, stockData: stockData, err: false});
        } catch (err) {
          res.render('index', {title: "", code: "", startDate: "", endDate: "", date: [], stockData: [], err: true});  
        }
      }
    });
  }
};