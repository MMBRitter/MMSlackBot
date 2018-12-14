var request = require("request-promise");

module.exports.cpu = function(host){
	var options = {
		url: "https://temp.managedmethodsdev.com/monitoring/check_mk/view.py?filled_in=filter&host_regex=" + host + "&service=CPU%20utilization&site=monitoring&view_name=cpusage&output_format=json&_username=automation&_secret=ServiceAccountSecretKey" ,
		method: "GET",
		strictSSL: false,
	};
	var rq = request(options)
		.then(function (body){;
			return body;
		});	
	return rq;
};

module.exports.mem = function(host){
	var options = {
		url: "https://temp.managedmethodsdev.com/monitoring/check_mk/view.py?filled_in=filter&host_regex=" + host + "&service=Memory&site=monitoring&view_name=memusage&output_format=json&_username=automation&_secret=ServiceAccountSecretKey" ,
		method: "GET",
		strictSSL: false,
	};
	var rq = request(options)
		.then(function (body){;
			return body;
		});	
	return rq;
};