'use strict'

const through2 = require('through2')
	, cheerio = require('cheerio');

var CsvToObjectTransform = through2.obj(function(data, encoding, callback) {
	
	this.push({
		'name': data[0],
		'url': data[1]
	});

	callback();

});

module.exports = CsvToObjectTransform;
