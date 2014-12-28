var assert = require("assert");
var http = require("http");
var hostname = 'localhost';
var port = 3000;

describe('GET /', function(){
	it('should return a list', function(done){
		var options = {
			hostname: hostname,
			port: port,
			path: '/api/posts',
			method: 'GET'
		};

		http.request(options, function(res){
			var body = '';

			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				body += chunk;
			});
			res.on('end', function(){
				var docs = JSON.parse(body);

				assert(docs.length);
				
				done();
			});
		}).end();
	});
});