var assert = require("assert");
var http = require("http");
var hostname = 'localhost';
var port = 3000;

var testPostId;

describe('GET /', function(){
	it('should return a list, the length of the list shouldn\t be 0', function(done){
		var options = {
			hostname: hostname,
			port: port,
			path: '/api/posts',
			method: 'GET'
		};

		var req = http.request(options, function(res){
			var body = '';

			res.setEncoding('utf8');

			res.on('data', function (chunk) {
				body += chunk;
			});

			res.on('end', function(){
				var docs = JSON.parse(body);

				assert(!docs.err);
				assert(docs.length);
				
				done();
			});
		});
		
		req.end();
	});
});

describe('POST /', function(){

	it('should create a new post', function(done){
		var options = {
			hostname: hostname,
			port: port,
			path: '/api/posts',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			}
		};

		var testPost = {
			title: 'test Title',
			content: 'test content'
		}

		var req = http.request(options, function(res){
			 
			var body = '';

			res.setEncoding('utf8');

			res.on('data', function (chunk) {
				body += chunk;
			});

			res.on('end', function(){
				var doc = JSON.parse(body);

				assert(!doc.err);
				assert.equal(doc.title, testPost.title);

				testPostId = doc._id;
				
				done();
			});

		});

		req.write(JSON.stringify(testPost));
		req.end();

	});
});

describe('GET /:id', function(){
	it('should get the correct post', function(done){
		var options = {
			hostname: hostname,
			port: port,
			path: '/api/posts/'+testPostId,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		};

		var req = http.request(options, function(res){
		 
			var body = '';
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				body += chunk;
			});

			res.on('end', function(){
				var doc = JSON.parse(body);

				assert(!doc.err);
				assert.equal(doc.title, 'test Title');
				
				done();
			});

		});

		req.end();
	});
});

describe('PUT /:id', function(){

	before(function(done){
		var options = {
			hostname: hostname,
			port: port,
			path: '/api/posts/'+ testPostId,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			}
		};

		var testPost = {
			title: 'new test Title',
			content: 'test content'
		}

		var req = http.request(options, function(){
			done();
		});
		req.write(JSON.stringify(testPost));
		req.end();
	});

	it('after the update, should get the updated post', function(done){
		var options = {
			hostname: hostname,
			port: port,
			path: '/api/posts/' + testPostId,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		};

		var req = http.request(options, function(res){
		 
			var body = '';
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				body += chunk;
			});

			res.on('end', function(){
				var doc = JSON.parse(body);

				assert(!doc.err);
				assert.equal(doc.title, 'new test Title');
				
				done();
			});

		});

		req.end();
	})
});

var commentId;

describe('POST /:pid/comments/', function(){
	before(function(done){
		var options = {
			hostname: hostname,
			port: port,
			path: '/api/posts/' + testPostId + '/comments',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		};

		var testComment = {
			content: 'test Comment',
			commenter: 'Yan'
		};

		var req = http.request(options, function(res){
			done();
		});

		req.end(JSON.stringify(testComment));
	});

	it('should can get the comment added', function(done){
		var options = {
			hostname: hostname,
			port: port,
			path: '/api/posts/'+testPostId,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		};

		var req = http.request(options, function(res){
		 
			var body = '';
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				body += chunk;
			});

			res.on('end', function(){
				var doc = JSON.parse(body);

				assert(!doc.err);
				assert.equal(doc.comments[0].content, 'test Comment');
				commentId = doc.comments[0]._id;
				
				done();
			});

		});

		req.end();
	});
});

/*
describe('DELETE /posts/:pid/comments/:cid', function(){
	before(function(done){
		var options = {
			hostname: hostname,
			port: port,
			path: '/api/posts/' + testPostId + '/comments/' + commentId,
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			}
		};

		var req = http.request(options, function(res){
			done();
		});
		req.end();
	});

	it('should not get the comment deleted', function(){
		var options = {
			hostname: hostname,
			port: port,
			path: '/api/posts/'+testPostId,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		};

		var req = http.request(options, function(res){
		 
			var body = '';
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				body += chunk;
			});

			res.on('end', function(){
				var doc = JSON.parse(body);

				assert(!doc.err);
				assert.equal(!doc.comments[0]);

				done();
			});

		});

		req.end();
	});
});
*/

describe('DELETE /posts/:id', function(){
	before(function(done){
		var options = {
			hostname: hostname,
			port: port,
			path: '/api/posts/' + testPostId,
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			}
		};

		var req = http.request(options, function(res){
			done();
		});
		req.end();
	});

	it('shouldn\'t find the post after delete', function(done){
		var options = {
			hostname: hostname,
			port: port,
			path: '/api/posts/'+testPostId,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		};

		var req = http.request(options, function(res){
		 
			var body = '';
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				body += chunk;
			});

			res.on('end', function(){
				var doc = JSON.parse(body);
				assert(doc === null);				
				done();
			});

		});

		req.end();
	});
});






