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

  		var userId = new Date().getTime();

  		it('Should not have an issue with the message', function (done) {
	    	lib.sendMessage({
	    		room: "cf", // community feed
	    		language: "en",
	    		text: "Fake message",
	    		rule: 1,
	    		server: "1",// post id
	    		player: new Date().getTime(),
	    		playerDisplayName: "Vinay",
	    		msgId: "1"
	    	}, function(err,res){
	    		console.log(res);
	    		assert.equal( res.entries.length, 2, "Two items are found in the string 'fake message'")
	    		done();
	    	});
	    });	

	    it('Should express concern about the user now that they cursed', function (done) {
	    	lib.sendMessage({
	    		room: "cf", // community feed
	    		language: "en",
	    		text: "Fuck message",
	    		rule: 1,
	    		server: "1",// post id
	    		player: new Date().getTime(),
	    		playerDisplayName: "Vinay",
	    		msgId: "1"
	    	}, function(err,res){
	    		console.log(res);
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

  		var userId = new Date().getTime();

  		it('Should not flag a normal username', function (done) {
	    	
	    	lib.checkUsername({
	    		rule: 1,
	    		player_id: userId,
	    		username: "Vinay",
	    		language: "en"
	    	}, function(err,res){
	    		assert.equal(res.response, true, "Was flagged as inappropriate and shouldn't be")
	    		done();
	    	});

	    });	

	    it('When the user changes their username to include cursing it should flag it', function (done) {
	    	
	    	lib.checkUsername({
	    		rule: 1,
	    		player_id: userId,
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
