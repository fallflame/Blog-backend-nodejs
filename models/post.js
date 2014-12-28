var db = require('../lib/db');

var CommentSchema = new db.Schema({
	content   : {type: String, required: true},
	commenter : {type: String, required: true},
	createdAt : Date
});

var PostSchema = new db.Schema({
	title 	: 	{type: String, required: true},
	content : 	{type: String, required: true},
	createdAt : Date,
	updatedAt : Date,
	comments : [CommentSchema]
});

var Post = db.mongoose.model('Post', PostSchema);
var exports = module.exports;

/**
 * @param {function} callback(err, docs)
 * @callback err
 * @callback docs: a array of doc, each post contain: _id, title, updatedAt
 */
exports.getPostsList = function (callback) {
	Post
	.find({})
	.sort('-updatedAt')
	.select('_id title updatedAt')
	.exec(function(err, docs){
	    callback(err, docs);       
	});
}

/**
 * @param newPost: a new Post must have a title
 * @param callback(err, doc)
 * @callback doc: the doc saved
 */

exports.addNewPost = function (newPost, callback) {
	var instance
	newPost.createdAt = new Date();
	newPost.updatedAt = new Date();
	instance = new Post(newPost);

	instance.save(function(err, doc){
		callback(err, doc);
	});
}

/**
 * @param id
 * @param callback(err, docs)
 * @callback doc: a document, will be null if no found
 */

exports.getPostById = function (id, callback) {
	Post
	.findById(id)
	.exec(function(err, doc){
		callback(err, doc);
	});
}

/**
 * @param id: the id of the post
 * @param updateData: the field need to update and the new value
 * @param callback(err)
 */
exports.updatePostById = function (id, updateData, callback) {
	updateData.updatedAt = new Date();
	Post
	.update({_id: id}, updateData)
	.exec(function(err){
		callback(err);
	});
}

/**
 * @param id : the id of the post
 * @param comment : the comment to add
 * @param callback(err, comments)
 * @callback comments : the new comment list
 */
exports.addCommentToPost = function(id, comment, callback) {
	Post.findById(id).select('comments').exec(function(err, doc){
		if(err){
			callback(err);
		}

		var comments = doc.toObject().comments;
		comment.createdAt = new Date();
		comments.push(comment);

		Post.update({_id: id}, {comments: comments}).exec(function(err){
			if(err){
				callback(err);
			}
			Post.findById(id)
				.select('comments')
				.exec(function(err, doc){
					callback(err, doc.comments);
			});
		});
	});
}

/**
 * @param id : the id of the post
 * @param commentId : the id of the comment
 * @param callback(err, comments)
 * @callback comments : the new comment list
 */
exports.removeCommentInPost = function(id, commentId, callback){
	Post.findById(id).select('comments').exec(function(err, doc){
		if(err){
			callback(err);
		}
		var newComments = doc.comments.pull(commentId);

		Post.update({_id: id}, {comments: newComments}).exec(function(err){
			if (err){
				callback(err);
			}
			Post.findById(id)
				.select('comments')
				.exec(function(err, doc){
					callback(err, doc.comments);
			});
		});
	});
}

/**
 * @param id: the id of the post
 * @param callback(err)
 */
exports.removePostById = function (id, callback) {
	Post
	.remove({_id: id})
	.exec(function(err){
		callback(err);
	});

}