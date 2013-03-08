/*
Name
	Embed Youtube Links

Description	
	Watches for Youtube links and embeds the video after them
	
*/

plugin.onMessageInsertion = function(talkerEvent)
{
	if( talkerEvent.content.indexOf( "://www.youtube.com/watch") > -1)
	{
		var p = Talker.getLastInsertion();
		var url = decodeURIComponent(p.find('a').attr('href'));
		var i = url.indexOf( 'watch?v=' )
		var vidid = url.substr(i+8,11)
		p.html( '<iframe width="560" height="315" src="http://www.youtube.com/embed/' + vidid + '" frameborder="0" style="z-index: 10" allowfullscreen></iframe><br/>' + p.html());
	}
}
