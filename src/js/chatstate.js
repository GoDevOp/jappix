/*

Jappix - An open social platform
These are the chatstate JS script for Jappix

-------------------------------------------------

License: AGPL
Author: Valérian Saliou

*/

// Bundle
var Chatstate = (function () {

    /**
     * Alias of this
     * @private
     */
    var self = {};

    
	// Sends a given chatstate to a given entity
	function chatStateSend(state, xid, hash) {
		var user_type = $('#' + hash).attr('data-type');
		
		// If the friend client supports chatstates and is online
		if((user_type == 'groupchat') || ((user_type == 'chat') && $('#' + hash + ' .message-area').attr('data-chatstates') && !exists('#page-switch .' + hash + ' .unavailable'))) {
			// Already sent?
			if(getDB(DESKTOP_HASH, 'currentchatstate', xid) == state)
				return;
			
			// Write the state
			setDB(DESKTOP_HASH, 'currentchatstate', xid, state);
			
			// New message stanza
			var aMsg = new JSJaCMessage();
			aMsg.setTo(xid);
			aMsg.setType(user_type);
			
			// Append the chatstate node
			aMsg.appendNode(state, {'xmlns': NS_CHATSTATES});
			
			// Send this!
			con.send(aMsg);
		}
	}

	// Displays a given chatstate in a given chat
	function displayChatState(state, hash, type) {
		// Groupchat?
		if(type == 'groupchat') {
			resetChatState(hash, type);
			
			// "gone" state not allowed
			if(state != 'gone')
				$('#page-engine .page-engine-chan .user.' + hash).addClass(state);
		}
		
		// Chat
		else {
			// We change the buddy name color in the page-switch
			resetChatState(hash, type);
			$('#page-switch .' + hash + ' .name').addClass(state);
			
			// We generate the chatstate text
			var text = '';
			
			switch(state) {
				// Active
				case 'active':
					text = _e("Your friend is paying attention to the conversation.");
					
					break;
				
				// Composing
				case 'composing':
					text = _e("Your friend is writing a message...");
					
					break;
				
				// Paused
				case 'paused':
					text = _e("Your friend stopped writing a message.");
					
					break;
				
				// Inactive
				case 'inactive':
					text = _e("Your friend is doing something else.");
					
					break;
				
				// Gone
				case 'gone':
					text = _e("Your friend closed the chat.");
					
					break;
			}
			
			// We reset the previous state
			$('#' + hash + ' .chatstate').remove();
			
			// We create the chatstate
			$('#' + hash + ' .content').after('<div class="' + state + ' chatstate">' + text + '</div>');
		}
	}

	// Resets the chatstate switcher marker
	function resetChatState(hash, type) {
		// Define the selector
		var selector;
		
		if(type == 'groupchat')
			selector = $('#page-engine .page-engine-chan .user.' + hash);
		else
			selector = $('#page-switch .' + hash + ' .name');
		
		// Reset!
		selector.removeClass('active')
		selector.removeClass('composing')
		selector.removeClass('paused')
		selector.removeClass('inactive')
		selector.removeClass('gone');
	}

	// Adds the chatstate events
	function eventsChatState(target, xid, hash, type) {
		target.keyup(function(e) {
			if(e.keyCode != 13) {
				// Composing a message
				if($(this).val() && (getDB(DESKTOP_HASH, 'chatstate', xid) != 'on')) {
					// We change the state detect input
					setDB(DESKTOP_HASH, 'chatstate', xid, 'on');
					
					// We send the friend a "composing" chatstate
					chatStateSend('composing', xid, hash);
				}
				
				// Flushed the message which was being composed
				else if(!$(this).val() && (getDB(DESKTOP_HASH, 'chatstate', xid) == 'on')) {
					// We change the state detect input
					setDB(DESKTOP_HASH, 'chatstate', xid, 'off');
					
					// We send the friend an "active" chatstate
					chatStateSend('active', xid, hash);
				}
			}
		});
		
		target.change(function() {
			// Reset the composing database entry
			setDB(DESKTOP_HASH, 'chatstate', xid, 'off');
		});
		
		target.focus(function() {
			// Not needed
			if(target.is(':disabled'))
				return;
			
			// Something was written, user started writing again
			if($(this).val())
				chatStateSend('composing', xid, hash);

			// Chat only: Nothing in the input, user is active
			else if(type == 'chat')
				chatStateSend('active', xid, hash);
		});
		
		target.blur(function() {
			// Not needed
			if(target.is(':disabled'))
				return;
			
			// Something was written, user paused
			if($(this).val())
				chatStateSend('paused', xid, hash);

			// Chat only: Nothing in the input, user is inactive
			else if(type == 'chat')
				chatStateSend('inactive', xid, hash);
		});
	}







	/**
     * XXXXXX
     * @public
     * @param {type} name
     * @return {undefined}
     */
    self.xxxx = function() {

        try {
            // CODE
        } catch(e) {
            Console.error('YYYYY.xxxx', e);
        }

    };


    /**
     * XXXXXX
     * @public
     * @param {type} name
     * @return {undefined}
     */
    self.xxxx = function() {

        try {
            // CODE
        } catch(e) {
            Console.error('YYYYY.xxxx', e);
        }

    };


    /**
     * XXXXXX
     * @public
     * @param {type} name
     * @return {undefined}
     */
    self.xxxx = function() {

        try {
            // CODE
        } catch(e) {
            Console.error('YYYYY.xxxx', e);
        }

    };


    /**
     * XXXXXX
     * @public
     * @param {type} name
     * @return {undefined}
     */
    self.xxxx = function() {

        try {
            // CODE
        } catch(e) {
            Console.error('YYYYY.xxxx', e);
        }

    };


    /**
     * Return class scope
     */
    return self;

})();