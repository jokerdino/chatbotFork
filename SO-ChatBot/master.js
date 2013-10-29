var IO = window.IO = {
	//event handling
	events : {},
	preventDefault : false,

	//register for an event
	register : function ( name, fun, thisArg ) {
		if ( !this.events[name] ) {
			this.events[ name ] = [];
		}
		this.events[ name ].push({
			fun : fun,
			thisArg : thisArg,
			args : Array.prototype.slice.call( arguments, 3 )
		});

		return this;
	},

	unregister : function ( name, fun ) {
		if ( !this.events[name] ) {
			return this;
		}

		this.events[ name ] = this.events[ name ].filter(function ( obj ) {
			return obj.fun !== fun;
		});

		return this;
	},

	//fire event!
	fire : function ( name ) {
		this.preventDefault = false;

		if ( !this.events[name] ) {
			return;
		}

		var args = Array.prototype.slice.call( arguments, 1 ),
			that = this;
		this.events[ name ].forEach( fireEvent );

		function fireEvent( evt ) {
			var call = evt.fun.apply( evt.thisArg, evt.args.concat(args) );

			that.preventDefault = call === false;
		}
	},

	urlstringify : (function () {
		//simple types, for which toString does the job
		//used in singularStringify
		var simplies = { number : true, string : true, boolean : true };

		var singularStringify = function ( thing ) {
			if ( typeof thing in simplies ) {
				return encodeURIComponent( thing.toString() );
			}
			return '';
		};

		var arrayStringify = function ( key, array ) {
			key = singularStringify( key );

			return array.map(function ( val ) {
				return pair( key, val, true );
			}).join( '&' );
		};

		//returns a key=value pair. pass in dontStringifyKey so that, well, the
		// key won't be stringified (used in arrayStringify)
		var pair = function ( key, val, dontStringifyKey ) {
			if ( !dontStringifyKey ) {
				key = singularStringify( key );
			}

			return key + '=' + singularStringify( val );
		};

		return function ( obj ) {

			return Object.keys( obj ).map(function ( key ) {
				var val = obj[ key ];

				if ( Array.isArray(val) ) {
					return arrayStringify( key, val );
				}
				else {
					return pair( key, val );
				}
			}).join( '&' );
		};
	}()),

	loadScript : function ( url, cb ) {
		var script = document.createElement( 'script' );
		script.src = url;
		script.onload = cb;

		document.head.appendChild( script );
	}
};

IO.decodehtmlEntities = (function (){
var entities; //will be filled in the following line
entities = {"quot":"\"","amp":"&","apos":"'","lt":"<","gt":">","nbsp":" ","iexcl":"¡","cent":"¢","pound":"£","curren":"¤","yen":"¥","brvbar":"¦","sect":"§","uml":"¨","copy":"©","ordf":"ª","laquo":"«","not":"¬","reg":"®","macr":"¯","deg":"°","plusmn":"±","sup2":"²","sup3":"³","acute":"´","micro":"µ","para":"¶","middot":"·","cedil":"¸","sup1":"¹","ordm":"º","raquo":"»","frac14":"¼","frac12":"½","frac34":"¾","iquest":"¿","Agrave":"À","Aacute":"Á","Acirc":"Â","Atilde":"Ã","Auml":"Ä","Aring":"Å","AElig":"Æ","Ccedil":"Ç","Egrave":"È","Eacute":"É","Ecirc":"Ê","Euml":"Ë","Igrave":"Ì","Iacute":"Í","Icirc":"Î","Iuml":"Ï","ETH":"Ð","Ntilde":"Ñ","Ograve":"Ò","Oacute":"Ó","Ocirc":"Ô","Otilde":"Õ","Ouml":"Ö","times":"×","Oslash":"Ø","Ugrave":"Ù","Uacute":"Ú","Ucirc":"Û","Uuml":"Ü","Yacute":"Ý","THORN":"Þ","szlig":"ß","agrave":"à","aacute":"á","acirc":"â","atilde":"ã","auml":"ä","aring":"å","aelig":"æ","ccedil":"ç","egrave":"è","eacute":"é","ecirc":"ê","euml":"ë","igrave":"ì","iacute":"í","icirc":"î","iuml":"ï","eth":"ð","ntilde":"ñ","ograve":"ò","oacute":"ó","ocirc":"ô","otilde":"õ","ouml":"ö","divide":"÷","oslash":"ø","ugrave":"ù","uacute":"ú","ucirc":"û","uuml":"ü","yacute":"ý","thorn":"þ","yuml":"ÿ","OElig":"Œ","oelig":"œ","Scaron":"Š","scaron":"š","Yuml":"Ÿ","fnof":"ƒ","circ":"ˆ","tilde":"˜","Alpha":"Α","Beta":"Β","Gamma":"Γ","Delta":"Δ","Epsilon":"Ε","Zeta":"Ζ","Eta":"Η","Theta":"Θ","Iota":"Ι","Kappa":"Κ","Lambda":"Λ","Mu":"Μ","Nu":"Ν","Xi":"Ξ","Omicron":"Ο","Pi":"Π","Rho":"Ρ","Sigma":"Σ","Tau":"Τ","Upsilon":"Υ","Phi":"Φ","Chi":"Χ","Psi":"Ψ","Omega":"Ω","alpha":"α","beta":"β","gamma":"γ","delta":"δ","epsilon":"ε","zeta":"ζ","eta":"η","theta":"θ","iota":"ι","kappa":"κ","lambda":"λ","mu":"μ","nu":"ν","xi":"ξ","omicron":"ο","pi":"π","rho":"ρ","sigmaf":"ς","sigma":"σ","tau":"τ","upsilon":"υ","phi":"φ","chi":"χ","psi":"ψ","omega":"ω","thetasym":"ϑ","upsih":"ϒ","piv":"ϖ","ensp":" ","emsp":" ","thinsp":" ","ndash":"–","mdash":"—","lsquo":"‘","rsquo":"’","sbquo":"‚","ldquo":"“","rdquo":"”","bdquo":"„","dagger":"†","Dagger":"‡","bull":"•","hellip":"…","permil":"‰","prime":"′","Prime":"″","lsaquo":"‹","rsaquo":"›","oline":"‾","frasl":"⁄","euro":"€","image":"ℑ","weierp":"℘","real":"ℜ","trade":"™","alefsym":"ℵ","larr":"←","uarr":"↑","rarr":"→","darr":"↓","harr":"↔","crarr":"↵","lArr":"⇐","uArr":"⇑","rArr":"⇒","dArr":"⇓","hArr":"⇔","forall":"∀","part":"∂","exist":"∃","empty":"∅","nabla":"∇","isin":"∈","notin":"∉","ni":"∋","prod":"∏","sum":"∑","minus":"−","lowast":"∗","radic":"√","prop":"∝","infin":"∞","ang":"∠","and":"∧","or":"∨","cap":"∩","cup":"∪","int":"∫","there4":"∴","sim":"∼","cong":"≅","asymp":"≈","ne":"≠","equiv":"≡","le":"≤","ge":"≥","sub":"⊂","sup":"⊃","nsub":"⊄","sube":"⊆","supe":"⊇","oplus":"⊕","otimes":"⊗","perp":"⊥","sdot":"⋅","lceil":"⌈","rceil":"⌉","lfloor":"⌊","rfloor":"⌋","lang":"〈","rang":"〉","loz":"◊","spades":"♠","clubs":"♣","hearts":"♥","diams":"♦", "zwnj":""};


/*
  &       -all entities start with &
  (
   #      -charcode entities also have a #
   x?     -hex charcodes
  )?
  [\w;]   -now the entity (alphanumeric, separated by ;)
  +?      -capture em until there aint no more (don't get the trailing ;)
  ;       -trailing ;
*/
var entityRegex = /&(#x?)?[\w;]+?;/g;
var replaceEntities = function ( entities ) {
	//remove the & and split into each separate entity
	return entities.slice( 1 ).split( ';' ).map( decodeEntity ).join( '' );
};
var decodeEntity = function ( entity ) {
	if ( !entity ) {
		return '';
	}

	//starts with a #, it's charcode
	if ( entity[0] === '#' ) {
		return decodeCharcodeEntity( entity );
	}

	if ( !entities.hasOwnProperty(entity) ) {
		//I hate this so. so. so much. it's just wrong.
		return '&' + entity +';';
	}
	return entities[ entity ];
};
var decodeCharcodeEntity = function ( entity ) {
	//remove the # prefix
	entity = entity.slice( 1 );

	var cc;
	//hex entities
	if ( entity[0] === 'x' ) {
		cc = parseInt( entity.slice(1), 16 );
	}
	//decimal entities
	else {
		cc = parseInt( entity, 10 );
	}

	return String.fromCharCode( cc );
};

return function ( html ) {
	return html.replace( entityRegex, replaceEntities );
};
}());

//build IO.in and IO.out
[ 'in', 'out' ].forEach(function ( dir ) {
	var fullName = dir + 'put';

	IO[ dir ] = {
		buffer : [],

		receive : function ( obj ) {
			IO.fire( 'receive' + fullName, obj );

			if ( IO.preventDefault ) {
				return this;
			}

			this.buffer.push( obj );

			return this;
		},

		//unload the next item in the buffer
		tick : function () {
			if ( this.buffer.length ) {
				IO.fire( fullName, this.buffer.shift() );
			}

			return this;
		},

		//unload everything in the buffer
		flush : function () {
			IO.fire( 'before' + fullName );

			if ( !this.buffer.length ) {
				return this;
			}

			var i = this.buffer.length;
			while( i --> 0 ) {
				this.tick();
			}

			IO.fire( 'after' + fullName );

			this.buffer = [];
			return this;
		}
	};
});

//a very incomplete circular-buffer implementation, used for the bored responses
IO.CBuffer = function ( size ) {
	var ret = {
		items : [],
		pos : 0,
		size : size
	};

	ret.add = function ( item ) {
		if ( this.pos === size ) {
			this.pos = 0;
		}

		this.items[ this.pos ] = item;
		this.pos += 1;
	};
	ret.contains = function ( item ) {
		return this.items.indexOf( item ) > -1;
	};

	return ret;
};

IO.relativeUrlToAbsolute = function ( url ) {
	//the anchor's href *property* will always be absolute, unlike the href
	// *attribute*
	var a = document.createElement( 'a' );
	a.setAttribute( 'href', url );

	return a.href;
};

IO.injectScript = function ( url ) {
	var script = document.createElement( 'script' );
	script.src = url;

	document.head.appendChild( script );
	return script;
};

IO.xhr = function ( params ) {
	//merge in the defaults
	params = Object.merge({
		method   : 'GET',
		headers  : {},
		complete : function (){}
	}, params );

	params.headers = Object.merge({
		'Content-Type' : 'application/x-www-form-urlencoded'
	}, params.headers );

	//if the data is an object, and not a fakey String object, dress it up
	if ( typeof params.data === 'object' && !params.data.charAt ) {
		params.data = IO.urlstringify( params.data );
	}

	var xhr = new XMLHttpRequest();
	xhr.open( params.method, params.url );

	xhr.addEventListener( 'readystatechange', function () {
		if ( xhr.readyState === 4 ) {
			params.complete.call(
				params.thisArg, xhr.responseText, xhr
			);
		}
	});

	Object.iterate( params.headers, function ( header, value ) {
		xhr.setRequestHeader( header, value );
	});

	xhr.send( params.data );

	return xhr;
};

IO.jsonp = function ( opts ) {
	opts.data = opts.data || {};
	opts.jsonpName = opts.jsonpName || 'jsonp';

	var script = document.createElement( 'script' ),
		semiRandom;

	do {
		semiRandom = 'IO' + ( Date.now() * Math.ceil(Math.random()) );
	} while ( window[semiRandom] );

	//this is the callback function, called from the "jsonp file"
	window[ semiRandom ] = function () {
		opts.fun.apply( opts.thisArg, arguments );

		//cleanup
		delete window[ semiRandom ];
		script.parentNode.removeChild( script );
	};

	//add the jsonp parameter to the data we're sending
	opts.data[ opts.jsonpName ] = semiRandom;

	//start preparing the url to be sent
	if ( opts.url.indexOf('?') === -1 ) {
		opts.url += '?';
	}

	//append the data to be sent, in string form, to the url
	opts.url += '&' + this.urlstringify( opts.data );

	script.onerror = opts.error;

	script.src = opts.url;
	document.head.appendChild( script );
};

//generic, pre-made call to be used inside commands
IO.jsonp.google = function ( query, cb ) {
	IO.jsonp({
		url : 'http://ajax.googleapis.com/ajax/services/search/web',
		jsonpName : 'callback',
		data : {
			v : '1.0',
			q : query
		},
		fun : cb
	});
};


//345678901234567890123456789012345678901234567890123456789012345678901234567890
//small utility functions
Object.merge = function () {
	return [].reduce.call( arguments, function ( ret, merger ) {

		Object.keys( merger ).forEach(function ( key ) {
			ret[ key ] = merger[ key ];
		});

		return ret;
	}, {} );
};

Object.iterate = function ( obj, cb, thisArg ) {
	Object.keys( obj ).forEach(function (key) {
		cb.call( thisArg, key, obj[key], obj );
	});
};

Object.TruthMap = function ( props ) {
	return ( props || [] ).reduce( assignTrue, Object.create(null) );

	function assignTrue ( ret, key ) {
		ret[ key ] = true;
		return ret;
	}
};

//SO chat uses an unfiltered for...in to iterate over an array somewhere, so
// that I have to use Object.defineProperty to make these non-enumerable
Object.defineProperty( Array.prototype, 'invoke', {
	value : function ( funName ) {
		var args = [].slice.call( arguments, 1 );

		return this.map( invoke );

		function invoke ( item, index ) {
			var res = item;

			if ( item[funName] && item[funName].apply ) {
				res = item[ funName ].apply( item, args );
			}

			return res;
		}
	},

	configurable : true,
	writable : true
});


//left this comment as company for future viewers with their new riddle
Object.defineProperty( Array.prototype, 'first', {
	value : function ( fun ) {
		return this.some(function ( item ) {
			return fun.apply( null, arguments ) && ( (fun = item) || true );
		}) ? fun : null;
	},

	configurable : true,
	writable : true
});

Object.defineProperty( Array.prototype, 'random', {
	value : function () {
		return this[ Math.floor(Math.random() * this.length) ];
	},

	configurable : true,
	writable : true
});

//define generic array methods on Array, like FF does
[ 'forEach', 'map', 'filter', 'reduce' ].forEach(function ( name ) {
	var fun = [][ name ]; //teehee
	Array[ name ] = function () {
		return fun.call.apply( fun, arguments );
	};
});

String.prototype.indexesOf = function ( str, fromIndex ) {
	//since we also use index to tell indexOf from where to begin, and since
	// telling it to begin from where it found the match will cause it to just
	// match it again and again, inside the indexOf we do `index + 1`
	// to compensate for that 1, we need to subtract 1 from the original
	// starting position
	var index = ( fromIndex || 0 ) - 1,
		ret = [];

	while ( (index = this.indexOf(str, index + 1)) > -1 ) {
		ret.push( index );
	}

	return ret;
};

//Crockford's supplant
String.prototype.supplant = function ( arg ) {
	//if it's an object, use that. otherwise, use the arguments list.
	var obj = (
		Object(arg) === arg ?
			arg : arguments );
	return this.replace( /\{([^\}]+)\}/g, replace );

	function replace ( $0, $1 ) {
		return obj.hasOwnProperty( $1 ) ?
			obj[ $1 ] :
			$0;
	}
};

String.prototype.startsWith = function ( str ) {
	return this.indexOf( str ) === 0;
};

Function.prototype.throttle = function ( time ) {
	var fun = this, timeout = -1;

	var ret = function () {
		clearTimeout( timeout );

		var context = this, args = arguments;
		timeout = setTimeout(function () {
			fun.apply( context, args );
		}, time );
	};

	return ret;
};

Function.prototype.memoize = function () {
	var cache = Object.create( null ), fun = this;

	return function memoized ( hash ) {
		if ( hash in cache ) {
			return cache[ hash ];
		}

		var res = fun.apply( null, arguments );

		cache[ hash ] = res;
		return res;
	};
};

//async memoizer
Function.prototype.memoizeAsync = function ( hasher ) {
	var cache = Object.create( null ), fun = this;

	hasher = hasher || function (x) { return x; };

	return function memoized () {
		var args = [].slice.call( arguments ),
			cb = args.pop(), //HEAVY assumption that cb is always passed last
			hash = hasher.apply( null, arguments );

		if ( hash in cache ) {
			cb.apply( null, cache[hash] );
			return;
		}

		//push the callback to the to-be-passed arguments
		args.push( resultFun );
		fun.apply( this, args );

		function resultFun () {
			cache[ hash ] = arguments;
			cb.apply( null, arguments );
		}
	};
};

//returns the number with at most `places` digits after the dot
//examples:
// 1.337.maxDecimal(1) === 1.3
//
//steps:
// floor(1.337 * 10e0) = 13
// 13 / 10e0 = 1.3
Number.prototype.maxDecimal = function ( places ) {
	var exponent = Math.pow( 10, places );

	return Math.floor( this * exponent ) / exponent;
};

//receives an (ordered) array of numbers, denoting ranges, returns the first
// range it falls between. I suck at explaining, so:
// 4..fallsAfter( [1, 2, 5] )  === 2
// 4..fallsAfter( [0, 3] ) === 3
Number.prototype.fallsAfter = function ( ranges ) {
	ranges = ranges.slice();
	var min = ranges.shift(), max,
		n = this.valueOf();

	for ( var i = 0, l = ranges.length; i < l; i++ ) {
		max = ranges[ i ];

		if ( n < max ) {
			break;
		}
		min = max;
	}

	return min <= n ? min : null;
};

//calculates a:b to string form
Math.ratio = function ( a, b ) {
    a = Number( a );
    b = Number( b );

    var gcd = this.gcd( a, b );
    return ( a / gcd ) + ':' + ( b / gcd );
};

