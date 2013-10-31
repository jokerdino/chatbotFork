(function () {
bot.listen( /^help(?: (\S+))?/, function ( msg ) {
	return bot.getCommand( 'help' ).exec( msg.matches[1] );
});


bot.listen( /^give (.+?) a lick/, function ( msg ) {
	var target = msg.matches[ 1 ], conjugation;

	//give me => you taste
	if ( target === 'me' ) {
		target = 'you';
		conjugation = '';
	}
	//give yourself => I taste
	else if ( target === 'yourself' ) {
		target = 'I';
		conjugation = '';
	}
	else {
		conjugation = 's';
	}
	//otherwise, use what the user gave us, plus a plural `s`

	return 'Mmmm! ' + target + ' taste' + conjugation + ' just like raisin';
});

/*
what              #simply the word what
(?:'s|'re)?       #optional suffix (what's, what're)
\s
(?:
    (?:is|are)    #is|are
\s                #you need a whitespace after a word
)?                #make the is|are optional
(?:
    (?:an|a)      #an|a
\s                #once again, option chosen - need a whitespace
)?                #make it optional
(
    [\w\s\-]+     #match the word the user's after, all we really care about
)
\??               #optional ?
*/
}());
