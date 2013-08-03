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