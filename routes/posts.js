var express = require('express');
var router = express.Router();
var post = require('../models/post');


/**
 * GET posts' list. 
 * req : don't need
 * res : will respons a JSON of list of posts - [{_id: id, title:title}]
*/
router.get('/', function(req, res){

	post.getPostsList(function(err, docs){
		if(err){
			console.log('Error:'+err);
			res.json({err: 'Cannot read the posts list'});
		}
		res.json(docs);
		res.end();
	});

});

/* POST new post */
router.post('/', function(req, res){

	var newPost = {
		title : req.body.title,
		content : req.body.content
	};

	post.addNewPost(newPost, function(err, doc){
		if(err){
			console.log('Error:'+err);
			console.log(req.body);
			res.json({err: 'Something error when create new post'});
		}
		res.json(doc);
		res.end();
	});

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
