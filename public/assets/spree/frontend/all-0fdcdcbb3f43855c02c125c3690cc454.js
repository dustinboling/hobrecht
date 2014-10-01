/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */


!function($){$.extend($.fn,{validate:function(options){if(!this.length){if(options&&options.debug&&window.console){console.warn("Nothing selected, can't validate, returning nothing.")}return}var validator=$.data(this[0],"validator");if(validator){return validator}this.attr("novalidate","novalidate");validator=new $.validator(options,this[0]);$.data(this[0],"validator",validator);if(validator.settings.onsubmit){this.validateDelegate(":submit","click",function(event){if(validator.settings.submitHandler){validator.submitButton=event.target}if($(event.target).hasClass("cancel")){validator.cancelSubmit=true}if($(event.target).attr("formnovalidate")!==undefined){validator.cancelSubmit=true}});this.submit(function(event){if(validator.settings.debug){event.preventDefault()}function handle(){var hidden;if(validator.settings.submitHandler){if(validator.submitButton){hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val($(validator.submitButton).val()).appendTo(validator.currentForm)}validator.settings.submitHandler.call(validator,validator.currentForm,event);if(validator.submitButton){hidden.remove()}return false}return true}if(validator.cancelSubmit){validator.cancelSubmit=false;return handle()}if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false}return handle()}else{validator.focusInvalid();return false}})}return validator},valid:function(){if($(this[0]).is("form")){return this.validate().form()}else{var valid=true;var validator=$(this[0].form).validate();this.each(function(){valid=valid&&validator.element(this)});return valid}},removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value)});return result},rules:function(command,argument){var element=this[0];if(command){var settings=$.data(element.form,"validator").settings;var staticRules=settings.rules;var existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));delete existingRules.messages;staticRules[element.name]=existingRules;if(argument.messages){settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages)}break;case"remove":if(!argument){delete staticRules[element.name];return existingRules}var filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method]});return filtered}}var data=$.validator.normalizeRules($.extend({},$.validator.classRules(element),$.validator.attributeRules(element),$.validator.dataRules(element),$.validator.staticRules(element)),element);if(data.required){var param=data.required;delete data.required;data=$.extend({required:param},data)}return data}});$.extend($.expr[":"],{blank:function(a){return!$.trim(""+$(a).val())},filled:function(a){return!!$.trim(""+$(a).val())},unchecked:function(a){return!$(a).prop("checked")}});$.validator=function(options,form){this.settings=$.extend(true,{},$.validator.defaults,options);this.currentForm=form;this.init()};$.validator.format=function(source,params){if(arguments.length===1){return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args)}}if(arguments.length>2&&params.constructor!==Array){params=$.makeArray(arguments).slice(1)}if(params.constructor!==Array){params=[params]}$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+i+"\\}","g"),function(){return n})});return source};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(element,event){this.lastActive=element;if(this.settings.focusCleanup&&!this.blockFocusCleanup){if(this.settings.unhighlight){this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass)}this.addWrapper(this.errorsFor(element)).hide()}},onfocusout:function(element,event){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element)}},onkeyup:function(element,event){if(event.which===9&&this.elementValue(element)===""){return}else if(element.name in this.submitted||element===this.lastElement){this.element(element)}},onclick:function(element,event){if(element.name in this.submitted){this.element(element)}else if(element.parentNode.name in this.submitted){this.element(element.parentNode)}},highlight:function(element,errorClass,validClass){if(element.type==="radio"){this.findByName(element.name).addClass(errorClass).removeClass(validClass)}else{$(element).addClass(errorClass).removeClass(validClass)}},unhighlight:function(element,errorClass,validClass){if(element.type==="radio"){this.findByName(element.name).removeClass(errorClass).addClass(validClass)}else{$(element).removeClass(errorClass).addClass(validClass)}}},setDefaults:function(settings){$.extend($.validator.defaults,settings)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=this.groups={};$.each(this.settings.groups,function(key,value){if(typeof value==="string"){value=value.split(/\s/)}$.each(value,function(index,name){groups[name]=key})});var rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value)});function delegate(event){var validator=$.data(this[0].form,"validator"),eventType="on"+event.type.replace(/^validate/,"");if(validator.settings[eventType]){validator.settings[eventType].call(validator,this[0],event)}}$(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, "+"[type='number'], [type='search'] ,[type='tel'], [type='url'], "+"[type='email'], [type='datetime'], [type='date'], [type='month'], "+"[type='week'], [type='time'], [type='datetime-local'], "+"[type='range'], [type='color'] ","focusin focusout keyup",delegate).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",delegate);if(this.settings.invalidHandler){$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)}},form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid()){$(this.currentForm).triggerHandler("invalid-form",[this])}this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var i=0,elements=this.currentElements=this.elements();elements[i];i++){this.check(elements[i])}return this.valid()},element:function(element){element=this.validationTargetFor(this.clean(element));this.lastElement=element;this.prepareElement(element);this.currentElements=$(element);var result=this.check(element)!==false;if(result){delete this.invalid[element.name]}else{this.invalid[element.name]=true}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers)}this.showErrors();return result},showErrors:function(errors){if(errors){$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]})}this.successList=$.grep(this.successList,function(element){return!(element.name in errors)})}if(this.settings.showErrors){this.settings.showErrors.call(this,this.errorMap,this.errorList)}else{this.defaultShowErrors()}},resetForm:function(){if($.fn.resetForm){$(this.currentForm).resetForm()}this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(obj){var count=0;for(var i in obj){count++}return count},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()===0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid){try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name===lastActive.name}).length===1&&lastActive},elements:function(){var validator=this,rulesCache={};return $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){if(!this.name&&validator.settings.debug&&window.console){console.error("%o has no name assigned",this)}if(this.name in rulesCache||!validator.objectLength($(this).rules())){return false}rulesCache[this.name]=true;return true})},clean:function(selector){return $(selector)[0]},errors:function(){var errorClass=this.settings.errorClass.replace(" ",".");return $(this.settings.errorElement+"."+errorClass,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.currentElements=$([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element)},elementValue:function(element){var type=$(element).attr("type"),val=$(element).val();if(type==="radio"||type==="checkbox"){return $("input[name='"+$(element).attr("name")+"']:checked").val()}if(typeof val==="string"){return val.replace(/\r/g,"")}return val},check:function(element){element=this.validationTargetFor(this.clean(element));var rules=$(element).rules();var dependencyMismatch=false;var val=this.elementValue(element);var result;for(var method in rules){var rule={method:method,parameters:rules[method]};try{result=$.validator.methods[method].call(this,val,element,rule.parameters);if(result==="dependency-mismatch"){dependencyMismatch=true;continue}dependencyMismatch=false;if(result==="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return}if(!result){this.formatAndAdd(element,rule);return false}}catch(e){if(this.settings.debug&&window.console){console.log("Exception occurred when checking element "+element.id+", check the '"+rule.method+"' method.",e)}throw e}}if(dependencyMismatch){return}if(this.objectLength(rules)){this.successList.push(element)}return true},customDataMessage:function(element,method){return $(element).data("msg-"+method.toLowerCase())||element.attributes&&$(element).attr("data-msg-"+method.toLowerCase())},customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor===String?m:m[method])},findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined){return arguments[i]}}return undefined},defaultMessage:function(element,method){return this.findDefined(this.customMessage(element.name,method),this.customDataMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+element.name+"</strong>")},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method),theregex=/\$?\{(\d+)\}/g;if(typeof message==="function"){message=message.call(this,rule.parameters,element)}else if(theregex.test(message)){message=$.validator.format(message.replace(theregex,"{$1}"),rule.parameters)}this.errorList.push({message:message,element:element});this.errorMap[element.name]=message;this.submitted[element.name]=message},addWrapper:function(toToggle){if(this.settings.wrapper){toToggle=toToggle.add(toToggle.parent(this.settings.wrapper))}return toToggle},defaultShowErrors:function(){var i,elements;for(i=0;this.errorList[i];i++){var error=this.errorList[i];if(this.settings.highlight){this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass)}this.showLabel(error.element,error.message)}if(this.errorList.length){this.toShow=this.toShow.add(this.containers)}if(this.settings.success){for(i=0;this.successList[i];i++){this.showLabel(this.successList[i])}}if(this.settings.unhighlight){for(i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass)}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return $(this.errorList).map(function(){return this.element})},showLabel:function(element,message){var label=this.errorsFor(element);if(label.length){label.removeClass(this.settings.validClass).addClass(this.settings.errorClass);label.html(message)}else{label=$("<"+this.settings.errorElement+">").attr("for",this.idOrName(element)).addClass(this.settings.errorClass).html(message||"");if(this.settings.wrapper){label=label.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()}if(!this.labelContainer.append(label).length){if(this.settings.errorPlacement){this.settings.errorPlacement(label,$(element))}else{label.insertAfter(element)}}}if(!message&&this.settings.success){label.text("");if(typeof this.settings.success==="string"){label.addClass(this.settings.success)}else{this.settings.success(label,element)}}this.toShow=this.toShow.add(label)},errorsFor:function(element){var name=this.idOrName(element);return this.errors().filter(function(){return $(this).attr("for")===name})},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name)},validationTargetFor:function(element){if(this.checkable(element)){element=this.findByName(element.name).not(this.settings.ignore)[0]}return element},checkable:function(element){return/radio|checkbox/i.test(element.type)},findByName:function(name){return $(this.currentForm).find("[name='"+name+"']")},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case"select":return $("option:selected",element).length;case"input":if(this.checkable(element)){return this.findByName(element.name).filter(":checked").length}}return value.length},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true},dependTypes:{"boolean":function(param,element){return param},string:function(param,element){return!!$(param,element.form).length},"function":function(param,element){return param(element)}},optional:function(element){var val=this.elementValue(element);return!$.validator.methods.required.call(this,val,element)&&"dependency-mismatch"},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true}},stopRequest:function(element,valid){this.pendingRequest--;if(this.pendingRequest<0){this.pendingRequest=0}delete this.pending[element.name];if(valid&&this.pendingRequest===0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();this.formSubmitted=false}else if(!valid&&this.pendingRequest===0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",{old:null,valid:true,message:this.defaultMessage(element,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},number:{number:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){if(className.constructor===String){this.classRuleSettings[className]=rules}else{$.extend(this.classRuleSettings,className)}},classRules:function(element){var rules={};var classes=$(element).attr("class");if(classes){$.each(classes.split(" "),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this])}})}return rules},attributeRules:function(element){var rules={};var $element=$(element);var type=$element[0].getAttribute("type");for(var method in $.validator.methods){var value;if(method==="required"){value=$element.get(0).getAttribute(method);if(value===""){value=true}value=!!value}else{value=$element.attr(method)}if(/min|max/.test(method)&&(type===null||/number|range|text/.test(type))){value=Number(value)}if(value){rules[method]=value}else if(type===method&&type!=="range"){rules[method]=true}}if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength}return rules},dataRules:function(element){var method,value,rules={},$element=$(element);for(method in $.validator.methods){value=$element.data("rule-"+method.toLowerCase());if(value!==undefined){rules[method]=value}}return rules},staticRules:function(element){var rules={};var validator=$.data(element.form,"validator");if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{}}return rules},normalizeRules:function(rules,element){$.each(rules,function(prop,val){if(val===false){delete rules[prop];return}if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break}if(keepRule){rules[prop]=val.param!==undefined?val.param:true}else{delete rules[prop]}}});$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter});$.each(["minlength","maxlength"],function(){if(rules[this]){rules[this]=Number(rules[this])}});$.each(["rangelength","range"],function(){var parts;if(rules[this]){if($.isArray(rules[this])){rules[this]=[Number(rules[this][0]),Number(rules[this][1])]}else if(typeof rules[this]==="string"){parts=rules[this].split(/[\s,]+/);rules[this]=[Number(parts[0]),Number(parts[1])]}}});if($.validator.autoCreateRanges){if(rules.min&&rules.max){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max}if(rules.minlength&&rules.maxlength){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength}}return rules},normalizeRule:function(data){if(typeof data==="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true});data=transformed}return data},addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message!==undefined?message:$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name))}},methods:{required:function(value,element,param){if(!this.depend(param,element)){return"dependency-mismatch"}if(element.nodeName.toLowerCase()==="select"){var val=$(element).val();return val&&val.length>0}if(this.checkable(element)){return this.getLength(value,element)>0}return $.trim(value).length>0},email:function(value,element){return this.optional(element)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value)},url:function(value,element){return this.optional(element)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)},date:function(value,element){return this.optional(element)||!/Invalid|NaN/.test(new Date(value).toString())},dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value)},number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)},digits:function(value,element){return this.optional(element)||/^\d+$/.test(value)},creditcard:function(value,element){if(this.optional(element)){return"dependency-mismatch"}if(/[^0-9 \-]+/.test(value)){return false}var nCheck=0,nDigit=0,bEven=false;value=value.replace(/\D/g,"");for(var n=value.length-1;n>=0;n--){var cDigit=value.charAt(n);nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9){nDigit-=9}}nCheck+=nDigit;bEven=!bEven}return nCheck%10===0},minlength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||length>=param},maxlength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||length<=param},rangelength:function(value,element,param){var length=$.isArray(value)?value.length:this.getLength($.trim(value),element);return this.optional(element)||length>=param[0]&&length<=param[1]},min:function(value,element,param){return this.optional(element)||value>=param},max:function(value,element,param){return this.optional(element)||value<=param},range:function(value,element,param){return this.optional(element)||value>=param[0]&&value<=param[1]},equalTo:function(value,element,param){var target=$(param);if(this.settings.onfocusout){target.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid()})}return value===target.val()},remote:function(value,element,param){if(this.optional(element)){return"dependency-mismatch"}var previous=this.previousValue(element);if(!this.settings.messages[element.name]){this.settings.messages[element.name]={}}previous.originalMessage=this.settings.messages[element.name].remote;this.settings.messages[element.name].remote=previous.message;param=typeof param==="string"&&{url:param}||param;if(previous.old===value){return previous.valid}previous.old=value;var validator=this;this.startRequest(element);var data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+element.name,dataType:"json",data:data,success:function(response){validator.settings.messages[element.name].remote=previous.originalMessage;var valid=response===true||response==="true";if(valid){var submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);delete validator.invalid[element.name];validator.showErrors()}else{var errors={};var message=response||validator.defaultMessage(element,"remote");errors[element.name]=previous.message=$.isFunction(message)?message(value):message;validator.invalid[element.name]=true;validator.showErrors(errors)}previous.valid=valid;validator.stopRequest(element,valid)}},param));return"pending"}}});$.format=$.validator.format}(jQuery);!function($){var pendingRequests={};if($.ajaxPrefilter){$.ajaxPrefilter(function(settings,_,xhr){var port=settings.port;if(settings.mode==="abort"){if(pendingRequests[port]){pendingRequests[port].abort()}pendingRequests[port]=xhr}})}else{var ajax=$.ajax;$.ajax=function(settings){var mode=("mode"in settings?settings:$.ajaxSettings).mode,port=("port"in settings?settings:$.ajaxSettings).port;if(mode==="abort"){if(pendingRequests[port]){pendingRequests[port].abort()}pendingRequests[port]=ajax.apply(this,arguments);return pendingRequests[port]}return ajax.apply(this,arguments)}}}(jQuery);!function($){$.extend($.fn,{validateDelegate:function(delegate,type,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments)}})}})}(jQuery);
/*! jsUri v1.1.1 | https://github.com/derek-watson/jsUri */

var Query=function(a){"use strict";var b=function(a){var b=[],c,d,e,f;if(typeof a=="undefined"||a===null||a==="")return b;a.indexOf("?")===0&&(a=a.substring(1)),d=a.toString().split(/[&;]/);for(c=0;c<d.length;c++)e=d[c],f=e.split("="),b.push([f[0],f[1]]);return b},c=b(a),d=function(){var a="",b,d;for(b=0;b<c.length;b++)d=c[b],a.length>0&&(a+="&"),a+=d.join("=");return a.length>0?"?"+a:a},e=function(a){a=decodeURIComponent(a),a=a.replace("+"," ");return a},f=function(a){var b,d;for(d=0;d<c.length;d++){b=c[d];if(e(a)===e(b[0]))return b[1]}},g=function(a){var b=[],d,f;for(d=0;d<c.length;d++)f=c[d],e(a)===e(f[0])&&b.push(f[1]);return b},h=function(a,b){var d=[],f,g,h,i;for(f=0;f<c.length;f++)g=c[f],h=e(g[0])===e(a),i=e(g[1])===e(b),(arguments.length===1&&!h||arguments.length===2&&!h&&!i)&&d.push(g);c=d;return this},i=function(a,b,d){arguments.length===3&&d!==-1?(d=Math.min(d,c.length),c.splice(d,0,[a,b])):arguments.length>0&&c.push([a,b]);return this},j=function(a,b,d){var f=-1,g,j;if(arguments.length===3){for(g=0;g<c.length;g++){j=c[g];if(e(j[0])===e(a)&&decodeURIComponent(j[1])===e(d)){f=g;break}}h(a,d).addParam(a,b,f)}else{for(g=0;g<c.length;g++){j=c[g];if(e(j[0])===e(a)){f=g;break}}h(a),i(a,b,f)}return this};return{getParamValue:f,getParamValues:g,deleteParam:h,addParam:i,replaceParam:j,toString:d}},Uri=function(a){"use strict";var b=!1,c=function(a){var c={strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},d=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],e={name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},f=c[b?"strict":"loose"].exec(a),g={},h=14;while(h--)g[d[h]]=f[h]||"";g[e.name]={},g[d[12]].replace(e.parser,function(a,b,c){b&&(g[e.name][b]=c)});return g},d=c(a||""),e=new Query(d.query),f=function(a){typeof a!="undefined"&&(d.protocol=a);return d.protocol},g=null,h=function(a){typeof a!="undefined"&&(g=a);return g===null?d.source.indexOf("//")!==-1:g},i=function(a){typeof a!="undefined"&&(d.userInfo=a);return d.userInfo},j=function(a){typeof a!="undefined"&&(d.host=a);return d.host},k=function(a){typeof a!="undefined"&&(d.port=a);return d.port},l=function(a){typeof a!="undefined"&&(d.path=a);return d.path},m=function(a){typeof a!="undefined"&&(e=new Query(a));return e},n=function(a){typeof a!="undefined"&&(d.anchor=a);return d.anchor},o=function(a){f(a);return this},p=function(a){h(a);return this},q=function(a){i(a);return this},r=function(a){j(a);return this},s=function(a){k(a);return this},t=function(a){l(a);return this},u=function(a){m(a);return this},v=function(a){n(a);return this},w=function(a){return m().getParamValue(a)},x=function(a){return m().getParamValues(a)},y=function(a,b){arguments.length===2?m().deleteParam(a,b):m().deleteParam(a);return this},z=function(a,b,c){arguments.length===3?m().addParam(a,b,c):m().addParam(a,b);return this},A=function(a,b,c){arguments.length===3?m().replaceParam(a,b,c):m().replaceParam(a,b);return this},B=function(){var a="",b=function(a){return a!==null&&a!==""};b(f())?(a+=f(),f().indexOf(":")!==f().length-1&&(a+=":"),a+="//"):h()&&b(j())&&(a+="//"),b(i())&&b(j())&&(a+=i(),i().indexOf("@")!==i().length-1&&(a+="@")),b(j())&&(a+=j(),b(k())&&(a+=":"+k())),b(l())?a+=l():b(j())&&(b(m().toString())||b(n()))&&(a+="/"),b(m().toString())&&(m().toString().indexOf("?")!==0&&(a+="?"),a+=m().toString()),b(n())&&(n().indexOf("#")!==0&&(a+="#"),a+=n());return a},C=function(){return new Uri(B())};return{protocol:f,hasAuthorityPrefix:h,userInfo:i,host:j,port:k,path:l,query:m,anchor:n,setProtocol:o,setHasAuthorityPrefix:p,setUserInfo:q,setHost:r,setPort:s,setPath:t,setQuery:u,setAnchor:v,getQueryParamValue:w,getQueryParamValues:x,deleteQueryParam:y,addQueryParam:z,replaceQueryParam:A,toString:B,clone:C}},jsUri=Uri;
(function() {
  window.Spree = (function() {
    function Spree() {}

    Spree.ready = function(callback) {
      return jQuery(document).ready(callback);
    };

    Spree.mountedAt = function() {
      return "/";
    };

    Spree.pathFor = function(path) {
      var locationOrigin;
      locationOrigin = ("" + window.location.protocol + "//" + window.location.hostname) + (window.location.port ? ":" + window.location.port : "");
      return "" + locationOrigin + (this.mountedAt()) + path;
    };

    Spree.url = function(uri, query) {
      if (uri.path === void 0) {
        uri = new Uri(uri);
      }
      if (query) {
        $.each(query, function(key, value) {
          return uri.addQueryParam(key, value);
        });
      }
      return uri;
    };

    Spree.uri = function(uri, query) {
      return url(uri, query);
    };

    Spree.ajax = function(url_or_settings, settings) {
      var url;
      if (typeof url_or_settings === "string") {
        return $.ajax(Spree.url(url_or_settings).toString(), settings);
      } else {
        url = url_or_settings['url'];
        delete url_or_settings['url'];
        return $.ajax(Spree.url(url).toString(), url_or_settings);
      }
    };

    Spree.routes = {
      states_search: Spree.pathFor('api/states'),
      apply_coupon_code: function(order_id) {
        return Spree.pathFor("api/orders/" + order_id + "/apply_coupon_code");
      }
    };

    return Spree;

  })();

}).call(this);
// Generated by CoffeeScript 1.4.0
(function() {
  var $, cardFromNumber, cardFromType, cards, defaultFormat, formatBackCardNumber, formatBackExpiry, formatCardNumber, formatExpiry, formatForwardExpiry, formatForwardSlash, hasTextSelected, luhnCheck, reFormatCardNumber, restrictCVC, restrictCardNumber, restrictExpiry, restrictNumeric, setCardType,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    _this = this;

  $ = jQuery;

  $.payment = {};

  $.payment.fn = {};

  $.fn.payment = function() {
    var args, method;
    method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return $.payment.fn[method].apply(this, args);
  };

  defaultFormat = /(\d{1,4})/g;

  cards = [
    {
      type: 'maestro',
      pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
      format: defaultFormat,
      length: [12, 13, 14, 15, 16, 17, 18, 19],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'dinersclub',
      pattern: /^(36|38|30[0-5])/,
      format: defaultFormat,
      length: [14],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'laser',
      pattern: /^(6706|6771|6709)/,
      format: defaultFormat,
      length: [16, 17, 18, 19],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'jcb',
      pattern: /^35/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'unionpay',
      pattern: /^62/,
      format: defaultFormat,
      length: [16, 17, 18, 19],
      cvcLength: [3],
      luhn: false
    }, {
      type: 'discover',
      pattern: /^(6011|65|64[4-9]|622)/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'mastercard',
      pattern: /^5[1-5]/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'amex',
      pattern: /^3[47]/,
      format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
      length: [15],
      cvcLength: [3, 4],
      luhn: true
    }, {
      type: 'visa',
      pattern: /^4/,
      format: defaultFormat,
      length: [13, 14, 15, 16],
      cvcLength: [3],
      luhn: true
    }
  ];

  cardFromNumber = function(num) {
    var card, _i, _len;
    num = (num + '').replace(/\D/g, '');
    for (_i = 0, _len = cards.length; _i < _len; _i++) {
      card = cards[_i];
      if (card.pattern.test(num)) {
        return card;
      }
    }
  };

  cardFromType = function(type) {
    var card, _i, _len;
    for (_i = 0, _len = cards.length; _i < _len; _i++) {
      card = cards[_i];
      if (card.type === type) {
        return card;
      }
    }
  };

  luhnCheck = function(num) {
    var digit, digits, odd, sum, _i, _len;
    odd = true;
    sum = 0;
    digits = (num + '').split('').reverse();
    for (_i = 0, _len = digits.length; _i < _len; _i++) {
      digit = digits[_i];
      digit = parseInt(digit, 10);
      if ((odd = !odd)) {
        digit *= 2;
      }
      if (digit > 9) {
        digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  hasTextSelected = function($target) {
    var _ref;
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== $target.prop('selectionEnd')) {
      return true;
    }
    if (typeof document !== "undefined" && document !== null ? (_ref = document.selection) != null ? typeof _ref.createRange === "function" ? _ref.createRange().text : void 0 : void 0 : void 0) {
      return true;
    }
    return false;
  };

  reFormatCardNumber = function(e) {
    var _this = this;
    return setTimeout(function() {
      var $target, value;
      $target = $(e.currentTarget);
      value = $target.val();
      value = $.payment.formatCardNumber(value);
      return $target.val(value);
    });
  };

  formatCardNumber = function(e) {
    var $target, card, digit, length, re, upperLength, value;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = $(e.currentTarget);
    value = $target.val();
    card = cardFromNumber(value + digit);
    length = (value.replace(/\D/g, '') + digit).length;
    upperLength = 16;
    if (card) {
      upperLength = card.length[card.length.length - 1];
    }
    if (length >= upperLength) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (card && card.type === 'amex') {
      re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
      re = /(?:^|\s)(\d{4})$/;
    }
    if (re.test(value)) {
      e.preventDefault();
      return $target.val(value + ' ' + digit);
    } else if (re.test(value + digit)) {
      e.preventDefault();
      return $target.val(value + digit + ' ');
    }
  };

  formatBackCardNumber = function(e) {
    var $target, value;
    $target = $(e.currentTarget);
    value = $target.val();
    if (e.meta) {
      return;
    }
    if (e.which !== 8) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (/\d\s$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/\d\s$/, ''));
    } else if (/\s\d?$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/\s\d?$/, ''));
    }
  };

  formatExpiry = function(e) {
    var $target, digit, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = $(e.currentTarget);
    val = $target.val() + digit;
    if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
      e.preventDefault();
      return $target.val("0" + val + " / ");
    } else if (/^\d\d$/.test(val)) {
      e.preventDefault();
      return $target.val("" + val + " / ");
    }
  };

  formatForwardExpiry = function(e) {
    var $target, digit, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = $(e.currentTarget);
    val = $target.val();
    if (/^\d\d$/.test(val)) {
      return $target.val("" + val + " / ");
    }
  };

  formatForwardSlash = function(e) {
    var $target, slash, val;
    slash = String.fromCharCode(e.which);
    if (slash !== '/') {
      return;
    }
    $target = $(e.currentTarget);
    val = $target.val();
    if (/^\d$/.test(val) && val !== '0') {
      return $target.val("0" + val + " / ");
    }
  };

  formatBackExpiry = function(e) {
    var $target, value;
    if (e.meta) {
      return;
    }
    $target = $(e.currentTarget);
    value = $target.val();
    if (e.which !== 8) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (/\d(\s|\/)+$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/\d(\s|\/)*$/, ''));
    } else if (/\s\/\s?\d?$/.test(value)) {
      e.preventDefault();
      return $target.val(value.replace(/\s\/\s?\d?$/, ''));
    }
  };

  restrictNumeric = function(e) {
    var input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  };

  restrictCardNumber = function(e) {
    var $target, card, digit, value;
    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected($target)) {
      return;
    }
    value = ($target.val() + digit).replace(/\D/g, '');
    card = cardFromNumber(value);
    if (card) {
      return value.length <= card.length[card.length.length - 1];
    } else {
      return value.length <= 16;
    }
  };

  restrictExpiry = function(e) {
    var $target, digit, value;
    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected($target)) {
      return;
    }
    value = $target.val() + digit;
    value = value.replace(/\D/g, '');
    if (value.length > 6) {
      return false;
    }
  };

  restrictCVC = function(e) {
    var $target, digit, val;
    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    val = $target.val() + digit;
    return val.length <= 4;
  };

  setCardType = function(e) {
    var $target, allTypes, card, cardType, val;
    $target = $(e.currentTarget);
    val = $target.val();
    cardType = $.payment.cardType(val) || 'unknown';
    if (!$target.hasClass(cardType)) {
      allTypes = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = cards.length; _i < _len; _i++) {
          card = cards[_i];
          _results.push(card.type);
        }
        return _results;
      })();
      $target.removeClass('unknown');
      $target.removeClass(allTypes.join(' '));
      $target.addClass(cardType);
      $target.toggleClass('identified', cardType !== 'unknown');
      return $target.trigger('payment.cardType', cardType);
    }
  };

  $.payment.fn.formatCardCVC = function() {
    this.payment('restrictNumeric');
    this.on('keypress', restrictCVC);
    return this;
  };

  $.payment.fn.formatCardExpiry = function() {
    this.payment('restrictNumeric');
    this.on('keypress', restrictExpiry);
    this.on('keypress', formatExpiry);
    this.on('keypress', formatForwardSlash);
    this.on('keypress', formatForwardExpiry);
    this.on('keydown', formatBackExpiry);
    return this;
  };

  $.payment.fn.formatCardNumber = function() {
    this.payment('restrictNumeric');
    this.on('keypress', restrictCardNumber);
    this.on('keypress', formatCardNumber);
    this.on('keydown', formatBackCardNumber);
    this.on('keyup', setCardType);
    this.on('paste', reFormatCardNumber);
    return this;
  };

  $.payment.fn.restrictNumeric = function() {
    this.on('keypress', restrictNumeric);
    return this;
  };

  $.payment.fn.cardExpiryVal = function() {
    return $.payment.cardExpiryVal($(this).val());
  };

  $.payment.cardExpiryVal = function(value) {
    var month, prefix, year, _ref;
    value = value.replace(/\s/g, '');
    _ref = value.split('/', 2), month = _ref[0], year = _ref[1];
    if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
      prefix = (new Date).getFullYear();
      prefix = prefix.toString().slice(0, 2);
      year = prefix + year;
    }
    month = parseInt(month, 10);
    year = parseInt(year, 10);
    return {
      month: month,
      year: year
    };
  };

  $.payment.validateCardNumber = function(num) {
    var card, _ref;
    num = (num + '').replace(/\s+|-/g, '');
    if (!/^\d+$/.test(num)) {
      return false;
    }
    card = cardFromNumber(num);
    if (!card) {
      return false;
    }
    return (_ref = num.length, __indexOf.call(card.length, _ref) >= 0) && (card.luhn === false || luhnCheck(num));
  };

  $.payment.validateCardExpiry = function(month, year) {
    var currentTime, expiry, prefix, _ref;
    if (typeof month === 'object' && 'month' in month) {
      _ref = month, month = _ref.month, year = _ref.year;
    }
    if (!(month && year)) {
      return false;
    }
    month = $.trim(month);
    year = $.trim(year);
    if (!/^\d+$/.test(month)) {
      return false;
    }
    if (!/^\d+$/.test(year)) {
      return false;
    }
    if (!(parseInt(month, 10) <= 12)) {
      return false;
    }
    if (year.length === 2) {
      prefix = (new Date).getFullYear();
      prefix = prefix.toString().slice(0, 2);
      year = prefix + year;
    }
    expiry = new Date(year, month);
    currentTime = new Date;
    expiry.setMonth(expiry.getMonth() - 1);
    expiry.setMonth(expiry.getMonth() + 1, 1);
    return expiry > currentTime;
  };

  $.payment.validateCardCVC = function(cvc, type) {
    var _ref, _ref1;
    cvc = $.trim(cvc);
    if (!/^\d+$/.test(cvc)) {
      return false;
    }
    if (type) {
      return _ref = cvc.length, __indexOf.call((_ref1 = cardFromType(type)) != null ? _ref1.cvcLength : void 0, _ref) >= 0;
    } else {
      return cvc.length >= 3 && cvc.length <= 4;
    }
  };

  $.payment.cardType = function(num) {
    var _ref;
    if (!num) {
      return null;
    }
    return ((_ref = cardFromNumber(num)) != null ? _ref.type : void 0) || null;
  };

  $.payment.formatCardNumber = function(num) {
    var card, groups, upperLength, _ref;
    card = cardFromNumber(num);
    if (!card) {
      return num;
    }
    upperLength = card.length[card.length.length - 1];
    num = num.replace(/\D/g, '');
    num = num.slice(0, +upperLength + 1 || 9e9);
    if (card.format.global) {
      return (_ref = num.match(card.format)) != null ? _ref.join(' ') : void 0;
    } else {
      groups = card.format.exec(num);
      if (groups != null) {
        groups.shift();
      }
      return groups != null ? groups.join(' ') : void 0;
    }
  };

}).call(this);
(function() {
  Spree.disableSaveOnClick = function() {
    return ($('form.edit_order')).submit(function() {
      return ($(this)).find(':submit, :image').attr('disabled', true).removeClass('primary').addClass('disabled');
    });
  };

  Spree.ready(function($) {
    return Spree.Checkout = {};
  });

}).call(this);
(function() {
  Spree.ready(function($) {
    Spree.onAddress = function() {
      var getCountryId, order_use_billing, update_shipping_form_state;
      if (($('#checkout_form_address')).is('*')) {
        ($('#checkout_form_address')).validate();
        getCountryId = function(region) {
          return $('#' + region + 'country select').val();
        };
        Spree.updateState = function(region) {
          var countryId;
          countryId = getCountryId(region);
          if (countryId != null) {
            if (Spree.Checkout[countryId] == null) {
              return $.get(Spree.routes.states_search, {
                country_id: countryId
              }, function(data) {
                Spree.Checkout[countryId] = {
                  states: data.states,
                  states_required: data.states_required
                };
                return Spree.fillStates(Spree.Checkout[countryId], region);
              });
            } else {
              return Spree.fillStates(Spree.Checkout[countryId], region);
            }
          }
        };
        Spree.fillStates = function(data, region) {
          var selected, stateInput, statePara, stateSelect, stateSpanRequired, states, statesRequired, statesWithBlank;
          statesRequired = data.states_required;
          states = data.states;
          statePara = $('#' + region + 'state');
          stateSelect = statePara.find('select');
          stateInput = statePara.find('input');
          stateSpanRequired = statePara.find('state-required');
          if (states.length > 0) {
            selected = parseInt(stateSelect.val());
            stateSelect.html('');
            statesWithBlank = [
              {
                name: '',
                id: ''
              }
            ].concat(states);
            $.each(statesWithBlank, function(idx, state) {
              var opt;
              opt = ($(document.createElement('option'))).attr('value', state.id).html(state.name);
              if (selected === state.id) {
                opt.prop('selected', true);
              }
              return stateSelect.append(opt);
            });
            stateSelect.prop('disabled', false).show();
            stateInput.hide().prop('disabled', true);
            statePara.show();
            stateSpanRequired.show();
            if (statesRequired) {
              stateSelect.addClass('required');
            }
            stateSelect.removeClass('hidden');
            return stateInput.removeClass('required');
          } else {
            stateSelect.hide().prop('disabled', true);
            stateInput.show();
            if (statesRequired) {
              stateSpanRequired.show();
              stateInput.addClass('required');
            } else {
              stateInput.val('');
              stateSpanRequired.hide();
              stateInput.removeClass('required');
            }
            statePara.toggle(!!statesRequired);
            stateInput.prop('disabled', !statesRequired);
            stateInput.removeClass('hidden');
            return stateSelect.removeClass('required');
          }
        };
        ($('#bcountry select')).change(function() {
          return Spree.updateState('b');
        });
        ($('#scountry select')).change(function() {
          return Spree.updateState('s');
        });
        Spree.updateState('b');
        order_use_billing = $('input#order_use_billing');
        order_use_billing.change(function() {
          return update_shipping_form_state(order_use_billing);
        });
        update_shipping_form_state = function(order_use_billing) {
          if (order_use_billing.is(':checked')) {
            ($('#shipping .inner')).hide();
            return ($('#shipping .inner input, #shipping .inner select')).prop('disabled', true);
          } else {
            ($('#shipping .inner')).show();
            ($('#shipping .inner input, #shipping .inner select')).prop('disabled', false);
            return Spree.updateState('s');
          }
        };
        return update_shipping_form_state(order_use_billing);
      }
    };
    return Spree.onAddress();
  });

}).call(this);
(function() {
  Spree.ready(function($) {
    Spree.onPayment = function() {
      if (($('#checkout_form_payment')).is('*')) {
        if (($('#existing_cards')).is('*')) {
          ($('#payment-method-fields')).hide();
          ($('#payment-methods')).hide();
          ($('#use_existing_card_yes')).click(function() {
            ($('#payment-method-fields')).hide();
            ($('#payment-methods')).hide();
            return ($('.existing-cc-radio')).prop("disabled", false);
          });
          ($('#use_existing_card_no')).click(function() {
            ($('#payment-method-fields')).show();
            ($('#payment-methods')).show();
            return ($('.existing-cc-radio')).prop("disabled", true);
          });
        }
        $(".cardNumber").payment('formatCardNumber');
        $(".cardExpiry").payment('formatCardExpiry');
        $(".cardCode").payment('formatCardCVC');
        $(".cardNumber").change(function() {
          return $(this).parent().siblings(".ccType").val($.payment.cardType(this.value));
        });
        ($('input[type="radio"][name="order[payments_attributes][][payment_method_id]"]')).click(function() {
          ($('#payment-methods li')).hide();
          if (this.checked) {
            return ($('#payment_method_' + this.value)).show();
          }
        });
        ($(document)).on('click', '#cvv_link', function(event) {
          var windowName, windowOptions;
          windowName = 'cvv_info';
          windowOptions = 'left=20,top=20,width=500,height=500,toolbar=0,resizable=0,scrollbars=1';
          window.open(($(this)).attr('href'), windowName, windowOptions);
          return event.preventDefault();
        });
        ($('input[type="radio"]:checked')).click();
        return $('#checkout_form_payment').submit(function() {
          var coupon_code, coupon_code_field, coupon_status, url;
          coupon_code_field = $('#order_coupon_code');
          coupon_code = $.trim(coupon_code_field.val());
          if (coupon_code !== '') {
            if ($('#coupon_status').length === 0) {
              coupon_status = $("<div id='coupon_status'></div>");
              coupon_code_field.parent().append(coupon_status);
            } else {
              coupon_status = $("#coupon_status");
            }
            url = Spree.url(Spree.routes.apply_coupon_code(Spree.current_order_id), {
              order_token: Spree.current_order_token,
              coupon_code: coupon_code
            });
            coupon_status.removeClass();
            return $.ajax({
              async: false,
              method: "PUT",
              url: url,
              success: function(data) {
                coupon_code_field.val('');
                coupon_status.addClass("success").html("Coupon code applied successfully.");
                return true;
              },
              error: function(xhr) {
                var handler;
                handler = JSON.parse(xhr.responseText);
                coupon_status.addClass("error").html(handler["error"]);
                $('.continue').attr('disabled', false);
                return false;
              }
            });
          }
        });
      }
    };
    return Spree.onPayment();
  });

}).call(this);
(function() {
  $(function() {
    var radios, selectedRadio;
    Spree.addImageHandlers = function() {
      var thumbnails;
      thumbnails = $('#product-images ul.thumbnails');
      ($('#main-image')).data('selectedThumb', ($('#main-image img')).attr('src'));
      thumbnails.find('li').eq(0).addClass('selected');
      thumbnails.find('a').on('click', function(event) {
        ($('#main-image')).data('selectedThumb', ($(event.currentTarget)).attr('href'));
        ($('#main-image')).data('selectedThumbId', ($(event.currentTarget)).parent().attr('id'));
        ($(this)).mouseout(function() {
          thumbnails.find('li').removeClass('selected');
          return ($(event.currentTarget)).parent('li').addClass('selected');
        });
        return false;
      });
      thumbnails.find('li').on('mouseenter', function(event) {
        return ($('#main-image img')).attr('src', ($(event.currentTarget)).find('a').attr('href'));
      });
      return thumbnails.find('li').on('mouseleave', function(event) {
        return ($('#main-image img')).attr('src', ($('#main-image')).data('selectedThumb'));
      });
    };
    Spree.showVariantImages = function(variantId) {
      var currentThumb, newImg, thumb;
      ($('li.vtmb')).hide();
      ($('li.tmb-' + variantId)).show();
      currentThumb = $('#' + ($('#main-image')).data('selectedThumbId'));
      if (!currentThumb.hasClass('vtmb-' + variantId)) {
        thumb = $(($('#product-images ul.thumbnails li:visible.vtmb')).eq(0));
        if (!(thumb.length > 0)) {
          thumb = $(($('#product-images ul.thumbnails li:visible')).eq(0));
        }
        newImg = thumb.find('a').attr('href');
        ($('#product-images ul.thumbnails li')).removeClass('selected');
        thumb.addClass('selected');
        ($('#main-image img')).attr('src', newImg);
        ($('#main-image')).data('selectedThumb', newImg);
        return ($('#main-image')).data('selectedThumbId', thumb.attr('id'));
      }
    };
    Spree.updateVariantPrice = function(variant) {
      var variantPrice;
      variantPrice = variant.data('price');
      if (variantPrice) {
        return ($('.price.selling')).text(variantPrice);
      }
    };
    radios = $('#product-variants input[type="radio"]');
    if (radios.length > 0) {
      selectedRadio = $('#product-variants input[type="radio"][checked="checked"]');
      Spree.showVariantImages(selectedRadio.attr('value'));
      Spree.updateVariantPrice(selectedRadio);
    }
    Spree.addImageHandlers();
    return radios.click(function(event) {
      Spree.showVariantImages(this.value);
      return Spree.updateVariantPrice($(this));
    });
  });

}).call(this);
(function() {
  Spree.ready(function($) {
    if (($('form#update-cart')).is('*')) {
      ($('form#update-cart a.delete')).show().one('click', function() {
        ($(this)).parents('.line-item').first().find('input.line_item_quantity').val(0);
        ($(this)).parents('form').first().submit();
        return false;
      });
    }
    return ($('form#update-cart')).submit(function() {
      return ($('form#update-cart #update-button')).attr('disabled', true);
    });
  });

  Spree.fetch_cart = function() {
    return $.ajax({
      url: Spree.pathFor("cart_link"),
      success: function(data) {
        return $('#link-to-cart').html(data);
      }
    });
  };

}).call(this);





