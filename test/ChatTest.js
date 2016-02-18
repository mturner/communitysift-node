var _ = require('underscore');
var assert = require('chai').assert;
var config = require('../config.json');
var lib = require('../index')({
	endpoint: config.endpoint,
	apiKey: config.apiKey
});
 
describe('CommunitySift', function() {

  describe('chat', function () {

  	describe('sendMessage()', function () {

  		it('Should get a success sending data to Sift', function (done) {
	    	lib.sendMessage({
	    		room: "test",
	    		language: "en",
	    		text: "Fake message",
	    		rule: 1,
	    		server: "Gamma",
	    		player: new Date().getTime(),
	    		playerDisplayName: "Vinay",
	    		msgId: "1"
	    	}, function(err,res){
	    		assert.equal( res.entries.length, 2, "Two items are found in the string 'fake message'")
	    		done();
	    	});
	    });	

  	});

  	describe('preCheckMessage()', function () {

  		it('Should allow the message through', function (done) {
	    	lib.preCheckMessage({
	    		room: "test",
	    		language: "en",
	    		text: "Fake message",
	    		rule: 1,
	    		server: "Gamma",
	    		player: new Date().getTime(),
	    		playerDisplayName: "Vinay",
	    		msgId: "2"
	    	}, function(err,res){
	    		assert.equal( res.response, true, "The message was accepted")
	    		done();
	    	});
	    });	

  	});

  	describe('filterMessage()', function () {

  		it('Should get a filtered response back', function (done) {
	    	lib.filterMessage({
	    		room: "test",
	    		language: "en",
	    		text: "Fake message",
	    		rule: 1,
	    		server: "Gamma",
	    		player: new Date().getTime(),
	    		playerDisplayName: "Vinay",
	    		msgId: "2"
	    	}, function(err,res){
	    		assert.equal( res.response, true, "The message was accepted")
	    		done();
	    	});
	    });	

  	});
  	
  });

  /* USERNAME */

  describe('profile', function () {

  	describe('checkUsername()', function () {

  		it('Should not flag a normal username', function (done) {
	    	lib.checkUsername({
	    		rule: 1,
	    		player_id: new Date().getTime(),
	    		username: "Vinay",
	    		language: "en"
	    	}, function(err,res){
	    		assert.equal(res.response, true, "Was flagged as inappropriate and shouldn't be")
	    		done();
	    	});
	    });	

	    it('Should not flag an offensive username', function (done) {
	    	lib.checkUsername({
	    		rule: 1,
	    		player_id: new Date().getTime(),
	    		username: "fuckBalls",
	    		language: "en"
	    	}, function(err,res){
	    		assert.equal(res.response, false, "Was not flagged as inappropriate and should have been")
	    		done();
	    	});
	    });	


  	});
  	
  });

});
