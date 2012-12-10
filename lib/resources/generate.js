var _ = require('underscore');

/**
	Every REST client call (get, put, post, delete[, create, update]) shares this common signature.
	This function returns an object which groks this signature from an arguments array:
	
	get({
		Some:'parameter'
	}, function(err, data, response) {
		console.log(err); //The error object from "request" module
		console.log(data); //The JSON-parsed response from Twilio
		console.log(response); //The node http.ClientResponse object from "request"
	});
	
	- or -
	
	get({
		Some:'parameter'
	});
	
	- or -
	
	get(function(err, data) {
		
	});
*/
function process(args) {
	return {
		twilioParams: (typeof args[0] !== 'function') ? args[0] : {}, 
		callback: (typeof args[0] === 'function') ? args[0] : args[1]
	};
};

//Generate a Twilio HTTP client call
var generate = function(client, method, url) {
	return function() {
		var args = process(arguments),
			requestArgs = {
				url:url,
				method:method
			};
		
		//Send parameters, if supplied
		if (args.twilioParams && method === 'GET') {
			requestArgs.qs = args.twilioParams;
		} else if (args.twilioParams) {
			requestArgs.form = args.twilioParams;
		}
		
		//make request
		client.request(requestArgs, args.callback);
	};
};

//generate several rest functions on a given object
generate.restFunctions = function(object, client, methods, resource) {
	for (var i = 0, l = methods.length; i<l; i++) {
		var method = methods[i];
		if (method === 'GET') {
			object.get = generate(client, method, resource);
		} else if (method === 'POST') {
			object.post = object.create = generate(client, method, resource);
		} else if (method === 'PUT') {
			object.put = object.update = generate(client, method, resource);
		} else if (method === 'DELETE') {
			object.delete = generate(client, method, resource);
		}
	}
};

module.exports = generate;