'use strict';

var StreamChain = function() {

	var chain = [];

	this.pushLink = function(stream) {
		return this.addLink2Chain(stream, chain.length);
	}

	this.shiftLink = function(stream) {
		return this.addLink2Chain(stream, 0);
	}

	this.addLink2Chain = function(stream, position) {

		// if not the first position, pipe previous to stream
		if(position > 0) {
			var previous = chain[position - 1];
			previous.pause();
			previous.unpipe();
			previous.pipe(stream);
			previous.resume();
		}

		// if not the last position, pipe stream to subsequent
		if(position < chain.length) {
			stream.pipe(chain[position]);
		}

		// Add element to array
		chain.splice(position, 0, stream);

		return this;
	}

	this.start = function() {

		var resumeLink = function(link) {
			link.resume();
		}

		// resume links in inverse order
		chain.reverse()
			 .forEach(resumeLink)
			 .reverse();

	}

}

module.exports = StreamChain;