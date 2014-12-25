var express = require('express');
var router = express.Router();
var path = require('path');
var viewPath = path.resolve(__dirname, '../views/');

router.get('/', )

router.get('/', function(req, res){

	res.render('index', {title:'blog is running'});

});
