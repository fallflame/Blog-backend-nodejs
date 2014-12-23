var app = angular.module("blog", ['ngSanitize']);

app.controller("BlogCtrl",['$http', function($http) {

	var that = this;

	this.posts = [];
	this.page = 1;
	this.newPost = {};

	this.reloadPosts = function(){
		$http.get('/api/posts')
			.success(function(data){
				that.posts = data;
			});
	};

	this.createNewPost = function(){

		this.newPost.content = tinyMCE.activeEditor.getContent();

		$http.post('/api/posts', this.newPost).
			success(function(){
				that.newPost.updatedAt = new Date();
				that.posts.unshift(that.newPost);
				that.newPost = {};
			});
	};

	this.loadPostToUpdateByID = function(id){

		this.posts.forEach(function(val, ind){
			if (val._id === id){
				that.newPost = val;
				tinyMCE.activeEditor.setContent(val.content)
			}
		});  

	}

	this.updatePostByID = function(id){

		$http.put('/api/posts/'+id, this.newPost).
			success(function(){

				that.posts.forEach(function(val, ind){
					if(val._id === id){
						that.posts.splice(ind, 1);
					}
				});
				that.newPost.updatedAt = new Date();
				this.newPost.content = tinyMCE.activeEditor.getContent();
				that.posts.unshift(that.newPost);

				that.newPost = {};

			});
	};

	this.deletePostByID = function(id){

		if (confirm("确定删除？")){
			$http.delete('/api/posts/'+id).
				success(function(){

					that.posts.forEach(function(val, ind){
						if(val._id === id){
							that.posts.splice(ind, 1);
						}
					});

				});
		}

	};


	this.reloadPosts();

}]);
