'use strict'

const through2 = require('through2')
	, rp = require('request-promise');

var UrlCrawlerTransform = through2.obj(function(data, encoding, callback) {
	
	var self = this;

	var options = {
	    uri: data.url
	};

	rp(options)
	    .then(function (webData) {
	    	self.push({
	    		'name': data.name,
	    		'webData': webData
	    	});
			callback();
	    })
	    .catch(function (err) {
	        // Crawling failed or Cheerio choked...
	        // TODO 
	    });	

});

module.exports = UrlCrawlerTransform;
