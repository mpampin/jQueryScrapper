'use strict'

var Writable = require('stream').Writable;
var util = require('util');
var MongoClient = require('mongodb').MongoClient;
var deferred = require('deferred');

util.inherits(MongoWritable, Writable);

module.exports = MongoWritable;

function MongoWritable(options) {
   
   var self = this;

   if(!(this instanceof MongoWritable)) {
      return new MongoWritable(options);
   }
   Writable.call(this, { objectMode: true });
   this.options = options;

   this.connected = deferred();

   MongoClient.connect(this.options.db, function (err, db) {
      if (err)  {
         // TODO: Handle .fail() error when rejected (options?)
         self.connected.reject();
         return;
      }

      self.db = db;
      self.on('finish', function () {
         self.db.close();
         self.connected.promise.done();
      });
      self.collection = db.collection(self.options.collection);
      self.connected.resolve();
   });

   this.insert = function(obj, done) {
      self.connected
          .promise(function() {
            self.collection.insert(obj, { w: 1 }, done);
          });
   }

}

MongoWritable.prototype._write = function (obj, encoding, done) {
   this.insert(obj, done);
};