//Euclidean gcd
Math.gcd = function ( a, b ) {
    if ( !b ) {
        return a;
    }
    return this.gcd( b, a % b );
};

Math.rand = function ( min, max ) {
	//rand() === rand( 0, 9 )
	if ( !min ) {
		min = 0;
		max = 9;
	}

	//rand( max ) === rand( 0, max )
	else if ( !max ) {
		max = min;
		min = 0;
	}

	return Math.floor( Math.random() * (max - min + 1) ) + min;
};

//I got annoyed that RegExps don't automagically turn into correct shit when
// JSON-ing them. so HERE.
Object.defineProperty( RegExp.prototype, 'toJSON', {
	value : function () {
		return this.toString();
	},
	configurable : true,
	writable : true
});

//takes a string and escapes any special regexp characters
RegExp.escape = function ( str ) {
	//do I smell irony?
	return str.replace( /[-^$\\\/\.*+?()[\]{}|]/g, '\\$&' );
	//using a character class to get away with escaping some things. the - in
	// the beginning doesn't denote a range because it only denotes one when
	// it's in the middle of a class, and the ^ doesn't mean negation because
	// it's not in the beginning of the class
};

//not the most efficient thing, but who cares. formats the difference between
// two dates
Date.timeSince = function ( d0, d1 ) {
	d1 = d1 || (new Date);

	var ms = d1 - d0,
		delay;

	var delays = [
		{
			delta : 3.1536e+10,
			suffix : 'year'
		},
		{
			delta : 2.592e+9,
			suffix : 'month'
		},
		{
			delta : 8.64e+7,
			suffix : 'day'
		},
		{
			delta : 3.6e+6,
			suffix : 'hour'
		},
		{
			delta : 6e+4,
			suffix : 'minute'
		},
		{
			delta : 1000,
			suffix : 'second'
		}
		//anything else is ms
	];

	while ( delay = delays.shift() ) {
		if ( ms >= delay.delta ) {
			return format( ms / delay.delta, delay.suffix );
		}
	}
	return format( ms, 'millisecond' );

	function format ( interval, suffix ) {
		interval = Math.floor( interval );
		suffix += interval === 1 ? '' : 's';

		return interval + ' ' + suffix;
	}
};


