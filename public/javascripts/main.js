var app = angular.module("blog", []);

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

	this.saveNewPost = function(){

		$http.post('/api/posts', this.newPost).
			success(function(){
				that.newPost.updatedAt = new Date();
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
