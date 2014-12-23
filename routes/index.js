var express = require('express');
var router = express.Router();
var path = require('path');
var viewPath = path.resolve(__dirname, '../views/');


/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
	res.sendFile(viewPath + '/index.html');

});


module.exports = router;
