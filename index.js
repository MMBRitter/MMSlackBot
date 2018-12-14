var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var checkmk = require('./checkMKapi');
const unauth = "Unauthorized check, information locked.";
app.listen(3000, () => {
 console.log("Server running on port 3000");
});


app.post('/mem', function(req, res) {
    var channel = req.body.channel_id;
    var token = req.body.token;
	var MEMinstance = req.body.text;
	console.log("hostname from slack command =" + MEMinstance);

if ((channel === "channelID") && (token === "slackbotToken")) {
    checkmk.mem(MEMinstance).then(function(body){
    	var raw = JSON.parse(body);
    	var trimmed = raw.slice(1);
    	var stringed = JSON.stringify(trimmed);
    	var regexed = stringed.replace(/[\[\]\"]+/g, '');
    	var linebroken = regexed.replace(/,/g, "\r\n");
    	console.log(linebroken);
    	var formatted = {
    		"response_type": "ephemeral", //change to in_channel for visible to anyone
    		"text": "Current Memory Usage",
    		"attachments": [
    			{
    				"text":linebroken
    			}
    		]
    	}
    	res.json(formatted);
    });
}
else {
    res.send(unauth);
}

});

app.post('/cpu', function(req, res) {
    var channel = req.body.channel_id;
	var CPUinstance = req.body.text;
    var token = req.body.token;
    console.log(token);
	console.log(CPUinstance);

if ((channel === "channelID") && (token === "slackbotToken")) {
    checkmk.cpu(CPUinstance).then(function(body){
    	var raw = JSON.parse(body);
    	var trimmed = raw.slice(1);
    	var stringed = JSON.stringify(trimmed);
    	var regexed = stringed.replace(/[\[\]\"]+/g, '');
    	var linebroken = regexed.replace(/,/g, "\r\n");
    	console.log(linebroken);
    	var formatted = {
    		"response_type": "ephemeral", //change to in_channel to make visible to anyone
    		"text": "Current CPU Utilization",
    		"attachments": [
    			{
    				"text":linebroken
    			}
    		]
    	}
    	res.json(formatted);
    });
}    
else {
    res.send(unauth);
}
});
