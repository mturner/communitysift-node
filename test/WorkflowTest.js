var _ = require('underscore');
var assert = require('chai').assert;
var config = require('../config.json');
var lib = require('../index')({
	endpoint: config.endpoint,
	apiKey: config.apiKey
});
 
describe('CommunitySift', function() {

  describe('workflow', function () {

  	describe('workflow()', function () {

  		var userId = new Date().getTime();

  		it('Should not have an issue with the message', function (done) {
	    	lib.workflow( 'check_user_profile', {
	    		bio: "a short bio",
	    		user_id: "1",
	    		user_display_name: "Vinay",
	    		language: "en",
	    		rule: 1,
	    		avatar: "foo.com",
	    		full_name: "Vinay Agarwal",
	    	}, function(err,res){
	    		assert.equal( res.hasOwnProperty("bio_response"), true, "The workflow didn't have a response for each of the properties provided.")
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
	    		assert.equal( res.entries.length, 2, "Two items are found in the string 'fake message'")
	    		done();
	    	});
	    });	

  	});
  	
  });

});
