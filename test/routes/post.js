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

/*
describe('PUT /:id', function(){

	before(function(){
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

		var req = http.request(options, function(){});
		req.write(JSON.stringify(testPost));
		req.end();
	});

	it('after the update, should get the updated post', function(done){
		var options = {
			hostname: hostname,
			port: port,
			path: '/api/posts/'+ testPostId,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		};

		http.request(options, function(res){
			
			var body = '';
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				body += chunk;
			});
			res.on('end', function(){
				var doc = JSON.parse(body);

				assert(!doc.err);
				assert.equal(doc.title, testPost.title);

				done();
			});
		});
	})
});
*/