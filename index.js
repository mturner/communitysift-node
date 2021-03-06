var _ = require('underscore');
var request = require('request');

module.exports = function(options) {
	
	var opts = _.extend( options, {
		protocol: "https://"
	});

	//var proxied = request.defaults({'proxy':'http://127.0.0.1:8888'})

	return {

		/* Roles */
		SUPERUSER: 0,
		TRUSTED: 3,
		DEFAULT: 4,
		NOT_TRUSTED: 6,
		MUTE: 7,

		/* Risk */
		SUPERSAFE: 0,
		WHITELISTED: 1,
		GREY: 2,
		QUESTIONABLE: 3,
		UNKNOWN: 4,

		workflow: function ( flow, options, callback) {

			var url =  opts.protocol + opts.endpoint + "/v1/workflow/call/" + flow;
			var auth = new Buffer("" + ':' + opts.apiKey).toString('base64');
			var headers = {
                Authorization: 'Basic ' + auth,
                'Content-Type': 'application/json'
			}
			var req = {
				url: url,
				headers: headers,
				json: true,
				body: options,
				strictSSL: false
			}

			request.post( req, function(err, response, body ) {
				if ( err ) {
					callback(err,null);
				} else {
					callback( null, body );
				}
			});


		},

		filterMessage: function ( options, callback ) {

			var data = {
			    room: options.room,
			    language: options.language,
			    text: options.text,
			    rule: options.rule,
			    server: options.server,
			    player: options.player,
			    player_display_name: options.playerDisplayName,
			    msg_id: options.msgId
			}

			var url =  opts.protocol + opts.endpoint + "/v1/chat";
			var auth = new Buffer("" + ':' + opts.apiKey).toString('base64');
			var headers = {
                Authorization: 'Basic ' + auth,
                'Content-Type': 'application/json'
			}
			var req = {
				url: url,
				headers: headers,
				json: true,
				body: data,
				strictSSL: false
			}

			request.post( req, function(err, response, body ) {
				if ( err ) {
					callback(err,null);
				} else {
					callback( null, body )
				}
			});


		},

		checkUsername: function( options, callback ) {
			var data = {
			    player_id: options.player_id,
			    username: options.username,
			    langauge: options.language,
			    rule: options.rule
			}

			var url =  opts.protocol + opts.endpoint + "/v1/username";
			var auth = new Buffer("" + ':' + opts.apiKey).toString('base64');
			var headers = {
                Authorization: 'Basic ' + auth,
                'Content-Type': 'application/json'
			}
			var req = {
				url: url,
				headers: headers,
				json: true,
				body: data,
				strictSSL: false
			}

			request.post( req, function(err, response, body ) {
				if ( err ) {
					callback(err,null);
				} else {
					callback( null, body )
				}
			});
		},

		sendMessage: function ( options, callback ) {

			var data = {
			    room: options.room, // the context ( post ) in the wishbone world
			    /*
					comment: server = post_id
					direct message: server = conversation_d
			    */
			    language: options.language,
			    text: options.text, // the message itself
			    rule: options.rule, // 1 = public message 2 = private
			    server: options.server, 
			    /*
					app: wishbone
			    */
			    player: options.player, // wishbone user
			    player_display_name: options.playerDisplayName,
			    msg_id: options.msgId
			}

			var url =  opts.protocol + opts.endpoint + "/v1/chat/check";
			var auth = new Buffer("" + ':' + opts.apiKey).toString('base64');
			var headers = {
                Authorization: 'Basic ' + auth,
                'Content-Type': 'application/json'
			}
			var req = {
				url: url,
				headers: headers,
				json: true,
				body: data,
				strictSSL: false
			}

			request.post( req, function(err, response, body ) {
				if ( err ) {
					callback(err,null);
				} else {
					callback( null, body )
				}
			});


		},

		preCheckMessage: function ( options, callback ) {

			var data = {
			    room: options.room,
			    language: options.language,
			    text: options.text,
			    rule: options.rule,
			    server: options.server,
			    player: options.player,
			    player_display_name: options.playerDisplayName,
			    msg_id: options.msgId
			}

			var url =  opts.protocol + opts.endpoint + "/v1/chat/pre";
			var auth = new Buffer("" + ':' + opts.apiKey).toString('base64');
			var headers = {
                Authorization: 'Basic ' + auth,
                'Content-Type': 'application/json'
			}
			var req = {
				url: url,
				headers: headers,
				json: true,
				body: data,
				strictSSL: false
			}

			request.post( req, function(err, response, body ) {
				if ( err ) {
					callback(err,null);
				} else {
					callback( null, body )
				}
			});


		}


	}

	
}