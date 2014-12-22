var express = require('express');
var router = express.Router();
var path = require('path');
var viewPath = path.resolve(__dirname, '../views/');
var post = require('../models/post');


/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
	res.sendFile(viewPath + '/index.html');

});

router.get('/api/posts', function(req, res){

	post.getPosts(function(docs){
		res.json(docs);
	});

});

router.post('/api/posts', function(req, res){

	var newPost = {
		title : req.body.title,
		content : req.body.content
	};

	post.addPost(newPost);
	res.end();

});

router.delete('/api/posts/:id', function(req, res){

	var id = req.params.id;

	post.removePosts({_id: id});
	res.end();

});

module.exports = router;
