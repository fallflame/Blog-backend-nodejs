var db = require('../lib/db');

var PostSchema = new db.Schema({
	title 	: 	{ type: String, required: true, trim: true},
	content : 	String,
	createdAt : Date,
	updatedAt : Date,
	comments : []
});

var Post = db.mongoose.model('Post', PostSchema);
var exports = module.exports;

/**
 * @param {function} callback(err, docs)
 * @callback err
 * @callback docs: docs is a array of posts, each post contain: _id, title, updatedAt
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
 * @param callback(err)
 */

exports.addNewPost = function (newPost, callback) {
	var instance
	newPost.createdAt = new Date();
	newPost.updatedAt = new Date();
	instance = new Post(newPost);

	instance.save(function(err){
		callback(err);
	});
}

/**
 * @param id
 * @param callback(err, docs)
 * @callback docs: a document
 */

exports.getPostByID = function (id, callback) {
	Post
	.findById(id)
	.exec(function(err, docs){
		callback(err, docs);
	});
}

/**
 * @param id: the id of the post
 * @param updateData: the field need to update and the new value
 * @param callback(err)
 */
exports.updatePostByID = function (id, updateData, callback) {
	updateData.updatedAt = new Date();
	Post
	.update({_id: id}, updateData)
	.exec(function(err){
		callback(err);
	});
}


/**
 * @param id: the id of the post
 * @param callback(err)
 */
exports.removePostByID = function (id) {
	Post
	.remove({_id: id})
	.exec(function(err){
		callback(err);
	});

}