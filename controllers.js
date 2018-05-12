var echarts = require('echarts');
var request = require('request');

exports.root = function(req, res) {
  var url = "http://q.stock.sohu.com/hisHq?code=cn_600519&start=20180511&end=20180511";
  request(url, function (err, response, body) {
    if (err) console.log("Fail to request " + url);
    if (!err && response.statusCode == 200) {
      var data = JSON.parse( body.substring(1, body.length - 2) );
      var date = data['hq'][0][0];
      var code = data['code'];
      var title = '日期: ' + date + '  股票代码: ' + code;
      var stockData = new Array();

      for(i in data['hq'][0].slice(1)){
           stockData[i] = data['hq'][0].slice(1)[i];
      }

      res.render('index', {title: title, stockData: stockData});
    }
  });
};