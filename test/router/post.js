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

	})
});