(function () {
"use strict";

var bot = window.bot = {
	invocationPattern : '!!',

	commands : {}, //will be filled as needed
	commandDictionary : null, //it's null at this point, won't be for long
	listeners : [],
	info : {
		invoked   : 0,
		learned   : 0,
		forgotten : 0,
		start     : new Date
	},
	users : {}, //will be filled in build

	parseMessage : function ( msgObj ) {
		if ( !this.validateMessage(msgObj) ) {
			bot.log( msgObj, 'parseMessage invalid' );
			return;
		}

		var msg = this.prepareMessage( msgObj ),
			id = msg.get( 'user_id' );
		bot.log( msg, 'parseMessage valid' );

		if ( this.banlist.contains(id) ) {
			bot.log( msgObj, 'parseMessage banned' );

			//tell the user he's banned only if he hasn't already been told
			if ( !this.banlist[id].told ) {
				msg.reply( 'You have been banned from using the bot. Please don\'t abuse it.' );
				this.banlist[ id ].told = true;
			}
			return;
		}

		try {
			//it wants to execute some code
			if ( /^c?>/.test(msg) ) {
				this.eval( msg );
			}
			else {
				this.invokeAction( msg );
			}
		}
		catch ( e ) {
			var err = 'Could not process input. Error: ' + e.message;

			if ( e.lineNumber ) {
				err += ' on line ' + e.lineNumber;
			}
			//column isn't part of ordinary errors, it's set in custom ones
			if ( e.column ) {
				err += ' on column ' + e.column;
			}

			msg.directreply( err );
			//make sure we have it somewhere
			console.dir( e );
		}
		finally {
			this.info.invoked += 1;
		}
	},

	//this conditionally calls execCommand or callListeners, depending on what
	// the input. if the input begins with a command name, it's assumed to be a
	// command. otherwise, it tries matching against the listener.
	invokeAction : function ( msg ) {
		var possibleName = msg.trim().replace( /^\/\s*/, '' ).split( ' ' )[ 0 ],
			cmd = this.getCommand( possibleName ),

			//this is the best name I could come up with
			//messages beginning with / want to specifically invoke a command
			coolnessFlag = msg.startsWith('/') ? !cmd.error : true;

		if ( !cmd.error ) {
			this.execCommand( cmd, msg );
		}
		else if ( coolnessFlag ) {
			coolnessFlag = this.callListeners( msg );
		}

		//nothing to see here, move along
		if ( coolnessFlag ) {
			return;
		}

		msg.reply( this.giveUpMessage(cmd.guesses) );
	},

	giveUpMessage : function ( guesses ) {
		//man, I can't believe it worked...room full of nachos for me
		var errMsg = 'That didn\'t make much sense.';
		if ( guesses && guesses.length ) {
			errMsg += ' Maybe you meant: ' + guesses.join( ', ' );
		}
		//mmmm....nachos
		else {
			errMsg += ' Use the help command to learn more.';
		}
		//wait a minute, these aren't nachos. these are bear cubs.
		return errMsg;
		//good mama bear...nice mama bear...tasty mama be---
	},

	execCommand : function ( cmd, msg ) {
		bot.log( cmd, 'execCommand calling' );

		if ( !cmd.canUse(msg.get('user_id')) ) {
			msg.reply([
				'You do not have permission to use the command ' + cmd.name,
				"I'm afraid I can't let you do that, " + msg.get('user_name')
			].random());
			return;
		}

		var args = this.Message(
				msg.replace( /^\/\s*/, '' ).slice( cmd.name.length ).trim(),
				msg.get()
			),
			//it always amazed me how, in dynamic systems, the trigger of the
			// actions is always a small, nearly unidentifiable line
			//this line right here activates a command
			res = cmd.exec( args );

		if ( res ) {
			msg.reply( res );
		}
	},

	prepareMessage : function ( msgObj ) {
		msgObj = this.adapter.transform( msgObj );

		var msg = IO.decodehtmlEntities( msgObj.content );
		return this.Message(
			msg.slice( this.invocationPattern.length ).trim(),
			msgObj );
	},

	validateMessage : function ( msgObj ) {
		var msg = msgObj.content.trim();

		return (
			//make sure we don't process our own messages,
			msgObj.user_id !== bot.adapter.user_id &&
			//and the message begins with the invocationPattern
			msg.startsWith( this.invocationPattern ) );
	},

	addCommand : function ( cmd ) {
		if ( !cmd.exec || !cmd.del ) {
			cmd = this.Command( cmd );
		}
		if ( cmd.learned ) {
			this.info.learned += 1;
		}
		cmd.invoked = 0;

		this.commands[ cmd.name ] = cmd;
		this.commandDictionary.trie.add( cmd.name );
	},

	//gee, I wonder what this will return?
	commandExists : function ( cmdName ) {
		return this.commands.hasOwnProperty( cmdName );
	},

	//if a command named cmdName exists, it returns that command object
	//otherwise, it returns an object with an error message property
	getCommand : function ( cmdName ) {
		var lowerName = cmdName.toLowerCase();

		if ( this.commandExists(lowerName) ) {
			return this.commands[ lowerName ];
		}

		//not found, onto error reporting
		//set the error margin according to the length
		this.commandDictionary.maxCost = Math.floor( cmdName.length / 5 + 1 );

		var msg = 'Command ' + cmdName + ' does not exist.',
		//find commands resembling the one the user entered
		guesses = this.commandDictionary.search( cmdName );

		//resembling command(s) found, add them to the error message
		if ( guesses.length ) {
			msg += ' Did you mean: ' + guesses.join( ', ' );
		}

		return { error : msg, guesses : guesses };
	},

	//the function women think is lacking in men
	listen : function ( regex, fun, thisArg ) {
		if ( Array.isArray(regex) ) {
			regex.forEach(function ( reg ) {
				this.listen( reg, fun, thisArg );
			}, this);
		}
		else {
			this.listeners.push({
				pattern : regex,
				fun : fun,
				thisArg: thisArg
			});
		}
	},

	callListeners : function ( msg ) {
		return this.listeners.some(function callListener ( listener ) {
			var match = msg.exec( listener.pattern ), resp;

			if ( match ) {
				resp = listener.fun.call( listener.thisArg, msg );

				bot.log( match, resp );
				if ( resp ) {
					msg.reply( resp );
				}
				return resp !== false;
			}
		});
	},

	stoplog : false,
	log : function () {
		if ( !this.stoplog ) {
			console.log.apply( console, arguments );
		}
	},

	stop : function () {
		this.stopped = true;
	},
	continue : function () {
		this.stopped = false;
	}
};

//a place to hang your coat and remember the past. provides an abstraction over
// localStorage or whatever data-storage will be used in the future.
bot.memory = {
	saveInterval : 900000, //15(min) * 60(sec/min) * 1000(ms/sec) = 900000(ms)

	data : {},

	get : function ( name, defaultVal ) {
		if ( !this.data[name] ) {
			this.set( name, defaultVal || {} );
		}

		return this.data[ name ];
	},

	set : function ( name, val ) {
		this.data[ name ] = val;
	},

	loadAll : function () {
		var self = this;

		Object.iterate( localStorage, function ( key, val ) {
			if ( key.startsWith('bot_') ) {
				console.log( key, val );
				self.set( key.replace(/^bot_/, ''), JSON.parse(val) );
			}
		});
	},

	save : function ( name ) {
		if ( name ) {
			localStorage[ 'bot_' + name ] = JSON.stringify( this.data[name] );
			return;
		}

		var self = this;
		Object.keys( this.data ).forEach(function ( name ) {
			self.save( name );
		});

		this.saveLoop();
	},

	saveLoop : function () {
		clearTimeout( this.saveIntervalId );
		setTimeout( this.saveLoop.bind(this), this.saveInterval );
	}
};

bot.memory.loadAll();
window.addEventListener( 'beforeunload', function () { bot.memory.save(); } );
bot.memory.saveLoop();

bot.banlist = bot.memory.get( 'ban' );
bot.banlist.contains = function ( id ) {
	return this.hasOwnProperty( id );
};
bot.banlist.add = function ( id ) {
	this[ id ] = { told : false };
	bot.memory.save( 'ban' );
};
bot.banlist.remove = function ( id ) {
	if ( this.contains(id) ) {
		delete this[ id ];
	}
};

//some sort of pseudo constructor
bot.Command = function ( cmd ) {
	cmd.name = cmd.name.toLowerCase();

	cmd.permissions = cmd.permissions || {};
	cmd.permissions.use = cmd.permissions.use || 'ALL';
	cmd.permissions.del = cmd.permissions.del || 'NONE';

	cmd.description = cmd.description || '';
	cmd.creator = cmd.creator || 'God';
	cmd.invoked = 0;

	//make canUse and canDel
	[ 'Use', 'Del' ].forEach(function ( perm ) {
		var low = perm.toLowerCase();
		cmd[ 'can' + perm ] = function ( usrid ) {
			var canDo = this.permissions[ low ];

			if ( canDo === 'ALL' ) {
				return true;
			}
			else if ( canDo === 'NONE' ) {
				return false;
			}
			else if ( canDo === 'OWNER' ) {
				return bot.isOwner( usrid );
			}
			return canDo.indexOf( usrid ) > -1;
		};
	});

	cmd.exec = function () {
		this.invoked += 1;
		return this.fun.apply( this.thisArg, arguments );
	};

	cmd.del = function () {
		bot.info.forgotten += 1;
		delete bot.commands[ cmd.name ];
	};

	return cmd;
};
//a normally priviliged command which can be executed if enough people use it
bot.CommunityCommand = function ( command, req ) {
	var cmd = this.Command( command ),
		used = {},
		old_execute = cmd.exec,
		old_canUse  = cmd.canUse;
	req = req || 2;

	cmd.canUse = function () {
		return true;
	};
	cmd.exec = function ( msg ) {
		var err = register( msg.get('user_id') );
		if ( err ) {
			bot.log( err );
			return err;
		}
		return old_execute.apply( cmd, arguments );
	};
	return cmd;

	//once again, a switched return statement: truthy means a message, falsy
	// means to go on ahead
	function register ( usrid ) {
		if ( old_canUse.call(cmd, usrid) ) {
			return false;
		}

		clean();
		var count = Object.keys( used ).length,
			needed = req - count - 1; //0 based indexing vs. 1 based humans
		bot.log( used, count, req );

		if ( usrid in used ) {
			return 'Already registered; still need {0} more'.supplant( needed );
		}
		else if ( needed > 0 ) {
			used[ usrid ] = new Date;
			return 'Registered; need {0} more to execute'.supplant( needed-1 );
		}
		bot.log( 'should execute' );
		return false; //huzzah!
	}

	function clean () {
		var tenMinsAgo = new Date;
		tenMinsAgo.setMinutes( tenMinsAgo.getMinutes() - 10 );

		Object.keys( used ).reduce( rm, used );
		function rm ( ret, key ) {
			if ( ret[key] < tenMinsAgo ) {
				delete ret[ key ];
			}
			return ret;
		}
	}
};

bot.Message = function ( text, msgObj ) {
	//"casting" to object so that it can be extended with cool stuff and
	// still be treated like a string
	var ret = Object( text );
	ret.content = text;

	var rawSend = function ( text ) {
		bot.adapter.out.add( text, msgObj.room_id );
	};
	var deliciousObject = {
		send : rawSend,

		reply : function ( resp, user_name ) {
			var prefix = bot.adapter.reply( user_name || msgObj.user_name );
			rawSend( prefix + ' ' + resp );
		},
		directreply : function ( resp ) {
			var prefix = bot.adapter.directreply( msgObj.message_id );
			rawSend( prefix + ' ' + resp );
		},

		//parse() parses the original message
		//parse( true ) also turns every match result to a Message
		//parse( msgToParse ) parses msgToParse
		//parse( msgToParse, true ) combination of the above
		parse : function ( msg, map ) {
			if ( !!msg === msg ) {
				map = msg;
				msg = text;
			}
			var parsed = bot.parseCommandArgs( msg || text );

			if ( !map ) {
				return parsed;
			}

			return parsed.map(function ( part ) {
				return bot.Message( part, msgObj );
			});
		},

		//execute a regexp against the text, saving it inside the object
		exec : function ( regexp ) {
			var match = regexp.exec( text );
			this.matches = match ? match : [];

			return match;
		},

		findUserid : function ( username ) {
			username = username.toLowerCase().replace( /\s/g, '' );
			var ids = Object.keys( bot.users );

			return ids.first(function ( id ) {
				var name = bot.users[ id ].name
					.toLowerCase().replace( /\s/g, '' );

				return name === username;
			}) || -1;
		}.memoize(),

		findUsername : (function () {
			var cache = {};

			return function ( id, cb ) {
				if ( cache[id] ) {
					finish( cache[id] );
				}
				else if ( bot.users[id] ) {
					finish( bot.users[id].name );
				}
				else {
					bot.users.request( bot.adapter.roomid, id, reqFinish );
				}

				function reqFinish ( user ) {
					finish( user.name );
				}
				function finish ( name ) {
					cb( cache[id] = name );
				}
			};
		})(),

		codify : bot.adapter.codify.bind( bot.adapter ),
		escape : bot.adapter.escape.bind( bot.adapter ),
		link   : bot.adapter.link.bind( bot.adapter ),

		//retrieve a value from the original message object, or if no argument
		// provided, the msgObj itself
		get : function ( what ) {
			if ( !what ) {
				return msgObj;
			}
			return msgObj[ what ];
		},
		set : function ( what, val ) {
			msgObj[ what ] = val;
			return msgObj[ what ];
		}
	};

	Object.iterate( deliciousObject, function ( key, prop ) {
		ret[ key ] = prop;
	});

	return ret;
};

bot.isOwner = function ( usrid ) {
	var user = this.users[ usrid ];
	return user && ( user.is_owner || user.is_moderator );
};

IO.register( 'input', bot.parseMessage, bot );

bot.beatInterval = 5000; //once every 5 seconds is Good Enough ™
(function beat () {
	bot.beat = setTimeout(function () {
		IO.fire( 'heartbeat' );
		beat();
	}, bot.beatInterval );
}());

//execute arbitrary js code in a relatively safe environment
bot.eval = (function () {
window.URL = window.URL || window.webkitURL || window.mozURL || null;

//translation tool: https://tinker.io/b2ff5
var worker_code = atob( 'dmFyIGdsb2JhbCA9IHRoaXM7CgovKm1vc3QgZXh0cmEgZnVuY3Rpb25zIGNvdWxkIGJlIHBvc3NpYmx5IHVuc2FmZSovCnZhciB3aGl0ZXkgPSB7CgknQXJyYXknICAgICAgICAgICAgICA6IDEsCgknQm9vbGVhbicgICAgICAgICAgICA6IDEsCgknRGF0ZScgICAgICAgICAgICAgICA6IDEsCgknRXJyb3InICAgICAgICAgICAgICA6IDEsCgknRXZhbEVycm9yJyAgICAgICAgICA6IDEsCgknRnVuY3Rpb24nICAgICAgICAgICA6IDEsCgknSW5maW5pdHknICAgICAgICAgICA6IDEsCgknSlNPTicgICAgICAgICAgICAgICA6IDEsCgknTWF0aCcgICAgICAgICAgICAgICA6IDEsCgknTmFOJyAgICAgICAgICAgICAgICA6IDEsCgknTnVtYmVyJyAgICAgICAgICAgICA6IDEsCgknT2JqZWN0JyAgICAgICAgICAgICA6IDEsCgknUmFuZ2VFcnJvcicgICAgICAgICA6IDEsCgknUmVmZXJlbmNlRXJyb3InICAgICA6IDEsCgknUmVnRXhwJyAgICAgICAgICAgICA6IDEsCgknU3RyaW5nJyAgICAgICAgICAgICA6IDEsCgknU3ludGF4RXJyb3InICAgICAgICA6IDEsCgknVHlwZUVycm9yJyAgICAgICAgICA6IDEsCgknVVJJRXJyb3InICAgICAgICAgICA6IDEsCgknYXRvYicgICAgICAgICAgICAgICA6IDEsCgknYnRvYScgICAgICAgICAgICAgICA6IDEsCgknZGVjb2RlVVJJJyAgICAgICAgICA6IDEsCgknZGVjb2RlVVJJQ29tcG9uZW50JyA6IDEsCgknZW5jb2RlVVJJJyAgICAgICAgICA6IDEsCgknZW5jb2RlVVJJQ29tcG9uZW50JyA6IDEsCgknZXZhbCcgICAgICAgICAgICAgICA6IDEsCgknZ2xvYmFsJyAgICAgICAgICAgICA6IDEsCgknaXNGaW5pdGUnICAgICAgICAgICA6IDEsCgknaXNOYU4nICAgICAgICAgICAgICA6IDEsCgknb25tZXNzYWdlJyAgICAgICAgICA6IDEsCgkncGFyc2VGbG9hdCcgICAgICAgICA6IDEsCgkncGFyc2VJbnQnICAgICAgICAgICA6IDEsCgkncG9zdE1lc3NhZ2UnICAgICAgICA6IDEsCgknc2VsZicgICAgICAgICAgICAgICA6IDEsCgkndW5kZWZpbmVkJyAgICAgICAgICA6IDEsCgknd2hpdGV5JyAgICAgICAgICAgICA6IDEsCgoJLyogdHlwZWQgYXJyYXlzIGFuZCBzaGl0ICovCgknQXJyYXlCdWZmZXInICAgICAgIDogMSwKCSdCbG9iJyAgICAgICAgICAgICAgOiAxLAoJJ0Zsb2F0MzJBcnJheScgICAgICA6IDEsCgknRmxvYXQ2NEFycmF5JyAgICAgIDogMSwKCSdJbnQ4QXJyYXknICAgICAgICAgOiAxLAoJJ0ludDE2QXJyYXknICAgICAgICA6IDEsCgknSW50MzJBcnJheScgICAgICAgIDogMSwKCSdVaW50OEFycmF5JyAgICAgICAgOiAxLAoJJ1VpbnQxNkFycmF5JyAgICAgICA6IDEsCgknVWludDMyQXJyYXknICAgICAgIDogMSwKCSdVaW50OENsYW1wZWRBcnJheScgOiAxLAoKCS8qCgl0aGVzZSBwcm9wZXJ0aWVzIGFsbG93IEZGIHRvIGZ1bmN0aW9uLiB3aXRob3V0IHRoZW0sIGEgZnVja2Zlc3Qgb2YKCWluZXhwbGljYWJsZSBlcnJvcnMgZW51c2VzLiB0b29rIG1lIGFib3V0IDQgaG91cnMgdG8gdHJhY2sgdGhlc2UgZnVja2VycwoJZG93bi4KCWZ1Y2sgaGVsbCBpdCBpc24ndCBmdXR1cmUtcHJvb2YsIGJ1dCB0aGUgZXJyb3JzIHRocm93biBhcmUgdW5jYXRjaGFibGUKCWFuZCB1bnRyYWNhYmxlLiBzbyBhIGhlYWRzLXVwLiBlbmpveSwgZnV0dXJlLW1lIQoJKi8KCSdET01FeGNlcHRpb24nIDogMSwKCSdFdmVudCcgICAgICAgIDogMSwKCSdNZXNzYWdlRXZlbnQnIDogMQp9OwoKWyBnbG9iYWwsIGdsb2JhbC5fX3Byb3RvX18gXS5mb3JFYWNoKGZ1bmN0aW9uICggb2JqICkgewoJT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoIG9iaiApLmZvckVhY2goZnVuY3Rpb24oIHByb3AgKSB7CgkJaWYoICF3aGl0ZXkuaGFzT3duUHJvcGVydHkoIHByb3AgKSApIHsKCQkJZGVsZXRlIG9ialsgcHJvcCBdOwoJCX0KCX0pOwp9KTsKCk9iamVjdC5kZWZpbmVQcm9wZXJ0eSggQXJyYXkucHJvdG90eXBlLCAnam9pbicsIHsKCXdyaXRhYmxlOiBmYWxzZSwKCWNvbmZpZ3VyYWJsZTogZmFsc2UsCgllbnVtcmFibGU6IGZhbHNlLAoKCXZhbHVlOiAoZnVuY3Rpb24gKCBvbGQgKSB7CgkJcmV0dXJuIGZ1bmN0aW9uICggYXJnICkgewoJCQlpZiAoIHRoaXMubGVuZ3RoID4gNTAwIHx8IChhcmcgJiYgYXJnLmxlbmd0aCA+IDUwMCkgKSB7CgkJCQl0aHJvdyAnRXhjZXB0aW9uOiB0b28gbWFueSBpdGVtcyc7CgkJCX0KCgkJCXJldHVybiBvbGQuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApOwoJCX07Cgl9KCBBcnJheS5wcm90b3R5cGUuam9pbiApKQp9KTsKCi8qIHdlIGRlZmluZSBpdCBvdXRzaWRlIHNvIGl0J2xsIG5vdCBiZSBpbiBzdHJpY3QgbW9kZSAqLwpmdW5jdGlvbiBleGVjICggY29kZSApIHsKCXJldHVybiBldmFsKCAndW5kZWZpbmVkO1xuJyArIGNvZGUgKTsKfQp2YXIgY29uc29sZSA9IHsKCV9pdGVtcyA6IFtdLAoJbG9nIDogZnVuY3Rpb24oKSB7CgkJY29uc29sZS5faXRlbXMucHVzaC5hcHBseSggY29uc29sZS5faXRlbXMsIGFyZ3VtZW50cyApOwoJfQp9Owpjb25zb2xlLmVycm9yID0gY29uc29sZS5pbmZvID0gY29uc29sZS5kZWJ1ZyA9IGNvbnNvbGUubG9nOwp2YXIgcCA9IGNvbnNvbGUubG9nLmJpbmQoIGNvbnNvbGUgKTsKCihmdW5jdGlvbigpewoJInVzZSBzdHJpY3QiOwoKCWdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoIGV2ZW50ICkgewoJCXBvc3RNZXNzYWdlKHsKCQkJZXZlbnQgOiAnc3RhcnQnCgkJfSk7CgoJCXZhciBqc29uU3RyaW5naWZ5ID0gSlNPTi5zdHJpbmdpZnksIC8qYmFja3VwKi8KCQkJcmVzdWx0OwoKCQl0cnkgewoJCQlyZXN1bHQgPSBleGVjKCBldmVudC5kYXRhICk7CgkJfQoJCWNhdGNoICggZSApIHsKCQkJcmVzdWx0ID0gZS50b1N0cmluZygpOwoJCX0KCgkJLypKU09OIGRvZXMgbm90IGxpa2UgYW55IG9mIHRoZSBmb2xsb3dpbmcqLwoJCXZhciBzdHJ1bmcgPSB7CgkJCUZ1bmN0aW9uICA6IHRydWUsIEVycm9yICA6IHRydWUsCgkJCVVuZGVmaW5lZCA6IHRydWUsIFJlZ0V4cCA6IHRydWUKCQl9OwoJCXZhciBzaG91bGRfc3RyaW5nID0gZnVuY3Rpb24gKCB2YWx1ZSApIHsKCQkJdmFyIHR5cGUgPSAoIHt9ICkudG9TdHJpbmcuY2FsbCggdmFsdWUgKS5zbGljZSggOCwgLTEgKTsKCgkJCWlmICggdHlwZSBpbiBzdHJ1bmcgKSB7CgkJCQlyZXR1cm4gdHJ1ZTsKCQkJfQoJCQkvKm5laXRoZXIgZG9lcyBpdCBmZWVsIGNvbXBhc3Npb25hdGUgYWJvdXQgTmFOIG9yIEluZmluaXR5Ki8KCQkJcmV0dXJuIHZhbHVlICE9PSB2YWx1ZSB8fCB2YWx1ZSA9PT0gSW5maW5pdHk7CgkJfTsKCgkJdmFyIHJldml2ZXIgPSBmdW5jdGlvbiAoIGtleSwgdmFsdWUgKSB7CgkJCXZhciBvdXRwdXQ7CgoJCQlpZiAoIHNob3VsZF9zdHJpbmcodmFsdWUpICkgewoJCQkJb3V0cHV0ID0gJycgKyB2YWx1ZTsKCQkJfQoJCQllbHNlIHsKCQkJCW91dHB1dCA9IHZhbHVlOwoJCQl9CgoJCQlyZXR1cm4gb3V0cHV0OwoJCX07CgoJCXBvc3RNZXNzYWdlKHsKCQkJYW5zd2VyIDoganNvblN0cmluZ2lmeSggcmVzdWx0LCByZXZpdmVyICksCgkJCWxvZyAgICA6IGpzb25TdHJpbmdpZnkoIGNvbnNvbGUuX2l0ZW1zLCByZXZpdmVyICkuc2xpY2UoIDEsIC0xICkKCQl9KTsKCX07Cn0pKCk7Cg==' );
var blob = new Blob( [worker_code], { type : 'application/javascript' } ),
	code_url = window.URL.createObjectURL( blob );

IO.injectScript( 'https://raw.github.com/jashkenas/coffee-script/master/extras/coffee-script.js' );

return function ( msg, cb ) {
	var worker = new Worker( code_url ),
		timeout;

	var code = msg.toString();
	if ( code[0] === 'c' ) {
		code = CoffeeScript.compile( code.replace(/^c>/, ''), {bare:1} );
	}
	else {
		code = code.replace( /^>/, '' );
	}

	worker.onmessage = function ( evt ) {
		var type = evt.data.event;
		if ( type === 'start' ) {
			start();
		}
		else {
			finish( dressUpAnswer(evt.data) );
		}
	};

	worker.onerror = function ( error ) {
		finish( error.toString() );
	};

	//and it all boils down to this...
	worker.postMessage( code );

	function start () {
		timeout = window.setTimeout(function() {
			finish( 'Maximum execution time exceeded' );
		}, 500 );
	}

	function finish ( result ) {
		clearTimeout( timeout );
		worker.terminate();

		if ( cb && cb.call ) {
			cb( result );
		}
		else {
			msg.directreply( result );
		}
	}
};

function dressUpAnswer ( answerObj ) {
	bot.log( answerObj, 'eval answerObj' );
	var answer = answerObj.answer,
		log = answerObj.log,
		result;

	result = snipAndCodify( answer );

	if ( log && log.length ) {
		result += ' Logged: ' + snipAndCodify( log );
	}

	return result;
}
function snipAndCodify ( str ) {
	var ret;

	if ( str.length > 400 ) {
		ret = '`' +  str.slice(0, 400) + '` (snip)';
	}
	else {
		ret = '`' + str +'`';
	}

	return ret;
}
}());


(function () {
"use strict";

var target;
if ( typeof bot !== 'undefined' ) {
	target = bot;
}
else if ( typeof exports !== 'undefined' ) {
	target = exports;
}
else {
	target = window;
}

target.parseCommandArgs = (function () {

//the different states, not nearly enough to represent a female humanoid
//you know you're building something fancy when it has constants with
// undescores in their name
var S_DATA         = 0,
	S_SINGLE_QUOTE = 1,
	S_DOUBLE_QUOTE = 2,
	S_NEW          = 3;

//and constants representing constant special chars (why aren't I special? ;_;)
var CH_SINGLE_QUOTE = '\'',
	CH_DOUBLE_QUOTE = '\"';

/*
the "scheme" roughly looks like this:
  args -> arg <sep> arg <sep> arg ... | Ø
  arg  -> singleQuotedString | doubleQuotedString | string | Ø

  singleQuotedString -> 'string'
  doubleQuotedString -> "string"
  string -> char char char ... | Ø
  char -> anyCharacter | <escaper>anyCharacter | Ø

Ø is the empty string
*/

//the bad boy in the hood
//I dunno what kind of parser this is, so I can't flaunt it or taunt with it,
// but it was fun to make
var parser = {

	parse : function ( source, sep, esc ) {
		//initializations are safe fun for the whole family!
		//later-edit: the above comment is one of the weirdest I've ever
		// written
		this.source = source;
		this.pos = 0;
		this.length = source.length;
		this.state = S_DATA;
		this.lookahead = '';

		this.escaper = esc || '~';
		this.separator = sep || ' ';

		var args = this.tokenize();

		//oh noez! errorz!
		if ( this.state !== S_DATA ) {
			this.throwFinishError();
		}

		return args;
	},

	tokenize : function () {
		var arg, ret = [];

		//let the parsing commence!
		while ( this.pos < this.length ) {
			arg = this.nextArg();

			//only add the next arg if it's actually something
			if ( arg ) {
				ret.push( arg );
			}
		}

		return ret;
	},

	//fetches the next argument (see the "scheme" at the top)
	nextArg : function () {
		var lexeme = '', ch;
		this.state = S_DATA;

		while ( true ) {
			ch = this.nextChar();
			if ( ch === null || this.state === S_NEW ) {
				break;
			}

			lexeme += ch;
		}

		return lexeme;
	},

	nextChar : function ( escape ) {
		var ch = this.lookahead = this.source[ this.pos ];
		this.pos++;

		if ( !ch ) {
			return null;
		}

		if ( escape ) {
			return ch;
		}

		//l'escaping!
		else if ( ch === this.escaper ) {
			return this.nextChar( true );
		}

		//encountered a separator and you're in data-mode!? ay digity!
		else if ( ch === this.separator && this.state === S_DATA ) {
			this.state = S_NEW;
			return ch;
		}

		return this.string();
	},

	//IM IN YO STRINGZ EATING YO CHARS
	// a.k.a string handling starts roughly here
	string : function () {
		var ch = this.lookahead;

		//single quotes are teh rulez
		if ( ch === CH_SINGLE_QUOTE ) {
			return this.singleQuotedString();
		}

		//exactly the same, just with double-quotes, which aren't quite as teh
		// rulez
		else if ( ch === CH_DOUBLE_QUOTE ) {
			return this.doubleQuotedString();
		}

		return ch;
	},

	singleQuotedString : function () {
		//we're already inside a double-quoted string, it's just another
		// char for us
		if ( this.state === S_DOUBLE_QUOTE ) {
			return this.lookahead;
		}

		//start your stringines!
		else if ( this.state !== S_SINGLE_QUOTE ) {
			this.state = S_SINGLE_QUOTE;
		}

		//end your stringiness!
		else {
			this.state = S_DATA;
		}

		return this.nextChar();
	},

	doubleQuotedString : function () {
		if ( this.state === S_SINGLE_QUOTE ) {
			return this.lookahead;
		}

		else if ( this.state !== S_DOUBLE_QUOTE ) {
			this.state = S_DOUBLE_QUOTE;
		}

		else {
			this.state = S_DATA;
		}

		return this.nextChar();
	},

	throwFinishError : function () {
		var errMsg = '';

		if ( this.state === S_SINGLE_QUOTE ) {
			errMsg = 'Expected ' + CH_SINGLE_QUOTE;
		}
		else if ( this.state === S_DOUBLE_QUOTE ) {
			errMsg = 'Expected ' + CH_DOUBLE_QUOTE;
		}

		var up = new Error( 'Unexpected end of input: ' + errMsg );
		up.column = this.pos;

		throw up; //problem?
	}
};

return function () {
	return parser.parse.apply( parser, arguments );
};
}());

}());

//a Trie suggestion dictionary, made by Esailija (small fixes by God)
// http://stackoverflow.com/users/995876/esailija
//used in the "command not found" message to show you closest commands
var SuggestionDictionary = (function () {

function TrieNode() {
	this.word = null;
	this.children = {};
}

TrieNode.prototype.add = function( word ) {
	var node = this, char, i = 0;

	while( char = word.charAt(i++) ) {
		if( !(char in node.children) ) {
			node.children[ char ] = new TrieNode();
		}

		node = node.children[ char ];
	}

	node.word = word;
};

//Having a small maxCost will increase performance greatly, experiment with
//values of 1-3
function SuggestionDictionary ( maxCost ) {
	if( !(this instanceof SuggestionDictionary) ) {
		throw new TypeError( "Illegal function call" );
	}

	maxCost = Number( maxCost );

	if( isNaN( maxCost ) || maxCost < 1 ) {
		throw new TypeError( "maxCost must be an integer > 1 " );
	}

	this.maxCost = maxCost;
	this.trie = new TrieNode();
}

SuggestionDictionary.prototype = {
	constructor: SuggestionDictionary,

	build : function ( words ) {
		if( !Array.isArray( words ) ) {
			throw new TypeError( "Cannot build a dictionary from "+words );
		}

		this.trie = new TrieNode();

		words.forEach(function ( word ) {
			this.trie.add( word );
		}, this);
	},

	__sortfn : function ( a, b ) {
		return a[1] - b[1];
	},

	search : function ( word ) {
		word = word.valueOf();
		var r;

		if( typeof word !== "string" ) {
			throw new TypeError( "Cannot search " + word );
		}
		if( this.trie === undefined ) {
			throw new TypeError( "Cannot search, dictionary isn't built yet" );
		}

		r = search( word, this.maxCost, this.trie );
		//r will be array of arrays:
		//["word", cost], ["word2", cost2], ["word3", cost3] , ..

		r.sort( this.__sortfn ); //Sort the results in order of least cost


		return r.map(function ( subarr ) {
			return subarr[ 0 ];
		});
	}
};

function range ( x, y ) {
	var r = [], i, l, start;

	if( y === undefined ) {
		start = 0;
		l = x;
	}
	else {
		start = x;
		l = y-start;
	}

	for( i = 0; i < l; ++i ) {
		r[i] = start++;
	}

	return r;

}

function search ( word, maxCost, trie ) {
	var results = [],
	currentRow = range( word.length + 1 );


	Object.keys( trie.children ).forEach(function ( letter ) {
		searchRecursive(
			trie.children[letter], letter, word,
			currentRow, results, maxCost );
	});

	return results;
}


function searchRecursive ( node, letter, word, previousRow, results, maxCost ) {
	var columns = word.length + 1,
		currentRow = [ previousRow[0] + 1 ],
		i, insertCost, deleteCost, replaceCost, last;

	for( i = 1; i < columns; ++i ) {

		insertCost = currentRow[ i-1 ] + 1;
		deleteCost = previousRow[ i ] + 1;

		if( word.charAt(i-1) !== letter ) {
			replaceCost = previousRow[ i-1 ]+1;

		}
		else {
			replaceCost = previousRow[ i-1 ];
		}

		currentRow.push( Math.min(insertCost, deleteCost, replaceCost) );
	}

	last = currentRow[ currentRow.length-1 ];
	if( last <= maxCost && node.word !== null ) {
		results.push( [node.word, last] );
	}

	if( Math.min.apply(Math, currentRow) <= maxCost ) {
		Object.keys( node.children ).forEach(function ( letter ) {
			searchRecursive(
				node.children[letter], letter, word,
				currentRow, results, maxCost );
		});
	}
}

return SuggestionDictionary;
}());

bot.commandDictionary = new SuggestionDictionary( 3 );


(function () {
"use strict";

var commands = {
	help : function ( args ) {
		if ( args && args.length ) {

			var cmd = bot.getCommand( args.toLowerCase() );
			if ( cmd.error ) {
				return cmd.error;
			}

			var desc = cmd.description || 'No info is available';

			return args + ': ' + desc;
		}

		return 'https://github.com/Zirak/SO-ChatBot/wiki/' +
			'Interacting-with-the-bot';
	},

	listen : function ( msg ) {
		var ret = bot.callListeners( msg );
		if ( !ret ) {
			return bot.giveUpMessage();
		}
	},

	eval : function ( msg, cb ) {
		return bot.eval( msg, cb );
	},
	coffee : function ( msg, cb ) {
		//yes, this is a bit yucky
		var arg = bot.Message( 'c> ' + msg, msg.get() );
		return commands.eval( arg, cb );
	},

	live : function () {
		if ( !bot.stopped ) {
			return 'I\'m not dead! Honest!';
		}
		bot.continue();
		return 'I live!';
	},

	die : function () {
		if ( bot.stopped ) {
			return 'Kill me once, shame on you, kill me twice...';
		}
		bot.stop();
		return 'You killed me!';
	},

	refresh : function() {
		window.location.reload();
    },

	forget : function ( args ) {
		var name = args.toLowerCase(),
			cmd = bot.getCommand( name );

		if ( cmd.error ) {
			return cmd.error;
		}

		if ( !cmd.canDel(args.get('user_id')) ) {
			return 'You are not authorized to delete the command ' + args;
		}

		cmd.del();
		return 'Command ' + name + ' forgotten.';
	},

	ban : function ( args ) {
		var ret = [];
		if ( args.content ) {
			args.parse().forEach( ban );
		}
		else {
			ret = Object.keys( bot.banlist ).filter( Number ).map( format );
		}

		return ret.join( ' ' ) || 'Nothing to show/do.';

		function ban ( usrid ) {
			var id = Number( usrid ),
				msg;
			if ( isNaN(id) ) {
				id = args.findUserid( usrid.replace(/^@/, '') );
			}

			if ( id < 0 ) {
				msg = 'Cannot find user {0}.';
			}
			else if ( bot.isOwner(id) ) {
				msg = 'Cannot mindjail owner {0}.';
			}
			else if ( bot.banlist.contains(id) ) {
				msg = 'User {0} already in mindjail.';
			}
			else {
				bot.banlist.add( id );
				msg = 'User {0} added to mindjail.';
			}

			ret.push( msg.supplant(usrid) );
		}

		function format ( id ) {
			var user = bot.users[ id ],
				name = user ? user.name : '?';

			return '{0} ({1})'.supplant( id, name );
		}
	},

	unban : function ( args ) {
		var ret = [];
		args.parse().forEach( unban );

		return ret.join( ' ' );

		function unban ( usrid ) {
			var id = Number( usrid ),
				msg;
			if ( isNaN(id) ) {
				id = args.findUserid( usrid.replace(/^@/, '') );
			}

			if ( id < 0 ) {
				msg = 'Cannot find user {0}.';
			}
			else if ( !bot.banlist.contains(id) ) {
				msg = 'User {0} isn\'t in mindjail.';
			}
			else {
				bot.banlist.remove( id );
				msg = 'User {0} freed from mindjail!';
			}

			ret.push( msg.supplant(usrid) );
		}
	},

	//a lesson on semi-bad practices and laziness
	//chapter III
	info : function ( args ) {
		if ( args.content ) {
			return commandFormat( args.content );
		}

		var info = bot.info;
		return timeFormat() + ', ' + statsFormat();

		function commandFormat ( commandName ) {
			var cmd = bot.getCommand( commandName );

			if ( cmd.error ) {
				return cmd.error;
			}
			var ret =  'Command {name}, created by {creator}'.supplant( cmd );

			if ( cmd.date ) {
				ret += ' on ' + cmd.date.toUTCString();
			}

			if ( cmd.invoked ) {
				ret += ', invoked ' + cmd.invoked + ' times';
			}
			else {
				ret += ' but hasn\'t been used yet';
			}

			return ret;
		}

		function timeFormat () {
			var format = 'I awoke on {0} (that\'s about {1} ago)',

				awoke = info.start.toUTCString(),
				ago = Date.timeSince( info.start );

			return format.supplant( awoke, ago );
		}

		function statsFormat () {
			var ret = [],
				but = ''; //you'll see in a few lines

			if ( info.invoked ) {
				ret.push( 'got invoked ' + info.invoked + ' times' );
			}
			if ( info.learned ) {
				but = 'but ';
				ret.push( 'learned ' + info.learned + ' commands' );
			}
			if ( info.forgotten ) {
				ret.push( but + 'forgotten ' + info.forgotten + ' commands' );
			}
			if ( Math.random() < 0.15 ) {
				ret.push( 'teleported ' + Math.rand(100) + ' goats' );
			}

			return ret.join( ', ' ) || 'haven\'t done anything yet!';
		}
	},

	jquery : function jquery ( args ) {
		//check to see if more than one thing is requested
		var parsed = args.parse( true );
		if ( parsed.length > 1 ) {
			return parsed.map( jquery ).join( ' ' );
		}

		var props = args.trim().replace( /^\$/, 'jQuery' ),

			parts = props.split( '.' ), exists = false,
			url = props, msg;
		//parts will contain two likely components, depending on the input
		// jQuery.fn.prop -  parts[0] = jQuery, parts[1] = prop
		// jQuery.prop    -  parts[0] = jQuery, parts[1] = prop
		// prop           -  parts[0] = prop
		//
		//jQuery API urls works like this:
		// if it's on the jQuery object, then the url is /jQuery.property
		// if it's on the proto, then the url is /property
		//
		//so, the mapping goes like this:
		// jQuery.fn.prop => prop
		// jQuery.prop    => jQuery.prop if it's on jQuery
		// prop           => prop if it's on jQuery.prototype,
		//                     jQuery.prop if it's on jQuery

		bot.log( props, parts, '/jquery input' );

		//user gave something like jQuery.fn.prop, turn that to just prop
		// jQuery.fn.prop => prop
		if ( parts.length === 3 ) {
			parts = [ parts[2] ];
		}

		//check to see if it's a property on the jQuery object itself
		// jQuery.prop => jQuery.prop
		if ( parts[0] === 'jQuery' && jQuery[parts[1]] ) {
			exists = true;
		}

		//user wants something on the prototype?
		// prop => prop
		else if ( parts.length === 1 && jQuery.prototype[parts[0]] ) {
			url = parts[ 0 ];
			exists = true;
		}

		//user just wanted a property? maybe.
		// prop => jQuery.prop
		else if ( jQuery[parts[0]] ) {
			url = 'jQuery.' + parts[0];
			exists = true;
		}

		if ( exists ) {
			msg = 'http://api.jquery.com/' + url;
		}
		else {
			msg = 'http://api.jquery.com/?s=' + encodeURIComponent( args );
		}
		bot.log( msg, '/jquery link' );

		return msg;
	},

	choose : function ( args ) {
		var opts = args.parse().filter( conjunctions ),
			len = opts.length;

		bot.log( opts, '/choose input' );

		//5% chance to get a "none-of-the-above"
		if ( Math.random() < 0.05 ) {
			return len === 2 ? 'Neither' : 'None of the above';
		}
		//5% chance to get "all-of-the-above"
		else if ( Math.random() < 0.05 ) {
			return len === 2 ? 'Both!' : 'All of the above';
		}

		return opts[ Math.floor(Math.random() * len) ];

		//TODO: add support for words like "and", e.g.
		// skip and jump or cry and die
		//  =>
		// "skip and jump", "cry and die"
		function conjunctions ( word ) {
			return word !== 'or';
		}
	},

	user : function ( args ) {
		var props = args.parse(),
			usrid = props[ 0 ] || args.get( 'user_id' ),
			id = usrid;

		//check for searching by username
		if ( !(/^\d+$/.test(usrid)) ) {
			id = args.findUserid( usrid );

			if ( id < 0 ) {
				return 'Can\'t find user ' + usrid + ' in this chatroom.';
			}
		}

		args.directreply( 'http://chat.stackexchange.com/users/' + id );
	}
};

commands.listcommands = (function () {
var partition = function ( list, maxSize ) {
	var size = 0, last = [];
	maxSize = maxSize || 480; //buffer zone, actual max is 500

	var ret = list.reduce(function partition ( ret, item ) {
		var len = item.length + 2; //+1 for comma, +1 for space

		if ( size + len > maxSize ) {
			ret.push( last );
			last = [];
			size = 0;
		}
		last.push( item );
		size += len;

		return ret;
	}, []);

	if ( last.length ) {
		ret.push( last );
	}

	return ret;
};

return function ( args ) {
	var commands = Object.keys( bot.commands ),
		//TODO: only call this when commands were learned/forgotten since last
		partitioned = partition( commands ),

		valid = /^(\d+|$)/.test( args.content ),
		page = Number( args.content ) || 0;

	if ( page >= partitioned.length || !valid ) {
		return args.codify( [
			'StackOverflow: Could not access page.',
			'IndexError: index out of range',
			'java.lang.IndexOutOfBoundsException',
			'IndexOutOfRangeException'
		].random() );
	}

	var ret = partitioned[ page ].join( ', ' );

	return ret + ' (page {0}/{1})'.supplant( page, partitioned.length-1 );
};
})();

commands.eval.async = commands.coffee.async = true;





var parse = commands.parse = (function () {
var macros = {
	who : function ( msgObj ) {
		return msgObj.get( 'user_name' );
	},

	someone : function () {
		var presentUsers = document.getElementById( 'sidebar' )
			.getElementsByClassName( 'present-user' );

		//the chat keeps a low opacity for users who remained silent for long,
		// and high opacity for those who recently talked
		var active = [].filter.call( presentUsers, function ( user ) {
			return Number( user.style.opacity ) >= 0.5;
		}),
		user = active[ Math.floor(Math.random() * (active.length-1)) ];

		if ( !user ) {
			return 'Nobody';
		}

		return user.getElementsByTagName( 'img' )[ 0 ].title;
	},

	digit : function () {
		return Math.floor( Math.random() * 10 );
	},

	encode : function ( msgObj, string ) {
		return encodeURIComponent( string );
	},

	//random number, min <= n <= max
	//treats non-numeric inputs like they don't exist
	rand : function ( msgObj, min, max ) {
		min = Number( min );
		max = Number( max );
		return Math.rand( min, max );
	}
};
var macroRegex = /(?:.|^)\$(\w+)(?:\((.*?)\))?/g;

//extraVars is for internal usage via other commands
return function parse ( args, extraVars ) {
	var isMsg = !!args.get,
		//filler objects, solves
		// https://github.com/Zirak/SO-ChatBot/issues/66
		msgObj = isMsg ? args.get() : {},
		user = isMsg ? bot.users[ args.get('user_id') ] : {};

	extraVars = extraVars || {};
	bot.log( args, extraVars, '/parse input' );

	return args.replace( macroRegex, replaceMacro );

	function replaceMacro ( $0, filler, fillerArgs ) {
		//$$ makes a literal $
		if ( $0.startsWith('$$') ) {
			return $0.slice( 1 );
		}

		//include the character that was matched in the $$ check, unless
		// it's a $
		var ret = '';
		if ( $0[0] !== '$' ) {
			ret = $0[ 0 ];
		}

		var macro = findMacro( filler );

		//not found? bummer.
		if ( !macro ) {
			return filler;
		}

		bot.log( macro, filler, fillerArgs, '/parse replaceMacro' );
		//when the macro is a function
		if ( macro.apply ) {
			ret += macro.apply( null, parseMacroArgs(fillerArgs) );
		}
		//when the macro is simply a substitution
		else {
			ret += macro;
		}
		return ret;
	}

	function parseMacroArgs ( macroArgs ) {
		bot.log( macroArgs, '/parse parseMacroArgs' );
		if ( !macroArgs ) {
			return [ args ];
		}

		//parse the arguments, split them into individual arguments,
		// and trim'em (to cover the case of "arg,arg" and "arg, arg")
		return (
			[ args ].concat(
				parse( macroArgs, extraVars )
					.split( ',' ).invoke( 'trim' ) ) );
		//this is not good code
	}

	function findMacro ( macro ) {
		var container = [ macros, msgObj, user, extraVars ].first( hasMacro );

		return ( container || {} )[ macro ];

		function hasMacro ( obj ) {
			return obj && obj.hasOwnProperty( macro );
		}
	}
};
}());

commands.tell = (function () {
var invalidCommands = { tell : true, forget : true };

return function ( args ) {
	var parts = args.split( ' ');
	bot.log( args.valueOf(), parts, '/tell input' );

	var replyTo = parts[ 0 ],
		cmdName = parts[ 1 ],
		cmd;

	if ( !replyTo || !cmdName ) {
		return 'Invalid /tell arguments. Use /help for usage info';
	}

	cmdName = cmdName.toLowerCase();
	cmd = bot.getCommand( cmdName );
	if ( cmd.error ) {
		return cmd.error;
	}

	if ( invalidCommands.hasOwnProperty(cmdName) ) {
		return 'Command ' + cmdName + ' cannot be used in /tell.';
	}

	if ( !cmd.canUse(args.get('user_id')) ) {
		return 'You do not have permission to use command ' + cmdName;
	}

	//check if the user's being a fag
	if ( /^@/.test(replyTo) ) {
		return 'Don\'t be annoying, drop the @, nobody likes a double-ping.';
	}

	//check if the user wants to reply to a message
	var direct = false,
		extended = {};
	if ( /^:?\d+$/.test(replyTo) ) {
		extended.message_id = replyTo.replace( /^:/, '' );
		direct = true;
	}
	else {
		extended.user_name = replyTo;
	}

	var msgObj = Object.merge( args.get(), extended );
	var cmdArgs = bot.Message(
		parts.slice( 2 ).join( ' ' ),
		msgObj );

	//this is an ugly, but functional thing, much like your high-school prom date
	//to make sure a command's output goes through us, we simply override the
	// standard ways to do output
	var reply = cmdArgs.reply.bind( cmdArgs ),
		directreply = cmdArgs.directreply.bind( cmdArgs );

	cmdArgs.reply = cmdArgs.directreply = cmdArgs.send = callFinished;

	bot.log( cmdArgs, '/tell calling ' + cmdName );

	//if the command is async, it'll accept a callback
	if ( cmd.async ) {
		cmd.exec( cmdArgs, callFinished );
	}
	else {
		callFinished( cmd.exec(cmdArgs) );
	}

	function callFinished ( res ) {
		if ( !res ) {
			return;
		}

		if ( direct ) {
			directreply( res );
		}
		else {
			reply( res );
		}
	}
};
}());

commands.mdn = function ( args, cb ) {
	IO.jsonp.google(
		args.toString() + ' site:developer.mozilla.org', finishCall );

	function finishCall ( resp ) {
		if ( resp.responseStatus !== 200 ) {
			finish( 'Something went on fire; status ' + resp.responseStatus );
			return;
		}

		var result = resp.responseData.results[ 0 ];
		bot.log( result, '/mdn result' );
		finish( result.url );
	}

	function finish ( res ) {
		if ( cb && cb.call ) {
			cb( res );
		}
		else {
			args.reply( res );
		}
	}
};
commands.mdn.async = true;

var descriptions = {
	ban : 'Bans user(s) from using me. Lacking arguments, prints the banlist.' +
		' `/ban [usr_id|usr_name, [...]`',
	choose : '"Randomly" choose an option given. `/choose option0 option1 ...`',
	die  : 'Kills me :(',
	eval : 'Forwards message to javascript code-eval',
	coffee : 'Forwards message to coffeescript code-eval',
	forget : 'Forgets a given command. `/forget cmdName`',
	get : 'Grabs a question/answer link (see online for thorough explanation)',
	help : 'Fetches documentation for given command, or general help article.' +
		' `/help [cmdName]`',
	info : 'Grabs some stats on my current instance or a command.' +
		' `/info [cmdName]`',
	jquery : 'Fetches documentation link from jQuery API. `/jquery what`',
	listcommands : 'Lists commands. `/listcommands [page=0]`',
	listen : 'Forwards the message to my ears (as if called without the /)',
	live : 'Resurrects me (:D) if I\'m down',
	mdn : 'Fetches mdn documentation. `/mdn what`',
	parse : 'Returns result of "parsing" message according to the my mini' +
		'-macro capabilities (see online docs)',
	refresh : 'Reloads the browser window I live in',
	regex : 'Executes a regex against text input. `/regex text regex [flags]`',
	tell : 'Redirect command result to user/message.' +
		' /tell `msg_id|usr_name cmdName [cmdArgs]`',
	unban : 'Removes a user from my mindjail. `/unban usr_id|usr_name`',
	user : 'Fetches user-link for specified user. `/user usr_id|usr_name`',
};

//only allow owners to use certain commands
var privilegedCommands = {
	die : true, live  : true,
	ban : true, unban : true,
	refresh : true
};
//voting-based commands for unpriviledged users
var communal = {
	die : true, ban : true, summon : false
};

Object.iterate( commands, function ( cmdName, fun ) {
	var cmd = {
		name : cmdName,
		fun  : fun,
		permissions : {
			del : 'NONE',
			use : privilegedCommands[ cmdName ] ? 'OWNER' : 'ALL'
		},
		description : descriptions[ cmdName ],
		async : commands[ cmdName ].async
	};

	if ( communal[cmdName] ) {
		cmd = bot.CommunityCommand( cmd );
	}
	bot.addCommand( cmd );
});

}());

(function () {
bot.listen( /^help(?: (\S+))?/, function ( msg ) {
	return bot.getCommand( 'help' ).exec( msg.matches[1] );
});

var laws = [
	'A robot may not injure a human being or, through inaction, ' +
		'allow a human being to come to harm.',

	'A robot must obey the orders given to it by human beings, ' +
		'except where such orders would conflict with the First Law.',

	'A robot must protect its own existence as long as such ' +
		'protection does not conflict with the First or Second Laws.'
].map(function ( law, idx ) {
	return idx + '. ' + law;
}).join( '\n' );

bot.listen( /^tell (me (your|the) )?(rule|law)s/, function ( msg ) {
	return laws;
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


var dictionaries = [
	//what's a squid?
	//what is a squid?
	//what're squids?
	//what are squids?
	//what is an animal?
	//and all those above without a ?
	//explanation in the post-mortem
	/^what(?:'s|'re)?\s(?:(?:is|are)\s)?(?:(?:an|a)\s)?([\w\s\-]+)\??/,

	//define squid
	//define a squid
	//define an animal
	/^define\s(?:(?:an|a)\s)?([\w\s\-]+)/
];

bot.listen( dictionaries, function ( msg ) {
	var what = msg.matches[ 1 ],
		define = bot.getCommand( 'define' );

	define.exec( what, function ( def ) {
		def = def.replace( what + ':', '' );

		msg.reply( def );
	});
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

}());


(function () {
"use strict";

var linkTemplate = '[{text}]({url})';

bot.adapter = {
	//the following two only used in the adapter; you can change & drop at will
	roomid : null,
	fkey   : null,
	//used in commands calling the SO API
	site   : null,
	//our user id
	user_id : null,

	//not a necessary function, used in here to set some variables
	init : function () {
		var fkey = document.getElementById( 'fkey' );
		if ( !fkey ) {
			console.error( 'bot.adapter could not find fkey; aborting' );
			return;
		}
		this.fkey = fkey.value;
		this.roomid = Number( /\d+/.exec(location)[0] );
		this.site = /chat\.(\w+)/.exec( location )[ 1 ];
		this.user_id = CHAT.user.current().id;

		this.in.init();
		this.out.init();
	},

	//a pretty crucial function. accepts the msgObj we know nothing about,
	// and returns an object with these properties:
	//  user_name, user_id, room_id, content
	// and any other properties, as the abstraction sees fit
	//since the bot was designed around the SO chat message object, in this
	// case, we simply do nothing
	transform : function ( msgObj ) {
		return msgObj;
	},

	//escape characters meaningful to the chat, such as parentheses
	//full list of escaped characters: `*_()[]
	escape : function ( msg ) {
		return msg.replace( /([`\*_\(\)\[\]])/g, '\\$1' );
	},

	//receives a username, and returns a string recognized as a reply to the
	// user
	reply : function ( usrname ) {
		return '@' + usrname.replace( /\s/g, '' );
	},
	//receives a msgid, returns a string recognized as a reply to the specific
	// message
	directreply : function ( msgid ) {
		return ':' + msgid;
	},

	//receives text and turns it into a codified version
	//codified is ambiguous for a simple reason: it means nicely-aligned and
	// mono-spaced. in SO chat, it handles it for us nicely; in others, more
	// clever methods may need to be taken
	codify : function ( msg ) {
		var tab = '    ',
			spacified = msg.replace( '\t', tab ),
			lines = spacified.split( /[\r\n]/g );

		if ( lines.length === 1 ) {
			return '`' + lines[ 0 ] + '`';
		}

		return lines.map(function ( line ) {
			return tab + line;
		}).join( '\n' );
	},

	//receives a url and text to display, returns a recognizable link
	link : function ( text, url ) {
		return linkTemplate.supplant({
			text : this.escape( text ),
			url  : url
		});
	}
};

//the input is not used by the bot directly, so you can implement it however
// you like
var polling = bot.adapter.in = {
	//used in the SO chat requests, dunno exactly what for, but guessing it's
	// the latest id or something like that. could also be the time last
	// sent, which is why I called it times at the beginning. or something.
	times : {},
	//currently, used for messages sent when the room's been silent for a
	// while
	lastTimes : {},

	firstPoll : true,

	interval : 5000,

	init : function ( roomid ) {
		var that = this,
			providedRoomid = ( roomid !== undefined );
		roomid = roomid || bot.adapter.roomid;

		IO.xhr({
			url : '/ws-auth',
			data : fkey({
				roomid : roomid
			}),
			method : 'POST',
			complete : finish
		});

		function finish ( resp ) {
			resp = JSON.parse( resp );
			bot.log( resp );

			that.openSocket( resp.url, providedRoomid );
		}
	},

	initialPoll : function () {
		bot.log( 'adapter: initial poll' );
		var roomid = bot.adapter.roomid,
		that = this;

		IO.xhr({
			url : '/chats/' + roomid + '/events/',
			data : fkey({
				since : 0,
				mode : 'Messages',
				msgCount : 0
			}),
			method : 'POST',
			complete : finish
		});

		function finish ( resp ) {
			resp = JSON.parse( resp );
			bot.log( resp );

			that.times[ 'r' + roomid ] = resp.time;
			that.firstPoll = false;

			that.loopage();
		}
	},

	openSocket : function ( url, discard ) {
		//chat sends an l query string parameter. seems to be the same as the
		// since xhr parameter, but I didn't know what that was either so...
		//putting in 0 got the last shitload of messages, so what does a high
		// number do? (spoiler: it "works")
		var socket = this.socket = new WebSocket( url + '?l=99999999999' );

		if ( discard ) {
			socket.onmessage = function () {
				socket.close();
			};
		}
		else {
			socket.onmessage = this.ondata.bind( this );
			socket.onclose = this.socketFail.bind( this );
		}
	},

	ondata : function ( messageEvent ) {
		this.pollComplete( messageEvent.data );
	},

	poll : function () {
		if ( this.firstPoll ) {
			this.initialPoll();
			return;
		}

		var that = this;

		IO.xhr({
			url : '/events',
			data : fkey( that.times ),
			method : 'POST',
			complete : that.pollComplete,
			thisArg : that
		});
	},

	pollComplete : function ( resp ) {
		if ( !resp ) {
			this.loopage();
			return;
		}
		resp = JSON.parse( resp );

		//each key will be in the form of rROOMID
		Object.iterate(resp, function ( key, msgObj ) {
			//t is a...something important
			if ( msgObj.t ) {
				this.times[ key ] = msgObj.t;
			}

			//e is an array of events, what is referred to in the bot as msgObj
			if ( msgObj.e ) {
				msgObj.e.forEach( this.handleMessageObject, this );
			}
		}, this);

		//handle all the input
		IO.in.flush();
		//and move on with our lives
		this.loopage();
	},

	handleMessageObject : function ( msg ) {
		//msg.event_type:
		// 1 => new message
		// 2 => message edit
		// 3 => user joined room
		// 4 => user left room
		// 10 => message deleted
		var et /* phone home */ = msg.event_type;
		if ( et === 3 || et === 4 ) {
			this.handleUserEvent( msg );
			return;
		}
		else if ( et !== 1 && et !== 2 ) {
			return;
		}
		this.lastTimes[ msg.room_id ] = Date.now();

		//check for a multiline message
		if ( msg.content.startsWith('<div class=\'full\'>') ) {
			this.handleMultilineMessage( msg );
			return;
		}

		//add the message to the input buffer
		IO.in.receive( msg );
	},

	handleMultilineMessage : function ( msg ) {
		//remove the enclosing tag
		var multiline = msg.content
			//slice upto the beginning of the ending tag
			.slice( 0, msg.content.lastIndexOf('</div>') )
			//and strip away the beginning tag
			.replace( '<div class=\'full\'>', '' );

		//iterate over each line
		multiline.split( '<br>' ).forEach(function ( line ) {
			//and treat it as if it were a separate message
			this.handleMessageObject(
				Object.merge( msg, { content : line.trim() })
			);
		}, this );
	},

	handleUserEvent : function ( msg ) {
		var et = msg.event_type;

		/*
		{
			"r17": {
				"e": [{
						"event_type": 3,
						"time_stamp": 1364308574,
						"id": 16932104,
						"user_id": 322395,
						"target_user_id": 322395,
						"user_name": "Loktar",
						"room_id": 17,
						"room_name": "JavaScript"
					}
				],
				"t": 16932104,
				"d": 1
			}
		}
		*/
		if ( et === 3 ) {
			IO.fire( 'userjoin', msg );
		}
		/*
		{
			"r17": {
				"e": [{
						"event_type": 4,
						"time_stamp": 1364308569,
						"id": 16932101,
						"user_id": 322395,
						"target_user_id": 322395,
						"user_name": "Loktar",
						"room_id": 17,
						"room_name": "JavaScript"
					}
				],
				"t": 16932101,
				"d": 1
			}
		}
		*/
		else if ( et === 4 ) {
			IO.fire( 'userleave', msg );
		}
	},

	leaveRoom : function ( roomid, cb ) {
		if ( roomid === bot.adapter.roomid ) {
			cb( 'base_room' );
			return;
		}

		IO.xhr({
			method : 'POST',
			url : '/chats/leave/' + roomid,
			data : fkey({
				quiet : true
			}),
			complete : function () {
				cb();
			}
		});
	},

	socketFail : function () {
		bot.log( 'adapter: socket failed', this );
		this.socket.close();
		this.socket = null;
		this.loopage();
	},

	loopage : function () {
		if ( this.socket ) {
			return;
		}

		var that = this;
		setTimeout(function () {
			that.poll();
		}, this.interval );
	}
};

//the output is expected to have only one method: add, which receives a message
// and the room_id. everything else is up to the implementation.
var output = bot.adapter.out = {
	'409' : 0, //count the number of conflicts
	total : 0, //number of messages sent
	interval : polling.interval + 500,

	init : function () {},

	//add a message to the output queue
	add : function ( msg, roomid ) {
		IO.out.receive({
			text : msg + '\n',
			room : roomid || bot.adapter.roomid
		});
		IO.out.flush();
	},

	//send output to all the good boys and girls
	//no messages for naughty kids
	//...what's red and sits in the corner?
	//a naughty strawberry
	send : function ( obj ) {
		//unless the bot's stopped. in which case, it should shut the fudge up
		// the freezer and never let it out. not until it can talk again. what
		// was I intending to say?
		if ( !bot.stopped ) {
			this.sendToRoom( obj.text, obj.room );
		}
	},

	//what's brown and sticky?
	//a stick
	sendToRoom : function ( text, roomid ) {
		IO.xhr({
			url : '/chats/' + roomid + '/messages/new',
			data : {
				text : text,
				fkey : fkey().fkey
			},
			method : 'POST',
			complete : complete
		});

		function complete ( resp, xhr ) {
			bot.log( xhr.status );

			//conflict, wait for next round to send message
			if ( xhr.status === 409 ) {
				output['409'] += 1;
				delayAdd( text, roomid );
			}
			//server error, usually caused by message being too long
			else if ( xhr.status === 500 ) {
				output.add(
					'Server error (status 500) occured ' +
						' (message probably too long)',
					roomid );
			}
			else if ( xhr.status !== 200 ) {
				console.error( xhr );
				output.add(
					'Error ' + xhr.status + ' occured, I will call the maid ' +
					' (@Zirak)' );
			}
			else {
				output.total += 1;
				IO.fire( 'sendoutput', xhr, text, roomid );
			}
		}

		function delayAdd () {
			setTimeout(function delayedAdd () {
				output.add( text, roomid );
			}, output.interval );
		}
	}
};
//what's orange and sounds like a parrot?
//a carrot
IO.register( 'output', output.send, output );

//two guys walk into a bar. the bartender asks them "is this some kind of joke?"
bot.adapter.init();
}());


(function () {
"use strict";

bot.users = {};

var joined = [];

var join = function ( msgObj, cb ) {
	joined.push( msgObj.user_id );
	addInfos( cb );
};

IO.register( 'userjoin', function userjoin ( msgObj ) {
	bot.log( msgObj, 'userjoin' );

	var user = bot.users[ msgObj.user_id ];
	if ( !user ) {
		join( msgObj, finish );
	}
	else {
		finish( user );
	}

	function finish ( user ) {
		IO.fire( 'userregister', user, msgObj.room_id );
	}
});

//this function throttles to give the chat a chance to fetch the user info
// itself, and to queue up several joins in a row
var addInfos = (function ( cb ) {
	bot.log( joined, 'user addInfos' );
	requestInfo( null, joined, cb );

	joined = [];
}).throttle( 1000 );

function requestInfo ( room, ids, cb ) {
	if ( !Array.isArray(ids) ) {
		ids = [ ids ];
	}

	if ( !ids.length ) {
		return;
	}

	IO.xhr({
		method : 'POST',
		url : '/user/info',

		data : {
			ids : ids.join(),
			roomId : room || bot.adapter.roomid
		},
		complete : finish
	});

	function finish ( resp ) {
		resp = JSON.parse( resp );
		resp.users.forEach( addUser );
	}

	function addUser ( user ) {
		bot.users[ user.id ] = user;
		cb( user );
	}
}
bot.users.request = requestInfo;

function loadUsers () {
	if ( window.users ) {
		bot.users = Object.merge( bot.users, window.users );
	}
}

loadUsers();
}());




var cowsay = (function () {
"use strict";

var cowsay = {

	defaults : {
		e : 'oo',
		T : '  ',
		t : false,
		W : 40
	},

	//in the "template", e is for eye, T for Tongue, L for bubble-Line
	//it looks more like a donkey who was involved in a sledgehammer accident
	// because of escaping and newlines
	//the cow business is a dangerous one
	cow : [
		'',
		'        L   ^__^',
		'         L  (e)\\_______',
		'            (__)\\       )\\/\\',
		'             T ||----w |',
		'                ||     ||'
	].join( '\n' ),

	//message is the text to moo, opts is an optional object, mimicking the
	// cowsay command arguments:
	//   e  =>  eyes
	//   T  =>  tongue
	//   t  =>  is the cow thinking?
	//   W  =>  word-wrapping width
	//defaults specified in cowsay.defaults
	moo : function ( message, opts ) {
		var defs = this.defaults;

		//the eyes and tongue should be exactly 2 characters
		//if the ones the user gave are too short, pad'em
		this.eyes     = rightPad( opts.e || defs.e, 2 ).slice( 0, 2 );
		this.tongue   = rightPad( opts.T || defs.T, 2 ).slice( 0, 2 );
		this.line     = opts.t ? 'O' : '\\';
		this.thinking = opts.t;

		this.message  = wordWrap( message, opts.W || defs.W ).trim();

		//cowsay is actually the result of breeding a balloon and a cow
		return this.makeBalloon() + this.makeCow();
	},

	makeCow : function () {
		return this.cow
			.replace( /e/g, this.eyes )
			.replace( /T/g, this.tongue )
			.replace( /L/g, this.line );
	},

	makeBalloon : function () {
		var lines = this.message.split( '\n' );

		var longest = lines.reduce( longestLine, 0 ),
			lineCount = lines.length,
			border = this.chooseBorders( lineCount );

		var balloon = lines.map( baloonLine );
		var boundaryOccurences = new Array( longest + 2 );
		balloon.unshift( ' ' + boundaryOccurences.join('_') );
		balloon.push   ( ' ' + boundaryOccurences.join('-') );

		return balloon.join( '\n' );

		function baloonLine ( line, idx ) {
			var padders;
			//top left and top right
			if ( idx === 0 ) {
				padders = border.slice( 0, 2 );
			}
			//bottom left and bottom right
			else if ( idx === lineCount-1 ) {
				padders = border.slice( 2, 4 );
			}
			//the wall
			else {
				padders = border.slice( 2 );
			}

			//return the message, padded with spaces to the right as to fit
			// with the border, enclosed in the matching borders
			return (
				padders[ 0 ] + ' ' +
				rightPad( line, longest ) + ' ' +
				padders[ 1 ]
			);
		}
		function longestLine ( max, line ) {
			return line.length > max ? line.length : max;
		}
	},

	//choose the borders to use for the balloon
	chooseBorders : function ( lineCount ) {
		var border;

		//thought bubbles always look the same
		// ( moosage line 1 )
		// ( moosage line 2 )
		if ( this.thinking ) {
			border = [ '(', ')', '(', ')', '(', ')' ];
		}
		//single line messages are enclosed in < > and have no other borders
		// < mooosage >
		else if ( lineCount === 1 ) {
			border = [ '<', '>' ];
		}
		//multi-line messages have diaganol borders and straight walls
		// / moosage line 1 \
		// | moosage line 2 |
		// \ moosage line 3 /
		else {
			border = [ '/', '\\', '\\', '/', '|', '|' ];
		}

		return border;
	}
};

function wordWrap ( str, len ) {
	var lineLen = 0;
	return str.split( ' ' ).reduce( handleWord, '' );

	function handleWord ( ret, word ) {
		var wordLen = word.length;

		//let the wrapping...commence!
		if ( lineLen + wordLen > len ) {
			ret += '\n';
			lineLen = 0;
		}
		lineLen += wordLen + 1; //+1 for the space we now add

		return ret + word + ' ';
	}
}
function rightPad ( str, len, padder ) {
	padder = padder || ' ';
	return ( str + Array(len).join(padder) ).slice( 0, len );
}


return cowsay;
}());

bot.listen(
	/cow(think|say)\s(?:([eT])=(.{0,2})\s)?(?:([eT])=(.{0,2})\s)?(.+)/,

	function ( msg ) {
		//the first item is the whole match, second item is the "think" or
		// "say", last item is the message, we only want the "parameters"
		var opts = getOpts( msg.matches.slice(2, -1) );

		//cowsay or cowthink?
		opts.t = msg.matches[ 1 ] === 'think';
		bot.log( opts, 'cowsay opts' );

		var cowreact = cowsay.moo( msg.matches.pop(), opts );
		msg.send( msg.codify(cowreact) );

		function getOpts ( args ) {
			var ret = {};
			//'e=^^ T=vv would represent in capturing groups as:
			// ['e', '^^', 'T', 'vv']
			//so we go through the pairs
			for ( var i = 0, len = args.length; i < len; i += 2 ) {
				if ( args[i] && args[i+1] ) {
					ret[ args[i] ] = args[ i + 1 ];
				}
			}

			return ret;
		}
	}
);


(function () {
"use strict";
//this and the history.js file are nearly identical, as they both manually have
// to grab and parse from the wikimedia API

var notFoundMsgs = [
	'No definition found.',
	'My pocket dictionary just isn\'t good enough for you.'
];

var define = {
	command : function defineCommand ( args, cb ) {
		bot.log( args, '/define input' );
		this.fetchData( args, finish );

		function finish ( results, pageid ) {
			bot.log( results, '/define results' );
			//TODO: format. so far we just be lazy and take the first one
			var res = results[ 0 ];

			if ( !res ) {
				res = notFoundMsgs.random();
			}
			else {
				res = bot.adapter.link(
					args, 'http://en.wiktionary.org/wiki?curid=' + pageid
				) + ' ' + res;
			}

			if ( cb && cb.call ) {
				cb( res );
			}
			else {
				args.reply( res );
			}
		}
	},

	handleResponse : function ( resp, cb ) {
		var query = resp.query,
			pageid = query.pageids[ 0 ],
			html = query.pages[ pageid ].extract;

		if ( pageid === '-1' ) {
			cb( [], -1 );
			return;
		}

		var root = document.createElement( 'body' );
		root.innerHTML = html; //forgive me...

		//the first ol has all the data we need
		cb( getEvents(root.getElementsByTagName('ol')[0]), pageid );
	},

	fetchData : function ( term, cb ) {
		var self = this;

		IO.jsonp({
			url : 'http://en.wiktionary.org/w/api.php',
			jsonpName : 'callback',
			data : {
				action : 'query',
				titles : term.toString(),
				format : 'json',
				prop : 'extracts',
				indexpageids : true
			},
			fun : function ( resp ) {
				self.handleResponse( resp, cb );
			}
		});
	}
};

//example of partial extract:
/*
  <h2> Translingual</h2>\n\n
  <p>Wikipedia</p>\n
  <h3> Symbol</h3>\n
  <p><b>42</b> (<i>previous</i>  <b>41</b>, <i>next</i>  <b>43</b>)</p>\n
  <ol>
      <li>The cardinal number forty-two.</li>\n</ol>
*/
//we just want the li data
function getEvents ( root, stopNode ) {
	var matches = [];

	(function filterEvents (root) {
		var node = root.firstElementChild;

		for (; node; node = node.nextElementSibling) {
			if (node === stopNode) {
				return;
			}
			else if (node.tagName !== 'LI' ) {
				continue;
			}

			matches.push( node );
		}
	})( root );

	//we need to flatten out the resulting elements, and we're done!
	return flatten(matches);
}
function flatten ( lis ) {
	return [].map.call( lis, extract );

	function extract ( li ) {
		return li.firstChild.data;
	}
}

bot.addCommand({
	name : 'define',
	fun : define.command,
	thisArg : define,
	permissions : {
		del : 'NONE'
	},

	description : 'Fetches definition for a given word. `/define something`',
	async : true
});
}());


(function () {
var types = {
	answer   : true,
	question : true };
var ranges = {
	//the result array is in descending order, so it's "reversed"
	first : function ( arr ) {
		return arr[ arr.length - 1 ];
	},

	last : function ( arr ) {
		return arr[ 0 ];
	},

	between : function ( arr ) {
		//SO api takes care of this for us
		return arr;
	}
};

function get ( args, cb ) {
	//default:
	// /get type range usrid
	var parts = args.parse(),
		type = parts[ 0 ] || 'answer',
		plural = type + 's',

		range = parts[ 1 ] || 'last',

		usrid = parts[ 2 ];

	//if "between" is given, fetch the correct usrid
	// /get type between start end usrid
	if ( range === 'between' ) {
		usrid = parts[ 4 ];
	}

	//range is a number and no usrid, assume the range is the usrid, and
	// default range to last
	// /get type usrid
	if ( !usrid && !isNaN(range) ) {
		usrid = range;
		range = 'last';
	}

	//if after all this usrid is falsy, assume the user's id
	if ( !usrid ) {
		usrid = args.get( 'user_id' );
	}

	bot.log( parts, 'get input' );

	if ( !types.hasOwnProperty(type) ) {
		return 'Invalid "getter" name ' + type;
	}
	if ( !ranges.hasOwnProperty(range) ) {
		return 'Invalid range specifier ' + range;
	}

	var url = 'http://api.stackexchange.com/2.1/users/' + usrid + '/' + plural;
	var params = {
		site : bot.adapter.site,
		sort : 'creation',
		//basically, only show answer/question id and their link
		filter : '!BGS1(RNaKd_71l)9SkX3zg.ifSRSSy'
	};

	bot.log( url, params, '/get building url' );

	if ( range === 'between' ) {
		params.fromdate = Date.parse( parts[2] );
		params.todate = Date.parse( parts[3] );

		bot.log( url, params, '/get building url between' );
	}

	IO.jsonp({
		url  : url,
		data : params,
		fun  : parseResponse
	});

	function parseResponse ( respObj ) {
		//Une erreru! L'horreur!
		if ( respObj.error_message ) {
			args.reply( respObj.error_message );
			return;
		}

		//get only the part we care about in the result, based on which one
		// the user asked for (first, last, between)
		//respObj will have an answers or questions property, based on what we
		// queried for, in array form
		var posts = [].concat( ranges[range](respObj.items) ),
			res;

		bot.log( posts.slice(), '/get parseResponse parsing' );

		if ( posts.length ) {
			res = makeUserResponse( posts );
		}
		else {
			res = 'User did not submit any ' + plural;
		}
		bot.log( res, '/get parseResponse parsed');

		if ( cb && cb.call ) {
			cb( res );
		}
		else {
			args.directreply( res );
		}
	}

	function makeUserResponse( posts ) {
		return posts.map(function ( post ) {
			return post.link;
		}).join ( ' ; ');
	}
}

bot.addCommand({
	name : 'get',
	fun  : get,
	permissions : {
		del : 'NONE'
	},
	async : true
});

}());


// issue #51 https://github.com/Zirak/SO-ChatBot/issues/51

//valid args are one of the following:
// /github reponame
//which searches for a repository `reponame`
// /github username/reponame
//which searches for a repository `reponame` under `username`
var github = {

	command : function ( args, cb ) {
		var parts = /^([\S]+?)(?:\/([\S]+))?$/.exec( args ),
			format = this.formatCb( finish );

		bot.log( parts, '/github input' );

		if ( !parts ) {
			finish( 'I can\'t quite understand that format. ' +
					'See `/help github` for, well...help.' );
		}
		else if ( !parts[2] ) {
			this.searchRepo( parts[1], format );
		}
		else {
			this.searchUserRepo( parts[1], parts[2], format );
		}

		function finish ( res ) {
			bot.log( res, '/github finish' );

			if ( cb && cb.call ) {
				cb( res );
			}
			else {
				args.reply( res );
			}
		}
	},

	formatCb : function ( cb ) {
		var repoFullName = '{owner}/{name}';

		return function format ( repo ) {
			if ( repo.error ) {
				cb( repo.error );
				return;
			}

			//there are inconsistensies between the data returned from one
			// API call and another. there're two important ones here:
			//1. we have a full repo name (user/repoName) in one, but not
			//     the other (and different property names can be used to
			//     construct it)
			//2. the link to the repo is called html_url in one, and
			//      url in the other (in the former, url means something else)
			var fullName = repo.full_name ?
				repo.full_name : repoFullName.supplant( repo ),
				url = repo.html_url || repo.url;

			cb(
				bot.adapter.link(fullName, url ) + ' ' + repo.description
			);
		};
	},

	searchRepo : function ( repoName, cb ) {
		var keyword = encodeURIComponent( repoName );

		IO.jsonp({
			url : 'https://api.github.com/legacy/repos/search/' + keyword,
			jsonpName : 'callback',

			fun : finish
		});

		function finish ( resp ) {
			bot.log( resp, '/github searchRepo response' );
			var repo = resp.data.repositories[ 0 ];

			if ( !repo ) {
				repo = {
					error : 'No results found'
				};
			}

			cb( repo );
		}
	},

	searchUserRepo : function ( userName, repoName, cb ) {
		var keyword = encodeURIComponent( userName );
		repoName = encodeURIComponent(
			repoName.replace( / /g, '-' ).toLowerCase() );

		var url = 'https://api.github.com/repos/{0}/{1}';
		IO.jsonp({
			url : url.supplant( keyword, repoName ),
			jsonpName : 'callback',

			fun : finish
		});

		function finish ( resp ) {
			bot.log( resp, '/github searchUserRepo response' );

			var data = resp.data;

			if ( data.message === 'Not Found' ) {
				data = {
					error : 'User/Repo not found'
				};
			}

			cb( data );
		}
	}
};

bot.addCommand({
	name : 'github',
	fun  : github.command,
	thisArg : github,
	permissions : {
		del : 'NONE'
	},
	description : 'Search github for a repo.' +
		'`/github repoName` or `/github username/reponame`',
	async : true
});


(function () {
var nulls = [
	'The Google contains no such knowledge',
	'There are no search results. Run.',
	'My Google Fu has failed.'];

function google ( args, cb ) {
	IO.jsonp.google( args.toString() + ' -site:w3schools.com', finishCall );

	function finishCall ( resp ) {
		bot.log( resp, '/google response' );
		if ( resp.responseStatus !== 200 ) {
			finish( 'My Google-Fu is on vacation; status ' +
					resp.responseStatus );
			return;
		}

		//TODO: change hard limit to argument
		var results = resp.responseData.results.slice( 0, 3 );
		bot.log( results, '/google results' );

		if ( !results.length ) {
			finish( nulls.random() );
			return;
		}
		finish( format(args.content, results) );
	}

	function format ( query, results ) {
		var res = formatLink( query ) + ' ' +
			results.map( formatResult ).join( ' ; ' );

		if ( res.length > 200 ) {
			res = results.map(function (r) {
				return r.unescapedUrl;
			}).join( ' ; ' );
		}

		return res;
	}

	function formatResult ( result ) {
		var title = IO.decodehtmlEntities( result.titleNoFormatting );
		return args.link( title, result.unescapedUrl );
	}
	function formatLink ( query ) {
		return args.link(
			'*',
			'http://google.com/search?q=' +
				encodeURIComponent( query ) );
	}

	function finish ( res ) {
		bot.log( res, '/google final' );
		if ( cb && cb.call ) {
			cb( res );
		}
		else {
			args.reply( res );
		}
	}
}

bot.addCommand({
	name : 'google',
	fun  : google,
	permissions : {
		del : 'NONE'
	},
	description : 'Search Google. `/google query`',
	async : true
});
}());


(function () {
"use strict";

var history = {
	command : function historyCommand ( args, cb ) {
		var params = this.extractParams( args );

		if ( params.error ) {
			return params.error;
		}

		this.fetchData( params, finish );

		function finish ( results ) {
			var res = results.random();

			if ( cb && cb.call ) {
				cb( res );
			}
			else {
				args.reply( res );
			}
		}
	},

	handleResponse : function ( resp, params, cb ) {
		var html = resp.parse.text,
			root = document.createElement( 'body' );
		root.innerHTML = html; //forgive me

		var events = getEventsAsText( root );

		cb( this.filter(events, params) );
	},

	extractParams : function ( args ) {
		var ret = {},
			date;

		if ( !args.length || args.toLowerCase() === 'today' ) {
			date = new Date();

			ret.month = date.getMonth() + 1;
			ret.day = date.getDate();
			return ret;
		}

		var parts;

		//simple YYYY
		if ( parts = /^\d{4}$/.exec(args) ) {
			ret.year = Number( parts[0] );
		}
		else if (
			parts = /^(?:(\d{4})(?:-|\/))?(\d{2})(?:-|\/)(\d{2})$/.exec( args )
		) {
			parts[1] && ( ret.year = Number(parts[1]) );
			ret.month = Number( parts[2] );
			ret.day = Number( parts[3] );
		}
		else {
			return error();
		}

		bot.log( ret, '/inhistory extractParams' );

		if ( !this.paramsCheck(ret) ) {
			return error();
		}
		return ret;

		function error () {
			return {
				error : 'That format confuses me! See `/help inhistory`'
			};
		}
	},

	paramsCheck : function ( params ) {
		var year  = params[ year ],
			month = params[ month ],
			day   = params[ day ];

		//fuck this shit, I have nowhere else to put it
		if ( month === 2 && day > 29 ) {
			return false;
		}

		//we're not very picky, since wikipedia may contain future dates
		var yearCheck = year === undefined || year > 0;
		var monthCheck = month === undefined || (
			month >= 1 && month <= 12
		);
		var dayCheck = day === undefined || (
			day >= 1 && day <= 31
		);

		return yearCheck && monthCheck && dayCheck;
	},

	filter : function ( events, params ) {
		//we only need to apply filtering for YYYY-MM-DD, not for MM-DD or YYYY
		if ( !params.year || !params.month ) {
			return events;
		}

		//limit to only the parameter year
		return events.filter(function ( data ) {
			var year = ( /^\d+/.exec(data) || [] )[ 0 ];

			return Number( year ) === params.year;
		});
	},

	fetchData : function ( params, cb ) {
		var titles = [];

		if ( params.year && !params.month ) {
			titles = [ params.year ];
		}
		else {
			titles = [ this.monthName(params.month), params.day ];
		}

		var url = 'http://en.wikipedia.org/w/api.php';

		var self = this;
		IO.jsonp({
			url : url,
			jsonpName : 'callback',
			data : {
				format : 'json',
				action : 'parse',
				mobileformat : 'html',
				prop : 'text',
				page : titles.join( ' ' )
			},
			fun : function ( resp ) {
				self.handleResponse( resp, params, cb );
			}
		});
	},

	monthName : function ( month ) {
		return [
			'january', 'february', 'march', 'april',
			'may', 'june', 'july', 'august',
			'september', 'october', 'november', 'december'
		][ month - 1 ];
	}
};

// http://tinker.io/53895
function getEventsAsText ( root ) {
	var linkBase = 'http://en.wikipedia.org';

	/*
	  the html looks like:
	  <h2 class="section_heading" id="section_1"><span id="Events">Events</span></h2>
	  <div class="content_block" id="content_1">
	    ...
	  </div>
	*/
	//fun fact: document-fragments don't have a getElementById, so we're left to
	// use querySelector. which is totally the way to do it.
	var lists = root.querySelectorAll('#content_1 > ul');

	/*
	  <li>
	    <a href="/wiki/January_5" title="January 5">January 5</a> –
	    <a href="/wiki/Emperor_Go-Sai" title="Emperor Go-Sai">Emperor Go-Sai</a>ascends the throne of <a href="/wiki/Japan" title="Japan">Japan</a>.
	  </li>
	*/
	//however, there are also multi-tiered results:
	/*
	  <li>
	    <a href="/wiki/July_27" title="July 27">July 27</a>

		<ul>
		  <li>The Jews in <a href="/wiki/New_Amsterdam" title="New Amsterdam">New Amsterdam</a> petition for a separate Jewish cemetery.
		  </li>

		  <li>The <a href="/wiki/Netherlands" title="Netherlands">Netherlands</a> and <a href="/wiki/Brandenburg" title="Brandenburg">Brandenburg</a> sign a military treaty.
		  </li>
		</ul>
	  </li>
	*/

	var ret = [];
	for (var i = 0, len = lists.length; i < len; i += 1) {
		ret.push.apply( ret, flattenList(lists[i]) );
	}
	return ret;

	function flattenList ( list ) {
		return Array.map( list.children, extract );

		function extract ( li ) {
			var links = li.getElementsByTagName( 'a' );
			while ( links.length ) {
				replaceLink( links[0] );
			}

			return Array.reduce( li.childNodes, extractFromLi, [] )
				.join( '' ).trim();
		}

		function extractFromLi ( ret, node ) {
			if ( node.tagName === 'UL' ) {
				ret.push.apply(
					ret,
					flattenList( node ).map(function ( t ) {
						return node.firstChild.data + ' – ' + t;
					}) );
			}
			else if ( node.nodeType === 1 ) {
				ret.push( node.textContent );
			}
			else {
				ret.push( node.data );
			}

			return ret;
		}

		function replaceLink ( link ) {
			var textLink = bot.adapter.link(
				link.textContent, linkBase + link.getAttribute('href')
			),
				textNode = document.createTextNode( textLink );

			link.parentNode.replaceChild( textNode, link );
		}
	}
}

bot.addCommand({
	name : 'inhistory',
	fun : history.command,
	thisArg : history,
	permissions : {
		del : 'NONE'
	},

	description : 'Grabs a historical event from today\'s date or a date ' +
		'given in MM-DD format. `/inhistory [MM-DD]`',
	async : true
});

})();


(function () {
"use strict";
var parse = bot.getCommand( 'parse' );
var storage = bot.memory.get( 'learn' );

var replyPatterns = /^(<>|<user>|<msg>)/i,
	onlyReply = new RegExp( replyPatterns.source + '$', 'i' );

function learn ( args ) {
	bot.log( args, '/learn input' );

	var commandParts = args.parse();
	var command = {
		name   : commandParts[ 0 ],
		output : commandParts[ 1 ],
		input  : commandParts[ 2 ] || '.*',
		//meta info
		creator: args.get( 'user_name' ),
		date   : new Date()
	};
	command.description = [
		'User-taught command:',
		commandParts[3] || '',
		args.codify( command.output )
	].join( ' ' );

	//a truthy value, unintuitively, means it isn't valid, because it returns
	// an error message
	var errorMessage = checkCommand( command );
	if ( errorMessage ) {
		return errorMessage;
	}
	command.name = command.name.toLowerCase();
	command.input = new RegExp( command.input );

	bot.log( command, '/learn parsed' );

	addCustomCommand( command );
	saveCommand( command );

	return 'Command ' + command.name + ' learned';
}

function addCustomCommand ( command ) {
	var cmd = bot.Command({
		//I hate this duplication
		name : command.name,

		description : command.description,
		creator : command.creator,
		date : command.date,

		fun : makeCustomCommand( command ),
		permissions : {
			use : 'ALL',
			del : 'ALL'
		}
	});
	cmd.learned = true;

	cmd.del = (function ( old ) {
		return function () {
			deleteCommand( command.name );
			old.call( cmd );
		};
	}( cmd.del ));

	bot.log( cmd, '/learn addCustomCommand' );
	bot.addCommand( cmd );
}
function makeCustomCommand ( command ) {
	var output = command.output.replace( replyPatterns, '' ).trim(),
		replyMethod = extractPattern();

	bot.log( command, '/learn makeCustomCommand' );

	return function ( args ) {
		bot.log( args, command.name + ' input' );

		var cmdArgs = bot.Message( output, args.get() ),
			res = parse.exec( cmdArgs, command.input.exec(args) );

		switch ( replyMethod ) {
		case '':
			args.send( res );
			break;
		case 'msg':
			args.directreply( res );
			break;
		default:
			args.reply( res );
		}
	};

	function extractPattern () {
		var matches = replyPatterns.exec( command.output ) || [ , 'user' ],
			pattern =  matches[ 1 ];

		return pattern.slice(1, -1);
	}
}

//return a truthy value (an error message) if it's invalid, falsy if it's
// valid
function checkCommand ( cmd ) {
	var somethingUndefined = Object.keys( cmd ).some(function ( key ) {
		return !cmd[ key ];
	}),
		error;

	if ( somethingUndefined ) {
		error = 'Illegal /learn object; see `/help learn`';
	}
	//not very possible, I know, but...uh...yes. definitely. I agree. spot on,
	// Mr. Pips.
	else if ( /\s/.test(cmd.name) ) {
		error = 'Invalid command name';
	}
	else if ( !canWriteTo(cmd.name) ) {
		error = 'Command ' + cmd.name + ' already exists';
	}
	else if ( onlyReply.test(cmd.output) ) {
		error = 'Please enter some output';
	}

	return error;

	function canWriteTo ( name ) {
		if ( !bot.commandExists(name) ) {
			return true;
		}

		//if the command was learned up to 5 minutes ago, allow overwriting it
		var alt = bot.getCommand( name );
		return alt.learned &&
			( alt.date.getTime() + 1000 * 60 * 5 ) > Date.now();
	}
}

function loadCommands () {
	Object.iterate( storage, teach );

	function teach ( key, cmd ) {
		cmd = JSON.parse( cmd );
		cmd.input = turnToRegexp( cmd.input );
		cmd.date = new Date( Date.parse(cmd.date) );

		addCustomCommand( cmd );
	}

	//input: strung regexp, e.g. /abc/i
	//return: regexp
	//algo: we split by /.
	//  the first item is empty, the part before the first /
	//  the second to second-before-last are the regexp body. there will be more
	//    than one item in that range if the regexp contained escaped slashes,
	//    like /abc\/def/
	//  the last item is the flags (or the empty string, if no flags are set)
	function turnToRegexp ( input ) {
		var parts = input.toString().split( '/' );
		return new RegExp(
			parts.slice( 1, -1 ).join( '/' ), //to compensate for escaped /
			parts[ parts.length-1 ]
		);
	}
}
function saveCommand ( command ) {
	//h4x in source/util.js defines RegExp.prototype.toJSON so we don't worry
	// about the input regexp stringifying
	storage[ command.name ] = JSON.stringify( command );
	bot.memory.save( 'learn' );
}
function deleteCommand ( name ) {
	delete storage[ name ];
	bot.memory.save( 'learn' );
}

bot.addCommand({
	name : 'learn',
	fun  : learn,
	privileges : {
		del : 'NONE'
	},

	description : 'Teaches me a command. ' +
		'`/learn cmdName outputPattern [inputRegex [description]]`'
});

loadCommands();
}());


(function () {
"use strict";

var unexisto = 'User {0} was not found (if the user is not in room {1}, pass ' +
		'a user-id instead of a username).';



function linkCheck ( suspect ) {
	return suspect.startsWith( 'http' ) || suspect.startsWith( 'www' );
}


}());


(function () {
//I wish you could use `default` as a variable name
var def = {
	895174 : [
		'sbaaaang', 'badbetonbreakbutbedbackbone',
		'okok', 'donotusetabtodigitthisnick' ]
};

var tracking = bot.memory.get( 'tracker', def );
var message = '*→ {0} (also known as {1}) changed his name to {2}*',
	messageNoAlias = '*→ {0} changed his name to {2}*';

IO.register( 'userregister', function tracker ( user, room ) {
	var names = tracking[ user.id ];

	if ( !names ) {
		return;
	}
	if ( names[0].toLowerCase() === user.name.toLowerCase() ) {
		return;
	}

	bot.log( user, names, 'tracking found suspect' );

	var userLink = bot.adapter.link(
		names[0],
		IO.relativeUrlToAbsolute( '/users/' + user.id ) );

	var outFormat = names.length > 1 ? message : messageNoAlias,
		out = outFormat.supplant(
			userLink, names.slice(1), user.name );

	bot.adapter.out.add( out, room );
	names.unshift( user.name );
});

})();


(function () {
"use strict";
var ownerRoom = 17;

if ( bot.adapter.roomid !== ownerRoom ) {
	return;
}

var muted = bot.memory.get( 'muted' );

function checkMuted () {
	var now = Date.now();

	Object.iterate( muted, function ( id, obj ) {
		if ( obj.endDate < now ) {
			giveVoice( id );
		}
	});

	setTimeout( checkMuted, 60 * 1000 );
}
setTimeout( checkMuted, 60 * 1000 );

function giveVoice ( id, cb ) {
	bot.log( 'giving voice to ' + id );

	IO.xhr({
		method : 'POST',
		url : '/rooms/setuseraccess/' + ownerRoom,
		data : {
			aclUserId : id,
			fkey : bot.adapter.fkey,
			userAccess : 'read-write'
		},

		complete : finish
	});

	function finish () {
		var args = [].slice.call( arguments );
		args.unshift( id );

		delete muted[ id ];

		if ( cb ) {
			bot.memory.save( 'muted' );
			cb && ( cb.apply(null, args) );
		}
	}
}
function takeVoice ( params, cb ) {
	bot.log( 'taking voice', params );

	IO.xhr({
		method : 'POST',
		url : '/rooms/setuseraccess/' + ownerRoom,
		data : {
			aclUserId : params.id,
			fkey : bot.adapter.fkey,
			userAccess : 'remove'
		},

		complete : finish
	});

	function finish () {
		muted[ params.id ] = {
			name : params.name,
			invokingId : params.invokingId,
			endDate : calcEndDate( params.duration ).getTime()
		};

		bot.memory.save( 'muted' );
		cb.apply( null, arguments );
	}

	function calcEndDate ( duration ) {
		var ret = new Date(),
			mod = duration.slice( -1 ),
			delta = Number( duration.slice(0, -1) );

		var modifiers = {
			m : function ( offset ) {
				ret.setMinutes( ret.getMinutes() + offset );
			},
			h : function ( offset ) {
				ret.setHours( ret.getHours() + offset );
			},
			d : function ( offset ) {
				ret.setDate( ret.getDate() + offset );
			}
		};
		modifiers[ mod ]( delta );

		return ret;
	}
}

IO.register( 'userregister', function permissionCb ( user, room ) {
	bot.log( user, room, 'permissionCb' );
	var id = user.id;

	if ( Number(room) !== ownerRoom || bot.isOwner(id) || muted[id] ) {
		bot.log( 'not giving voice', user, room );
		return;
	}

	giveVoice( id );
});

function stringMuteList () {
	var keys = Object.keys( muted );

	if ( !keys.length ) {
		return 'Nobody is muted';
	}

	var base = 'http://chat.stackexchange.com/transcript/message/';

	return keys.map(function ( k ) {
		return bot.adapter.link( k, base + muted[k].invokingId );
	}).join( '; ' );
}

function userInfoFromParam ( param, args ) {
	var ret = {
		id : param
	};

	if ( /\D/.test(param) ) {
		ret.id = args.findUserid( param );
	}

	if ( ret.id < 0 ) {
		ret.error = 'User ' + param + ' not found';
	}

	return ret;
}

function parseDuration ( str ) {
	var parts = /\d+([dhm]?)/.exec( str );
	if ( !parts ) {
		return null;
	}

	if ( !parts[1] ) {
		parts[ 0 ] += 'm';
	}
	return parts[ 0 ];
}

bot.addCommand({
	name : 'mute',
	fun : function mute ( args ) {
		var parts = args.parse(),
			userInfo, duration;

		if ( !parts.length ) {
			return stringMuteList();
		}
		else if ( parts.length < 2 ) {
			return 'Please give mute duration, see `/help mute`';
		}

		bot.log( parts, '/mute input' );

		userInfo = userInfoFromParam( parts[0], args );
		if ( userInfo.error ) {
			return userInfo.error;
		}
		else if ( userInfo.id === bot.adapter.user_id ) {
			return 'Never try and mute a bot who can own your ass.';
		}
		else if ( bot.isOwner(userInfo.id) ) {
			return 'You probably didn\'t want to mute a room owner.';
		}

		duration = parseDuration( parts[1] );
		if ( !duration ) {
			return 'I don\'t know how to follow that format, see `/help mute`';
		}

		takeVoice({
			id : userInfo.id,
			invokingId : args.get('message_id'),
			duration : duration
		}, finish );

		function finish () {
			args.reply(
				'Muted user {0} for {1}'.supplant(userInfo.id, duration) );
		}
	},

	permissions : {
		del : 'NONE',
		use : 'OWNER'
	},
	description : 'Mutes a user. `/mute usrid duration` ' +
		'Duration should be in the format `n[mhd]` for n minutes/hours/days. ' +
		'If only n is provided, minutes is assumed.'
});

bot.addCommand({
	name : 'unmute',
	fun : function umute ( args ) {
		var parts = args.parse();

		bot.log( parts, '/unmute input' );

		if ( !parts.length ) {
			return 'Who shall I unmute?';
		}

		var userID = userInfoFromParam( parts[0], args );
		if ( userID.error ) {
			return userID.error;
		}

		giveVoice( userID.id, finish );

		function finish () {
			args.reply( 'Unmuted user ' + userID.id );
		}
	},

	permissions : {
		del : 'NONE',
		use : 'OWNER'
	},
	description : 'Unmutes a user. `/unmute usrid`'
});

})();

(function () {

var template = '[{display_name}]({link}) '           +
		'has {reputation} reputation, '              +
		'earned {reputation_change_day} rep today, ' +
		'asked {question_count} questions, '         +
		'gave {answer_count} answers.';

var extended_template = 'avg. rep/post: {avg_rep_post}. ' +
		'Badges: {gold}g {silver}s {bronze}b ';

function stat ( msg, cb ) {
	var args = msg.parse(),
		id = args[ 0 ],
		extended = ( args[1] === 'extended' );

	if ( !id ) {
		id = msg.get( 'user_id' );
	}
	else if ( !/^\d+$/.test(id) ) {
		id = msg.findUserid( extended ? id : args.slice().join(' ') );
	}

	if ( id < 0 ) {
		return 'User Elusio proved elusive.';
	}

	//~5% chance
	if ( Math.random() <= 0.05 ) {
		finish( 'That dude sucks' );
		return;
	}

	IO.jsonp({
		url : 'https://api.stackexchange.com/2.0/users/' + id,
		data : {
			site   : bot.adapter.site,
			filter :  '!G*klMsSp1IcBUKxXMwhRe8TaI(' //ugh, don't ask...
		},
		fun : done
	});

	function done ( resp ) {
		if ( resp.error_message ) {
			finish( resp.error_message );
			return;
		}

		var user = resp.items[ 0 ], res;
		if ( !user ) {
			res = 'User ' + id + ' not found';
		}
		else {
			res = handle_user_object( user, extended );
		}

		finish( res );
	}

	function finish ( res ) {
		if ( cb ) {
			cb( res );
		}
		else {
			msg.reply( res );
		}
	}
}

function handle_user_object ( user, extended ) {
	user = normalize_stats( user );
	var res = template.supplant( user );

	if ( extended ) {
		res += extended_template.supplant( calc_extended_stats(user) );
	}

	bot.log( res, '/stat templated' );
	return res;
}

function normalize_stats ( stats ) {
	stats = Object.merge({
			question_count        : 0,
			answer_count          : 0,
			reputation_change_day : 0
		}, stats );

	return stats;
}

function calc_extended_stats ( stats ) {
	stats = Object.merge( stats.badge_counts, stats );

	stats.avg_rep_post = (
			stats.reputation / ( stats.question_count + stats.answer_count )
		).maxDecimal( 2 );

	//1 / 0 === Infinity
	if ( stats.avg_rep_post === Infinity ) {
		stats.avg_rep_post = 'T͎͍̘͙̖̤̉̌̇̅ͯ͋͢͜͝H̖͙̗̗̺͚̱͕̒́͟E̫̺̯͖͎̗̒͑̅̈ ̈ͮ̽ͯ̆̋́͏͙͓͓͇̹<̩̟̳̫̪̇ͩ̑̆͗̽̇͆́ͅC̬͎ͪͩ̓̑͊ͮͪ̄̚̕Ě̯̰̤̗̜̗͓͛͝N̶̴̞͇̟̲̪̅̓ͯͅT͍̯̰͓̬͚̅͆̄E̠͇͇̬̬͕͖ͨ̔̓͞R͚̠̻̲̗̹̀>̇̏ͣ҉̳̖̟̫͕ ̧̛͈͙͇͂̓̚͡C͈̞̻̩̯̠̻ͥ̆͐̄ͦ́̀͟A̛̪̫͙̺̱̥̞̙ͦͧ̽͛̈́ͯ̅̍N̦̭͕̹̤͓͙̲̑͋̾͊ͣŅ̜̝͌͟O̡̝͍͚̲̝ͣ̔́͝Ť͈͢ ̪̘̳͔̂̒̋ͭ͆̽͠H̢͈̤͚̬̪̭͗ͧͬ̈́̈̀͌͒͡Ơ̮͍͇̝̰͍͚͖̿ͮ̀̍́L͐̆ͨ̏̎͡҉̧̱̯̤̹͓̗̻̭ͅḐ̲̰͙͑̂̒̐́̊';
	}

	bot.log( stats, '/stat extended' );
	return stats;
}

bot.addCommand({
	name : 'stat',
	fun : stat,
	permissions : {
		del : 'NONE'
	},

	description : 'Gives useless stats on a user. ' +
		'`/stat usrid|usrname [extended]`',
	async : true
});

}());


(function () {
/*
  ^\s*         #tolerate pre-whitespace
  s            #substitution prefix
  (\/|\|)      #delimiter declaration
  (            #begin matching regex
    (?:        #match shit which isn't an...
      (?:\\\1) #escaped delimeter
      |        #or...
      [^\1]    #anything but the delimeter
    )*?
  )            #end matching regex
  \1           #delimeter again
  (            #the fa-chizzle all over again...this time for replacement
    (?:
      (?:\\\1)
      |
      [^\1]
    )*?
  )      #read above, I'm not repeating this crap
  \1
  (      #flag capturing group
    g?   #global (optional)
    i?   #case insensitive (optional)
  )      #FIN
 */
var sub = /^\s*s(\/|\|)((?:(?:\\\1)|[^\1])*?)\1((?:(?:\\\1)|[^\1])*?)\1(g?i?)/;
bot.listen( sub, substitute );

function substitute ( msg ) {
	var re = RegExp( msg.matches[2], msg.matches[4] ),
		replacement = msg.matches[ 3 ];

	if ( !msg.matches[2] ) {
		return 'Empty regex is empty';
	}

	var message = get_matching_message( re, msg.get('message_id') );
	bot.log( message, 'substitution found message' );

	if ( !message ) {
		return 'No matching message (are you sure we\'re in the right room?)';
	}

	var link = get_message_link( message );
	return message.textContent.replace( re, replacement ) + ' ' +
		msg.link( '(source)', link );
}

function get_matching_message ( re, onlyBefore ) {
	var messages = [].slice.call(
		document.getElementsByClassName('content') ).reverse();
	return messages.first( matches );

	function matches ( el ) {
		var id = Number( el.parentElement.id.match(/\d+/)[0] );
		return id < onlyBefore && re.test( el.textContent );
	}
}

// <a class="action-link" href="/transcript/message/msgid#msgid>...</a>
// <div class="content">message</div>
//if the message was a reply, there'd be another element between them:
// <a class="reply-info" href="/transcript/message/repliedMsgId#repliedMsgId>
function get_message_link ( message ) {
	var node = message;

	while ( !node.classList.contains('action-link') ) {
		node = node.previousElementSibling;
	}

	return node.href;
}
}());


(function () {
"use strict";

var summon = function ( args ) {
	var room = Number( args );

	if ( !room ) {
		return 'That aint no room I ever heard of! ' +
			'`/help summon` for usage info';
	}

	bot.adapter.in.init( room );
};
var unsummon = function ( args, cb ) {
	var room = args.content ? Number( args ) : args.get( 'room_id' );

	if ( !room ) {
		return 'That aint no room I ever heard of! ' +
			'`/help unsummon` for usage info';
	}

	bot.adapter.in.leaveRoom( room, function ( err ) {
		if ( err === 'base_room' ) {
			finish( 'I can\'t leave my home.' );
		}
	});

	function finish ( res ) {
		if ( cb && cb.call ) {
			cb( res );
		}
		else {
			args.reply( res );
		}
	}
};

bot.addCommand( bot.CommunityCommand({
	name : 'summon',
	fun : summon,
	permissions : {
		del : 'NONE',
		use : 'OWNER'
	},
	description : 'Say boopidi bee and in the room I shall appear. '+
		'`/summon roomid`'
}));

bot.addCommand( bot.CommunityCommand({
	name : 'unsummon',
	fun : unsummon,
	permissions : {
		del : 'NONE',
		use : 'OWNER'
	},
	description : 'Chant zippidi dee and from the room I shall take my leave. ' +
		'`/unsummon [roomid=your_roomid]`'
}));

})();


(function () {
var timers = Object.create( null ),
	id = 0;

var actions = {
	start : function ( name ) {
		if ( name === undefined ) {
			//if Crockford ever reads this, I want to reassure you: I did mean
			// postfix increment. I want to grab the original value of id while
			// increasing its value.
			//now you may continue reading the code at ease
			name = id++;
		}
		timers[ name ] = Date.now();
		return 'Registered timer ' + name;
	},

	stop : function ( name ) {
		if ( name === undefined ) {
			return 'You must provide a timer name';
		}
		var timer = timers[ name ];

		if ( !timer ) {
			return 'I have no knowledge of timer ' + name;
		}

		var delta = Date.now() - timer;
		delete timers[ name ];

		return delta + 'ms';
	}
};

function timer ( msg ) {
	var args = msg.parse(),
		act = args.shift(),
		name = args.shift();

	if ( !actions[act] ) {
		return 'Action {0} not recognized, see `/help timer`'.supplant( act );
	}
	return actions[ act ]( name );
}

bot.addCommand({
	name : 'timer',
	fun  : timer,
	permissions : {
		del : 'NONE'
	},
	description : 'Starts/stops a timer. ' +
		'`/timer start [name]` starts a timer, ' +
		'`/timer stop name` stops a timer.'
});

})();


(function () {
var list = bot.memory.get( 'todo' );

var userlist = function ( usrid ) {
	var usr = list[ usrid ],
		toRemove = [];
	if ( !usr ) {
		usr = list[ usrid ] = [];
	}

	return {
		get : function ( count ) {
			return usr.slice( count ).map(function ( item, idx ) {
				return '(' + idx + ')' + item;
			}).join( ', ' );
		},

		add : function ( item ) {
			usr.push( item );
			return true;
		},

		remove : function ( item ) {
			var idx = usr.indexOf( item );
			if ( idx === -1 ) {
				return false;
			}
			return this.removeByIndex( idx );
		},
		removeByIndex : function ( idx ) {
			if ( idx >= usr.length ) {
				return false;
			}
			toRemove.push( idx );

			return true;
		},

		save : function () {
			bot.log( toRemove.slice(), usr.slice() );

			usr = usr.filter(function ( item, idx ) {
				return toRemove.indexOf( idx ) === -1;
			});

			toRemove.length = 0;

			list[ usrid ] = usr;
		},

		exists : function ( suspect ) {
			suspect = suspect.toLowerCase();
			return usr.some(function ( item ) {
				return suspect === item.toLowerCase();
			});
		}
	};
}.memoize();

var actions = {
	get : function ( usr, items ) {
		//if the user didn't provide an argument, the entire thing is returned
		var ret = usr.get( items[0] );
		return ret || 'No items on your todo';
	},

	add : function ( usr, items ) {
		var ret = '';
		items.every( add );
		return ret || 'Item(s) added.';

		function add ( item ) {
			if ( usr.exists(item) ) {
				ret = item + ' already exists.';
				return false;
			}
			usr.add( item );
			return true;
		}
	},

	rm : function ( usr, items ) {
		var ret = '';
		items.every( remove );

		return ret || 'Item(s) removed.';

		function remove ( item ) {
			if ( /^\d+$/.test(item) ) {
				usr.removeByIndex( Number(item) );
			}
			else if ( !usr.exists(item) ) {
				ret = item + ' does not exist.';
				return false;
			}
			else {
				usr.remove( item );
			}

			return true;
		}
	}
};

/*	var props = args.parse();
	bot.log( props, 'todo input' );

	if ( !props[0] ) {
		props = [ 'get' ];
	}
	var action = props[ 0 ],
		usr = userlist( args.get('user_id') ),
		items = props.slice( 1 ),
		ret;

	if ( actions[action] ) {
		ret = actions[ action ]( usr, items );
		bot.log( ret, '/todo ' + action );
	}
	else {
		ret = 'Unidentified /todo action ' + action;
		bot.log( ret, '/todo unknown' );
	}

	//save the updated list
	usr.save();
	return ret;
};

bot.addCommand({
	name : 'todo',
	fun  : todo,
	permissions : {
		del : 'NONE'
	},
	description : 'Your personal todo list. ' +
		'`get [count]` retrieves everything or count items. ' +
		'`add items` adds items to your todo list (make sure items ' +
			'with spaces are wrapped in quotes) ' +
		'`rm items|indices` removes items specified by indice or content'
});

}()); */


(function () {
var undo = {
	last_id : null,

	command : function ( args, cb ) {
		var id = Number( args.parse()[0] );
		bot.log( id, '/undo input' );

		if ( !id ) {
			id = this.last_id;
		}

		if ( !id ) {
			finish( 'I\'ve yet to say a word.' );
		}
		else {
			this.remove( id, finish );
		}

		function finish ( ans ) {
			if ( cb ) {
				cb( ans );
			}
			else {
				args.reply( ans );
			}
		}
	},

	remove : function ( id, cb ) {
		IO.xhr({
			url   : '/messages/' + id + '/delete',
			data   : fkey(),
			method  : 'POST',
			complete : finish
		});

		function finish ( resp, xhr ) {
			var msg;

			if ( resp === '"ok"' ) {
				//nothing to see here
				return;
			}
			else if ( /it is too late/i.test(resp) ) {
				msg = 'TimeError: Could not reach 88mph';
			}
			else if ( /only delete your own/i.test(resp) ) {
				//...I can't think of anything clever
				msg = 'I can only delete my own messages';
			}
			else {
				msg = 'I have no idea what happened: ' + resp;
			}

			cb( msg );
		}
	},

	update_id : function ( xhr ) {
		this.last_id = JSON.parse( xhr.responseText ).id;
	}
};

IO.register( 'sendoutput', undo.update_id, undo );
bot.addCommand({
	name : 'undo',
	fun  : undo.command,
	thisArg : undo,
	permissions : {
		del : 'NONE',
		use : 'OWNER'
	},
	description : 'Undo (delete) specified or last message. `/undo [msgid]`'
});

}());


IO.register( 'input', function ( msgObj ) {
	if ( msgObj.user_id === 1386886 && Math.random() < 0.005 ) {
		bot.adapter.out.add(
			bot.adapter.reply(msgObj.user_name) + ' The Game' );
	}
});


(function () {
//meet Winded Weasel. he helps you make decisions and he answers questions.
//x or y [or z ...]
// => one of x, y, z, ...
//is x y
//can x y
// => yes or no

var chooseRe = /^\s*(choose|should)?.*\sor\s[^$]/i,
	questionRe = new RegExp('\\b(' +[
		"am", "are", "can", "could", "did", "do", "does", "is", "may", "might",
		"shall", "should", "will", "would"
	].map(RegExp.escape).join('|') + ')\\b', 'i');

//personal pronouns to capitalize and their mapping
//TODO: add possessives (should my cat => your cat should)
var capitalize = {
	he  : 'He',
	i   : 'You',
	it  : 'It',
	she : 'She',
	they: 'They',
	we  : 'You',
	you : 'I'
};

//will be filled in the build
var answers, undecided, sameness;
//"encoded" to leave some surprise
undecided=["SSdtIG5vdCBzdXJl", "RVJST1IgQ0FMQ1VMQVRJTkcgUkVTVUxU","SSBrbm93IGp1c3Qgb25lIHRoaW5nLCBhbmQgdGhhdCBpcyB0aGF0IEknbSBhIGx1bWJlcmphY2s="].map(atob);

sameness=["VGhhdCdzIG5vdCByZWFsbHkgYSBjaG9pY2UsIG5vdyBpcyBpdD8=","U291bmRzIGxpa2UgeW91IGhhdmUgYWxyZWFkeSBkZWNpZGVk","Q2hlYXRlciBjaGVhdGVyIHlvdXIgaG91c2UgaXMgYSBoZWF0ZXI="].map(atob);

//now for the juicy part
answers=["QWJzb2x1dGVseSBub3Q=","QWJzb2x1dGVseSBub3Q=","QWJzb2x1dGVseSBub3Q=","QWxsIHNpZ25zIHBvaW50IHRvIG5v","QWxsIHNpZ25zIHBvaW50IHRvIG5v","QWxsIHNpZ25zIHBvaW50IHRvIG5v","QWxsIHNpZ25zIHBvaW50IHRvIHllcw==","QWxsIHNpZ25zIHBvaW50IHRvIHllcw==","QWxsIHNpZ25zIHBvaW50IHRvIHllcw==","QnV0IG9mIGNvdXJzZQ==","QnV0IG9mIGNvdXJzZQ==","QnV0IG9mIGNvdXJzZQ==","QnkgYWxsIG1lYW5z","QnkgYWxsIG1lYW5z","QnkgYWxsIG1lYW5z","Q2VydGFpbmx5IG5vdA==","Q2VydGFpbmx5IG5vdA==","Q2VydGFpbmx5IG5vdA==","Q2VydGFpbmx5","Q2VydGFpbmx5","Q2VydGFpbmx5","RGVmaW5pdGVseQ==","RGVmaW5pdGVseQ==","RGVmaW5pdGVseQ==","RG91YnRmdWxseQ==","RG91YnRmdWxseQ==","RG91YnRmdWxseQ==","SSBjYW4gbmVpdGhlciBjb25maXJtIG5vciBkZW55","SSBleHBlY3Qgc28=","SSBleHBlY3Qgc28=","SSBleHBlY3Qgc28=","SSdtIG5vdCBzbyBzdXJlIGFueW1vcmUuIEl0IGNhbiBnbyBlaXRoZXIgd2F5","SW1wb3NzaWJsZQ==","SW1wb3NzaWJsZQ==","SW1wb3NzaWJsZQ==","SW5kZWVk","SW5kZWVk","SW5kZWVk","SW5kdWJpdGFibHk=","SW5kdWJpdGFibHk=","SW5kdWJpdGFibHk=","Tm8gd2F5","Tm8gd2F5","Tm8gd2F5","Tm8=","Tm8=","Tm8=","Tm8=","Tm9wZQ==","Tm9wZQ==","Tm9wZQ==","Tm90IGEgY2hhbmNl","Tm90IGEgY2hhbmNl","Tm90IGEgY2hhbmNl","Tm90IGF0IGFsbA==","Tm90IGF0IGFsbA==","Tm90IGF0IGFsbA==","TnVoLXVo","TnVoLXVo","TnVoLXVo","T2YgY291cnNlIG5vdA==","T2YgY291cnNlIG5vdA==","T2YgY291cnNlIG5vdA==","T2YgY291cnNlIQ==","T2YgY291cnNlIQ==","T2YgY291cnNlIQ==","UHJvYmFibHk=","UHJvYmFibHk=","UHJvYmFibHk=","WWVzIQ==","WWVzIQ==","WWVzIQ==","WWVzIQ==","WWVzLCBhYnNvbHV0ZWx5","WWVzLCBhYnNvbHV0ZWx5","WWVzLCBhYnNvbHV0ZWx5"].map(atob);
//can you feel the nectar?


bot.listen(chooseRe, function chooseListener ( msg ) {
	var parts = msg
		//remove the choose prefix
		.replace( /^\s*choose\s/i, '' )
		//also remove the trailing question mark
		.replace( /\?$/, '' )
		.split( /\s*\bor\b\s*/i )
		//remove whatever empty items there may be
		.filter( Boolean );

	var len = parts.length;

	//check to see whether there's only 1 thing asked to choose about, e.g.
	// choose a or a or a
	// choose a
	for ( var i = 1, same = true; i < len; i++ ) {
		if ( parts[i] !== parts[i-1] ) {
			same = false;
			break;
		}
	}

	if ( same ) {
		return sameness.random();
	}

	//all of them (1%)
	if ( Math.random() < 0.01 ) {
		return len === 2 ? 'Both!' : 'All of them!';
	}
	//none of them (1%)
	if ( Math.random() < 0.01 ) {
		return len === 2 ? 'Neither' : 'None of them!';
	}
	//I don't know (1%)
	if ( Math.random() < 0.01 ) {
		return undecided.random();
	}

	//choose!
	var choice = parts.random();

	//bots can be fickley too
	if ( Math.random() < 0.01 ) {
		bot.log( 'weasel decision mind change jedi nun-chuck' );
		setTimeout( changeMind, 10000 );
	}

	return format( choice );

	function changeMind () {
		var second;
		//this won't be an infinite loop as we guruantee there will be at least
		// 2 distinct results
		//possible blocking point for large N. but there won't be a
		// sufficiently large N, so this is probably not a problem
		do {
			second = parts.random();
		} while ( second === choice );

		msg.reply( 'Wait, I changed my mind! ' + format(second) );
	}

	function format ( ans ) {
		return ans.replace( /(should(?:n'?t)?) (\S+)/, subject );
	}

	//convert:
	// "should I" => "you should"
	// "should you" => "I should"
	//anything else just switch the order
	function subject ( $0, $1, $2 ) {
		var sub = $2.toLowerCase(),
			conv;

		//if we recognize this word, map it properly
		if ( capitalize.hasOwnProperty(sub) ) {
			conv = capitalize[ sub ];
		}
		//otherwise, use the original spelling
		else {
			conv = $2;
		}

		return conv + ' ' + $1;
	}
});

bot.listen(questionRe, function questionListener () {
	//TODO: same question => same mapping (negative/positive, not specific)
	return answers.random();
});

}());


(function () {
"use strict";

var fahrenheitCountries = Object.TruthMap([
	//the API returns US in a variety of forms...
	'US', 'United States of America', 'United States',
	//other than the US, it's used in Belize, Bahamas and and Cayman Islands
	'BZ', 'Belize', // http://www.hydromet.gov.bz/
	'BS', 'Bahamas', // http://archive.is/RTD4
	'KY', 'Cayam Islands' // http://www.weather.ky/forecast/index.htm
]);



;
(function () {
"use strict";
//welcomes new users with a link to the room rules

var seen = bot.memory.get( 'users' );

var message = "Welcome to the Ask Ubuntu General Room! " +
	"Please don't ask if you can ask or if anyone's around; just ask " +
	"your question, and if anyone's free and interested they'll help.";

function welcome ( name, room ) {
	bot.adapter.out.add(
		bot.adapter.reply( name ) + " " + message, room );
}

IO.register( 'userregister', function ( user, room ) {
	var semiLegitUser = bot.isOwner( user.id ) ||
		user.reputation > 1000 || user.reputation < 20;

	if (
		Number( room ) !== 17 || semiLegitUser  || seen[ user.id ]
	) {
		if ( semiLegitUser ) {
			finish( true );
		}
		return;
	}

	IO.xhr({
		method : 'GET',
		url : '/users/' + user.id,

		complete : complete
	});

	function complete ( resp ) {
		//I'm parsing html with regexps. hopefully Cthulu won't eat me.
		// <a href="/transcript/17">7</a>
		// <a href="/transcript/17">47.1k</a>
		var chatMessages = /transcript\/17(?:'|")>([\d\.]+)(k?)/.exec( resp );

		if ( !chatMessages || (
			!chatMessages[ 2 ] || parseFloat( chatMessages[1] ) < 2
		)) {
			welcome( user.name, room );
		}
		finish();
	}

	function finish ( unsee ) {
		if ( unsee ) {
			delete seen[ user.id ];
		}
		else {
			seen[ user.id ] = true;
		}
		bot.memory.save( 'users' );
	}
});

bot.addCommand({
	name : 'welcome',
	fun : function ( args ) {
		if (!args.length) {
			return message;
		}

		welcome( args, args.get('roomid') );
	},
	permission : {
		del : 'NONE'
	},
	description : 'Welcomes a user. `/welcome user`'
});
}());


(function () {
"use strict";

function command ( args, cb ) {
	IO.jsonp({
		url : 'http://en.wiktionary.org/w/api.php',
		jsonpName : 'callback',
		data : {
			action : 'opensearch',
			search : args.toString(),
			limit : 1,
			format : 'json'
		},
		fun : finish
	});

	function finish ( resp ) {
		//the result will look like this:
		// [search_term, [title0, title1, title2, ...]]
		//we only asked for one result, so the 2nd array will have 1 item
		var title = resp[ 1 ][ 0 ],
			base = 'http://en.wikipedia.org/wiki/',
			found = true, res;

		if ( !title ) {
			found = false;
			res = [
				'No result found',
				'The Wikipedia contains no knowledge of such a thing',
			].random();
		}
		else {
			//for some reason, wikipedia can't simply return a url
			title = encodeURIComponent( title.replace(/ /g, '_') );

			res = base + title;
		}

		if ( cb && cb.call ) {
			cb( res );
		}
		else if ( found ){
			args.directreply( res );
		}
		else {
			args.reply( res );
		}
	}
}

bot.addCommand({
	name : 'wiki',
	fun : command,
	permissions : {
		del : 'NONE'
	},

	description : 'Search Wikipedia. `/wiki term`',
	async : true
});
})();

})();

var links = {
    blackscreen: "http://askubuntu.com/questions/162075/my-computer-boots-to-a-black-screen-what-options-do-i-have-to-fix-it",
    broadcom: "http://askubuntu.com/questions/55868/how-to-install-broadcom-wireless-drivers"
};

var sendLink = function( args ) {
    if (args in links) {

        return msg.directreply(links[args]);
       
    }
    
}

bot.addCommand({  

	name : 'link',
	fun : sendLink,
	permissions : {
		del : 'NONE'
	}
	
	});
})();

