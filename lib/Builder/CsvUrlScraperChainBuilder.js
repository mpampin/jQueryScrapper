'use strict';

const fs = require('fs')
  , csv2 = require('csv2')
  , PassThrough = require('stream').PassThrough
  , CsvToObjectTransform = require('../Stream/CsvToObjectTransform')
  , UrlCrawlerTransform = require('../Stream/UrlCrawlerTransform')
  , WebDataCrawlerTransform = require('../Stream/WebDataCrawlerTransform')
  , MongoWritable = require('../Stream/MongoWritable')
  , StreamChain = require('../StreamChain');

var CsvUrlScraperChainBuilder = function(path) {

	this.build = function() {
		
		var rssFeed = new StreamChain();

		var reader = fs.createReadStream(path);
		var pass = new PassThrough();
		reader.pipe(pass);
		
		var dbWritable = new MongoWritable({
			db: 'mongodb://localhost:27017/salones_de_fiestas',
			collection: 'salones'
		});

		return rssFeed
				.shiftLink(pass)
			    .pushLink(csv2({separator: '|'}))
			    .pushLink(CsvToObjectTransform)
			    .pushLink(UrlCrawlerTransform)
			    .pushLink(WebDataCrawlerTransform);
			    //.pushLink(dbWritable);
	};

};

module.exports = CsvUrlScraperChainBuilder;