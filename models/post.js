var db = require('../lib/db');

var PostSchema = new db.Schema({
	title 	: 	{ type: String, required: true, trim: true},
	content : 	String,
	createdAt : Date,
	updatedAt : Date
});

var Post = db.mongoose.model('Post', PostSchema);

var exports = module.exports;

exports.addNewPost = function (newPost, callback) {

	newPost.createdAt = new Date();
	newPost.updatedAt = new Date();

	var instance = new Post(newPost);

	instance.save(function(err, question){
		if (err && callback){

			callback(err);

		} else if (callback){

			callback(null, newPost);

		}
	});
}

exports.getAllPosts = function (callback) {

	Post
	.find({})
	.sort('-updatedAt')
	.exec(function(err, docs){

		if(!err){   
	        callback(docs);       
		}

	});

}

exports.updatePostByID = function (id, updateData) {
	Post.update({_id: id}, updateData).exec();
}

exports.removePostByID = function (id) {

	Post.remove({_id: id}).exec();

}