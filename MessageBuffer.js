/*
Name
	Message Buffer

Description	
	Up & Down arrows take you through your sent messages
	
*/

plugin.onLoaded = function()
{
	plugin.messageBuffer = [{content:''}]; //dummy message
	plugin.bufferIndex = 0;

	function setContent( message )
	{
		if(message.type == "message")
		{
			Talker.getMessageBox().val(message.content);
		}
		else if(message.type == "command")
		{
			Talker.getMessageBox().val('/' + message.command + ' ' + message.args.join(' '));
		}
	}


	Talker.getMessageBox().keyup(
		function(e)
		{
			var code = e.keyCode || e.which;

			if (code === 38) //up
			{
				if(plugin.bufferIndex == (plugin.messageBuffer.length-1)) return; //do nothing at end of buffer
				setContent(  plugin.messageBuffer[++plugin.bufferIndex] );
			}
			else if (code === 40) //down
			{
				if(plugin.bufferIndex == 0) return //do nothing at beginning of buffer
				setContent( plugin.messageBuffer[--plugin.bufferIndex]);
			}
		}
	);


}

plugin.onMessageSent = function(talkerEvent)
{
	var ms = plugin.messageBuffer;
	var lastMessage = ms[1]; 
	//only store it if it differs from the last send
	if( ms.length == 1 
	   || talkerEvent.type != lastMessage.type
	   || ( talkerEvent.type == 'message' && lastMessage.content != talkerEvent.content)
	   || (talkerEvent.type == 'command' 
	   		&& (lastMessage.command != talkerEvent.command || lastMessage.args != talkerEvent.args)
	   	) 
	)
	{
		ms.splice(1, 0, talkerEvent)
	}

	plugin.bufferIndex=0;
}