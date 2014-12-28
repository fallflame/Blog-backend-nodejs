var post = require('../../../models/post')
var assert = require("assert")


describe('Post model', function(){

	var newPostID;

	describe('addNewPost', function(){
		it('should add a new instance to the database and return it in a callback', function(done){
			var newPost = {
				title: 'newTitile',
				content: 'newContent'
			};
			post.addNewPost(newPost, function(err, doc){
				assert(!err);
				newPostID = doc._id;
				assert(doc._id);
				assert.equal(doc.title, 'newTitile');
				done();
			});
		});

		it('should not add a new instance to the database when titile is empty', function(done){
			var newPost = {
				title: '',
				content: 'newContent'
			};

			post.addNewPost(newPost, function(err){
				if(!err) throw 'empty title still be added';
				done();
			});
		});

		it('should not add a new instance to the database when content is empty', function(done){
			var newPost = {
				title: 'newTitle',
				content: ''
			};

			post.addNewPost(newPost, function(err){
				if(!err) throw 'empty content still be added';
				done();
			});
		});
	});

	describe('getPostsList', function(){
		it('should get a list, for the element in the list, should get id, title and updatedAt, but not the content', function(done){
			post.getPostsList(function(err, docs){
				assert(!err);
				assert(docs.length);
				assert(docs[0].title);
				assert(docs[0]._id);
				assert(docs[0].updatedAt);
				assert(!docs[0].content);
				done();
			});
		});
	});

	describe('getPostById', function(){
		it('should get a post by it ID', function(done){
			post.getPostById(newPostID, function(err, doc){
				assert(!err);
				assert.equal(doc._id.toString(), newPostID.toString());
				assert.equal(doc.title, 'newTitile');
				assert(doc.content);
				done();
			});
		});
	});

	describe('updatePostById', function(){
		it('should update a post\' title', function(done){
			post.updatePostById(newPostID, {title:'updatedTitle'}, function(err){
				assert(!err);
				post.getPostById(newPostID, function(err, doc){
					assert(!err);
					assert.equal(doc.title, 'updatedTitle');
					done();
				});
			});
		});
	});

	describe('addCommentToPost', function(){
		var commentId;

		it('should add a comment to the post, pass the comments in the callback', function(done){
			var comment = {
				content: 'A comment',
				commentor: 'Yan'
			};

			post.addCommentToPost(newPostID, comment, function(err, comments){
				var i, length;
				
				for(i=0, length=comments.length; i<length; i++){
					if(comments[i].content === 'A comment'){
						commentId = comments[i]._id;
					}
				}

				assert(commentId);
				done();
			});
		});

		it('should found the comment in the post', function(done){
			post.getPostById(newPostID, function(err, doc){
				assert.equal(doc.comments.id(commentId).content, 'A comment');
				done();
			});
		});
	});

	describe('removePostById', function(){
		it('should remove the post', function(done){
			post.removePostById(newPostID, function(err){
				assert(!err);
				post.getPostById(newPostID, function(err, doc){
					assert(!doc);
					done();
				});
			});
		});
	});
});









