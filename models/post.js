var db = require('../lib/db');

var PostSchema = new db.Schema({
	title 	: 	{ type: String, required: true, trim: true},
	content : 	String,
	createdAt : Date,
	updatedAt : Date
});

var Post = db.mongoose.model('Post', PostSchema);

module.exports.addPost = addPost;
module.exports.getPosts = getPosts;
module.exports.removePosts = removePosts;

function addPost (newPost, callback) {

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

/* function getPosts([selector,] callback);
	
	selector : PlainObject;
	callback : function(docs);
*/

function getPosts (selector, callback) {

	if (typeof(selector) === 'function'){
		var callback = selector;
		selector = {};
	}

	Post
	.find(selector)
	.sort('-updatedAt')
	.exec(function(err, docs){

		if(!err){   
	        callback(docs);       
		}

	});

}

function removePosts(selector) {

	Post.remove(selector).exec();

}