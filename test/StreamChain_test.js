'use strict';

var StreamChain = require('../lib/StreamChain.js')
  , through2 = require('through2');

exports['StreamChain'] = {

    setUp: function(done) {
        this.streamChain = new StreamChain();

        this.firstLink = through2.obj(function(test, enconding, done) {
            test.equal(test.amountOfLinks, 0, "Its not the first link in the chain");
            test.amountOfLinks++;
            this.push(test);
            done();
        });

        this.secondLink = through2.obj(function(test, enconding, done) {
            test.equal(test.amountOfLinks, 1, "Its not the second link in the chain");
            test.amountOfLinks++;
            this.push(test);
            done();
        });

        this.thirdLink = through2.obj(function(test, enconding, done) {
            test.equal(test.amountOfLinks, 2, "Its not the third link in the chain");
            test.amountOfLinks++;
            this.push(test);
            done();
        });

        this.flushData = function(test) {

            // Add test data to link
            test.amountOfLinks = 0;
            this.firstLink.write(test);

        }

        done();
    },

    'One link chain': function(test) {

        test.expect(1);
        this.streamChain.shiftLink(this.firstLink);
        this.flushData(test);

        test.done();

    },

    'Two link chain': function(test) {

        test.expect(2);
        this.streamChain.shiftLink(this.firstLink);
        this.streamChain.pushLink(this.secondLink);
        this.flushData(test);

        test.done();
    },

    'Three link chain': function(test) {

        test.expect(3);
        this.streamChain.shiftLink(this.firstLink);
        this.streamChain.pushLink(this.secondLink);
        this.streamChain.pushLink(this.thirdLink);
        this.flushData(test);

        test.done();
    }
};
