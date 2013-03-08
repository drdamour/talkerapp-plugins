/*
Name
	MS Translate Audio to Play Button

Description	
	any message with content http://api.microsofttranslator.com/V2/http.svc/Speak is assumed to be a link to a wave and is auto played

	
*/

plugin.onMessageInsertion =function(talkerEvent)
{
	if(talkerEvent.content.indexOf( "http://api.microsofttranslator.com/V2/http.svc/Speak") > -1)
	{
		var p = Talker.getLastInsertion();
		var audioURL = p.find( "a").attr("href");
		var audioFormat = "audio/wav";
		if(audioURL.indexOf('format=audio%2fmp3') > -1) audioFormat = "audio/mp3";

		p.html('<audio controls ' +  (plugin.autoplay ? 'autoplay' : '') + '><source src="' + audioURL + '" type="' + audioFormat + '">Your browser does not support the audio tag just click ' + talkerEvent.content + '</audio>');
	}
}

//only autoplay for new messages, stops a refresh from going crazy and playing a ton of audio
plugin.onLoaded = function()
{
	plugin.autoplay = true;
}