// Placeholder manifest file.
// the installer will append this file to the app vendored assets here: vendor/assets/javascripts/spree/frontend/all.js'
;
// Placeholder manifest file.
// the installer will append this file to the app vendored assets here: vendor/assets/javascripts/spree/frontend/all.js'
;
/*


   Magic Zoom Plus v4.5.39 
   Copyright 2014 Magic Toolbox
   Buy a license: www.magictoolbox.com/magiczoomplus/
   License agreement: http://www.magictoolbox.com/license/


*/

eval(function(m,a,g,i,c,k){c=function(e){return(e<a?'':c(parseInt(e/a)))+((e=e%a)>35?String.fromCharCode(e+29):e.toString(36))};if(!''.replace(/^/,String)){while(g--){k[c(g)]=i[g]||c(g)}i=[function(e){return k[e]}];c=function(){return'\\w+'};g=1};while(g--){if(i[g]){m=m.replace(new RegExp('\\b'+c(g)+'\\b','g'),i[g])}}return m}('(R(){if(1f.6w){S}V b={3I:"dC.7.4",er:0,5Z:{},$bi:R(d){S(d.$4B||(d.$4B=++a.er))},9c:R(d){S(a.5Z[d]||(a.5Z[d]={}))},$F:R(){},$12:R(){S 12},2Q:R(d){S(1H!=d)},eC:R(d){S!!(d)},2J:R(d){if(!a.2Q(d)){S 12}if(d.$4j){S d.$4j}if(!!d.5w){if(1==d.5w){S"9a"}if(3==d.5w){S"bz"}}if(d.1A&&d.9m){S"eE"}if(d.1A&&d.8H){S"2j"}if((d 4A 1f.ew||d 4A 1f.bu)&&d.4O===a.4P){S"6q"}if(d 4A 1f.5b){S"5O"}if(d 4A 1f.bu){S"R"}if(d 4A 1f.8y){S"6g"}if(a.1a.2M){if(a.2Q(d.dd)){S"3k"}}1i{if(d===1f.3k||d.4O==1f.9X||d.4O==1f.f1||d.4O==1f.f2||d.4O==1f.eF||d.4O==1f.eK){S"3k"}}if(d 4A 1f.cu){S"bx"}if(d 4A 1f.4U){S"eG"}if(d===1f){S"1f"}if(d===1n){S"1n"}S 4l(d)},1Y:R(j,h){if(!(j 4A 1f.5b)){j=[j]}1K(V g=0,e=j.1A;g<e;g++){if(!a.2Q(j)){66}1K(V f in(h||{})){3a{j[g][f]=h[f]}3l(d){}}}S j[0]},8N:R(h,g){if(!(h 4A 1f.5b)){h=[h]}1K(V f=0,d=h.1A;f<d;f++){if(!a.2Q(h[f])){66}if(!h[f].2X){66}1K(V e in(g||{})){if(!h[f].2X[e]){h[f].2X[e]=g[e]}}}S h[0]},cN:R(f,e){if(!a.2Q(f)){S f}1K(V d in(e||{})){if(!f[d]){f[d]=e[d]}}S f},$3a:R(){1K(V f=0,d=2j.1A;f<d;f++){3a{S 2j[f]()}3l(g){}}S 1b},$A:R(f){if(!a.2Q(f)){S $X([])}if(f.dS){S $X(f.dS())}if(f.9m){V e=f.1A||0,d=1t 5b(e);3K(e--){d[e]=f[e]}S $X(d)}S $X(5b.2X.f4.21(f))},35:R(){S 1t cu().g9()},3V:R(h){V f;2s(a.2J(h)){1p"b4":f={};1K(V g in h){f[g]=a.3V(h[g])}1q;1p"5O":f=[];1K(V e=0,d=h.1A;e<d;e++){f[e]=a.3V(h[e])}1q;2r:S h}S a.$(f)},$:R(e){if(!a.2Q(e)){S 1b}if(e.$bo){S e}2s(a.2J(e)){1p"5O":e=a.cN(e,a.1Y(a.5b,{$bo:a.$F}));e.3c=e.3S;e.4H=a.5b.4H;S e;1q;1p"6g":V d=1n.by(e);if(a.2Q(d)){S a.$(d)}S 1b;1q;1p"1f":1p"1n":a.$bi(e);e=a.1Y(e,a.6B);1q;1p"9a":a.$bi(e);e=a.1Y(e,a.3t);1q;1p"3k":e=a.1Y(e,a.9X);1q;1p"bz":S e;1q;1p"R":1p"5O":1p"bx":2r:1q}S a.1Y(e,{$bo:a.$F})},$1t:R(d,f,e){S $X(a.2P.48(d)).cB(f||{}).1g(e||{})},gj:R(e){if(1n.9v&&1n.9v.1A){1n.9v[0].b0(e,0)}1i{V d=$X(1n.48("1M"));d.31(e);1n.6C("8F")[0].2B(d)}}};V a=b;1f.6w=b;1f.$X=b.$;a.5b={$4j:"5O",4x:R(g,h){V d=Q.1A;1K(V e=Q.1A,f=(h<0)?1v.3B(0,e+h):h||0;f<e;f++){if(Q[f]===g){S f}}S-1},4H:R(d,e){S Q.4x(d,e)!=-1},3S:R(d,g){1K(V f=0,e=Q.1A;f<e;f++){if(f in Q){d.21(g,Q[f],f,Q)}}},2Y:R(d,j){V h=[];1K(V g=0,e=Q.1A;g<e;g++){if(g in Q){V f=Q[g];if(d.21(j,Q[g],g,Q)){h.4q(f)}}}S h},cm:R(d,h){V g=[];1K(V f=0,e=Q.1A;f<e;f++){if(f in Q){g[f]=d.21(h,Q[f],f,Q)}}S g}};a.8N(8y,{$4j:"6g",4k:R(){S Q.2G(/^\\s+|\\s+$/g,"")},eq:R(d,e){S(e||12)?(Q.6b()===d.6b()):(Q.3b().6b()===d.3b().6b())},3e:R(){S Q.2G(/-\\D/g,R(d){S d.e5(1).gk()})},6r:R(){S Q.2G(/[A-Z]/g,R(d){S("-"+d.e5(0).3b())})},1R:R(d){S 28(Q,d||10)},bF:R(){S 46(Q)},6P:R(){S!Q.2G(/1c/i,"").4k()},3o:R(e,d){d=d||"";S(d+Q+d).4x(d+e+d)>-1}});b.8N(bu,{$4j:"R",1o:R(){V e=a.$A(2j),d=Q,f=e.7w();S R(){S d.4Z(f||1b,e.e6(a.$A(2j)))}},2q:R(){V e=a.$A(2j),d=Q,f=e.7w();S R(g){S d.4Z(f||1b,$X([g||1f.3k]).e6(e))}},2A:R(){V e=a.$A(2j),d=Q,f=e.7w();S 1f.65(R(){S d.4Z(d,e)},f||0)},dI:R(){V e=a.$A(2j),d=Q;S R(){S d.2A.4Z(d,e)}},dD:R(){V e=a.$A(2j),d=Q,f=e.7w();S 1f.gn(R(){S d.4Z(d,e)},f||0)}});V c=b1.fn.3b();a.1a={8J:{bC:!!(1n.fm),fl:!!(1f.ft),aC:!!(1n.fs)},3F:R(){S"fr"in 1f||(1f.dp&&1n 4A dp)}(),fa:c.3w(/e0|f9|fd|fe\\/|fg|ff|fv|fM|fG|fy|fC|ip(dU|dX|ad)|fD|fE|fB |fA|fw|fx|fz|dh m(fF|in)i|fN( fO)?|dc|p(fP|fL)\\/|fH|fI|fJ|fK|fu|fh\\.(1a|5J)|fi|fb|fc (ce|dc)|fj|fk/)?1c:12,4M:(1f.dh)?"7M":!!(1f.fq)?"2M":(1H!=1n.fp||1b!=1f.fo)?"aA":(1b!=1f.fQ||!b1.fR)?"3g":"gl",3I:"",3E:0,9K:c.3w(/ip(?:ad|dX|dU)/)?"cL":(c.3w(/(?:gm|e0)/)||b1.9K.3w(/cl|5r|gf/i)||["gg"])[0].3b(),3L:1n.95&&"bT"==1n.95.3b(),4s:R(){S(1n.95&&"bT"==1n.95.3b())?1n.2k:1n.8f},6o:1f.6o||1f.gh||1f.gi||1f.go||1f.gp||1H,96:1f.96||1f.bO||1f.bO||1f.gx||1f.gy||1f.gz||1H,1N:12,3T:R(){if(a.1a.1N){S}a.1a.1N=1c;a.2k=$X(1n.2k);a.5r=$X(1f);(R(){a.1a.6H={4n:12,3f:""};if(4l 1n.2k.1M.cy!=="1H"){a.1a.6H.4n=1c}1i{V f="c6 c7 O 9q c8".4t(" ");1K(V e=0,d=f.1A;e<d;e++){a.1a.6H.3f=f[e];if(4l 1n.2k.1M[a.1a.6H.3f+"gw"]!=="1H"){a.1a.6H.4n=1c;1q}}}})();(R(){a.1a.7B={4n:12,3f:""};if(4l 1n.2k.1M.gv!=="1H"){a.1a.7B.4n=1c}1i{V f="c6 c7 O 9q c8".4t(" ");1K(V e=0,d=f.1A;e<d;e++){a.1a.7B.3f=f[e];if(4l 1n.2k.1M[a.1a.7B.3f+"gq"]!=="1H"){a.1a.7B.4n=1c;1q}}}})();$X(1n).eh("59")}};(R(){R d(){S!!(2j.8H.ap)}a.1a.3I=("7M"==a.1a.4M)?!!(1n.8F)?gr:!!(1f.gs)?gu:!!(1f.d4)?6W:(a.1a.8J.aC)?ge:((d())?gd:((1n.7S)?fY:5g)):("2M"==a.1a.4M)?!!(1f.fZ||1f.g0)?cX:!!(1f.bD&&1f.f8)?6:((1f.bD)?5:4):("3g"==a.1a.4M)?((a.1a.8J.bC)?((a.1a.8J.aC)?g1:dy):fX):("aA"==a.1a.4M)?!!(1n.8F)?5g:!!1n.6I?fW:!!(1f.d4)?fS:((1n.7S)?fT:fU):"";a.1a[a.1a.4M]=a.1a[a.1a.4M+a.1a.3I]=1c;if(1f.d0){a.1a.d0=1c}a.1a.3E=(!a.1a.2M)?0:(1n.cV)?1n.cV:R(){V e=0;if(a.1a.3L){S 5}2s(a.1a.3I){1p 4:e=6;1q;1p 5:e=7;1q;1p 6:e=8;1q;1p cX:e=9;1q}S e}()})();(R(){a.1a.3m={4n:12,8P:R(){S 12},9Y:R(){},cd:R(){},cY:"",cF:"",3f:""};if(4l 1n.cf!="1H"){a.1a.3m.4n=1c}1i{V f="3g c9 o 9q fV".4t(" ");1K(V e=0,d=f.1A;e<d;e++){a.1a.3m.3f=f[e];if(4l 1n[a.1a.3m.3f+"cg"]!="1H"){a.1a.3m.4n=1c;1q}}}if(a.1a.3m.4n){a.1a.3m.cY=a.1a.3m.3f+"g2";a.1a.3m.cF=a.1a.3m.3f+"g3";a.1a.3m.8P=R(){2s(Q.3f){1p"":S 1n.3m;1p"3g":S 1n.ga;2r:S 1n[Q.3f+"gb"]}};a.1a.3m.9Y=R(g){S(Q.3f==="")?g.eb():g[Q.3f+"gc"]()};a.1a.3m.cd=R(g){S(Q.3f==="")?1n.cf():1n[Q.3f+"cg"]()}}})();a.3t={5v:R(d){S Q.2Z.3o(d," ")},2l:R(d){if(d&&!Q.5v(d)){Q.2Z+=(Q.2Z?" ":"")+d}S Q},5h:R(d){d=d||".*";Q.2Z=Q.2Z.2G(1t 4U("(^|\\\\s)"+d+"(?:\\\\s|$)"),"$1").4k();S Q},g8:R(d){S Q.5v(d)?Q.5h(d):Q.2l(d)},1O:R(f){f=(f=="4X"&&Q.7h)?"aM":f.3e();V d=1b,e=1b;if(Q.7h){d=Q.7h[f]}1i{if(1n.aw&&1n.aw.cz){e=1n.aw.cz(Q,1b);d=e?e.g4([f.6r()]):1b}}if(!d){d=Q.1M[f]}if("1C"==f){S a.2Q(d)?46(d):1}if(/^(2p(9J|9H|9G|9E)ch)|((24|1X)(9J|9H|9G|9E))$/.1P(f)){d=28(d)?d:"1V"}S("1D"==d?1b:d)},1F:R(f,d){3a{if("1C"==f){Q.2D(d);S Q}1i{if("4X"==f){Q.1M[("1H"===4l(Q.1M.aM))?"g5":"aM"]=d;S Q}1i{if(a.1a.6H&&/cy/.1P(f)){}}}Q.1M[f.3e()]=d+(("6d"==a.2J(d)&&!$X(["2y","1r"]).4H(f.3e()))?"1z":"")}3l(g){}S Q},1g:R(e){1K(V d in e){Q.1F(d,e[d])}S Q},4y:R(){V d={};a.$A(2j).3c(R(e){d[e]=Q.1O(e)},Q);S d},2D:R(h,e){e=e||12;h=46(h);if(e){if(h==0){if("1W"!=Q.1M.2V){Q.1M.2V="1W"}}1i{if("4G"!=Q.1M.2V){Q.1M.2V="4G"}}}if(a.1a.2M){if(!Q.7h||!Q.7h.g6){Q.1M.1r=1}3a{V g=Q.g7.9m("cw.cv.cC");g.8P=(1!=h);g.1C=h*1Q}3l(d){Q.1M.2Y+=(1==h)?"":"gA:cw.cv.cC(8P=1c,1C="+h*1Q+")"}}Q.1M.1C=h;S Q},cB:R(d){1K(V e in d){Q.eB(e,""+d[e])}S Q},1T:R(){S Q.1g({2h:"2S",2V:"1W"})},2d:R(){S Q.1g({2h:"2t",2V:"4G"})},1I:R(){S{U:Q.bM,W:Q.bs}},7x:R(){S{19:Q.4R,17:Q.6h}},ey:R(){V d=Q,e={19:0,17:0};do{e.17+=d.6h||0;e.19+=d.4R||0;d=d.1U}3K(d);S e},3i:R(){if(a.2Q(1n.8f.ck)){V d=Q.ck(),f=$X(1n).7x(),h=a.1a.4s();S{19:d.19+f.y-h.eZ,17:d.17+f.x-h.eY}}V g=Q,e=t=0;do{e+=g.eX||0;t+=g.eV||0;g=g.f0}3K(g&&!(/^(?:2k|f5)$/i).1P(g.41));S{19:t,17:e}},3M:R(){V e=Q.3i();V d=Q.1I();S{19:e.19,1k:e.19+d.W,17:e.17,1m:e.17+d.U}},7r:R(f){3a{Q.8Z=f}3l(d){Q.eU=f}S Q},4d:R(){S(Q.1U)?Q.1U.4u(Q):Q},5X:R(){a.$A(Q.eL).3c(R(d){if(3==d.5w||8==d.5w){S}$X(d).5X()});Q.4d();Q.bd();if(Q.$4B){a.5Z[Q.$4B]=1b;3H a.5Z[Q.$4B]}S 1b},4T:R(g,e){e=e||"1k";V d=Q.2R;("19"==e&&d)?Q.92(g,d):Q.2B(g);S Q},2a:R(f,e){V d=$X(f).4T(Q,e);S Q},bK:R(d){Q.4T(d.1U.8e(Q,d));S Q},69:R(d){if("9a"!==a.2J("6g"==a.2J(d)?d=1n.by(d):d)){S 12}S(Q==d)?12:(Q.4H&&!(a.1a.c5))?(Q.4H(d)):(Q.bv)?!!(Q.bv(d)&16):a.$A(Q.2F(d.41)).4H(d)}};a.3t.79=a.3t.1O;a.3t.eJ=a.3t.1g;if(!1f.3t){1f.3t=a.$F;if(a.1a.4M.3g){1f.1n.48("eH")}1f.3t.2X=(a.1a.4M.3g)?1f["[[eM.2X]]"]:{}}a.8N(1f.3t,{$4j:"9a"});a.6B={1I:R(){if(a.1a.eN||a.1a.c5){S{U:1f.9g,W:1f.9h}}S{U:a.1a.4s().eS,W:a.1a.4s().eR}},7x:R(){S{x:1f.eT||a.1a.4s().6h,y:1f.eP||a.1a.4s().4R}},b6:R(){V d=Q.1I();S{U:1v.3B(a.1a.4s().eO,d.U),W:1v.3B(a.1a.4s().eQ,d.W)}}};a.1Y(1n,{$4j:"1n"});a.1Y(1f,{$4j:"1f"});a.1Y([a.3t,a.6B],{1e:R(g,e){V d=a.9c(Q.$4B),f=d[g];if(1H!=e&&1H==f){f=d[g]=e}S(a.2Q(f)?f:1b)},1G:R(f,e){V d=a.9c(Q.$4B);d[f]=e;S Q},93:R(e){V d=a.9c(Q.$4B);3H d[e];S Q}});if(!(1f.9Z&&1f.9Z.2X&&1f.9Z.2X.7S)){a.1Y([a.3t,a.6B],{7S:R(d){S a.$A(Q.6C("*")).2Y(R(g){3a{S(1==g.5w&&g.2Z.3o(d," "))}3l(f){}})}})}a.1Y([a.3t,a.6B],{eI:R(){S Q.7S(2j[0])},2F:R(){S Q.6C(2j[0])}});if(a.1a.3m.4n){a.3t.eb=R(){a.1a.3m.9Y(Q)}}a.9X={$4j:"3k",1u:R(){if(Q.dr){Q.dr()}1i{Q.dd=1c}if(Q.aF){Q.aF()}1i{Q.f3=12}S Q},4Y:R(){V e,d;e=((/5t/i).1P(Q.2o))?Q.4r[0]:Q;S(!a.2Q(e))?{x:0,y:0}:{x:e.f6||e.5V+a.1a.4s().6h,y:e.eW||e.5K+a.1a.4s().4R}},5m:R(){V d=Q.f7||Q.ev;3K(d&&3==d.5w){d=d.1U}S d},4f:R(){V e=1b;2s(Q.2o){1p"26":e=Q.dB||Q.eu;1q;1p"2T":e=Q.dB||Q.ex;1q;2r:S e}3a{3K(e&&3==e.5w){e=e.1U}}3l(d){e=1b}S e},5s:R(){if(!Q.dL&&Q.8i!==1H){S(Q.8i&1?1:(Q.8i&2?3:(Q.8i&4?2:0)))}S Q.dL}};a.ae="d8";a.ag="eA";a.8m="";if(!1n.d8){a.ae="eD";a.ag="ez";a.8m="57"}a.1Y([a.3t,a.6B],{1y:R(g,f){V i=("59"==g)?12:1c,e=Q.1e("7N",{});e[g]=e[g]||{};if(e[g].5P(f.$7u)){S Q}if(!f.$7u){f.$7u=1v.7E(1v.7J()*a.35())}V d=Q,h=R(j){S f.21(d)};if("59"==g){if(a.1a.1N){f.21(Q);S Q}}if(i){h=R(j){j=a.1Y(j||1f.e,{$4j:"3k"});S f.21(d,$X(j))};Q[a.ae](a.8m+g,h,12)}e[g][f.$7u]=h;S Q},2u:R(g){V i=("59"==g)?12:1c,e=Q.1e("7N");if(!e||!e[g]){S Q}V h=e[g],f=2j[1]||1b;if(g&&!f){1K(V d in h){if(!h.5P(d)){66}Q.2u(g,d)}S Q}f=("R"==a.2J(f))?f.$7u:f;if(!h.5P(f)){S Q}if("59"==g){i=12}if(i){Q[a.ag](a.8m+g,h[f],12)}3H h[f];S Q},eh:R(h,f){V m=("59"==h)?12:1c,l=Q,j;if(!m){V g=Q.1e("7N");if(!g||!g[h]){S Q}V i=g[h];1K(V d in i){if(!i.5P(d)){66}i[d].21(Q)}S Q}if(l===1n&&1n.8v&&!l.dE){l=1n.8f}if(1n.8v){j=1n.8v(h);j.i1(f,1c,1c)}1i{j=1n.i0();j.hY=h}if(1n.8v){l.dE(j)}1i{l.hZ("57"+f,j)}S j},bd:R(){V d=Q.1e("7N");if(!d){S Q}1K(V e in d){Q.2u(e)}Q.93("7N");S Q}});(R(){if("6G"===1n.6I){S a.1a.3T.2A(1)}if(a.1a.3g&&a.1a.3I<dy){(R(){($X(["i5","6G"]).4H(1n.6I))?a.1a.3T():2j.8H.2A(50)})()}1i{if(a.1a.2M&&a.1a.3E<9&&1f==19){(R(){(a.$3a(R(){a.1a.4s().ia("17");S 1c}))?a.1a.3T():2j.8H.2A(50)})()}1i{$X(1n).1y("ib",a.1a.3T);$X(1f).1y("2K",a.1a.3T)}}})();a.4P=R(){V h=1b,e=a.$A(2j);if("6q"==a.2J(e[0])){h=e.7w()}V d=R(){1K(V l in Q){Q[l]=a.3V(Q[l])}if(Q.4O.$3J){Q.$3J={};V o=Q.4O.$3J;1K(V n in o){V j=o[n];2s(a.2J(j)){1p"R":Q.$3J[n]=a.4P.dv(Q,j);1q;1p"b4":Q.$3J[n]=a.3V(j);1q;1p"5O":Q.$3J[n]=a.3V(j);1q}}}V i=(Q.42)?Q.42.4Z(Q,2j):Q;3H Q.ap;S i};if(!d.2X.42){d.2X.42=a.$F}if(h){V g=R(){};g.2X=h.2X;d.2X=1t g;d.$3J={};1K(V f in h.2X){d.$3J[f]=h.2X[f]}}1i{d.$3J=1b}d.4O=a.4P;d.2X.4O=d;a.1Y(d.2X,e[0]);a.1Y(d,{$4j:"6q"});S d};b.4P.dv=R(d,e){S R(){V g=Q.ap;V f=e.4Z(d,2j);S f}};a.5r=$X(1f);a.2P=$X(1n)})();(R(b){if(!b){7s"8x 8d 9d";S}if(b.22){S}V a=b.$;b.22=1t b.4P({T:{4L:60,36:8S,4E:R(c){S-(1v.a0(1v.ak*c)-1)/2},7c:b.$F,3Z:b.$F,7Y:b.$F,aL:b.$F,7D:12,d9:1c},4c:1b,42:R(d,c){Q.el=a(d);Q.T=b.1Y(Q.T,c);Q.51=12},1B:R(c){Q.4c=c;Q.1J=0;Q.i6=0;Q.9Q=b.35();Q.dF=Q.9Q+Q.T.36;Q.9V=Q.9W.1o(Q);Q.T.7c.21();if(!Q.T.7D&&b.1a.6o){Q.51=b.1a.6o.21(1f,Q.9V)}1i{Q.51=Q.9W.1o(Q).dD(1v.4W(at/Q.T.4L))}S Q},9R:R(){if(Q.51){if(!Q.T.7D&&b.1a.6o&&b.1a.96){b.1a.96.21(1f,Q.51)}1i{i7(Q.51)}Q.51=12}},1u:R(c){c=b.2Q(c)?c:12;Q.9R();if(c){Q.6O(1);Q.T.3Z.2A(10)}S Q},87:R(e,d,c){S(d-e)*c+e},9W:R(){V d=b.35();if(d>=Q.dF){Q.9R();Q.6O(1);Q.T.3Z.2A(10);S Q}V c=Q.T.4E((d-Q.9Q)/Q.T.36);if(!Q.T.7D&&b.1a.6o){Q.51=b.1a.6o.21(1f,Q.9V)}Q.6O(c)},6O:R(c){V d={};1K(V e in Q.4c){if("1C"===e){d[e]=1v.4W(Q.87(Q.4c[e][0],Q.4c[e][1],c)*1Q)/1Q}1i{d[e]=Q.87(Q.4c[e][0],Q.4c[e][1],c);if(Q.T.d9){d[e]=1v.4W(d[e])}}}Q.T.7Y(d);Q.7Q(d);Q.T.aL(d)},7Q:R(c){S Q.el.1g(c)}});b.22.3n={4F:R(c){S c},dn:R(c){S-(1v.a0(1v.ak*c)-1)/2},hW:R(c){S 1-b.22.3n.dn(1-c)},dj:R(c){S 1v.3y(2,8*(c-1))},hM:R(c){S 1-b.22.3n.dj(1-c)},ei:R(c){S 1v.3y(c,2)},hN:R(c){S 1-b.22.3n.ei(1-c)},ec:R(c){S 1v.3y(c,3)},hK:R(c){S 1-b.22.3n.ec(1-c)},en:R(d,c){c=c||1.hO;S 1v.3y(d,2)*((c+1)*d-c)},hP:R(d,c){S 1-b.22.3n.en(1-d)},e4:R(d,c){c=c||[];S 1v.3y(2,10*--d)*1v.a0(20*d*1v.ak*(c[0]||1)/3)},hV:R(d,c){S 1-b.22.3n.e4(1-d,c)},bL:R(e){1K(V d=0,c=1;1;d+=c,c/=2){if(e>=(7-4*d)/11){S c*c-1v.3y((11-6*d-11*e)/4,2)}}},hT:R(c){S 1-b.22.3n.bL(1-c)},2S:R(c){S 0}}})(6w);(R(a){if(!a){7s"8x 8d 9d";S}if(!a.22){7s"8x.22 8d 9d";S}if(a.22.bq){S}V b=a.$;a.22.bq=1t a.4P(a.22,{T:{6N:"7A"},42:R(d,c){Q.el=$X(d);Q.T=a.1Y(Q.$3J.T,Q.T);Q.$3J.42(d,c);Q.55=Q.el.1e("5Q:55");Q.55=Q.55||a.$1t("3p").1g(a.1Y(Q.el.4y("1X-19","1X-17","1X-1m","1X-1k","1w","19","4X"),{2z:"1W"})).bK(Q.el);Q.el.1G("5Q:55",Q.55).1g({1X:0})},7A:R(){Q.1X="1X-19";Q.4S="W";Q.6s=Q.el.bs},aQ:R(c){Q.1X="1X-"+(c||"17");Q.4S="U";Q.6s=Q.el.bM},1m:R(){Q.aQ()},17:R(){Q.aQ("1m")},1B:R(e,h){Q[h||Q.T.6N]();V g=Q.el.1O(Q.1X).1R(),f=Q.55.1O(Q.4S).1R(),c={},i={},d;c[Q.1X]=[g,0],c[Q.4S]=[0,Q.6s],i[Q.1X]=[g,-Q.6s],i[Q.4S]=[f,0];2s(e){1p"in":d=c;1q;1p"aY":d=i;1q;1p"9u":d=(0==f)?c:i;1q}Q.$3J.1B(d);S Q},7Q:R(c){Q.el.1F(Q.1X,c[Q.1X]);Q.55.1F(Q.4S,c[Q.4S]);S Q},hS:R(c){S Q.1B("in",c)},ih:R(c){S Q.1B("aY",c)},1T:R(d){Q[d||Q.T.6N]();V c={};c[Q.4S]=0,c[Q.1X]=-Q.6s;S Q.7Q(c)},2d:R(d){Q[d||Q.T.6N]();V c={};c[Q.4S]=Q.6s,c[Q.1X]=0;S Q.7Q(c)},9u:R(c){S Q.1B("9u",c)}})})(6w);(R(b){if(!b){7s"8x 8d 9d";S}if(b.91){S}V a=b.$;b.91=1t b.4P(b.22,{42:R(c,d){Q.aV=c;Q.T=b.1Y(Q.T,d);Q.51=12},1B:R(c){Q.$3J.1B([]);Q.c0=c;S Q},6O:R(c){1K(V d=0;d<Q.aV.1A;d++){Q.el=a(Q.aV[d]);Q.4c=Q.c0[d];Q.$3J.6O(c)}}})})(6w);V 5q=(R(g){V i=g.$;g.$8O=R(j){$X(j).1u();S 12};g.dg=R(j,l,q){V m,k,n,o=[],e=-1;q||(q=g.iB);m=g.$(q)||(1n.8F||1n.2k).2B(g.$1t("1M",{id:q,2o:"cs/a7"}));k=m.iw||m.iv;if("b4"==g.2J(l)){1K(n in l){o.4q(n+":"+l[n])}l=o.7o(";")}if(k.b0){e=k.b0(j+" {"+l+"}",k.im.1A)}1i{e=k.il(j,l)}S e};V c={3I:"c4.5.29",T:{},8M:{1C:50,53:12,b3:40,4L:25,2b:6a,2m:6a,6L:15,2E:"1m",7f:"19",cW:"aD",5o:12,8o:1c,5y:12,6t:12,x:-1,y:-1,6i:12,dl:12,2I:"2K",8Q:1c,5j:"19",8A:"2C",cG:1c,e8:7j,ee:5g,2U:"",1x:1c,4h:"aO",5e:"ab",8k:75,84:"ij",5Y:1c,7t:"9P 1r...",82:"iq",8j:75,aJ:-1,aI:-1,3C:"1E",9A:60,4o:"8R",8q:7j,8a:1c,5R:12,4e:"",cJ:1c,89:12,3d:12,4v:12,8p:"",3T:g.$F},bP:$X([/^(1C)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1C-a5)(\\s+)?:(\\s+)?(1c|12)$/i,/^(8Q\\-8D)(\\s+)?:(\\s+)?(\\d+)$/i,/^(4L)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1r\\-U)(\\s+)?:(\\s+)?(\\d+\\%?)(1z)?/i,/^(1r\\-W)(\\s+)?:(\\s+)?(\\d+\\%?)(1z)?/i,/^(1r\\-iu)(\\s+)?:(\\s+)?(\\d+)(1z)?/i,/^(1r\\-1w)(\\s+)?:(\\s+)?(1m|17|19|1k|5p|3x|#([a-8K-8L\\-:\\.]+))$/i,/^(1r\\-dZ)(\\s+)?:(\\s+)?(1m|17|19|1k|5G)$/i,/^(1r\\-3X\\-3W)(\\s+)?:(\\s+)?(1c|12)$/i,/^(1r\\-1f\\-8U)(\\s+)?:(\\s+)?(aD|cZ|12)$/i,/^(dP\\-6N)(\\s+)?:(\\s+)?(1c|12)$/i,/^(bR\\-57\\-1E)(\\s+)?:(\\s+)?(1c|12)$/i,/^(it\\-2d\\-1r)(\\s+)?:(\\s+)?(1c|12)$/i,/^(is\\-1w)(\\s+)?:(\\s+)?(1c|12)$/i,/^(x)(\\s+)?:(\\s+)?([\\d.]+)(1z)?/i,/^(y)(\\s+)?:(\\s+)?([\\d.]+)(1z)?/i,/^(1E\\-8E\\-5H)(\\s+)?:(\\s+)?(1c|12)$/i,/^(1E\\-8E\\-ir)(\\s+)?:(\\s+)?(1c|12)$/i,/^(af\\-57)(\\s+)?:(\\s+)?(2K|1E|26)$/i,/^(1E\\-8E\\-af)(\\s+)?:(\\s+)?(1c|12)$/i,/^(8Q)(\\s+)?:(\\s+)?(1c|12)$/i,/^(2d\\-2C)(\\s+)?:(\\s+)?(1c|12|19|1k)$/i,/^(2C\\-io)(\\s+)?:(\\s+)?(2C|#([a-8K-8L\\-:\\.]+))$/i,/^(1r\\-5S)(\\s+)?:(\\s+)?(1c|12)$/i,/^(1r\\-5S\\-in\\-8D)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1r\\-5S\\-aY\\-8D)(\\s+)?:(\\s+)?(\\d+)$/i,/^(2U)(\\s+)?:(\\s+)?([a-8K-8L\\-:\\.]+)$/i,/^(1x)(\\s+)?:(\\s+)?(1c|12)/i,/^(1x\\-cs)(\\s+)?:(\\s+)?([^;]*)$/i,/^(1x\\-1C)(\\s+)?:(\\s+)?(\\d+)$/i,/^(1x\\-1w)(\\s+)?:(\\s+)?(ab|bt|bm|bl|br|bc)/i,/^(2d\\-6F)(\\s+)?:(\\s+)?(1c|12)$/i,/^(6F\\-ii)(\\s+)?:(\\s+)?([^;]*)$/i,/^(6F\\-1C)(\\s+)?:(\\s+)?(\\d+)$/i,/^(6F\\-1w\\-x)(\\s+)?:(\\s+)?(\\d+)(1z)?/i,/^(6F\\-1w\\-y)(\\s+)?:(\\s+)?(\\d+)(1z)?/i,/^(1S\\-cP)(\\s+)?:(\\s+)?(1E|26)$/i,/^(3U\\-cP)(\\s+)?:(\\s+)?(1E|26)$/i,/^(3U\\-26\\-ik)(\\s+)?:(\\s+)?(\\d+)$/i,/^(3U\\-8U)(\\s+)?:(\\s+)?(8R|5S|9e|12)$/i,/^(3U\\-8U\\-8D)(\\s+)?:(\\s+)?(\\d+)$/i,/^(3U\\-6q)(\\s+)?:(\\s+)?([a-8K-8L\\-:\\.]+)$/i,/^(3X\\-1r\\-1f)(\\s+)?:(\\s+)?(1c|12)$/i,/^(cx\\-3U\\-iz)(\\s+)?:(\\s+)?(1c|12)$/i,/^(cx\\-3U\\-cK)(\\s+)?:(\\s+)?(1c|12)$/i,/^(bE\\-5B)(\\s+)?:(\\s+)?(1c|12)$/i,/^(1m\\-1E)(\\s+)?:(\\s+)?(1c|12)$/i,/^(e1\\-1r)(\\s+)?:(\\s+)?(1c|12)$/i,/^(a7\\-6q)(\\s+)?:(\\s+)?([^;]*)$/i]),4g:$X([]),dG:R(l){V k=/(1E|26)/i;1K(V j=0;j<c.4g.1A;j++){if(c.4g[j].3r&&!c.4g[j].88){c.4g[j].6k()}1i{if(k.1P(c.4g[j].T.2I)&&c.4g[j].7e){c.4g[j].7e=l}}}},1u:R(j){V e=$X([]);if(j){if((j=$X(j))&&j.1r){e.4q(j)}1i{S 12}}1i{e=$X(g.$A(g.2k.2F("A")).2Y(R(k){S((" "+k.2Z+" ").3w(/\\e3\\s/)&&k.1r)}))}e.3c(R(k){k.1r&&k.1r.1u()},Q)},1B:R(e){if(0==2j.1A){c.85();S 1c}e=$X(e);if(!e||!(" "+e.2Z+" ").3w(/\\s(6S|5q)\\s/)){S 12}if(!e.1r){V j=1b;3K(j=e.2R){if(j.41=="9b"){1q}e.4u(j)}3K(j=e.ix){if(j.41=="9b"){1q}e.4u(j)}if(!e.2R||e.2R.41!="9b"){7s"hQ hG aO"}c.4g.4q(1t c.1r(e,(2j.1A>1)?2j[1]:1H))}1i{e.1r.1B()}},31:R(l,e,k,j){if((l=$X(l))&&l.1r){(1b===e||""===e)&&(e=1H);(1b===k||""===k)&&(k=1H);l.1r.31(e,k,j);S 1c}S 12},85:R(){g.$A(1f.1n.6C("A")).3c(R(e){if(e.2Z.3o("6S"," ")){if(c.1u(e)){c.1B.2A(1Q,e)}1i{c.1B(e)}}},Q)},2d:R(e){S c.9f(e)},9f:R(e){if((e=$X(e))&&e.1r){S e.1r.5H()}S 12},a9:R(e){if((e=$X(e))&&e.1r){S e.1r.6k()}S 12},gY:R(e){if((e=$X(e))&&e.1r){S{x:e.1r.T.x,y:e.1r.T.y}}},d3:R(k){V j,e;j="";1K(e=0;e<k.1A;e++){j+=8y.ci(14^k.cq(e))}S j}};c.6A=R(){Q.42.4Z(Q,2j)};c.6A.2X={42:R(e){Q.cb=1b;Q.5z=1b;Q.as=Q.cp.2q(Q);Q.97=1b;Q.U=0;Q.W=0;Q.5L=0;Q.7L=0;Q.2p={17:0,1m:0,19:0,1k:0};Q.24={17:0,1m:0,19:0,1k:0};Q.1N=12;Q.68=1b;if("6g"==g.2J(e)){Q.68=g.$1t("5a").2l("an-dM-2W").1g({1w:"2f",19:"-bn",U:"cA",W:"cA",2z:"1W"}).2a(g.2k);Q.18=g.$1t("2W").2a(Q.68);Q.8T();Q.18.2c=e}1i{Q.18=$X(e);Q.8T();Q.18.2c=e.2c}},4z:R(){if(Q.68){if(Q.18.1U==Q.68){Q.18.4d().1g({1w:"7m",19:"1D"})}Q.68.5X();Q.68=1b}},cp:R(j){if(j){$X(j).1u()}if(Q.cb){Q.4z();Q.cb.21(Q,12)}Q.5N()},8T:R(e){Q.5z=1b;if(e==1c||!(Q.18.2c&&(Q.18.6G||Q.18.6I=="6G"))){Q.5z=R(j){if(j){$X(j).1u()}if(Q.1N){S}Q.1N=1c;Q.5d();if(Q.cb){Q.4z();Q.cb.21()}}.2q(Q);Q.18.1y("2K",Q.5z);$X(["8I","5E"]).3c(R(j){Q.18.1y(j,Q.as)},Q)}1i{Q.1N=1c}},31:R(j,l){V k=Q.1N;Q.5N();V e=g.$1t("a",{2g:j});if(1c!==l&&Q.18.2c.3o(e.2g)&&0!==Q.18.U){Q.1N=k}1i{Q.8T(1c);Q.18.2c=j}e=1b},5d:R(){Q.5L=Q.18.5L||Q.18.U;Q.7L=Q.18.7L||Q.18.W;Q.U=Q.18.U;Q.W=Q.18.W;if(Q.U==0&&Q.W==0&&g.1a.3g){Q.U=Q.18.5L;Q.W=Q.18.7L}$X(["9G","9E","9J","9H"]).3c(R(j){Q.24[j.3b()]=Q.18.79("24"+j).1R();Q.2p[j.3b()]=Q.18.79("2p"+j+"ch").1R()},Q);if(g.1a.7M||(g.1a.2M&&!g.1a.3L)){Q.U-=Q.24.17+Q.24.1m;Q.W-=Q.24.19+Q.24.1k}},8V:R(){V e=1b;e=Q.18.3M();S{19:e.19+Q.2p.19,1k:e.1k-Q.2p.1k,17:e.17+Q.2p.17,1m:e.1m-Q.2p.1m}},gW:R(){if(Q.97){Q.97.2c=Q.18.2c;Q.18=1b;Q.18=Q.97}},2K:R(e){if(Q.1N){if(!Q.U){(R(){Q.5d();Q.4z();e.21()}).1o(Q).2A(1)}1i{Q.4z();e.21()}}1i{if(!Q.5z){e.21(Q,12);S}Q.cb=e}},5N:R(){if(Q.5z){Q.18.2u("2K",Q.5z)}$X(["8I","5E"]).3c(R(e){Q.18.2u(e,Q.as)},Q);Q.5z=1b;Q.cb=1b;Q.U=1b;Q.1N=12;Q.gV=12}};c.1r=R(){Q.az.4Z(Q,2j)};c.1r.2X={az:R(l,j,k){V e={};Q.4C=-1;Q.3r=12;Q.7V=0;Q.7U=0;Q.8r=!(Q.1h);Q.8g=Q.8r?{}:Q.8g||{};Q.88=12;Q.4w=1b;Q.aG=$X(1f).1e("5I:99")||$X(1f).1e("5I:99",g.$1t("5a").1g({1w:"2f",19:-7X,U:10,W:10,2z:"1W"}).2a(g.2k));Q.T=g.3V(c.8M);if(l){Q.c=$X(l)}Q.5A=("5a"==Q.c.41.3b());e=g.1Y(e,Q.5F());e=g.1Y(e,Q.5F(Q.c.3G));e=g.1Y(e,Q.8g);if(j){e=g.1Y(e,g.1Y(1c===k?Q.8g:{},Q.5F(j)))}if(e.5o&&!e.6i&&1H===e.5y){e.5y=1c}g.1Y(Q.T,e);Q.T.2U+="";if("2K"==Q.T.2I&&g.2Q(Q.T.ac)&&"1c"==Q.T.ac.6b()){Q.T.2I="1E"}if(g.2Q(Q.T.aK)&&Q.T.aK!=Q.T.3C){Q.T.3C=Q.T.aK}if(g.1a.3F){if(1f.cn&&1f.cn("(3B-U: gB)").h0){Q.T.2E="3x";Q.T.6i=1c}}if(Q.8r&&!Q.5A){Q.id=Q.8C=Q.c.id||"";if(!Q.c.id){Q.c.id=Q.id="1r-"+1v.7E(1v.7J()*g.35())}}if("3x"==Q.T.2E&&Q.T.5o){Q.T.8o=1c}if(Q.T.4v){Q.3r=12;Q.T.6i=1c;Q.T.1x=12}("6g"===g.2J(Q.T.3T))&&("R"===g.2J(1f[Q.T.3T]))&&(Q.T.3T=1f[Q.T.3T]);if(l){Q.6x=1b;Q.80=Q.8W.2q(Q);Q.b5=Q.86.2q(Q);Q.aW=Q.2d.1o(Q,1c);Q.cT=Q.8z.1o(Q);Q.54=Q.81.2q(Q);Q.ax=R(o){V n=$X(Q.c).1e("5I:1f:2N"),m=$X(1f).1I();if(n.U!==m.U||n.W!==m.W){43(Q.9D);Q.9D=Q.7W.1o(Q).2A(10);$X(Q.c).1G("5I:1f:2N",m)}}.2q(Q);if(!Q.5A){Q.c.1y("1E",R(n){V m=n.5s();if(3==m){S 1c}$X(n).1u();if(!g.1a.2M){Q.bA()}S 12})}Q.c.1y("8W",Q.80);Q.c.1y("86",Q.b5);if("26"==Q.T.2I){Q.c.1y("26",Q.80)}if(g.1a.3F){Q.c.1g({"-3g-ca-cM":"2S","-3g-5t-cS":"2S","-3g-d5-cU-5x":"bp"});if(!Q.T.4v){Q.c.1y("6R",Q.80);Q.c.1y("4p",Q.b5)}1i{Q.c.1y("1E",R(m){m.aF()})}}Q.c.d7="57";Q.c.1M.h1="2S";Q.c.1y("h6",g.$8O);if(!Q.5A){Q.c.1g({1w:"4D",2h:(g.1a.da)?"2t":"8u-2t",h7:"2S",9B:"0",4m:"h5",2z:"1W"});if(g.1a.3E){Q.c.2l("an-1K-ie"+g.1a.3E)}if(Q.c.1O("bf")=="5G"){Q.c.1g({1X:"1D 1D"})}}Q.c.1r=Q}1i{Q.T.2I="2K"}if(!Q.T.3d){Q.c.1y("9z",g.$8O)}if("2K"==Q.T.2I){Q.7P()}1i{if(""!==Q.8C){Q.aB(1c)}}},7P:R(){V l,o,n,m,j;if(!Q.1d){Q.1d=1t c.6A(Q.c.2R);Q.1s=1t c.6A(Q.c.2g)}1i{Q.1s.31(Q.c.2g)}if(!Q.1h){Q.1h={18:$X(1n.48("3p")).2l("h2").2l(Q.T.8p).1g({2z:"1W",2y:Q.T.2E=="3x"?1Q:h3,19:"-8h",1w:"2f",U:Q.T.2b+"1z",W:Q.T.2m+"1z"}),1r:Q,44:"1V",8l:"1V",7y:0,7H:0,6l:{47:"17",4Q:1},6n:{47:"19",4Q:1},5p:12,6j:Q.T.2b,6p:Q.T.2m};if("3x"==Q.T.2E){Q.1h.18.2l("3x-1r")}if(!(g.1a.gS&&g.1a.3E<9)&&"3x"!=Q.T.2E){2s(Q.T.cW){1p"aD":Q.1h.18.2l("gR");1q;1p"cZ":Q.1h.18.2l("gH");1q;2r:1q}}Q.1h.1T=R(){if(!Q.18){S}if(Q.18.1M.19!="-8h"&&Q.1r.1l&&!Q.1r.1l.4J){Q.18.1M.19="-8h"}if(Q.18.1U===g.2k){Q.18.2a(Q.1r.aG)}};Q.1h.eg=Q.1h.1T.1o(Q.1h);if(g.1a.3u){l=$X(1n.48("aS"));l.2c="aT:\'\'";l.1g({17:"1V",19:"1V",1w:"2f","z-2i":-1}).gI=0;Q.1h.7Z=Q.1h.18.2B(l)}Q.1h.4i=$X(1n.48("3p")).2l("gG").1g({1w:"4D",2y:10,17:"1V",19:"1V",24:"gF"}).1T();o=g.$1t("3p",{},{2z:"1W"});o.2B(Q.1s.18);Q.1s.18.1g({24:"1V",1X:"1V",2p:"1V",U:"1D",W:"1D"});if(Q.T.5j=="1k"){Q.1h.18.2B(o);Q.1h.18.2B(Q.1h.4i)}1i{Q.1h.18.2B(Q.1h.4i);Q.1h.18.2B(o)}Q.1h.18.2a(Q.aG);if("1H"!==4l(j)){Q.1h.g=$X(1n.48("5a")).1g({5x:j[1],bY:j[2]+"1z",bZ:j[3],bX:"bN",1w:"2f","z-2i":10+(""+(Q.1s.18.1O("z-2i")||0)).1R(),U:j[5],bf:j[4],"gC-W":"gD",17:"1V"}).7r(c.d3(j[0])).2a(Q.1h.18,((1v.7E(1v.7J()*ct)+1)%2)?"19":"1k")}}Q.1h.6j=Q.T.2b;Q.1h.6p=Q.T.2m;Q.1h.5p=12;if(Q.T.5j!="12"&&Q.T.5j!=12){V k=Q.1h.4i;k.1T();3K(n=k.2R){k.4u(n)}if(Q.T.8A=="2C"&&""!=Q.c.2C){k.2B(1n.62(Q.c.2C));k.2d()}1i{if(Q.T.8A.3o("#")){V q=Q.T.8A.2G(/^#/,"");if($X(q)){k.7r($X(q).8Z);k.2d()}}}}1i{Q.1h.4i.1T()}Q.c.aE=Q.c.2C;Q.c.2C="";Q.1d.2K(Q.d2.1o(Q))},d2:R(e){if(!e&&e!==1H){S}if(!Q.1d){S}if(!Q.T.53){Q.1d.18.2D(1)}if(!Q.5A){Q.c.1g({U:"1D",W:"1D"})}if(Q.T.5Y&&!Q.T.4v){Q.7O=65(Q.cT,7j)}if(Q.T.2U!=""&&$X(Q.T.2U)){Q.cO()}if(Q.c.id!=""){Q.aB()}Q.1s.2K(Q.aH.1o(Q))},aH:R(l){V k,j,m,e;if(!l&&l!==1H){43(Q.7O);if(Q.T.5Y&&Q.2n){Q.2n.1T()}Q.4C=g.35();S}if(!Q.1d||!Q.1s){S}j=Q.1d.18.3M();Q.8w=j;if(j.1k==j.19){Q.aH.1o(Q).2A(8S);S}m=("5p"==Q.T.2E)?Q.c.id+"-cK":Q.T.2E.3o("#")?Q.T.2E.2G(/^#/,""):1b;if(m&&$X(m)){Q.1h.5p=1c;$X(m).2B(Q.1h.18)}1i{if("3x"==Q.T.2E){Q.c.2B(Q.1h.18)}}Q.1d.5d();Q.1s.5d();if(Q.1d.U==0&&g.1a.2M){!Q.5A&&Q.c.1g({U:Q.1d.U+"1z"})}k=Q.1h.4i.1I();if(/%$/i.1P(Q.T.2b)){Q.T.2b=(28(Q.T.2b)/1Q)*Q.1d.U}if(/%$/i.1P(Q.T.2m)){Q.T.2m=(28(Q.T.2m)/1Q)*Q.1d.W}Q.1h.18.1g({U:Q.T.2b});k=Q.1h.4i.1I();if(Q.T.cJ||Q.T.89){if((Q.1s.U<Q.T.2b)||Q.T.89){Q.T.2b=Q.1s.U;Q.1h.18.1g({U:Q.T.2b});k=Q.1h.4i.1I()}if((Q.1s.W<Q.T.2m)||Q.T.89){Q.T.2m=Q.1s.W+k.W}}2s(Q.T.2E){1p"1m":Q.1h.18.1M.17=j.1m+Q.T.6L+"1z";Q.1h.6l.47="1m";1q;1p"17":Q.1h.18.1M.17=j.17-Q.T.6L-Q.T.2b+"1z";1q;1p"19":Q.1h.44=j.19-(Q.T.6L+Q.T.2m)+"1z";1q;1p"1k":Q.1h.44=j.1k+Q.T.6L+"1z";Q.1h.6n.47="1k";1q;1p"3x":Q.1h.18.1g({17:"1V",W:"1Q%",U:"1Q%"});Q.T.2b=Q.1d.U;Q.T.2m=Q.1d.W;Q.1h.44="1V";k=Q.1h.4i.1I();1q;2r:if(Q.1h.5p){e=$X(Q.1h.18.1U).1I();if(/%$/i.1P(Q.1h.6j)){Q.T.2b=(28(Q.1h.6j)/1Q)*e.U}if(/%$/i.1P(Q.1h.6p)){Q.T.2m=(28(Q.1h.6p)/1Q)*e.W}Q.1h.18.1g({17:"1V",U:Q.T.2b});Q.1h.44="1V";k=Q.1h.4i.1I()}1q}if(Q.T.5j=="1k"){$X(Q.1s.18.1U).1F("W",Q.T.2m-k.W)}Q.1h.18.1g("3x"==Q.T.2E?{}:{W:Q.T.2m+"1z",U:Q.T.2b+"1z"}).2D(1);if(g.1a.3u&&Q.1h.7Z){Q.1h.7Z.1g({U:Q.T.2b+"1z",W:Q.T.2m+"1z"})}if(Q.T.2E=="1m"||Q.T.2E=="17"){if(Q.T.7f=="5G"){Q.1h.44=(j.1k-(j.1k-j.19)/2-Q.T.2m/2)+"1z";Q.1h.6n={47:"1k",4Q:2}}1i{if(Q.T.7f=="1k"){Q.1h.44=(j.1k-Q.T.2m)+"1z";Q.1h.6n.47="1k"}1i{Q.1h.44=j.19+"1z"}}}1i{if(Q.T.2E=="19"||Q.T.2E=="1k"){if(Q.T.7f=="5G"){Q.1h.18.1M.17=(j.1m-(j.1m-j.17)/2-Q.T.2b/2)+"1z";Q.1h.6l={47:"1m",4Q:2}}1i{if(Q.T.7f=="1m"){Q.1h.18.1M.17=(j.1m-Q.T.2b)+"1z";Q.1h.6l.47="1m"}1i{Q.1h.18.1M.17=j.17+"1z"}}}}Q.1h.7y=28(Q.1h.44,10);Q.1h.7H=28(Q.1h.18.1M.17,10);Q.1h.8l=Q.1h.7H;Q.1h.44=Q.1h.7y;Q.6X=Q.T.2m-k.W;if(Q.1h.g){Q.1h.g.1g({19:Q.T.5j=="1k"?0:"1D",1k:Q.T.5j=="1k"?"1D":0})}Q.1s.18.1g({1w:"4D",56:"1V",24:"1V",17:"1V",19:"1V"});Q.bV();if(Q.T.5y){if(Q.T.x==-1){Q.T.x=Q.1d.U/2}if(Q.T.y==-1){Q.T.y=Q.1d.W/2}Q.2d()}1i{if(Q.T.cG){Q.3D=1t g.22(Q.1h.18,{7D:"cL"===g.1a.9K})}Q.1h.18.1g({19:"-8h"})}if(Q.T.5Y&&Q.2n){Q.2n.1T()}Q.c.1y("aj",Q.54);Q.c.1y("2T",Q.54);if(g.1a.3F){Q.c.1y("bG",Q.54);Q.c.1y("4p",Q.54)}Q.7p();$X(Q.c).1e("5I:1f:2N",$X(1f).1I());$X(1f).1y("3v",Q.ax);if(!Q.T.4v&&(!Q.T.6i||"1E"==Q.T.2I)){Q.3r=1c}if("1E"==Q.T.2I&&Q.7e){Q.81(Q.7e)}if(Q.88){Q.5H()}Q.4C=g.35();!Q.5A&&("R"==g.2J(Q.T.3T))&&Q.T.3T.21(1b,Q.id,!Q.8r)},7p:R(){V m=/bt|br/i,e=/bl|br|bc/i,j=/bc|bm/i,l=1b;Q.7b=1H;if(!Q.T.1x){if(Q.1x){Q.1x.5X();Q.1x=1H}S}if(!Q.1x){Q.1x=$X(1n.48("3p")).2l(Q.T.84).1g({2h:"2t",2z:"1W",1w:"2f",2V:"1W","z-2i":1});if(Q.T.4h!=""){Q.1x.2B(1n.62(Q.T.4h))}Q.c.2B(Q.1x)}1i{if(Q.T.4h!=""){l=Q.1x[(Q.1x.2R)?"8e":"2B"](1n.62(Q.T.4h),Q.1x.2R);l=1b}}Q.1x.1g({17:"1D",1m:"1D",19:"1D",1k:"1D",2h:"2t",1C:(Q.T.8k/1Q),"3B-U":(Q.1d.U-4)});V k=Q.1x.1I();Q.1x.1F((m.1P(Q.T.5e)?"1m":"17"),(j.1P(Q.T.5e)?(Q.1d.U-k.U)/2:2)).1F((e.1P(Q.T.5e)?"1k":"19"),2);Q.7b=1c;Q.1x.2d()},8z:R(){if(Q.1s.1N){S}Q.2n=$X(1n.48("3p")).2l(Q.T.82).2D(Q.T.8j/1Q).1g({2h:"2t",2z:"1W",1w:"2f",2V:"1W","z-2i":20,"3B-U":(Q.1d.U-4)});Q.2n.2B(1n.62(Q.T.7t));Q.c.2B(Q.2n);V e=Q.2n.1I();Q.2n.1g({17:(Q.T.aJ==-1?((Q.1d.U-e.U)/2):(Q.T.aJ))+"1z",19:(Q.T.aI==-1?((Q.1d.W-e.W)/2):(Q.T.aI))+"1z"});Q.2n.2d()},cO:R(){$X(Q.T.2U).bI=$X(Q.T.2U).1U;$X(Q.T.2U).bw=$X(Q.T.2U).gE;Q.c.2B($X(Q.T.2U));$X(Q.T.2U).1g({1w:"2f",17:"1V",19:"1V",U:Q.1d.U+"1z",W:Q.1d.W+"1z",2y:15}).2d();if(g.1a.2M){Q.c.8X=Q.c.2B($X(1n.48("3p")).1g({1w:"2f",17:"1V",19:"1V",U:Q.1d.U+"1z",W:Q.1d.W+"1z",2y:14,3Q:"#gJ"}).2D(0.gK))}g.$A($X(Q.T.2U).6C("A")).3c(R(j){V k=j.gQ.4t(","),e=1b;$X(j).1g({1w:"2f",17:k[0]+"1z",19:k[1]+"1z",U:(k[2]-k[0])+"1z",W:(k[3]-k[1])+"1z",2y:15}).2d();if(j.5v("3h")){if(e=j.1e("1S")){e.2L=Q.T.2U}1i{j.3G+=";2L: "+Q.T.2U+";"}}},Q)},aB:R(k){V e,l,j=1t 4U("1r\\\\-id(\\\\s+)?:(\\\\s+)?"+Q.c.id+"($|;)");Q.3U=$X([]);g.$A(1n.6C("A")).3c(R(n){if(j.1P(n.3G)){if(!$X(n).7l){n.7l=R(o){if(!g.1a.2M){Q.bA()}$X(o).1u();S 12};n.1y("1E",n.7l)}if(k){if(("26"==Q.T.2I||"1E"==Q.T.2I)&&!$X(n).8B){n.8B=R(p,o){o.2u("1E",o.8B);if(!!Q.1d){S}$X(p).1u();Q.c.2g=o.2g;Q.c.2R.2c=o.6Q;Q.1B(o.3G);if(Q.c.1e("1S")){Q.c.1e("1S").1B(Q.c.2R,Q.c.2g)}}.2q(Q,n);n.1y("1E",n.8B)}S}V m=g.$1t("a",{2g:n.6Q});(Q.T.4e!="")&&$X(n)[Q.1s.18.2c.3o(n.2g)&&Q.1d.18.2c.3o(m.2g)?"2l":"5h"](Q.T.4e);if(Q.1s.18.2c.3o(n.2g)&&Q.1d.18.2c.3o(m.2g)){Q.6x=n}m=1b;if(!n.67){n.67=R(q,p){p=q.gO||q.5m();3a{3K("a"!=p.41.3b()){p=p.1U}}3l(o){S}if(p.69(q.4f())){S}if(q.2o=="2T"){if(Q.5M){43(Q.5M)}Q.5M=12;S}if(p.2C!=""){Q.c.2C=p.2C}if(q.2o=="26"){Q.5M=65(Q.31.1o(Q,p.2g,p.6Q,p.3G,p),Q.T.9A)}1i{Q.31(p.2g,p.6Q,p.3G,p)}}.2q(Q);n.1y(Q.T.3C,n.67);if(Q.T.3C=="26"){n.1y("2T",n.67)}}n.1g({9B:"0",2h:"8u-2t"});if(Q.T.8a){l=1t bH();l.2c=n.6Q}if(Q.T.5R){e=1t bH();e.2c=n.2g}Q.3U.4q(n)}},Q)},1u:R(j){3a{if(Q.1h){Q.1h.1T()}Q.6k();Q.c.2u("aj",Q.54);Q.c.2u("2T",Q.54);if(g.1a.3F){Q.c.2u("bG",Q.54);Q.c.2u("4p",Q.54)}if(1H===j&&Q.1l){Q.1l.18.1T()}if(Q.3D){Q.3D.1u()}Q.2e=1b;Q.3r=12;if(Q.3U!==1H){Q.3U.3c(R(e){if(Q.T.4e!=""){e.5h(Q.T.4e)}if(1H===j){e.2u(Q.T.3C,e.67);if(Q.T.3C=="26"){e.2u("2T",e.67)}e.67=1b;e.2u("1E",e.7l);e.7l=1b}},Q)}if(Q.T.2U!=""&&$X(Q.T.2U)){$X(Q.T.2U).1T();$X(Q.T.2U).bI.92($X(Q.T.2U),$X(Q.T.2U).bw);if(Q.c.8X){Q.c.4u(Q.c.8X)}}if(Q.T.53){Q.c.5h("bU");Q.1d.18.2D(1)}Q.3D=1b;if(Q.2n){Q.c.4u(Q.2n)}if(Q.1x){Q.1x.1T()}if(1H===j){if(Q.1x){Q.c.4u(Q.1x)}Q.1x=1b;Q.1s.5N();Q.1d.5N();(Q.1l&&Q.1l.18)&&Q.c.4u(Q.1l.18);(Q.1h&&Q.1h.18)&&Q.1h.18.1U.4u(Q.1h.18);Q.1l=1b;Q.1h=1b;Q.1s=1b;Q.1d=1b;if(!Q.T.3d){Q.c.2u("9z",g.$8O)}if(""===Q.8C){Q.c.gL("id")}1i{Q.c.id=Q.8C}$X(1f).2u("3v",Q.ax)}if(Q.7O){43(Q.7O);Q.7O=1b}Q.4w=1b;Q.c.8X=1b;Q.2n=1b;if(Q.c.2C==""){Q.c.2C=Q.c.aE}Q.4C=-1}3l(k){}},1B:R(j,e){if(Q.4C!=-1){S}Q.az(12,j,(1b===e||1H===e))},31:R(D,q,j,C){V k,G,e,n,z,l,I=1b,A=1b,o=Q.6x,r,p,s,F,y,v,x,J,H,u;C=C||1b;if(g.35()-Q.4C<6a||Q.4C==-1||Q.8t){Q.5M&&43(Q.5M);k=6a-g.35()+Q.4C;if(Q.4C==-1){k=6a}Q.5M=65(Q.31.1o(Q,D,q,j,C),k);S}if(C&&Q.6x==C){S}1i{Q.6x=C}G=R(K){if(1H!=D){Q.c.2g=D}if(1H===j){j=""}if(Q.T.6t){j="x: "+Q.T.x+"; y: "+Q.T.y+"; "+j}if(1H!=q){Q.1d.31(q)}if(K!==1H){Q.1d.2K(K)}};A=Q.c.1e("1S");if(A){A.1N&&A.2O(1b,1c);A.1J="7q";I=R(){A.1J="3Y";A.31(Q.c.2g,1b,j)}.1o(Q)}Q.1d.5d();n=Q.1d.U;z=Q.1d.W;Q.1u(1c);if(Q.T.4o!="12"&&1H!==q){Q.8t=1c;V E=$X(Q.c.7F(1c)).1g({1w:"4D",19:0,17:0,U:""});V w=$X(Q.c.1U).1O("U");V m=0;if("2x-3z"==$X(Q.c.1U).1O("3z-5C")){m=(28($X(Q.c.1U).1O("24-17"))||0)}V B=g.$1t("5a",{id:Q.c.1U.id,"6q":Q.c.1U.2Z}).2l("al-df-de").1g({24:$X(Q.c.1U).1O("24"),U:w,"1X-17":"-"+w,"3B-U":$X(Q.c.1U).1O("3B-U")});if("h8"===Q.c.1U.41.h9()){B.1g({24:0});Q.c.1U.92(B,Q.c)}1i{Q.c.1U.1U.92(B,Q.c.1U)}B.4T(E);g.1a.3g&&B.1I();if(g.1a.3E&&g.1a.3E<8){$X(E.2R).2D(1)}l=1t c.6A(E.2R);l.31(q);if("9e"==Q.T.4o){u=Q.c.2g;p=Q.3U.2Y(R(K){S K.2g.3o(u)});p=(p[0])?$X(p[0].2F("2W")[0]||p[0]):Q.1d.18;s=Q.3U.2Y(R(K){S K.2g.3o(D)});s=(s[0])?$X(s[0].2F("2W")[0]||s[0]):1b;if(1b==s){s=Q.1d.18;p=Q.1d.18}y=Q.1d.18.3i(),v=p.3i(),x=s.3i(),H=p.1I(),J=s.1I()}e=R(M){V K={},O={},N={},P=1b,L=1b;if(12===M){l.5N();$X(l.18).4d();l=1b;B.4d();Q.8t=12;if(A){A.1J="3Y"}Q.6x=o;Q.1B(1b,o);S}if(g.1a.3E&&g.1a.3E<8&&(n===l.U||0===l.U)){l.18.1F("1r",1);B.1I();l.5d()}if("9e"==Q.T.4o){K.U=[n,H.U];K.W=[z,H.W];K.19=[y.19,v.19];K.17=[y.17,v.17];O.U=[J.U,l.U];O.W=[J.W,l.W];O.19=[x.19,y.19];B.1g({24:""});E.2D(0).1g({W:0,U:l.U,1w:"4D"});O.17=[x.17,E.3i().17+28(w)-m];N.U=[n,l.U];l.18.2a(g.2k).1g({1w:"2f","z-2i":b7,17:O.17[0],19:O.19[0],U:O.U[0],W:O.W[0]});P=$X(Q.c.2R.7F(12)).2a(g.2k).1g({1w:"2f","z-2i":bk,17:K.17[0],19:K.19[0],2V:"4G"});L=Q.c.1O("2p-U")}1i{l.18.2a(Q.c).1g({1w:"2f","z-2i":b7,1C:0,17:"1V",19:"1V",W:"1D"});P=$X(Q.c.2R.7F(12)).2a(Q.c).1g({1w:"2f","z-2i":bk,17:"1V",19:"1V",2V:"4G",W:"1D"});O={1C:[0,1]};if(n!=l.U||z!=l.W){N.U=O.U=K.U=[n,l.U];N.W=O.W=K.W=[z,l.W]}if(Q.T.4o=="5S"){K.1C=[1,0]}}r=1t c.6A(P);r.2K($X(R(){$X(Q.c.2R).1g({2V:"1W"});B.4d();if(1b!==L){Q.c.1F("2p-U",0)}1t g.91([Q.c,l.18,(P||Q.c.2R)],{36:Q.T.8q,3Z:R(){if(P){P.4d();P=1b}if(1b!==L){Q.c.1F("2p-U",L)}G.21(Q,R(){l.5N();$X(Q.c.2R).1g({2V:"4G"});$X(l.18).4d();l=1b;if(K.1C){$X(Q.c.2R).1g({1C:1})}Q.8t=12;Q.1B(j,C);if(I){I.2A(10)}}.1o(Q))}.1o(Q)}).1B([N,O,K])}).1o(Q))};l.2K(e.1o(Q))}1i{G.21(Q,R(){Q.c.1g({U:Q.1d.U+"1z",W:Q.1d.W+"1z"});Q.1B(j,C);if(I){I.2A(10)}}.1o(Q))}},5F:R(j){V e,n,l,k;e=1b;n=[];j=j||"";if(""==j){1K(k in c.T){e=c.T[k];2s(g.2J(c.8M[k.3e()])){1p"7I":e=e.6b().6P();1q;1p"6d":if(!("2b"===k.3e()||"2m"===k.3e())||!/\\%$/i.1P(e)){e=46(e)}1q;2r:1q}n[k.3e()]=e}}1i{l=$X(j.4t(";"));l.3c(R(m){c.bP.3c(R(o){e=o.6T(m.4k());if(e){2s(g.2J(c.8M[e[1].3e()])){1p"7I":n[e[1].3e()]=e[4]==="1c";1q;1p"6d":n[e[1].3e()]=(("2b"===e[1].3e()||"2m"===e[1].3e())&&/\\%$/.1P(e[4]))?e[4]:46(e[4]);1q;2r:n[e[1].3e()]=e[4]}}},Q)},Q)}if(12===n.4o){n.4o="12"}S n},bV:R(){V j,e;if(!Q.1l){Q.1l={18:$X(1n.48("3p")).2l("bU").1g({2y:10,1w:"2f",2z:"1W"}).1T(),U:20,W:20,b2:""};Q.c.2B(Q.1l.18);Q.1l.b2=Q.1l.18.1O("3Q-5x")}if(e=Q.c.1e("1S")){Q.1l.18.1g({4m:(e.Y.5D)?"bR":""})}if(Q.T.89){Q.1l.18.1g({"2p-U":"1V",4m:"2r"})}Q.1l.4J=12;Q.1l.W=Q.6X/(Q.1s.W/Q.1d.W);Q.1l.U=Q.T.2b/(Q.1s.U/Q.1d.U);if(Q.1l.U>Q.1d.U){Q.1l.U=Q.1d.U}if(Q.1l.W>Q.1d.W){Q.1l.W=Q.1d.W}Q.1l.U=1v.4W(Q.1l.U);Q.1l.W=1v.4W(Q.1l.W);Q.1l.56=Q.1l.18.79("8s").1R();Q.1l.18.1g({U:(Q.1l.U-2*(g.1a.3L?0:Q.1l.56))+"1z",W:(Q.1l.W-2*(g.1a.3L?0:Q.1l.56))+"1z"});if(!Q.T.53&&!Q.T.3d){Q.1l.18.2D(46(Q.T.1C/1Q));if(Q.1l.3P){Q.1l.18.4u(Q.1l.3P);Q.1l.3P=1b}}1i{if(Q.1l.3P){Q.1l.3P.2c=Q.1d.18.2c}1i{j=Q.1d.18.7F(12);j.d7="57";Q.1l.3P=$X(Q.1l.18.2B(j)).1g({1w:"2f",2y:5})}if(Q.T.53){Q.1l.3P.1g(Q.1d.18.1I());Q.1l.18.2D(1);if(g.1a.3E&&g.1a.3E<9){Q.1l.3P.2D(1)}}1i{if(Q.T.3d){Q.1l.3P.2D(0.hf)}Q.1l.18.2D(46(Q.T.1C/1Q))}}},81:R(l,j){if(!Q.3r||l===1H||l.hg){S 12}if(!Q.1l){S 12}V m=(/5t/i).1P(l.2o)&&l.aa.1A>1;V k=("4p"==l.2o&&!l.di);if((!Q.5A||l.2o!="2T")&&!m){$X(l).1u()}if(j===1H){j=$X(l).4Y()}if(Q.2e===1b||Q.2e===1H){Q.2e=Q.1d.8V()}if(k||("2T"==l.2o&&Q.c!==l.4f()&&!Q.c.69(l.4f()))||m||j.x>Q.2e.1m||j.x<Q.2e.17||j.y>Q.2e.1k||j.y<Q.2e.19){Q.6k();S 12}Q.88=12;if(l.2o=="2T"||l.2o=="4p"){S 12}if(Q.T.5o&&!Q.6E){S 12}if(!Q.T.8o){j.x-=Q.7V;j.y-=Q.7U}if((j.x+Q.1l.U/2)>=Q.2e.1m){j.x=Q.2e.1m-Q.1l.U/2}if((j.x-Q.1l.U/2)<=Q.2e.17){j.x=Q.2e.17+Q.1l.U/2}if((j.y+Q.1l.W/2)>=Q.2e.1k){j.y=Q.2e.1k-Q.1l.W/2}if((j.y-Q.1l.W/2)<=Q.2e.19){j.y=Q.2e.19+Q.1l.W/2}Q.T.x=j.x-Q.2e.17;Q.T.y=j.y-Q.2e.19;if(Q.4w===1b){Q.4w=65(Q.aW,10)}if(g.2Q(Q.7b)&&Q.7b){Q.7b=12;Q.1x.1T()}S 1c},2d:R(m){if(m&&!Q.4w){S}V s,p,l,k,r,q,o,n,j,e=Q.T,u=Q.1l;s=u.U/2;p=u.W/2;u.18.1M.17=e.x-s+Q.1d.2p.17+"1z";u.18.1M.19=e.y-p+Q.1d.2p.19+"1z";if(Q.T.53){u.3P.1M.17="-"+(46(u.18.1M.17)+u.56)+"1z";u.3P.1M.19="-"+(46(u.18.1M.19)+u.56)+"1z"}l=(Q.T.x-s)*(Q.1s.U/Q.1d.U);k=(Q.T.y-p)*(Q.1s.W/Q.1d.W);if(Q.1s.U-l<e.2b){l=Q.1s.U-e.2b;if(l<0){l=0}}if(Q.1s.W-k<Q.6X){k=Q.1s.W-Q.6X;if(k<0){k=0}}if(1n.8f.he=="hd"){l=(e.x+u.U/2-Q.1d.U)*(Q.1s.U/Q.1d.U)}l=1v.4W(l);k=1v.4W(k);if(e.8Q===12||(!u.4J)){Q.1s.18.1M.17=(-l)+"1z";Q.1s.18.1M.19=(-k)+"1z"}1i{r=28(Q.1s.18.1M.17);q=28(Q.1s.18.1M.19);o=(-l-r);n=(-k-q);if(!o&&!n){Q.4w=1b;S}o*=e.b3/1Q;if(o<1&&o>0){o=1}1i{if(o>-1&&o<0){o=-1}}r+=o;n*=e.b3/1Q;if(n<1&&n>0){n=1}1i{if(n>-1&&n<0){n=-1}}q+=n;Q.1s.18.1M.17=r+"1z";Q.1s.18.1M.19=q+"1z"}if(!u.4J){if(Q.3D){Q.3D.1u();Q.3D.T.3Z=g.$F;Q.3D.T.36=e.e8;Q.1h.18.2D(0);Q.3D.1B({1C:[0,1]})}if(/^(17|1m|19|1k)$/i.1P(e.2E)){Q.1h.18.2a(g.2k)}if(e.2E!="3x"){u.18.2d()}Q.1h.18.1g(Q.a1(/^(17|1m|19|1k)$/i.1P(e.2E)&&!Q.T.5y));if(e.53){Q.c.1F("3Q-5x",Q.1l.b2);Q.1d.18.2D(46((1Q-e.1C)/1Q))}u.4J=1c}if(Q.4w){Q.4w=65(Q.aW,at/e.4L)}},a1:R(q){V j=Q.7a(5),e=Q.1d.18.3M(),n=Q.T.2E,m=Q.1h,k=Q.T.6L,u=m.18.1I(),p=m.7y,l=m.7H,o={17:m.7H,19:m.7y};if("3x"===n||Q.1h.5p){S o}q||(q=12);m.8l+=(e[m.6l.47]-Q.8w[m.6l.47])/m.6l.4Q;m.44+=(e[m.6n.47]-Q.8w[m.6n.47])/m.6n.4Q;Q.8w=e;o.17=l=m.8l;o.19=p=m.44;if(q){if("17"==n||"1m"==n){if("17"==n&&j.17>l){o.17=(e.17-j.17>=u.U)?(e.17-u.U-2):(j.1m-e.1m-2>e.17-j.17-2)?(e.1m+2):(e.17-u.U-2)}1i{if("1m"==n&&j.1m<l+u.U){o.17=(j.1m-e.1m>=u.U)?(e.1m+2):(e.17-j.17-2>j.1m-e.1m-2)?(e.17-u.U-2):(e.1m+2)}}}1i{if("19"==n||"1k"==n){o.17=1v.3B(j.17+2,1v.4N(j.1m,l+u.U)-u.U);if("19"==n&&j.19>p){o.19=(e.19-j.19>=u.W)?(e.19-u.W-2):(j.1k-e.1k-2>e.19-j.19-2)?(e.1k+2):(e.19-u.W-2)}1i{if("1k"==n&&j.1k<p+u.W){o.19=(j.1k-e.1k>=u.W)?(e.1k+2):(e.19-j.19-2>j.1k-e.1k-2)?(e.19-u.W-2):(e.1k+2)}}}}}S o},7a:R(k){k=k||0;V j=(g.1a.3F)?{U:1f.9g,W:1f.9h}:$X(1f).1I(),e=$X(1f).7x();S{17:e.x+k,1m:e.x+j.U-k,19:e.y+k,1k:e.y+j.W-k}},7W:R(m){if(!Q.1d||!Q.1d.1N){S}V k,j,l={U:Q.1d.U,W:Q.1d.W};Q.1d.5d();if(Q.1h.5p){j=$X(Q.1h.18.1U).1I();if(/%$/i.1P(Q.1h.6j)){Q.T.2b=(28(Q.1h.6j)/1Q)*j.U}if(/%$/i.1P(Q.1h.6p)){Q.T.2m=(28(Q.1h.6p)/1Q)*j.W}}1i{if("3x"===Q.T.2E){Q.T.2b=Q.1d.U;Q.T.2m=Q.1d.W}1i{if(/%$/i.1P(Q.1h.6j)){Q.T.2b*=Q.1d.U/l.U}if(/%$/i.1P(Q.1h.6p)){Q.T.2m*=Q.1d.W/l.W}}}k=Q.1h.4i.1I();Q.6X=Q.T.2m-k.W;if(Q.T.5j=="1k"){$X(Q.1s.18.1U).1F("W",Q.T.2m-k.W)}Q.1h.18.1g("3x"==Q.T.2E?{}:{W:Q.T.2m+"1z",U:Q.T.2b+"1z"});if(g.1a.3u&&Q.1h.7Z){Q.1h.7Z.1g({U:Q.T.2b,W:Q.T.2m})}if(Q.T.53&&Q.1l.3P){Q.1l.3P.1g(Q.1d.18.1I())}Q.1l.W=Q.6X/(Q.1s.W/Q.1d.W);Q.1l.U=Q.T.2b/(Q.1s.U/Q.1d.U);if(Q.1l.U>Q.1d.U){Q.1l.U=Q.1d.U}if(Q.1l.W>Q.1d.W){Q.1l.W=Q.1d.W}Q.1l.U=1v.4W(Q.1l.U);Q.1l.W=1v.4W(Q.1l.W);Q.1l.56=Q.1l.18.79("8s").1R();Q.1l.18.1g({U:(Q.1l.U-2*(g.1a.3L?0:Q.1l.56))+"1z",W:(Q.1l.W-2*(g.1a.3L?0:Q.1l.56))+"1z"});if(Q.1l.4J){Q.1h.18.1g(Q.a1(/^(17|1m|19|1k)$/i.1P(Q.T.2E)&&!Q.T.5y));Q.T.x*=Q.1d.U/l.U;Q.T.y*=Q.1d.W/l.W;Q.2d()}},5H:R(j,k){j=(g.2Q(j))?j:1c;Q.88=1c;if(!Q.1s){Q.7P();S}if(Q.T.4v){S}Q.3r=1c;if(j){if(g.2Q(k)){Q.81(k);S}if(!Q.T.6t){Q.T.x=Q.1d.U/2;Q.T.y=Q.1d.W/2}Q.2d()}},6k:R(){V e=Q.1l&&Q.1l.4J;if(Q.4w){43(Q.4w);Q.4w=1b}if(!Q.T.5y&&Q.1l&&Q.1l.4J){Q.1l.4J=12;Q.1l.18.1T();if(Q.3D){Q.3D.1u();Q.3D.T.3Z=Q.1h.eg;Q.3D.T.36=Q.T.ee;V j=Q.1h.18.79("1C");Q.3D.1B({1C:[j,0]})}1i{Q.1h.1T()}if(Q.T.53){Q.c.1F("3Q-5x","");Q.1d.18.2D(1)}}Q.2e=1b;if(Q.T.6i){Q.3r=12}if(Q.T.5o){Q.6E=12}if(Q.1x){Q.7b=1c;Q.1x.2d()}},8W:R(m){V j=m.5s(),l=(/5t/i).1P(m.2o),o=g.35();if(3==j){S 1c}if(l){if(m.3R.1A>1){S}Q.c.1G("5I:3k:5i",{id:m.3R[0].6K,x:m.3R[0].5V,y:m.3R[0].5K,58:o});if(Q.1s&&Q.1s.1N&&!Q.3r){S}}if(!(l&&m.aa.1A>1)){$X(m).1u()}if("1E"==Q.T.2I&&!Q.1d){Q.7e=m;Q.7P();S}if("26"==Q.T.2I&&!Q.1d&&(m.2o=="26"||m.2o=="6R")){Q.7e=m;Q.7P();Q.c.2u("26",Q.80);S}if(Q.T.4v){S}if(Q.1d&&!Q.1s.1N){S}if(Q.1s&&Q.T.dl&&Q.3r&&!l){Q.3r=12;Q.6k();S}if(Q.1s&&!Q.3r){Q.5H(1c,m);m.98&&m.98();if(Q.c.1e("1S")){Q.c.1e("1S").94=1c}}if(Q.3r&&Q.T.5o){Q.6E=1c;if(!Q.T.8o){if(Q.2e===1b||Q.2e===1H){Q.2e=Q.1d.8V()}V k=m.4Y();Q.7V=k.x-Q.T.x-Q.2e.17;Q.7U=k.y-Q.T.y-Q.2e.19;if(1v.dO(Q.7V)>Q.1l.U/2||1v.dO(Q.7U)>Q.1l.W/2){Q.6E=12;S}}1i{Q.81(m)}}},86:R(m){V j=m.5s(),l=(/5t/i).1P(m.2o),p=g.35(),o=1b,k=Q.T.6t;if(3==j){S 1c}if(l){o=Q.c.1e("5I:3k:5i");if(!o||m.3R.1A>1){S}if(o.id==m.4r[0].6K&&p-o.58<=5g&&1v.9w(1v.3y(m.4r[0].5V-o.x,2)+1v.3y(m.4r[0].5K-o.y,2))<=15){if(Q.1s&&Q.1s.1N&&!Q.3r){if(Q.2e===1b||Q.2e===1H){Q.2e=Q.1d.8V()}Q.T.6t=1c;Q.T.x=m.4Y().x-Q.2e.17;Q.T.y=m.4Y().y-Q.2e.19;Q.5H(1c);Q.T.6t=k;Q.T.5o&&(Q.6E=1c);Q.7V=0;Q.7U=0;m.di=1c;m.hm=1c;m.98&&m.98()}$X(m).1u();S}}1i{$X(m).1u();if(Q.T.5o){Q.6E=12}}}};if(g.1a.2M){3a{1n.hk("gX",12,1c)}3l(f){}}$X(1n).1y("59",R(){g.dg(".al-df-de","1X-1m: 0 !4K;1X-19: 0 !4K;1X-1k: 0 !4K;24-19: 0 !4K;24-1k: 0 !4K;2p: 0 !4K;1w: 4D  !4K;W: 0 !4K;4N-W: 0 !4K;z-2i: -1;4X: 2S !4K;1C: 0;","al-a7");$X(1n).1y("aj",c.dG)});V d=1t g.4P({18:1b,1N:12,T:{U:-1,W:-1,5c:g.$F,am:g.$F,7d:g.$F},U:0,W:0,9T:0,du:0,2p:{17:0,1m:0,19:0,1k:0},1X:{17:0,1m:0,19:0,1k:0},24:{17:0,1m:0,19:0,1k:0},8c:1b,8G:{5c:R(j){if(j){$X(j).1u()}Q.8b();if(Q.1N){S}Q.1N=1c;Q.87();Q.4z();Q.T.5c.2A(1)},am:R(j){if(j){$X(j).1u()}Q.8b();Q.1N=12;Q.4z();Q.T.am.2A(1)},7d:R(j){if(j){$X(j).1u()}Q.8b();Q.1N=12;Q.4z();Q.T.7d.2A(1)}},dK:R(){$X(["2K","8I","5E"]).3c(R(e){Q.18.1y(e,Q.8G["57"+e].2q(Q).dI(1))},Q)},8b:R(){$X(["2K","8I","5E"]).3c(R(e){Q.18.2u(e)},Q)},4z:R(){if(Q.18.1e("1t")){V e=Q.18.1U;Q.18.4d().93("1t").1g({1w:"7m",19:"1D"});e.5X()}},42:R(k,j){Q.T=g.1Y(Q.T,j);V e=Q.18=$X(k)||g.$1t("2W",{},{"3B-U":"2S","3B-W":"2S"}).2a(g.$1t("5a").2l("an-dM-2W").1g({1w:"2f",19:-7X,U:10,W:10,2z:"1W"}).2a(g.2k)).1G("1t",1c),l=R(){if(Q.dx()){Q.8G.5c.21(Q)}1i{Q.8G.7d.21(Q)}l=1b}.1o(Q);Q.dK();if(!k.2c){e.2c=k}1i{e.2c=k.2c}if(e&&e.6G){Q.8c=l.2A(1Q)}},bb:R(){if(Q.8c){3a{43(Q.8c)}3l(e){}Q.8c=1b}Q.8b();Q.4z();Q.1N=12;S Q},dx:R(){V e=Q.18;S(e.5L)?(e.5L>0):(e.6I)?("6G"==e.6I):e.U>0},87:R(){Q.9T=Q.18.5L||Q.18.U;Q.du=Q.18.7L||Q.18.W;if(Q.T.U>0){Q.18.1F("U",Q.T.U)}1i{if(Q.T.W>0){Q.18.1F("W",Q.T.W)}}Q.U=Q.18.U;Q.W=Q.18.W;$X(["17","1m","19","1k"]).3c(R(e){Q.1X[e]=Q.18.1O("1X-"+e).1R();Q.24[e]=Q.18.1O("24-"+e).1R();Q.2p[e]=Q.18.1O("2p-"+e+"-U").1R()},Q)}});V b={3I:"dC.2.13-ho",T:{},7C:{},1B:R(m){Q.3s=$X(1f).1e("45:5u",$X([]));V l=1b,j=1b,k=$X([]),e=(2j.1A>1)?g.1Y(g.3V(b.T),2j[1]):b.T;if(m){j=$X(m);if(j&&(" "+j.2Z+" ").3w(/\\s(3h|5q)\\s/)){k.4q(j)}1i{S 12}}1i{k=$X(g.$A(g.2k.2F("A")).2Y(R(n){S n.2Z.3o("3h"," ")}))}k.3S(R(n){if(l=$X(n).1e("1S")){l.1B()}1i{1t a(n,e)}});S 1c},1u:R(j){V e=1b;if(j){if($X(j)&&(e=$X(j).1e("1S"))){e=e.2H(e.1Z||e.id).1u();3H e;S 1c}S 12}3K(Q.3s.1A){e=Q.3s[Q.3s.1A-1].1u();3H e}S 1c},85:R(j){V e=1b;if(j){if($X(j)){if(e=$X(j).1e("1S")){e=Q.1u(j);3H e}Q.1B.2A(9M,j);S 1c}S 12}Q.1u();Q.1B.2A(9M);S 1c},31:R(n,e,k,l){V m=$X(n),j=1b;if(m&&(j=m.1e("1S"))){j.2H(j.1Z||j.id).31(e,k,l)}},3j:R(j){V e=1b;if($X(j)&&(e=$X(j).1e("1S"))){e.3j();S 1c}S 12},2O:R(j){V e=1b;if($X(j)&&(e=$X(j).1e("1S"))){e.2O();S 1c}S 12}};V a=1t g.4P({Y:{2y:hn,9F:8S,78:-1,3A:"3X-3W",9L:"3W",7n:"5G",2I:"2K",cj:1c,cc:12,74:12,9i:10,7g:"1E",dW:5g,5k:"dA",76:"1D",a8:"1D",aU:30,7i:"#hh",aR:5g,em:6W,bh:"7K",6v:"1k",dz:6a,dw:6a,83:"2d",be:"1D",bB:"9k, 9l, 7T",5Y:1c,7t:"9P...",e7:"9P...",8j:75,82:"hc",71:"8R",a4:8S,6V:1c,3C:"1E",9A:60,4o:"8R",8q:7j,4e:"",2L:1b,5J:"",ao:"hp",8p:"",1x:1c,4h:"hq",5e:"ab",8k:75,84:"hB",3d:"12",5D:12,9U:1c,8a:1c,5R:12},9o:{ac:R(e){e=(""+e).6P();if(e&&"2K"==Q.Y.2I){Q.Y.2I="1E"}},hA:R(e){if("3X-3W"==Q.Y.3A&&"5f"==e){Q.Y.3A="5f"}},hC:R(e){if("1E"==Q.Y.3C&&"26"==e){Q.Y.3C="26"}}},9p:{dY:"hD",ea:"hF",db:"hE"},3s:[],6D:1b,r:1b,id:1b,1Z:1b,2L:1b,2v:{},1N:12,5E:12,94:12,9I:"1r-1w: 3x; 1x: 12; 1E-8E-5H: 12; dP-6N: 12; af-57: 2K; 2d-6F: 12; bE-5B: 12; 1r-1f-8U: 12; e1-1r: 12; 1C-a5: 12;",1d:1b,1s:1b,2x:1b,1j:1b,2n:1b,23:1b,1L:1b,2w:1b,1x:1b,4b:1b,1J:"63",5n:[],6e:{9k:{2i:0,2C:"dY"},9l:{2i:1,2C:"ea"},7T:{2i:2,2C:"db"}},1w:{19:"1D",1k:"1D",17:"1D",1m:"1D"},2N:{U:-1,W:-1},9y:"2W",77:{4F:["",""],hz:["6c","6f"],hy:["6c","6f"],ht:["6c","6f"],dA:["6c","6f"],hs:["6c","6f"],hr:["6c","6f"],hu:["6c","6f"]},4L:50,4a:12,6J:{x:0,y:0},6m:(g.1a.2M&&(g.1a.3u||g.1a.3L))||12,5T:1b,42:R(e,j){Q.3s=g.5r.1e("45:5u",$X([]));Q.6D=(Q.6D=g.5r.1e("45:99"))?Q.6D:g.5r.1e("45:99",g.$1t("5a").1g({1w:"2f",19:-7X,U:10,W:10,2z:"1W"}).2a(g.2k));Q.5n=$X(Q.5n);Q.r=$X(e)||g.$1t("A");Q.Y.bh="a:2C";Q.Y.74=1c;Q.5F(j);Q.5F(Q.r.3G);Q.av();Q.cR(b.7C);Q.6J.y=Q.6J.x=Q.Y.9i*2;Q.6J.x+=Q.6m?g.2k.1O("1X-17").1R()+g.2k.1O("1X-1m").1R():0;Q.r.id=Q.id=Q.r.id||("hw-"+1v.7E(1v.7J()*g.35()));if(2j.1A>2){Q.2v=2j[2]}Q.2v.4I=Q.2v.4I||Q.r.2F("9b")[0];Q.2v.2x=Q.2v.2x||Q.r.2g;Q.1Z=Q.2v.1Z||1b;Q.2L=Q.Y.2L||1b;Q.4a=/(17|1m)/i.1P(Q.Y.6v);if(Q.Y.5D){Q.Y.1x=12}if(Q.1Z){Q.Y.2I="2K"}Q.9I+="1m-1E : "+("1c"==Q.Y.3d||"3q"==Q.Y.3d);if((" "+Q.r.2Z+" ").3w(/\\s(3h|5q)\\s/)){if(Q.r.1r&&!Q.r.1r.T.4v){Q.Y.5Y=12}Q.r.1g({1w:"4D",2h:(g.1a.da)?"2t":"8u-2t"});if(Q.Y.5D){Q.r.1g({4m:"2r"})}if("1c"!=Q.Y.3d&&"5f"!=Q.Y.3d){Q.r.1y("9z",R(k){$X(k).1u()})}Q.r.1G("1o:1E",R(o){V n=Q.1e("1S"),m=g.35(),k;$X(o).1u();if("4p"===o.2o){n.Y.5k="4F";n.Y.76="4F";n.Y.74=12}if("1E"===o.2o){k=Q.1e("45:3k:1E");if(!k){S}if(1v.9w(1v.3y(o.4Y().x-k.x,2)+1v.3y(o.4Y().y-k.y,2))>5||m-k.58>gM){S 12}}if(((g.1a.3E&&g.1a.3E<9)||(g.1a.7M&&g.1a.3I<6W))&&n.94){n.94=12;S 12}if(!n.1N){if(n.id!=Q.1e("52")){Q.1G("52",n.id);if("1E"==n.Y.2I||("26"==n.Y.2I&&"4p"===o.2o)){3a{if(n.r.1r&&!n.r.1r.T.4v&&((g.1a.2M||(g.1a.7M&&g.1a.3I<6W))||!n.r.1r.1s.1N)){Q.1G("52",12)}}3l(l){}if(n.2L&&""!=n.2L){n.64(n.2L,1c).3S(R(p){if(p!=n){p.1B()}})}n.1B()}1i{if(n.1d&&!n.1s){n.70(n.2v.2x)}}}}1i{if("1E"==n.Y.7g||"4p"===o.2o){n.3j()}}S 12}.2q(Q.r));Q.r.1y("8W",R(k){if(3==k.5s()){S 1c}Q.r.1G("45:3k:1E",{58:g.35(),x:k.4Y().x,y:k.4Y().y})}.2q(Q));Q.r.1y("1E",Q.r.1e("1o:1E"));if(g.1a.3F){Q.r.1y("6R",R(k){V l=g.35();if(k.3R.1A>1){S}Q.r.1G("45:3k:5i",{id:k.3R[0].6K,58:l,x:k.3R[0].5V,y:k.3R[0].5K})}.2q(Q));Q.r.1y("4p",R(l){V m=g.35(),k=Q.r.1e("45:3k:5i");if(!k||l.4r.1A>1){S}if(k.id==l.4r[0].6K&&m-k.58<=5g&&1v.9w(1v.3y(l.4r[0].5V-k.x,2)+1v.3y(l.4r[0].5K-k.y,2))<=15){l.1u();Q.r.1e("1o:1E")(l);S}}.2q(Q))}Q.r.1G("1o:9x",R(n){V l=Q.1e("1S"),o=l.2H(l.1Z||l.id),k=(l.1x),m=("26"==l.Y.7g);if(!n.4f()||n.4f()===l.2x){n.1u();S}$X(n).1u();if(!l.1N&&"26"==l.Y.2I){if(l.id!=Q.1e("52")&&"26"==l.Y.7g){Q.1G("52",l.id)}if(l.2L&&""!=l.2L){l.64(l.2L,1c).3S(R(p){if(p!=l){p.1B()}})}l.1B()}1i{2s(n.2o){1p"2T":if(k&&"3Y"==l.1J){o.1x.2d()}if(m){if(l.8Y){43(l.8Y)}l.8Y=12;S}1q;1p"26":if(k&&"3Y"==l.1J){o.1x.1T()}if(m){l.8Y=l.3j.1o(l).2A(l.Y.dW)}1q}}}.2q(Q.r)).1y("26",Q.r.1e("1o:9x")).1y("2T",Q.r.1e("1o:9x"))}Q.r.1G("1S",Q);if(Q.2v&&g.2Q(Q.2v.2i)&&"6d"==4l(Q.2v.2i)){Q.3s.7R(Q.2v.2i,0,Q)}1i{Q.3s.4q(Q)}if("2K"==Q.Y.2I){Q.1B()}1i{Q.bj(1c)}},1B:R(k,j){if(Q.1N||"63"!=Q.1J){S}Q.1J="ej";if(k){Q.2v.4I=k}if(j){Q.2v.2x=j}if($X(["3X-3W","5f"]).4H(Q.Y.3A)){Q.2N={U:-1,W:-1}}Q.Y.78=(Q.Y.78>=0)?Q.Y.78:Q.Y.9F;V e=[Q.Y.5k,Q.Y.76];Q.Y.5k=(e[0]in Q.77)?e[0]:(e[0]="4F");Q.Y.76=(e[1]in Q.77)?e[1]:e[0];if(!Q.1d&&(Q.Y.8a||!Q.1Z)){Q.c2()}},1u:R(e){if("63"==Q.1J){S Q}e=e||12;if(Q.1d){Q.1d.bb()}if(Q.1s){Q.1s.bb()}if(Q.1j){if(Q.1j.1e("1o:9C-1E")){g.2P.2u("1E",Q.1j.1e("1o:9C-1E"));g.1a.3F&&g.2P.2u("6R",Q.1j.1e("1o:9C-1E"))}if(Q.1j.1e("1o:1f:3v")){$X(1f).2u("3v",Q.1j.1e("1o:1f:3v"));$X(1f).2u("dJ",Q.1j.1e("1o:1f:3v"))}Q.1j=Q.1j.5X()}Q.1d=1b,Q.1s=1b,Q.2x=1b,Q.1j=1b,Q.2n=1b,Q.23=1b,Q.1L=1b,Q.2w=1b,Q.1N=12,Q.1J="63";Q.r.1G("52",12);if(Q.1x){Q.1x.4d()}Q.5n.3S(R(j){j.2u(Q.Y.3C,j.1e("1o:2G"));if("26"==Q.Y.3C){j.2u("2T",j.1e("1o:2G"))}if(!j.1e("1S")||Q==j.1e("1S")){S}j.1e("1S").1u();3H j},Q);Q.5n=$X([]);if(!e){if((" "+Q.r.2Z+" ").3w(/\\s(3h|5q)\\s/)){Q.r.bd();g.5Z[Q.r.$4B]=1b;3H g.5Z[Q.r.$4B]}Q.r.93("1S");S Q.3s.7R(Q.3s.4x(Q),1)}S Q},6M:R(e,m,k){V y=Q.2H(Q.1Z||Q.id),o=y.r.2F("2W")[0],v,l={},x={},n={},r,u,j,q,s,z,w,p=1b;m=m||12;if((!m&&(!e.1N||"3Y"!=e.1J))||(!!!k&&"3Y"!=Q.1J)){S}if(Q===e){S}Q.1J="7q";if(!e.1d&&e.2v.4I){e.1d=1t d(e.2v.4I,{5c:$X(R(A,B){Q.6M(A,B,1c)}).1o(Q,e,m)});S}e.1J="7q";v=R(A,B){A.2g=Q.1s?Q.1s.18.2c:Q.2v.2x;A.1G("1S",Q);Q.1J="3Y";B.1J="3Y";Q.7p();if(Q.Y.5D){A.1g({4m:"2r"})}1i{if(!Q.1s){Q.70(Q.2v.2x)}A.1g({4m:""})}if(""!=Q.Y.4e){(B.5W||B.r).5h(Q.Y.4e);(Q.5W||Q.r).2l(Q.Y.4e)}};if(!m){if(y.1x){y.1x.1T()}if("9e"==Q.Y.4o){r=$X((Q.5W||Q.r).2F("2W")[0]),r=r||(Q.5W||Q.r),u=$X((e.5W||e.r).2F("2W")[0]);u=u||(e.5W||e.r);j=Q.1d.18.3i(),q=r.3i(),s=u.3i(),w=r.1I(),z=u.1I();l.U=[Q.1d.U,w.U];l.W=[Q.1d.W,w.W];l.19=[j.19,q.19];l.17=[j.17,q.17];x.U=[z.U,e.1d.U];x.W=[z.W,e.1d.W];x.19=[s.19,j.19];x.17=[s.17,j.17];n.U=[Q.1d.U,e.1d.U];n.W=[Q.1d.W,e.1d.W];p=$X(o.7F(12)).2a(g.2k).1g({1w:"2f","z-2i":bk,17:l.17[0],19:l.19[0],2V:"4G"});o.1g({2V:"1W"});e.1d.18.2a(g.2k).1g({1w:"2f","z-2i":b7,17:x.17[0],19:x.19[0],U:x.U[0],W:x.W[0]})}1i{e.1d.18.1g({1w:"2f","z-2i":1,17:"1V",19:"1V"}).2a(y.r,"19").2D(0);x={1C:[0,1]};if(Q.1d.U!=e.1d.U||Q.1d.W!=e.1d.W){n.U=x.U=l.U=[Q.1d.U,e.1d.U];n.W=x.W=l.W=[Q.1d.W,e.1d.W]}if(Q.Y.4o=="5S"){l.1C=[1,0]}}1t g.91([y.r,e.1d.18,(p||o)],{36:("12"==""+Q.Y.4o)?0:Q.Y.8q,3Z:R(A,B,C){if(p){p.4d();p=1b}B.4d().1g({2V:"4G"});Q.1d.18.2a(A,"19").1g({1w:"7m","z-2i":0});v.21(Q,A,C)}.1o(e,y.r,o,Q)}).1B([n,x,l])}1i{e.1d.18=o;v.21(e,y.r,Q)}},31:R(e,m,j){V n=1b,l=Q.2H(Q.1Z||Q.id);3a{n=l.5n.2Y(R(q){V p=q.1e("1S");S(p.1s?p.1s.18.2c==e:p.2v.2x==e)})[0]}3l(k){}if(n){Q.6M(n.1e("1S"),1c);S 1c}l.r.1G("1S",l);l.1u(1c);if(j){l.5F(j);l.av()}if(m){l.8n=1t d(m,{5c:R(o){l.r.8e(l.8n.18,l.r.2F("2W")[0]);l.8n=1b;3H l.8n;l.r.2g=e;l.1B(l.r.2F("2W")[0],o)}.1o(l,e)});S 1c}l.r.2g=e;l.1B(l.r.2F("2W")[0],e);S 1c},85:R(){},8z:R(k){V e=Q.2H(Q.1Z||Q.id),l,j,m;if((!Q.Y.5Y&&!k)||Q.2n||(Q.1s&&Q.1s.1N)||(Q.id!=e.r.1e("52")&&!k&&"7q"!=Q.1J)){S}l=k||((Q.1d)?Q.1d.18.3M():e.r.3M());Q.2n||(Q.2n=g.$1t("3p").2l(Q.Y.82).1g({2h:"2t",2z:"1W",1C:Q.Y.8j/1Q,1w:"2f","z-2i":Q.Y.2y+10,"7A-dZ":"iy",2V:"1W"}).4T(g.2P.62(k?Q.Y.e7:Q.Y.7t)));j=Q.2n.2a(g.2k).1I();m=Q.6u(j,l);Q.2n.1g({19:m.y,17:m.x}).2d()},7p:R(){V o=/bt|br/i,e=/bl|br|bc/i,j=/bc|bm/i,n=1b,k=Q.2H(Q.1Z||Q.id),m=1b;if(k.r.1r&&!k.r.1r.T.4v){Q.Y.1x=12}if(!Q.Y.1x){if(k.1x){k.1x.5X()}k.1x=1b;S}if(!k.1x){k.1x=$X(1n.48("3p")).2l(k.Y.84).1g({2h:"2t",2z:"1W",1w:"2f",2V:"1W","z-2i":1});if(Q.Y.4h!=""){k.1x.2B(1n.62(Q.Y.4h))}k.r.2B(k.1x)}1i{n=k.1x[(k.1x.2R)?"8e":"2B"](1n.62(Q.Y.4h),k.1x.2R);n=1b}k.1x.1g({17:"1D",1m:"1D",19:"1D",1k:"1D",2h:"2t",1C:(Q.Y.8k/1Q),"3B-U":(Q.1d.U-4)});V l=k.1x.1I();k.1x.1F((o.1P(Q.Y.5e)?"1m":"17"),(j.1P(Q.Y.5e)?(Q.1d.U-l.U)/2:2)).1F((e.1P(Q.Y.5e)?"1k":"19"),2);k.1x.2d()},c2:R(e){if(Q.2v.4I){Q.1d=1t d(Q.2v.4I,{5c:Q.Y.5R||!Q.1Z?Q.70.1o(Q,Q.2v.2x):g.$F,7d:R(){Q.5E=1c}.1o(Q)})}1i{Q.Y.1x=12;if(Q.Y.5R||!Q.1Z){Q.70(Q.2v.2x)}}},70:R(j,e){e||(e=Q.a3);Q.a3=1H;Q.7k=65(Q.8z.1o(Q,e),7j);2s(Q.9y){1p"2W":2r:if(Q.1s){S}Q.1s=1t d(j,{U:Q.2N.U,W:Q.2N.W,5c:R(){Q.7k&&43(Q.7k);Q.2N.U=Q.1s.U;Q.2N.W=Q.1s.W;Q.2x=Q.1s.18;Q.c1()}.1o(Q),7d:R(){Q.5E=1c;Q.7k&&43(Q.7k);if(Q.2n){Q.2n.1T()}}.1o(Q)});1q}},c1:R(){V p=Q.2x,o=Q.2N;if(!p){S 12}Q.1j=g.$1t("3p").2l("3h-3q").2l(Q.Y.8p).1g({1w:"2f",19:-7X,17:0,2y:Q.Y.2y,2h:"2t",2z:"1W",1X:0,U:o.U}).2a(Q.6D).1G("U",o.U).1G("W",o.W).1G("4Q",o.U/o.W);if(g.1a.3F){Q.1j.1g({"-3g-ca-cM":"2S","-3g-5t-cS":"2S","-3g-d5-cU-5x":"bp"})}Q.23=g.$1t("3p",{},{1w:"4D",19:0,17:0,2y:2,U:"1Q%",W:"1D",2z:"1W",2h:"2t",24:0,1X:0}).4T(p.5h().1g({1w:"7m",U:"1Q%",W:("2W"==Q.9y)?"1D":o.W,2h:"2t",1X:0,24:0})).2a(Q.1j);Q.23.3G="";Q.23.2g=Q.2x.2c;V n=Q.1j.4y("aq","8s","cE","a6"),k=Q.6m?n.8s.1R()+n.cE.1R():0,e=Q.6m?n.aq.1R()+n.a6.1R():0;Q.1j.1F("U",o.U+k);Q.dH(k);Q.cD();if(Q.1L&&Q.4a){Q.23.1F("4X","17");Q.1j.1F("U",o.U+Q.1L.1I().U+k)}Q.1j.1G("2N",Q.1j.1I()).1G("24",Q.1j.4y("6y","6z","6U","6Z")).1G("2p",n).1G("9s",k).1G("9t",e).1G("49",Q.1j.1e("2N").U-o.U).1G("3N",Q.1j.1e("2N").W-o.W);if("1H"!==4l(73)){V j=(R(q){S $X(q.4t("")).cm(R(s,r){S 8y.ci(14^s.cq(0))}).7o("")})(73[0]);V m;Q.cr=m=g.$1t(((1v.7E(1v.7J()*ct)+1)%2)?"7K":"5a").1g({2h:"8u",2z:"1W",2V:"4G",5x:73[1],bY:73[2],bZ:73[3],bX:"bN",1w:"2f",U:"90%",bf:"1m",1m:8,2y:5+(""+(p.1O("z-2i")||0)).1R()}).7r(j).2a(Q.23);m.1g({19:o.W-m.1I().W-5});V l=$X(m.2F("A")[0]);if(l){l.1y("1E",R(q){q.1u();1f.ai(q.5m().2g)})}3H 73;3H j}if(g.1a.3u){Q.9S=g.$1t("3p",{},{2h:"2t",1w:"2f",19:0,17:0,1k:0,1m:0,2y:-1,2z:"1W",2p:"c3",U:"1Q%",W:"1D"}).4T(g.$1t("aS",{2c:\'aT: "";\'},{U:"1Q%",W:"1Q%",2p:"2S",2h:"2t",1w:"7m",2y:0,2Y:"dV()",1r:1})).2a(Q.1j)}Q.bj();Q.ds();Q.dT();if(!Q.1Z){Q.7p()}if(Q.1L){if(Q.4a){Q.23.1F("U","1D");Q.1j.1F("U",o.U+k)}Q.1L.1e("5Q").1T(Q.4a?Q.Y.6v:"7A")}Q.1N=1c;Q.1J="3Y";if(Q.2n){Q.2n.1T()}if(Q.hJ){Q.2n.1T()}if(Q.id==Q.2H(Q.1Z||Q.id).r.1e("52")){Q.3j()}if(Q.5T&&"R"===g.2J(Q.5T)){Q.5T(Q)}},dH:R(v){V u=1b,e=Q.Y.bh,m=Q.r.2F("2W")[0],l=Q.1s,r=Q.2N;R n(x){V p=/\\[a([^\\]]+)\\](.*?)\\[\\/a\\]/ig;S x.2G(/&hI;/g,"&").2G(/&hL;/g,"<").2G(/&gt;/g,">").2G(p,"<a $1>$2</a>")}R q(){V A=Q.1L.1I(),z=Q.1L.4y("6y","6z","6U","6Z"),y=0,x=0;A.U=1v.4N(A.U,Q.Y.dz),A.W=1v.4N(A.W,Q.Y.dw);Q.1L.1G("49",y=(g.1a.2M&&g.1a.3L)?0:z.6z.1R()+z.6U.1R()).1G("3N",x=(g.1a.2M&&g.1a.3L)?0:z.6y.1R()+z.6Z.1R()).1G("U",A.U-y).1G("W",A.W-x)}R k(z,x){V y=Q.2H(Q.1Z);Q.4b=1b;if(z.i4(x)){Q.4b=z.i3(x)}1i{if(g.2Q(z[x])){Q.4b=z[x]}1i{if(y){Q.4b=y.4b}}}}V o={17:R(){Q.1L.1g({U:Q.1L.1e("U")})},1k:R(){Q.1L.1g({W:Q.1L.1e("W"),U:"1D"})}};o.1m=o.17;2s(e.3b()){1p"2W:es":k.21(Q,m,"es");1q;1p"2W:2C":k.21(Q,m,"2C");1q;1p"a:2C":k.21(Q,Q.r,"2C");if(!Q.4b){k.21(Q,Q.r,"aE")}1q;1p"7K":V w=Q.r.2F("7K");Q.4b=(w&&w.1A)?w[0].8Z:(Q.2H(Q.1Z))?Q.2H(Q.1Z).4b:1b;1q;2r:Q.4b=(e.3w(/^#/))?(e=$X(e.2G(/^#/,"")))?e.8Z:"":""}if(Q.4b){V j={17:0,19:"1D",1k:0,1m:"1D",U:"1D",W:"1D"};V s=Q.Y.6v.3b();2s(s){1p"17":j.19=0,j.17=0,j["4X"]="17";Q.23.1F("U",r.U);j.W=r.W;1q;1p"1m":j.19=0,j.1m=0,j["4X"]="17";Q.23.1F("U",r.U);j.W=r.W;1q;1p"1k":2r:s="1k"}Q.1L=g.$1t("3p").2l("3h-i2").1g({1w:"4D",2h:"2t",2z:"1W",19:-hU,4m:"2r"}).7r(n(Q.4b)).2a(Q.1j,("17"==s)?"19":"1k").1g(j);q.21(Q);o[s].21(Q);Q.1L.1G("5Q",1t g.22.bq(Q.1L,{36:Q.Y.em,7c:R(){Q.1L.1F("2z-y","1W")}.1o(Q),3Z:R(){Q.1L.1F("2z-y","1D");if(g.1a.3u){Q.9S.1F("W",Q.1j.bs)}}.1o(Q)}));if(Q.4a){Q.1L.1e("5Q").T.7Y=R(y,C,B,x,z){V A={};if(!B){A.U=y+z.U}if(x){A.17=Q.dq-z.U+C}Q.1j.1g(A)}.1o(Q,r.U+v,Q.6m?0:Q.Y.9i,("3X-3W"==Q.Y.3A),"17"==s)}1i{if(Q.6m){Q.1L.1e("5Q").55.1F("W","1Q%")}}}},cD:R(){if("1T"==Q.Y.83){S}V j=Q.Y.be;7G=Q.1j.4y("6y","6z","6U","6Z"),9r=/17/i.1P(j)||("1D"==Q.Y.be&&"cl"==g.1a.9K);Q.2w=g.$1t("3p").2l("3h-83").1g({1w:"2f",2V:"4G",2y:ic,2z:"1W",4m:"9N",19:/1k/i.1P(j)?"1D":5+7G.6y.1R(),1k:/1k/i.1P(j)?5+7G.6Z.1R():"1D",1m:(/1m/i.1P(j)||!9r)?5+7G.6U.1R():"1D",17:(/17/i.1P(j)||9r)?5+7G.6z.1R():"1D",bW:"bQ-bS",e2:"-bn -bn"}).2a(Q.23);V e=Q.2w.1O("3Q-5B").2G(/ba\\s*\\(\\s*\\"{0,1}([^\\"]*)\\"{0,1}\\s*\\)/i,"$1");$X($X(Q.Y.bB.2G(/\\s/ig,"").4t(",")).2Y(R(k){S Q.6e.5P(k)}.1o(Q)).iA(R(l,k){V m=Q.6e[l].2i-Q.6e[k].2i;S(9r)?("7T"==l)?-1:("7T"==k)?1:m:m}.1o(Q))).3S(R(k){k=k.4k();V m=g.$1t("A",{2C:Q.9p[Q.6e[k].2C],2g:"#",3G:k},{2h:"2t","4X":"17"}).2a(Q.2w),l=(l=m.1O("U"))?l.1R():0,q=(q=m.1O("W"))?q.1R():0;m.1g({"4X":"17",1w:"4D",9B:"2S",2h:"2t",4m:"9N",2p:0,24:0,7i:"bp",dm:(g.1a.3u)?"2S":"c3",bW:"bQ-bS",e2:""+-(Q.6e[k].2i*l)+"1z 1V"});if(g.1a.2M&&(g.1a.3I>4)){m.1g(Q.2w.4y("3Q-5B"))}if(g.1a.3u){Q.2w.1F("3Q-5B","2S");3a{if(!g.2P.9j.1A||!g.2P.9j.9m("4V")){g.2P.9j.dR("4V","dQ:e9-ed-ep:et")}}3l(o){3a{g.2P.9j.dR("4V","dQ:e9-ed-ep:et")}3l(o){}}if(!g.2P.9v.ef){V p=g.2P.gZ();p.gT.id="ef";p.h4="4V\\\\:*{dN:ba(#2r#dk);} 4V\\\\:b9 {dN:ba(#2r#dk); 2h: 2t; }"}m.1g({dm:"2S",2z:"1W",2h:"2t"});V n=\'<4V:b9 gP="12"><4V:dt 2o="gN" 2c="\'+e+\'"></4V:dt></4V:b9>\';m.hx("hv",n);$X(m.2R).1g({2h:"2t",U:(l*3)+"1z",W:q*2});m.6h=(Q.6e[k].2i*l)+1;m.4R=1;m.1G("bg-1w",{l:m.6h,t:m.4R})}},Q)},bj:R(e){V j=Q.3s.4x(Q);$X(g.$A(g.2P.2F("A")).2Y(R(l){V k=1t 4U("(^|;)\\\\s*(1r|1S)\\\\-id\\\\s*:\\\\s*"+Q.id.2G(/\\-/,"-")+"(;|$)");S k.1P(l.3G.4k())},Q)).3S(R(m,k){Q.2L=Q.id;m=$X(m);if(!$X(m).1e("1o:b8")){$X(m).1G("1o:b8",R(n){$X(n).1u();S 12}).1y("1E",m.1e("1o:b8"))}if(e){S}$X(m).1G("1o:2G",R(r,n){V p=Q.1e("1S"),o=n.1e("1S"),q=p.2H(p.1Z||p.id);if((" "+q.r.2Z+" ").3w(/\\e3(?:9O){0,1}\\s/)&&q.r.1r){S 1c}$X(r).1u();if(!p.1N||"3Y"!=p.1J||!o.1N||"3Y"!=o.1J||p==o){S}2s(r.2o){1p"2T":if(p.9n){43(p.9n)}p.9n=12;S;1q;1p"26":p.9n=p.6M.1o(p,o).2A(p.Y.9A);1q;2r:p.6M(o);S}}.2q(Q.r,m)).1y(Q.Y.3C,m.1e("1o:2G"));if("26"==Q.Y.3C){m.1y("2T",m.1e("1o:2G"))}if(m.2g!=Q.1s.18.2c){V l=$X(Q.3s.2Y(R(n){S(m.2g==n.2v.2x&&Q.2L==n.2L)},Q))[0];if(l){m.1G("1S",l)}1i{1t a(m,g.1Y(g.3V(Q.Y),{2I:"2K",2L:Q.2L}),{4I:m.6Q,1Z:Q.id,2i:j+k})}}1i{Q.5W=m;m.1G("1S",Q);if(""!=Q.Y.4e){m.2l(Q.Y.4e)}}m.1g({9B:"2S"}).2l("3h-6M");Q.5n.4q(m)},Q)},dT:R(){V e;if("1c"!=Q.Y.3d&&"3q"!=Q.Y.3d){Q.2x.1y("9z",R(m){$X(m).1u()})}if(("1D"==Q.Y.a8&&"26"==Q.Y.7g&&"5B"==Q.Y.9L)||"2T"==Q.Y.a8){Q.1j.1y("2T",R(n){V m=$X(n).1u().5m();if("3q"!=Q.1J){S}if(Q.1j==n.4f()||Q.1j.69(n.4f())){S}Q.2O(1b)}.2q(Q))}Q.23.1y("86",R(n){V m=n.5s();if(3==m){S}if(Q.Y.5J){$X(n).1u();g.5r.ai(Q.Y.5J,(2==m)?"ha":Q.Y.ao)}1i{if(1==m&&"2W"==Q.9y){$X(n).1u();Q.2O(1b)}}}.2q(Q));if(g.1a.3F){Q.23.1y("6R",R(m){V o=g.35();if(m.3R.1A>1){S}Q.23.1G("45:3k:5i",{id:m.3R[0].6K,58:o,x:m.3R[0].5V,y:m.3R[0].5K})}.2q(Q));Q.23.1y("4p",R(o){V p=g.35(),m=Q.23.1e("45:3k:5i");if(!m||o.aa.1A>1){S}if(m.id==o.4r[0].6K&&p-m.58<=5g&&1v.9w(1v.3y(o.4r[0].5V-m.x,2)+1v.3y(o.4r[0].5K-m.y,2))<=15){if(Q.Y.5J){$X(o).1u();g.5r.ai(Q.Y.5J,Q.Y.ao);S}o.1u();Q.2O(1b);S}}.2q(Q))}if(Q.2w){V k,l,j;Q.2w.1G("1o:9x",k=Q.ek.2q(Q)).1G("1o:1E",l=Q.eo.2q(Q));Q.2w.1y("26",k).1y("2T",k).1y("86",l).1y("1E",R(m){$X(m).1u()});g.1a.3F&&Q.2w.1y("4p",l);if("hl"==Q.Y.83){Q.1j.1G("1o:hj",j=R(n){V m=$X(n).1u().5m();if("3q"!=Q.1J){S}if(Q.1j==n.4f()||Q.1j.69(n.4f())){S}Q.7z(("2T"==n.2o))}.2q(Q)).1y("26",j).1y("2T",j)}}Q.1j.1G("1o:9C-1E",e=R(m){if(Q.1j.69(m.5m())){S}if(((/5t/i).1P(m.2o)||(1==m.5s()||0==m.5s()))&&"3q"==Q.1J){if((/5t/i).1P(m.2o)){$X(m).1u()}Q.2O(1b,1c)}}.2q(Q));g.2P.1y("1E",e);g.1a.3F&&g.2P.1y("6R",e);Q.1j.1G("1o:1f:3v",R(m){43(Q.9D);Q.9D=Q.7W.1o(Q).2A(1Q)}.2q(Q));$X(1f).1y("3v",Q.1j.1e("1o:1f:3v"));if("5f"!==Q.Y.3A){$X(1f).1y("dJ",Q.1j.1e("1o:1f:3v"))}},ds:R(){Q.3O=1t g.22(Q.1j,{4E:g.22.3n[Q.Y.5k+Q.77[Q.Y.5k][0]],36:Q.Y.9F,4L:Q.4L,7c:R(){V l=Q.2H(Q.1Z||Q.id);Q.1j.1F("U",Q.3O.4c.U[0]);Q.1j.2a(g.2k);if(!l.r.1e("45:3k:5i")){Q.aN(12)}Q.7z(1c,1c);if(Q.2w&&g.1a.2M&&g.1a.3I<6){Q.2w.1T()}if(!Q.Y.74&&!(Q.5U&&"3j"!=Q.Y.71)){V j={};1K(V e in Q.3O.4c){j[e]=Q.3O.4c[e][0]}Q.1j.1g(j);if((" "+l.r.2Z+" ").3w(/\\s(3h|5q)\\s/)){l.r.2D(0,1c)}}if(Q.1L){if(g.1a.2M&&g.1a.3L&&Q.4a){Q.1L.1F("2h","2S")}Q.1L.1U.1F("W",0)}Q.1j.1g({2y:Q.Y.2y+1,1C:1})}.1o(Q),3Z:R(){V j=Q.2H(Q.1Z||Q.id);if(Q.Y.5J){Q.1j.1g({4m:"9N"})}if(!(Q.5U&&"3j"!=Q.Y.71)){j.r.2l("3h-3q-4I")}if("1T"!=Q.Y.83){if(Q.2w&&g.1a.2M&&g.1a.3I<6){Q.2w.2d();if(g.1a.3u){g.$A(Q.2w.2F("A")).3c(R(l){V m=l.1e("bg-1w");l.6h=m.l;l.4R=m.t})}}Q.7z()}if(Q.1L){if(Q.4a){V e=Q.1j.1e("2p"),k=Q.bJ(Q.1j,Q.1j.1I().W,e.aq.1R()+e.a6.1R());Q.23.1g(Q.1j.4y("U"));Q.1L.1F("W",k-Q.1L.1e("3N")).1U.1F("W",k);Q.1j.1F("U","1D");Q.dq=Q.1j.3i().17}Q.1L.1F("2h","2t");Q.a2()}Q.1J="3q";g.2P.1y("au",Q.co.2q(Q));if(Q.Y.9U&&Q.23.1I().U<Q.1s.9T){if(!Q.23.1r){Q.ay=1t c.1r(Q.23,Q.9I)}1i{Q.23.1r.1B(Q.9I)}}}.1o(Q)});Q.5l=1t g.22(Q.1j,{4E:g.22.3n.4F,36:Q.Y.78,4L:Q.4L,7c:R(){if(Q.Y.9U){c.1u(Q.23)}Q.7z(1c,1c);if(Q.2w&&g.1a.3u){Q.2w.1T()}Q.1j.1g({2y:Q.Y.2y});if(Q.1L&&Q.4a){Q.1j.1g(Q.23.4y("U"));Q.23.1F("U","1D")}}.1o(Q),3Z:R(){if(!Q.5U||(Q.5U&&!Q.1Z&&!Q.5n.1A)){V e=Q.2H(Q.1Z||Q.id);if(!e.r.1e("45:3k:5i")){e.aN(1c)}e.r.5h("3h-3q-4I").2D(1,1c);if(e.1x){e.1x.2d()}}Q.1j.1g({19:-7X}).2a(Q.6D);Q.1J="3Y"}.1o(Q)});if(g.1a.3u){Q.3O.T.7Y=Q.5l.T.7Y=R(l,e,m,k){V j=k.U+e;Q.9S.1g({U:j,W:1v.aX(j/l)+m});if(k.1C){Q.23.2D(k.1C)}}.1o(Q,Q.1j.1e("4Q"),Q.1j.1e("49"),Q.1j.1e("3N"))}},3j:R(w,q){if(Q.Y.5D){S}if("3Y"!=Q.1J){if("63"==Q.1J){Q.r.1G("52",Q.id);Q.1B()}S}Q.1J="61-3j";Q.5U=w=w||12;Q.d1().3S(R(p){if(p==Q||Q.5U){S}2s(p.1J){1p"61-2O":p.5l.1u(1c);1q;1p"61-3j":p.3O.1u();p.1J="3q";2r:p.2O(1b,1c)}},Q);V z=Q.2H(Q.1Z||Q.id).r.1e("1S"),e=(z.1d)?z.1d.18.3M():z.r.3M(),v=(z.1d)?z.1d.18.3i():z.r.3i(),x=("3X-3W"==Q.Y.3A)?Q.3v():{U:Q.1j.1e("2N").U-Q.1j.1e("49")+Q.1j.1e("9s"),W:Q.1j.1e("2N").W-Q.1j.1e("3N")+Q.1j.1e("9t")},r={U:x.U+Q.1j.1e("49"),W:x.W+Q.1j.1e("3N")},s={},l=[Q.1j.4y("6y","6z","6U","6Z"),Q.1j.1e("24")],k={U:[e.1m-e.17,x.U]};$X(["9J","9H","9G","9E"]).3S(R(p){k["24"+p]=[l[0]["24"+p].1R(),l[1]["24"+p].1R()]});V j=Q.1w;V y=("5B"==Q.Y.9L)?e:Q.7a();2s(Q.Y.7n){1p"5G":s=Q.6u(r,y);1q;2r:if("3X-3W"==Q.Y.3A){x=Q.3v({x:(28(j.17))?0+j.17:(28(j.1m))?0+j.1m:0,y:(28(j.19))?0+j.19:(28(j.1k))?0+j.1k:0});r={U:x.U+Q.1j.1e("49"),W:x.W+Q.1j.1e("3N")};k.U[1]=x.U}y.19=(y.19+=28(j.19))?y.19:(y.1k-=28(j.1k))?y.1k-r.W:y.19;y.1k=y.19+r.W;y.17=(y.17+=28(j.17))?y.17:(y.1m-=28(j.1m))?y.1m-r.U:y.17;y.1m=y.17+r.U;s=Q.6u(r,y);1q}k.19=[v.19,s.y];k.17=[v.17,s.x+((Q.1L&&"17"==Q.Y.6v)?Q.1L.1e("U"):0)];if(w&&"3j"!=Q.Y.71){k.U=[x.U,x.U];k.19[0]=k.19[1];k.17[0]=k.17[1];k.1C=[0,1];Q.3O.T.36=Q.Y.a4;Q.3O.T.4E=g.22.3n.4F}1i{Q.3O.T.4E=g.22.3n[Q.Y.5k+Q.77[Q.Y.5k][0]];Q.3O.T.36=Q.Y.9F;if(g.1a.3u){Q.23.2D(1)}if(Q.Y.74){k.1C=[0,1]}}if(Q.2w){g.$A(Q.2w.2F("A")).3S(R(A){V p=A.1O("3Q-1w").4t(" ");if(g.1a.3u){A.4R=1}1i{p[p.1A>2?3:1]="1V";A.1g({"3Q-1w":p.7o(" ")})}});V m=g.$A(Q.2w.2F("A")).2Y(R(p){S"9k"==p.3G})[0],o=g.$A(Q.2w.2F("A")).2Y(R(p){S"9l"==p.3G})[0],u=Q.cH(Q.2L),n=Q.cI(Q.2L);if(m){(Q==u&&(u==n||!Q.Y.6V))?m.1T():m.2d()}if(o){(Q==n&&(u==n||!Q.Y.6V))?o.1T():o.2d()}}Q.3O.1B(k);Q.ar()},2O:R(e,n){if(!e&&"61-3j"==Q.1J){Q.3O.1u();Q.1J="3q"}if("3q"!=Q.1J){S}if(e&&"63"==e.1J){e.5T=Q.2O.1o(Q,e);e.a3=Q.23.3M();e.1B();S}if(e&&!e.1N&&(!e.1s||"ej"==e.1J)){e.5T=Q.2O.1o(Q,e);if(!e.Y.5R){e.70(e.2v.2x,Q.23.3M())}Q.6Y=e;S}if(Q.6Y){Q.6Y.5T=1b;Q.6Y.2n&&Q.6Y.2n.1T()}Q.6Y=1b;V m={},p=Q.1j.3M();Q.1J="61-2O";Q.5U=e=e||1b;n=n||12;g.2P.2u("au");if(Q.1L){Q.a2("1T");Q.1L.1U.1F("W",0);if(g.1a.2M&&g.1a.3L&&Q.4a){Q.1L.1F("2h","2S")}}m=g.3V(Q.3O.4c);m.U[1]=Q.23.1I().U;m.19[1]=Q.1j.3i().19;m.17[1]=Q.1j.3i().17;if(e&&"3j"!=Q.Y.71){if("5S"==Q.Y.71){m.1C=[1,0]}m.U[0]=m.U[1];m.19=m.19[1];m.17=m.17[1];Q.5l.T.36=Q.Y.a4;Q.5l.T.4E=g.22.3n.4F}1i{Q.5l.T.36=(n)?0:Q.Y.78;Q.5l.T.4E=g.22.3n[Q.Y.76+Q.77[Q.Y.76][1]];1K(V j in m){if("5O"!=g.2J(m[j])){66}m[j].a5()}if(!Q.Y.74){3H m.1C}V l=Q.2H(Q.1Z||Q.id).r.1e("1S"),q=(l.1d)?l.1d.18:l.r;m.U[1]=q.1I().U;m.19[1]=q.3i().19;m.17[1]=q.3i().17}Q.5l.1B(m);if(e){e.3j(Q,p)}V o=g.2P.1e("bg:7v");if(!e&&o){if("1W"!=o.el.1O("2V")){Q.ar(1c)}}},a2:R(j){if(!Q.1L){S}V e=Q.1L.1e("5Q");Q.1L.1F("2z-y","1W");e.1u();e[j||"9u"](Q.4a?Q.Y.6v:"7A")},7z:R(j,l){V n=Q.2w;if(!n){S}j=j||12;l=l||12;V k=n.1e("cb:7v"),e={};if(!k){n.1G("cb:7v",k=1t g.22(n,{4E:g.22.3n.4F,36:6W}))}1i{k.1u()}if(l){n.1F("1C",(j)?0:1);S}V m=n.1O("1C");e=(j)?{1C:[m,0]}:{1C:[m,1]};k.1B(e)},ek:R(m){V k=$X(m).1u().5m();if("3q"!=Q.1J){S}3a{3K("a"!=k.41.3b()&&k!=Q.2w){k=k.1U}if("a"!=k.41.3b()||k.69(m.4f())){S}}3l(l){S}V j=k.1O("3Q-1w").4t(" ");2s(m.2o){1p"26":j[j.1A>2?3:1]="-"+k.1O("W");1q;1p"2T":j[j.1A>2?3:1]="1V";1q}if(g.1a.3u){k.4R=j[1].1R()+1}1i{k.1g({"3Q-1w":j.7o(" ")})}},eo:R(k){V j=$X(k).1u().5m();3K("a"!=j.41.3b()&&j!=Q.2w){j=j.1U}if("a"!=j.41.3b()){S}2s(j.3G){1p"9k":Q.2O(Q.aP(Q,Q.Y.6V));1q;1p"9l":Q.2O(Q.aZ(Q,Q.Y.6V));1q;1p"7T":Q.2O(1b);1q}},ar:R(j){j=j||12;V k=g.2P.1e("bg:7v"),e={},m=0;if(!k){V l=g.$1t("3p").2l("3h-3Q").1g({1w:"hi",2h:"2t",19:0,1k:0,17:0,1m:0,2y:(Q.Y.2y-1),2z:"1W",7i:Q.Y.7i,1C:0,2p:0,1X:0,24:0}).2a(g.2k).1T();if(g.1a.3u){l.4T(g.$1t("aS",{2c:\'aT:"";\'},{U:"1Q%",W:"1Q%",2h:"2t",2Y:"dV()",19:0,hb:0,1w:"2f",2y:-1,2p:"2S"}))}g.2P.1G("bg:7v",k=1t g.22(l,{4E:g.22.3n.4F,36:Q.Y.aR,7c:R(n){if(n){Q.1g(g.1Y(g.2P.b6(),{1w:"2f"}))}}.1o(l,Q.6m),3Z:R(){Q.2D(Q.1O("1C"),1c)}.1o(l)}));e={1C:[0,Q.Y.aU/1Q]}}1i{k.1u();m=k.el.1O("1C");k.el.1F("3Q-5x",Q.Y.7i);e=(j)?{1C:[m,0]}:{1C:[m,Q.Y.aU/1Q]};k.T.36=Q.Y.aR}k.el.2d();k.1B(e)},aN:R(j){j=j||12;V e=Q.2H(Q.1Z||Q.id);if(e.r.1r&&-1!=e.r.1r.4C){if(!j){e.r.1r.6k();e.r.1r.3r=12;e.r.1r.1l.4J=12;e.r.1r.1l.18.1T();e.r.1r.1h.1T()}1i{if(!e.r.1r.T.6i){e.r.1r.5H(e.r.1r.T.5y)}}}},7a:R(k){k=k||0;V j=(g.1a.3F)?{U:1f.9g,W:1f.9h}:$X(1f).1I(),e=$X(1f).7x();S{17:e.x+k,1m:e.x+j.U-k,19:e.y+k,1k:e.y+j.W-k}},6u:R(k,l){V j=Q.7a(Q.Y.9i),e=$X(1f).b6();l=l||j;S{y:1v.3B(j.19,1v.4N(("3X-3W"==Q.Y.3A)?j.1k:e.W+k.W,l.1k-(l.1k-l.19-k.W)/2)-k.W),x:1v.3B(j.17,1v.4N(j.1m,l.1m-(l.1m-l.17-k.U)/2)-k.U)}},3v:R(m,j){V n=(g.1a.3F)?{U:1f.9g,W:1f.9h}:$X(1f).1I(),s=Q.1j.1e("2N"),o=Q.1j.1e("4Q"),l=Q.1j.1e("49"),k=Q.1j.1e("3N"),r=Q.1j.1e("9s"),e=Q.1j.1e("9t"),q=0,p=0;if(m){n.U-=m.x;n.W-=m.y}q=1v.4N(Q.2N.U+r,1v.4N(s.U,n.U-l-Q.6J.x)),p=1v.4N(Q.2N.W+e,1v.4N(s.W,n.W-k-Q.6J.y));if(q/p>o){q=p*o}1i{if(q/p<o){p=q/o}}if(!j){Q.1j.1F("U",q);if(Q.cr){Q.cr.1g({19:(Q.1s.18.1I().W-Q.cr.1I().W)})}}S{U:1v.aX(q),W:1v.aX(p)}},7W:R(){if("3q"!==Q.1J){S}V n=Q.1j.1I();V r=Q.2H(Q.1Z||Q.id).r.1e("1S"),e=(r.1d)?r.1d.18.3M():r.r.3M(),s=("5B"==Q.Y.9L)?e:Q.7a(),j=Q.1w,o=("3X-3W"==Q.Y.3A)?Q.3v(1b,1c):{U:Q.1j.1e("2N").U-Q.1j.1e("49")+Q.1j.1e("9s"),W:Q.1j.1e("2N").W-Q.1j.1e("3N")+Q.1j.1e("9t")},l={U:o.U+Q.1j.1e("49"),W:o.W+Q.1j.1e("3N")},q=Q.1j.3i(),k=(Q.1L&&Q.4a)?Q.1L.1e("U")+Q.1L.1e("49"):0,m;n.U-=Q.1j.1e("49");n.W-=Q.1j.1e("3N");2s(Q.Y.7n){1p"5G":m=Q.6u(l,s);1q;2r:if("3X-3W"==Q.Y.3A){o=Q.3v({x:(28(j.17))?0+j.17:(28(j.1m))?0+j.1m:0,y:(28(j.19))?0+j.19:(28(j.1k))?0+j.1k:0},1c);l={U:o.U+Q.1j.1e("49"),W:o.W+Q.1j.1e("3N")}}s.19=(s.19+=28(j.19))?s.19:(s.1k-=28(j.1k))?s.1k-l.W:s.19;s.1k=s.19+l.W;s.17=(s.17+=28(j.17))?s.17:(s.1m-=28(j.1m))?s.1m-l.U:s.17;s.1m=s.17+l.U;m=Q.6u(l,s);1q}1t g.22(Q.1j,{36:6W,aL:R(p,u){V v;if(p>0){Q.23.1F("U",u.U-p);v=Q.23.1I().W;Q.1L.1F("W",v-Q.1L.1e("3N")).1U.1F("W",v)}if(Q.cr){Q.cr.1g({19:(Q.1s.18.1I().W-Q.cr.1I().W)})}}.1o(Q,k),3Z:R(){if(Q.ay){Q.ay.7W()}}.1o(Q)}).1B({U:[n.U+k,o.U+k],19:[q.19,m.y],17:[q.17,m.x]})},bJ:R(l,j,e){V k=12;2s(g.1a.4M){1p"aA":k="2x-3z"!=(l.1O("3z-5C")||l.1O("-c9-3z-5C"));1q;1p"3g":k="2x-3z"!=(l.1O("3z-5C")||l.1O("-3g-3z-5C"));1q;1p"2M":k=g.1a.3L||"2x-3z"!=(l.1O("3z-5C")||l.1O("-9q-3z-5C")||"2x-3z");1q;2r:k="2x-3z"!=l.1O("3z-5C");1q}S(k)?j:j-e},5F:R(o){R l(r){V q=[];if("6g"==g.2J(r)){S r}1K(V m in r){q.4q(m.6r()+":"+r[m])}S q.7o(";")}V k=l(o).4k(),p=$X(k.4t(";")),n=1b,j=1b;p.3S(R(q){1K(V m in Q.Y){j=1t 4U("^"+m.6r().2G(/\\-/,"\\\\-")+"\\\\s*:\\\\s*([^;]"+(("4h"==m)?"*":"+")+")$","i").6T(q.4k());if(j){2s(g.2J(Q.Y[m])){1p"7I":Q.Y[m]=j[1].6P();1q;1p"6d":Q.Y[m]=(j[1].3o("."))?(j[1].bF()*((m.3b().3o("1C"))?1Q:at)):j[1].1R();1q;2r:Q.Y[m]=j[1].4k()}}}},Q);1K(V e in Q.9o){if(!Q.9o.5P(e)){66}j=1t 4U("(^|;)\\\\s*"+e.6r().2G(/\\-/,"\\\\-")+"\\\\s*:\\\\s*([^;]+)\\\\s*(;|$)","i").6T(k);if(j){Q.9o[e].21(Q,j[2])}}},av:R(){V e=1b,l=Q.1w,k=Q.2N;1K(V j in l){e=1t 4U(""+j+"\\\\s*=\\\\s*([^,]+)","i").6T(Q.Y.7n);if(e){l[j]=(cQ(l[j]=e[1].1R()))?l[j]:"1D"}}if((72(l.19)&&72(l.1k))||(72(l.17)&&72(l.1m))){Q.Y.7n="5G"}if(!$X(["3X-3W","5f"]).4H(Q.Y.3A)){1K(V j in k){e=1t 4U(""+j+"\\\\s*=\\\\s*([^,]+)","i").6T(Q.Y.3A);if(e){k[j]=(cQ(k[j]=e[1].1R()))?k[j]:-1}}if(72(k.U)&&72(k.W)){Q.Y.3A="3X-3W"}}},cR:R(e){V j,l;1K(V j in e){if(Q.9p.5P(l=j.3e())){Q.9p[l]=e[j]}}},2H:R(e){S $X(Q.3s.2Y(R(j){S(e==j.id)}))[0]},64:R(e,j){e=e||1b;j=j||12;S $X(Q.3s.2Y(R(k){S(e==k.2L&&!k.5E&&(j||k.1N)&&(j||"63"!=k.1J)&&(j||!k.Y.5D))}))},aZ:R(m,e){e=e||12;V j=Q.64(m.2L,1c),k=j.4x(m)+1;S(k>=j.1A)?(!e||1>=j.1A)?1H:j[0]:j[k]},aP:R(m,e){e=e||12;V j=Q.64(m.2L,1c),k=j.4x(m)-1;S(k<0)?(!e||1>=j.1A)?1H:j[j.1A-1]:j[k]},cH:R(j){j=j||1b;V e=Q.64(j,1c);S(e.1A)?e[0]:1H},cI:R(j){j=j||1b;V e=Q.64(j,1c);S(e.1A)?e[e.1A-1]:1H},d1:R(){S $X(Q.3s.2Y(R(e){S("3q"==e.1J||"61-3j"==e.1J||"61-2O"==e.1J)}))},co:R(k){V j=Q.Y.6V,m=1b;if(!Q.Y.cj){g.2P.2u("au");S 1c}k=$X(k);if(Q.Y.cc&&!(k.gU||k.hH)){S 12}2s(k.d6){1p 27:k.1u();Q.2O(1b);1q;1p 32:1p 34:1p 39:1p 40:m=Q.aZ(Q,j||32==k.d6);1q;1p 33:1p 37:1p 38:m=Q.aP(Q,j);1q;2r:}if(m){k.1u();Q.2O(m)}}});V h={3I:"c4.5.39",T:{},7C:{},Y:{4v:12,5D:12,8a:1c,5R:1c,84:"hR",4h:"aO",82:"hX",7t:"9P 1r...",3d:"12"},1B:R(l){Q.5u=$X(1f).1e("i8:5u",$X([]));V e=1b,j=$X([]),k={};Q.T=g.1Y(1f.i9||{},Q.T);Q.Y=g.1Y(Q.Y,Q.ah());c.T=g.3V(Q.Y);b.T=g.3V(Q.Y);c.T.3d=("5f"==Q.Y.3d||"1c"==Q.Y.3d);b.7C=Q.7C;if(l){e=$X(l);if(e&&(" "+e.2Z+" ").3w(/\\s(6S(?:9O){0,1}|3h)\\s/)){j.4q(e)}1i{S 12}}1i{j=$X(g.$A(g.2k.2F("A")).2Y(R(m){S(" "+m.2Z+" ").3w(/\\s(6S(?:9O){0,1}|3h)\\s/)}))}j.3S(R(p){p=$X(p);V m=p.2F("7K"),n=1b;k=g.1Y(g.3V(Q.Y),Q.ah(p.3G||" "));if(p.5v("6S")||(p.5v("5q"))){if(m&&m.1A){n=p.4u(m[0])}c.1B(p,"1m-1E: "+("5f"==k.3d||"1c"==k.3d));if(n){p.4T(n)}}if(p.5v("3h")||(p.5v("5q"))){b.1B(p)}1i{p.1M.4m="9N"}Q.5u.4q(p)},Q);S 1c},1u:R(m){V e=1b,l=1b,j=$X([]);if(m){e=$X(m);if(e&&(" "+e.2Z+" ").3w(/\\s(6S(?:9O){0,1}|3h)\\s/)){j=$X(Q.5u.7R(Q.5u.4x(e),1))}1i{S 12}}1i{j=$X(Q.5u)}3K(j&&j.1A){l=$X(j[j.1A-1]);if(l.1r){l.1r.1u();c.4g.7R(c.4g.4x(l.1r),1);l.1r=1H}b.1u(l);V k=j.7R(j.4x(l),1);3H k}S 1c},85:R(j){V e=1b;if(j){Q.1u(j);Q.1B.1o(Q).2A(9M,j)}1i{Q.1u();Q.1B.1o(Q).2A(9M)}S 1c},31:R(n,e,k,l){V m=$X(n),j=1b;if(m){if((j=m.1e("1S"))){if(j.2H(j.1Z||j.id).1N){j.2H(j.1Z||j.id).2O(1b,1c)}j.2H(j.1Z||j.id).1J="7q"}if(!c.31(m,e,k,l)){b.31(m,e,k,l)}}},3j:R(e){S b.3j(e)},2O:R(e){S b.2O(e)},9f:R(e){S c.9f(e)},a9:R(e){S c.a9(e)},ah:R(j){V e,p,l,k,n;e=1b;p={};n=[];if(j){l=$X(j.4t(";"));l.3c(R(o){1K(V m in Q.Y){e=1t 4U("^"+m.6r().2G(/\\-/,"\\\\-")+"\\\\s*:\\\\s*([^;]+)$","i").6T(o.4k());if(e){2s(g.2J(Q.Y[m])){1p"7I":p[m]=e[1].6P();1q;1p"6d":p[m]=46(e[1]);1q;2r:p[m]=e[1].4k()}}}},Q)}1i{1K(k in Q.T){e=Q.T[k];2s(g.2J(Q.Y[k.3e()])){1p"7I":e=e.6b().6P();1q;1p"6d":e=46(e);1q;2r:1q}p[k.3e()]=e}}S p}};$X(1n).1y("59",R(){h.1B()});S h})(6w);',62,1154,'||||||||||||||||||||||||||||||||||||||||||||||||||||this|function|return|options|width|var|height|mjs|_o||||false|||||left|self|top|j21|null|true|z7|j29|window|j6|z46|else|t22|bottom|z4|right|document|j24|case|break|zoom|z1|new|stop|Math|position|hint|je1|px|length|start|opacity|auto|click|j6Prop|j30|undefined|j7|state|for|t25|style|ready|j5|test|100|j17|thumb|hide|parentNode|0px|hidden|margin|extend|t27||call|FX|t23|padding||mouseover||parseInt||j32|zoomWidth|src|show|z6|absolute|href|display|index|arguments|body|j2|zoomHeight|z3|type|border|j16|default|switch|block|je2|params|t26|content|zIndex|overflow|j27|appendChild|title|j23|zoomPosition|byTag|replace|t16|initializeOn|j1|load|group|trident|size|restore|doc|defined|firstChild|none|mouseout|hotspots|visibility|img|prototype|filter|className||update||||now|duration||||try|toLowerCase|j14|rightClick|j22|prefix|webkit|MagicThumb|j8|expand|event|catch|fullScreen|Transition|has|DIV|expanded|z30|thumbs|Element|trident4|resize|match|inner|pow|box|expandSize|max|selectorsChange|z2|ieMode|touchScreen|rel|delete|version|parent|while|backCompat|j9|padY|t30|z42|background|targetTouches|forEach|onready|selectors|detach|screen|fit|inz30|onComplete||tagName|init|clearTimeout|z21|magicthumb|parseFloat|edge|createElement|padX|hCaption|captionText|styles|j33|selectorsClass|getRelated|zooms|hintText|z41|J_TYPE|j26|typeof|cursor|capable|selectorsEffect|touchend|push|changedTouches|getDoc|split|removeChild|disableZoom|z44|indexOf|j19s|_cleanup|instanceof|J_UUID|z28|relative|transition|linear|visible|contains|thumbnail|z38|important|fps|engine|min|constructor|Class|ratio|scrollTop|layout|append|RegExp|mt_vml_|round|float|j15|apply||timer|clicked|opacityReverse|z43Bind|wrapper|borderWidth|on|ts|domready|div|Array|onload|z13|hintPosition|original|200|j3|lastTap|showTitle|expandEffect|t31|getTarget|t28|dragMode|custom|MagicZoomPlus|win|getButton|touch|items|j13|nodeType|color|alwaysShowZoom|z9|divTag|image|sizing|disableExpand|error|z37|center|activate|magiczoom|link|clientY|naturalWidth|z35|unload|array|hasOwnProperty|slide|preloadSelectorsBig|fade|onInititalize|prevItem|clientX|selector|kill|showLoading|storage||busy|createTextNode|uninitialized|t15|setTimeout|continue|z34|_tmpp|hasChild|300|toString|Out|number|cbs|In|string|scrollLeft|clickToActivate|initWidth|pause|adjustX|ieBack|adjustY|requestAnimationFrame|initHeight|class|dashize|offset|preservePosition|t14|captionPosition|magicJS|lastSelector|paddingTop|paddingLeft|z47|Doc|getElementsByTagName|t29|z45|loading|complete|css3Transformations|readyState|scrPad|identifier|zoomDistance|swap|mode|render|j18|rev|touchstart|MagicZoom|exec|paddingRight|slideshowLoop|250|zoomViewHeight|nextItem|paddingBottom|setupContent|slideshowEffect|isNaN|gd56f7fsgd|keepThumbnail||restoreEffect|easing|restoreSpeed|j19|t13|hintVisible|onStart|onerror|initMouseEvent|zoomAlign|expandTrigger|currentStyle|backgroundColor|400|z3Timer|z36|static|expandPosition|join|setupHint|updating|changeContent|throw|loadingMsg|J_EUID|t32|shift|j10|initTopPos|t10|vertical|css3Animation|lang|forceAnimation|floor|cloneNode|pad|initLeftPos|boolean|random|span|naturalHeight|presto|events|z24|z18|set|splice|getElementsByClassName|close|ddy|ddx|onresize|10000|onBeforeRender|z23|z14|z43|loadingClass|buttons|hintClass|refresh|mouseup|calc|activatedEx|entireImage|preloadSelectorsSmall|_unbind|_timer|not|replaceChild|documentElement|exOptions|100000px|button|loadingOpacity|hintOpacity|lastLeftPos|_event_prefix_|newImg|moveOnClick|cssClass|selectorsEffectSpeed|firstRun|borderLeftWidth|ufx|inline|createEvent|z7Rect|MagicJS|String|z29|titleSource|clickInitZoom|originId|speed|to|head|_handlers|callee|abort|features|z0|9_|defaults|implement|Ff|enabled|smoothing|dissolve|500|z11|effect|getBox|mousedown|z33|hoverTimer|innerHTML||PFX|insertBefore|j31|dblclick|compatMode|cancelAnimationFrame|z10|stopImmediatePropagation|holder|element|IMG|getStorage|found|pounce|zoomIn|innerWidth|innerHeight|screenPadding|namespaces|previous|next|item|swapTimer|_deprecated|_lang|ms|theme_mac|hspace|vspace|toggle|styleSheets|sqrt|hover|media|contextmenu|selectorsMouseoverDelay|outline|external|resizeTimer|Right|expandSpeed|Left|Bottom|mzParams|Top|platform|expandAlign|150|pointer|Plus|Loading|startTime|stopAnimation|overlapBox|nWidth|panZoom|loopBind|loop|Event|request|HTMLElement|cos|adjustPosition|t12|loadingRect|slideshowSpeed|reverse|borderBottomWidth|css|restoreTrigger|zoomOut|touches|tl|clickToInitialize||_event_add_|initialize|_event_del_|_z37|open|mousemove|PI|mz|onabort|magic|linkTarget|caller|borderTopWidth|t11|onErrorHandler|1000|keydown|parseExOptions|defaultView|resizeBind|zoomItem|construct|gecko|z26|query|shadow|z5|preventDefault|z1Holder|z20|loadingPositionY|loadingPositionX|thumbChange|onAfterRender|styleFloat|toggleMZ|Zoom|t18|horizontal|backgroundSpeed|IFRAME|javascript|backgroundOpacity|el_arr|z16|ceil|out|t17|insertRule|navigator|bgColor|smoothingSpeed|object|z15|j12|5001|prevent|rect|url|destroy||je3|buttonsPosition|textAlign||captionSource|uuid|t6|5000||tc|10000px|J_EXTENDED|transparent|Slide||offsetHeight|tr|Function|compareDocumentPosition|z32|date|getElementById|textnode|blur|buttonsDisplay|xpath|XMLHttpRequest|entire|toFloat|touchmove|Image|z31|adjBorder|enclose|bounceIn|offsetWidth|Tahoma|mozCancelAnimationFrame|z39|no|move|repeat|backcompat|MagicZoomPup|z27|backgroundRepeat|fontFamily|fontSize|fontWeight|styles_arr|t1|t2|inherit|v4|webkit419|Webkit|Moz|Khtml|moz|user||keyboardCtrl|cancel||cancelFullScreen|CancelFullScreen|Width|fromCharCode|keyboard|getBoundingClientRect|mac|map|matchMedia|onKey|onError|charCodeAt||text|101|Date|Microsoft|DXImageTransform|preload|transform|getComputedStyle|1px|setProps|Alpha|t5|borderRightWidth|errorEventName|zoomFade|t19|t20|fitZoomWindow|big|ios|select|nativize|z25|change|isFinite|setLang|callout|z17|highlight|documentMode|zoomWindowEffect|900|changeEventName|glow|chrome|t21|z19|x7|localStorage|tap|keyCode|unselectable|addEventListener|roundCss|gecko181|buttonClose|phone|cancelBubble|clone|tmp|insertCSS|opera|continueAnimation|expoIn|VML|clickToDeactivate|backgroundImage|sineIn||DocumentTouch|curLeft|stopPropagation|t8|fill|nHeight|wrap|captionHeight|isReady|420|captionWidth|back|relatedTarget|v2|interval|dispatchEvent|finishTime|z8|t4|j28|scroll|_bind|which|temporary|behavior|abs|drag|urn|add|toArray|t7|hone|mask|expandTriggerDelay|od|buttonPrevious|align|android|disable|backgroundPosition|sMagicZoom|elasticIn|charAt|concat|loadingMsgExpanded|zoomFadeInSpeed|schemas|buttonNext|requestFullScreen|cubicIn|microsoft|zoomFadeOutSpeed|magicthumb_ie_ex|z22|raiseEvent|quadIn|initializing|cbHover||captionSpeed|backIn|cbClick|com||UUID|alt|vml|fromElement|srcElement|Object|toElement|j11|detachEvent|removeEventListener|setAttribute|exists|attachEvent|collection|KeyboardEvent|regexp|iframe|byClass|j20|KeyEvent|childNodes|DOMElement|presto925|scrollWidth|pageYOffset|scrollHeight|clientHeight|clientWidth|pageXOffset|innerText|offsetTop|pageY|offsetLeft|clientLeft|clientTop|offsetParent|MouseEvent|UIEvent|returnValue|slice|html|pageX|target|postMessage|tablet|mobile|wap|windows|avantgo|bada|blazer|blackberry|up|vodafone|xda|xiino|air|evaluate|userAgent|mozInnerScreenY|getBoxObjectFor|ActiveXObject|ontouchstart|querySelector|runtime|treo|compal|midp|mmp|hiptop|netfront|maemo|lge|iemobile|iris|kindle|ob|fennec|plucker|pocket|psp|symbian|re|elaine|palm|os|ixi|WebKitPoint|taintEnabled|191|190|181|khtml|192|419|210|msPerformance|performance|525|fullscreenchange|fullscreenerror|getPropertyValue|cssFloat|hasLayout|filters|j4|getTime|webkitIsFullScreen|FullScreen|RequestFullScreen|211|220|linux|other|mozRequestAnimationFrame|webkitRequestAnimationFrame|addCSS|toUpperCase|unknown|webos|setInterval|oRequestAnimationFrame|msRequestAnimationFrame|AnimationName|270|applicationCache||260|animationName|Transform|oCancelAnimationFrame|msCancelAnimationFrame|webkitCancelRequestAnimationFrame|progid|767px|line|2em|nextSibling|3px|MagicZoomHeader|MagicBoxGlow|frameBorder|ccc|00001|removeAttribute|600|tile|currentTarget|stroked|coords|MagicBoxShadow|trident900|owningElement|ctrlKey|_new|z12|BackgroundImageCache|getXY|createStyleSheet|matches|MozUserSelect|MagicZoomBigImageCont|10002|cssText|hand|selectstart|textDecoration|td|toLocaleLowerCase|_blank|lef|MagicThumbLoading|rtl|dir|009|skipAnimation|000000|fixed|cbhover|execCommand|autohide|zoomActivation|10001|mzp|_self|Expand|bounce|elastic|cubic|expo|beforeEnd|mt|insertAdjacentHTML|quad|sine|imageSize|MagicThumbHint|swapImage|Previous|Close|Next|Magic|metaKey|amp|clickTo|cubicOut|lt|expoOut|quadOut|618|backOut|Invalid|MagicZoomPlusHint|slideIn|bounceOut|9999|elasticOut|sineOut|MagicZoomPlusLoading|eventType|fireEvent|createEventObject|initEvent|caption|getAttribute|getAttributeNode|loaded|curFrame|clearInterval|magiczoomplus|MagicZoomPlusOptions|doScroll|DOMContentLoaded|111|||||slideOut|msg|MagicZoomHint|delay|addRule|cssRules||source||MagicZoomLoading|deactivate|preserve|always|distance|styleSheet|sheet|lastChild|middle|small|sort|stylesId'.split('|'),0,{}))
;
// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//









;
