var express = require('express');
var router = express.Router();
var post = require('../models/post');


/* GET posts listing. */
router.get('/', function(req, res){

	post.getAllPosts(function(docs){
		res.json(docs);
	});

});

/* POST new post */
router.post('/', function(req, res){

	var newPost = {
		title : req.body.title,
		content : req.body.content
	};

	post.addNewPost(newPost);
	res.end();

});

/* PUT update a post */
router.put('/:id', function(req, res){

	var modifiedPost = {
		title : req.body.title,
		content : req.body.content,
		updatedAt : new Date()
	};

	post.updatePostByID(req.params.id, modifiedPost);
	res.end();

});

/* DELETE a post */

router.delete('/:id', function(req, res){

	post.removePostByID(req.params.id);
	res.end();

});

module.exports = router;
