module.exports = function(app){
  var controllers = require('./controllers');
  app.get('/', controllers.root);
};