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
			res.json({err: 'Something error when create new post'});
		}
		res.json(doc);
		res.end();
	});

});

/* GET a post 
	if the id doesn't exsit, response is null
*/
router.get('/:id', function(req, res){
	post.getPostById(req.params.id, function(err, doc){
		if(err){
			res.json({err: 'Something error when get new post'});
		}
		res.json(doc);
		res.end();
	});
});

/* PUT update a post */

router.put('/:id', function(req, res){

	var modifiedPost = {
		updatedAt : new Date()
	};

	if (req.body.title){
		modifiedPost.title = req.body.title;
	}

	if(req.body.content){
		modifiedPost.content = req.body.content;
	}

	post.updatePostById(req.params.id, modifiedPost, function(err){
		if(err){
			res.json({err: 'Something error when update new post'});
		}
		res.end();
	});
});

/* POST a comment */
router.post('/:id/comments', function(req, res){

	var newComment = {};
	newComment.content = req.body.content;
	newComment.commenter = req.body.commenter || 'Anomynous';

	post.addCommentToPost(req.params.id, newComment, function(err){
		if(err){
			res.json({err: 'Something error when add new comment'});
		}
		res.end();
	});
});


/* DELETE a post */

router.delete('/:id', function(req, res){

	post.removePostById(req.params.id, function(err){
		if(err){
			res.json({err: 'Something error when delete new post'});
		}
		res.end();
	});
});


module.exports = router;
