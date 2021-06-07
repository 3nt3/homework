(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.eI.cr === region.fg.cr)
	{
		return 'on line ' + region.eI.cr;
	}
	return 'on lines ' + region.eI.cr + ' through ' + region.fg.cr;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.h_,
		impl.jC,
		impl.ja,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		aV: func(record.aV),
		eK: record.eK,
		et: record.et
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.aV;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.eK;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.et) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.h_,
		impl.jC,
		impl.ja,
		function(sendToApp, initialModel) {
			var view = impl.jD;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.h_,
		impl.jC,
		impl.ja,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.eB && impl.eB(sendToApp)
			var view = impl.jD;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.bc);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.jt) && (_VirtualDom_doc.title = title = doc.jt);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.iw;
	var onUrlRequest = impl.ix;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		eB: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.f7 === next.f7
							&& curr.ft === next.ft
							&& curr.f2.a === next.f2.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		h_: function(flags)
		{
			return A3(impl.h_, flags, _Browser_getUrl(), key);
		},
		jD: impl.jD,
		jC: impl.jC,
		ja: impl.ja
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hR: 'hidden', he: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hR: 'mozHidden', he: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hR: 'msHidden', he: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hR: 'webkitHidden', he: 'webkitvisibilitychange' }
		: { hR: 'hidden', he: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		gh: _Browser_getScene(),
		gA: {
			gF: _Browser_window.pageXOffset,
			gH: _Browser_window.pageYOffset,
			jF: _Browser_doc.documentElement.clientWidth,
			hP: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		jF: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		hP: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			gh: {
				jF: node.scrollWidth,
				hP: node.scrollHeight
			},
			gA: {
				gF: node.scrollLeft,
				gH: node.scrollTop,
				jF: node.clientWidth,
				hP: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			gh: _Browser_getScene(),
			gA: {
				gF: x,
				gH: y,
				jF: _Browser_doc.documentElement.clientWidth,
				hP: _Browser_doc.documentElement.clientHeight
			},
			hz: {
				gF: x + rect.left,
				gH: y + rect.top,
				jF: rect.width,
				hP: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}


// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.bh.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.bh.b, xhr)); });
		$elm$core$Maybe$isJust(request.bt) && _Http_track(router, xhr, request.bt.a);

		try {
			xhr.open(request.bl, request.bv, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.bv));
		}

		_Http_configureRequest(xhr, request);

		request.bc.a && xhr.setRequestHeader('Content-Type', request.bc.a);
		xhr.send(request.bc.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.bk; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.bq.a || 0;
	xhr.responseType = request.bh.d;
	xhr.withCredentials = request.gW;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		bv: xhr.responseURL,
		eJ: xhr.status,
		i6: xhr.statusText,
		bk: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			iZ: event.loaded,
			gk: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			iI: event.loaded,
			gk: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}


function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var $author$project$Main$LinkClicked = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$UrlChanged = function (a) {
	return {$: 1, a: a};
};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.p) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.r),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.r);
		} else {
			var treeLen = builder.p * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.s) : builder.s;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.p);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.r) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.r);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{s: nodeList, p: (len / $elm$core$Array$branchFactor) | 0, r: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fn: fragment, ft: host, f0: path, f2: port_, f7: protocol, eu: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$application = _Browser_application;
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Main$Model = F2(
	function (shared, page) {
		return {aB: page, am: shared};
	});
var $author$project$Main$Pages = function (a) {
	return {$: 3, a: a};
};
var $author$project$Main$Shared = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Spa$Generated$Route$NotFound = 3;
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {bi: frag, iE: params, a9: unvisited, aI: value, bw: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.a9;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.aI);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.aI);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 1) {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 1) {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 1) {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 1) {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.f0),
					$elm$url$Url$Parser$prepareQuery(url.eu),
					url.fn,
					$elm$core$Basics$identity)));
	});
var $author$project$Spa$Generated$Route$Dashboard = 1;
var $author$project$Spa$Generated$Route$Dashboard__Admin = 5;
var $author$project$Spa$Generated$Route$Dashboard__Moodle = 6;
var $author$project$Spa$Generated$Route$Login = 2;
var $author$project$Spa$Generated$Route$Register = 4;
var $author$project$Spa$Generated$Route$Top = 0;
var $elm$url$Url$Parser$Parser = $elm$core$Basics$identity;
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.bw;
		var unvisited = _v0.a9;
		var params = _v0.iE;
		var frag = _v0.bi;
		var value = _v0.aI;
		return A5(
			$elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var $elm$url$Url$Parser$map = F2(
	function (subValue, _v0) {
		var parseArg = _v0;
		return function (_v1) {
			var visited = _v1.bw;
			var unvisited = _v1.a9;
			var params = _v1.iE;
			var frag = _v1.bi;
			var value = _v1.aI;
			return A2(
				$elm$core$List$map,
				$elm$url$Url$Parser$mapState(value),
				parseArg(
					A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$url$Url$Parser$oneOf = function (parsers) {
	return function (state) {
		return A2(
			$elm$core$List$concatMap,
			function (_v0) {
				var parser = _v0;
				return parser(state);
			},
			parsers);
	};
};
var $elm$url$Url$Parser$s = function (str) {
	return function (_v0) {
		var visited = _v0.bw;
		var unvisited = _v0.a9;
		var params = _v0.iE;
		var frag = _v0.bi;
		var value = _v0.aI;
		if (!unvisited.b) {
			return _List_Nil;
		} else {
			var next = unvisited.a;
			var rest = unvisited.b;
			return _Utils_eq(next, str) ? _List_fromArray(
				[
					A5(
					$elm$url$Url$Parser$State,
					A2($elm$core$List$cons, next, visited),
					rest,
					params,
					frag,
					value)
				]) : _List_Nil;
		}
	};
};
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0;
		var parseAfter = _v1;
		return function (state) {
			return A2(
				$elm$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
	});
var $elm$url$Url$Parser$top = function (state) {
	return _List_fromArray(
		[state]);
};
var $author$project$Spa$Generated$Route$routes = $elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2($elm$url$Url$Parser$map, 0, $elm$url$Url$Parser$top),
			A2(
			$elm$url$Url$Parser$map,
			1,
			$elm$url$Url$Parser$s('dashboard')),
			A2(
			$elm$url$Url$Parser$map,
			2,
			$elm$url$Url$Parser$s('login')),
			A2(
			$elm$url$Url$Parser$map,
			3,
			$elm$url$Url$Parser$s('not-found')),
			A2(
			$elm$url$Url$Parser$map,
			4,
			$elm$url$Url$Parser$s('register')),
			A2(
			$elm$url$Url$Parser$map,
			5,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('dashboard'),
				$elm$url$Url$Parser$s('admin'))),
			A2(
			$elm$url$Url$Parser$map,
			6,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('dashboard'),
				$elm$url$Url$Parser$s('moodle')))
		]));
var $author$project$Spa$Generated$Route$fromUrl = $elm$url$Url$Parser$parse($author$project$Spa$Generated$Route$routes);
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Main$fromUrl = A2(
	$elm$core$Basics$composeR,
	$author$project$Spa$Generated$Route$fromUrl,
	$elm$core$Maybe$withDefault(3));
var $author$project$Shared$GotUser = function (a) {
	return {$: 0, a: a};
};
var $author$project$Shared$Model = F5(
	function (url, key, user, device, overrideLoggedInRedirect) {
		return {hw: device, h7: key, fX: overrideLoggedInRedirect, bv: url, gw: user};
	});
var $author$project$Shared$Desktop = 2;
var $author$project$Shared$Device = F4(
	function (_class, orientation, width, height) {
		return {hg: _class, hP: height, iB: orientation, jF: width};
	});
var $author$project$Shared$Landscape = 1;
var $author$project$Shared$Phone = 0;
var $author$project$Shared$Portrait = 0;
var $author$project$Shared$Tablet = 1;
var $author$project$Shared$classifyDevice = function (options) {
	return (options.jF < 900) ? A4($author$project$Shared$Device, 0, 0, options.jF, options.hP) : ((options.jF < 1400) ? A4($author$project$Shared$Device, 1, 0, options.jF, options.hP) : A4($author$project$Shared$Device, 2, 1, options.jF, options.hP));
};
var $author$project$Api$Api$productionApiAddress = 'https://api.hausis.3nt3.de';
var $author$project$Api$Api$apiAddress = $author$project$Api$Api$productionApiAddress;
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 2};
var $elm$http$Http$Receiving = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$Timeout_ = {$: 1};
var $elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $author$project$Api$BadBody = function (a) {
	return {$: 4, a: a};
};
var $author$project$Api$BadStatus = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $author$project$Api$BadUrl = function (a) {
	return {$: 0, a: a};
};
var $author$project$Api$NetworkError = {$: 2};
var $author$project$Api$Timeout = {$: 1};
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Api$expectStringButItsJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			function (response) {
				switch (response.$) {
					case 0:
						var url = response.a;
						return $elm$core$Result$Err(
							$author$project$Api$BadUrl(url));
					case 1:
						return $elm$core$Result$Err($author$project$Api$Timeout);
					case 2:
						return $elm$core$Result$Err($author$project$Api$NetworkError);
					case 3:
						var metadata = response.a;
						var body = response.b;
						var _v1 = A2(
							$elm$json$Json$Decode$decodeString,
							A2(
								$elm$json$Json$Decode$at,
								_List_fromArray(
									['errors']),
								$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
							body);
						if (!_v1.$) {
							var value = _v1.a;
							return $elm$core$Result$Err(
								A2($author$project$Api$BadStatus, metadata.eJ, value));
						} else {
							var err = _v1.a;
							return $elm$core$Result$Err(
								A2(
									$author$project$Api$BadStatus,
									metadata.eJ,
									_List_fromArray(
										['an error occured.'])));
						}
					default:
						var metadata = response.a;
						var body = response.b;
						var _v2 = A2(
							$elm$json$Json$Decode$decodeString,
							A2(
								$elm$json$Json$Decode$at,
								_List_fromArray(
									['content']),
								decoder),
							body);
						if (!_v2.$) {
							var value = _v2.a;
							return $elm$core$Result$Ok(value);
						} else {
							var err = _v2.a;
							return $elm$core$Result$Err(
								$author$project$Api$BadBody(
									$elm$json$Json$Decode$errorToString(err)));
						}
				}
			});
	});
var $author$project$Api$Failure = function (a) {
	return {$: 2, a: a};
};
var $author$project$Api$Success = function (a) {
	return {$: 3, a: a};
};
var $author$project$Api$fromResult = function (result) {
	if (!result.$) {
		var value = result.a;
		return $author$project$Api$Success(value);
	} else {
		var reason = result.a;
		return $author$project$Api$Failure(reason);
	}
};
var $author$project$Api$expectJson = function (toMsg) {
	return $author$project$Api$expectStringButItsJson(
		A2($elm$core$Basics$composeR, $author$project$Api$fromResult, toMsg));
};
var $elm$http$Http$Request = function (a) {
	return {$: 1, a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {ga: reqs, gr: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (!cmd.$) {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 1) {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.bt;
							if (_v4.$ === 1) {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.ga));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.gr)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (!cmd.$) {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					gW: r.gW,
					bc: r.bc,
					bh: A2(_Http_mapExpect, func, r.bh),
					bk: r.bk,
					bl: r.bl,
					bq: r.bq,
					bt: r.bt,
					bv: r.bv
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$riskyRequest = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{gW: true, bc: r.bc, bh: r.bh, bk: r.bk, bl: r.bl, bq: r.bq, bt: r.bt, bv: r.bv}));
};
var $author$project$Models$User = F5(
	function (id, username, email, privilege, moodleUrl) {
		return {ff: email, hU: id, $8: moodleUrl, f3: privilege, eS: username};
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Models$Admin = 1;
var $author$project$Models$Normal = 0;
var $author$project$Api$Homework$User$intToPrivilege = function (privilege) {
	if (privilege === 1) {
		return $elm$json$Json$Decode$succeed(1);
	} else {
		return $elm$json$Json$Decode$succeed(0);
	}
};
var $elm$json$Json$Decode$map5 = _Json_map5;
var $author$project$Api$Homework$User$userDecoder = A6(
	$elm$json$Json$Decode$map5,
	$author$project$Models$User,
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'username', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'email', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'privilege',
		A2(
			$elm$json$Json$Decode$andThen,
			function (priv) {
				return $author$project$Api$Homework$User$intToPrivilege(priv);
			},
			$elm$json$Json$Decode$int)),
	A2($elm$json$Json$Decode$field, 'moodle_url', $elm$json$Json$Decode$string));
var $author$project$Api$Homework$User$getUserFromSession = function (options) {
	return $elm$http$Http$riskyRequest(
		{
			bc: $elm$http$Http$emptyBody,
			bh: A2($author$project$Api$expectJson, options.fT, $author$project$Api$Homework$User$userDecoder),
			bk: _List_Nil,
			bl: 'GET',
			bq: $elm$core$Maybe$Nothing,
			bt: $elm$core$Maybe$Nothing,
			bv: $author$project$Api$Api$apiAddress + '/user'
		});
};
var $author$project$Shared$init = F3(
	function (flags, url, key) {
		return _Utils_Tuple2(
			A5(
				$author$project$Shared$Model,
				url,
				key,
				$elm$core$Maybe$Nothing,
				$author$project$Shared$classifyDevice(
					{hP: flags.hP, jF: flags.jF}),
				false),
			$author$project$Api$Homework$User$getUserFromSession(
				{fT: $author$project$Shared$GotUser}));
	});
var $author$project$Spa$Generated$Pages$Dashboard__Admin__Model = function (a) {
	return {$: 5, a: a};
};
var $author$project$Spa$Generated$Pages$Dashboard__Admin__Msg = function (a) {
	return {$: 5, a: a};
};
var $author$project$Spa$Generated$Pages$Dashboard__Model = function (a) {
	return {$: 1, a: a};
};
var $author$project$Spa$Generated$Pages$Dashboard__Moodle__Model = function (a) {
	return {$: 6, a: a};
};
var $author$project$Spa$Generated$Pages$Dashboard__Moodle__Msg = function (a) {
	return {$: 6, a: a};
};
var $author$project$Spa$Generated$Pages$Dashboard__Msg = function (a) {
	return {$: 1, a: a};
};
var $author$project$Spa$Generated$Pages$Login__Model = function (a) {
	return {$: 2, a: a};
};
var $author$project$Spa$Generated$Pages$Login__Msg = function (a) {
	return {$: 2, a: a};
};
var $author$project$Spa$Generated$Pages$NotFound__Model = function (a) {
	return {$: 3, a: a};
};
var $author$project$Spa$Generated$Pages$NotFound__Msg = function (a) {
	return {$: 3, a: a};
};
var $author$project$Spa$Generated$Pages$Register__Model = function (a) {
	return {$: 4, a: a};
};
var $author$project$Spa$Generated$Pages$Register__Msg = function (a) {
	return {$: 4, a: a};
};
var $author$project$Spa$Generated$Pages$Top__Model = function (a) {
	return {$: 0, a: a};
};
var $author$project$Spa$Generated$Pages$Top__Msg = function (a) {
	return {$: 0, a: a};
};
var $author$project$Spa$Page$application = function (page) {
	return page;
};
var $author$project$Components$LineChart$Future = 0;
var $elm$time$Time$Jan = 0;
var $author$project$Api$Loading = {$: 1};
var $author$project$Api$NotAsked = {$: 0};
var $justinmimbs$date$Date$RD = $elm$core$Basics$identity;
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Basics$neq = _Utils_notEqual;
var $justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m) {
			case 0:
				return 0;
			case 1:
				return 31;
			case 2:
				return 59 + leapDays;
			case 3:
				return 90 + leapDays;
			case 4:
				return 120 + leapDays;
			case 5:
				return 151 + leapDays;
			case 6:
				return 181 + leapDays;
			case 7:
				return 212 + leapDays;
			case 8:
				return 243 + leapDays;
			case 9:
				return 273 + leapDays;
			case 10:
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return $elm$core$Basics$floor(a / b);
	});
var $justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2($justinmimbs$date$Date$floorDiv, y, 4) - A2($justinmimbs$date$Date$floorDiv, y, 100)) + A2($justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var $justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m) {
			case 0:
				return 31;
			case 1:
				return $justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 2:
				return 31;
			case 3:
				return 30;
			case 4:
				return 31;
			case 5:
				return 30;
			case 6:
				return 31;
			case 7:
				return 31;
			case 8:
				return 30;
			case 9:
				return 31;
			case 10:
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$date$Date$fromCalendarDate = F3(
	function (y, m, d) {
		return ($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A3(
			$elm$core$Basics$clamp,
			1,
			A2($justinmimbs$date$Date$daysInMonth, y, m),
			d);
	});
var $author$project$Pages$Dashboard$AdjustTimeZone = function (a) {
	return {$: 9, a: a};
};
var $author$project$Pages$Dashboard$GotAssignmentData = function (a) {
	return {$: 13, a: a};
};
var $author$project$Pages$Dashboard$GotContributorData = function (a) {
	return {$: 24, a: a};
};
var $author$project$Pages$Dashboard$GotCourseData = function (a) {
	return {$: 0, a: a};
};
var $author$project$Pages$Dashboard$GotCourseStatsData = function (a) {
	return {$: 25, a: a};
};
var $author$project$Pages$Dashboard$ReceiveTime = function (a) {
	return {$: 8, a: a};
};
var $author$project$Models$Course = F5(
	function (id, name, assignments, fromMoodle, user) {
		return {g_: assignments, hL: fromMoodle, hU: id, ig: name, gw: user};
	});
var $author$project$Models$Assignment = F6(
	function (id, courseId, user, title, dueDate, fromMoodle) {
		return {ho: courseId, hy: dueDate, hL: fromMoodle, hU: id, jt: title, gw: user};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0;
	return millis;
};
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.eI, posixMinutes) < 0) {
					return posixMinutes + era.b;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		fa: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		fN: month,
		gI: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).fa;
	});
var $elm$time$Time$Apr = 3;
var $elm$time$Time$Aug = 7;
var $elm$time$Time$Dec = 11;
var $elm$time$Time$Feb = 1;
var $elm$time$Time$Jul = 6;
var $elm$time$Time$Jun = 5;
var $elm$time$Time$Mar = 2;
var $elm$time$Time$May = 4;
var $elm$time$Time$Nov = 10;
var $elm$time$Time$Oct = 9;
var $elm$time$Time$Sep = 8;
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).fN;
		switch (_v0) {
			case 1:
				return 0;
			case 2:
				return 1;
			case 3:
				return 2;
			case 4:
				return 3;
			case 5:
				return 4;
			case 6:
				return 5;
			case 7:
				return 6;
			case 8:
				return 7;
			case 9:
				return 8;
			case 10:
				return 9;
			case 11:
				return 10;
			default:
				return 11;
		}
	});
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).gI;
	});
var $justinmimbs$date$Date$fromPosix = F2(
	function (zone, posix) {
		return A3(
			$justinmimbs$date$Date$fromCalendarDate,
			A2($elm$time$Time$toYear, zone, posix),
			A2($elm$time$Time$toMonth, zone, posix),
			A2($elm$time$Time$toDay, zone, posix));
	});
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $author$project$Api$Homework$Course$dateDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (_int) {
		return $elm$json$Json$Decode$succeed(
			A2(
				$justinmimbs$date$Date$fromPosix,
				$elm$time$Time$utc,
				$elm$time$Time$millisToPosix(_int)));
	},
	$elm$json$Json$Decode$int);
var $elm$json$Json$Decode$map6 = _Json_map6;
var $author$project$Api$Homework$Course$assignmentDecoder = A7(
	$elm$json$Json$Decode$map6,
	$author$project$Models$Assignment,
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'course', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'user', $author$project$Api$Homework$User$userDecoder),
	A2($elm$json$Json$Decode$field, 'title', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'due_date', $author$project$Api$Homework$Course$dateDecoder),
	A2($elm$json$Json$Decode$field, 'from_moodle', $elm$json$Json$Decode$bool));
var $author$project$Api$Homework$Course$courseDecoder = A6(
	$elm$json$Json$Decode$map5,
	$author$project$Models$Course,
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'assignments',
		$elm$json$Json$Decode$list($author$project$Api$Homework$Course$assignmentDecoder)),
	A2($elm$json$Json$Decode$field, 'from_moodle', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'user', $elm$json$Json$Decode$string));
var $author$project$Api$Homework$Course$getActiveCourses = function (options) {
	return $elm$http$Http$riskyRequest(
		{
			bc: $elm$http$Http$emptyBody,
			bh: A2(
				$author$project$Api$expectJson,
				options.fT,
				$elm$json$Json$Decode$list($author$project$Api$Homework$Course$courseDecoder)),
			bk: _List_Nil,
			bl: 'GET',
			bq: $elm$core$Maybe$Nothing,
			bt: $elm$core$Maybe$Nothing,
			bv: $author$project$Api$Api$apiAddress + '/courses/active'
		});
};
var $author$project$Api$Homework$Assignment$getAssignments = F2(
	function (maxDays, onResponse) {
		return $elm$http$Http$riskyRequest(
			{
				bc: $elm$http$Http$emptyBody,
				bh: A2(
					$author$project$Api$expectJson,
					onResponse,
					$elm$json$Json$Decode$list($author$project$Api$Homework$Course$assignmentDecoder)),
				bk: _List_Nil,
				bl: 'GET',
				bq: $elm$core$Maybe$Nothing,
				bt: $elm$core$Maybe$Nothing,
				bv: $author$project$Api$Api$apiAddress + ('/assignments?days=' + $elm$core$String$fromInt(maxDays))
			});
	});
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $author$project$Api$Homework$Assignment$contributorsDecoder = $elm$json$Json$Decode$keyValuePairs($elm$json$Json$Decode$int);
var $author$project$Api$Homework$Assignment$getContributors = function (onResponse) {
	return $elm$http$Http$riskyRequest(
		{
			bc: $elm$http$Http$emptyBody,
			bh: A2($author$project$Api$expectJson, onResponse, $author$project$Api$Homework$Assignment$contributorsDecoder),
			bk: _List_Nil,
			bl: 'GET',
			bq: $elm$core$Maybe$Nothing,
			bt: $elm$core$Maybe$Nothing,
			bv: $author$project$Api$Api$apiAddress + '/assignments/contributors'
		});
};
var $author$project$Api$Homework$Course$getCourseStats = function (onResponse) {
	return $elm$http$Http$riskyRequest(
		{
			bc: $elm$http$Http$emptyBody,
			bh: A2(
				$author$project$Api$expectJson,
				onResponse,
				$elm$json$Json$Decode$keyValuePairs($elm$json$Json$Decode$int)),
			bk: _List_Nil,
			bl: 'GET',
			bq: $elm$core$Maybe$Nothing,
			bt: $elm$core$Maybe$Nothing,
			bv: $author$project$Api$Api$apiAddress + '/courses/stats'
		});
};
var $elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$here = _Time_here(0);
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $author$project$Pages$Dashboard$initCommands = _List_fromArray(
	[
		$author$project$Api$Homework$Course$getActiveCourses(
		{fT: $author$project$Pages$Dashboard$GotCourseData}),
		A2($elm$core$Task$perform, $author$project$Pages$Dashboard$ReceiveTime, $elm$time$Time$now),
		A2($author$project$Api$Homework$Assignment$getAssignments, 31, $author$project$Pages$Dashboard$GotAssignmentData),
		$author$project$Api$Homework$Assignment$getContributors($author$project$Pages$Dashboard$GotContributorData),
		$author$project$Api$Homework$Course$getCourseStats($author$project$Pages$Dashboard$GotCourseStatsData),
		A2($elm$core$Task$perform, $author$project$Pages$Dashboard$AdjustTimeZone, $elm$time$Time$here)
	]);
var $author$project$Pages$Dashboard$init = F2(
	function (shared, url) {
		return _Utils_Tuple2(
			{
				ba: 0,
				b4: $author$project$Api$Loading,
				b5: $author$project$Api$NotAsked,
				bz: false,
				cc: $author$project$Api$Loading,
				y: $author$project$Api$Loading,
				c_: $author$project$Api$Loading,
				c$: $author$project$Api$NotAsked,
				at: '',
				hw: shared.hw,
				bg: '',
				d: _List_Nil,
				bK: $elm$core$Maybe$Nothing,
				a2: $author$project$Api$NotAsked,
				aC: '',
				aD: $elm$core$Maybe$Nothing,
				aE: $elm$core$Maybe$Nothing,
				aF: $elm$time$Time$millisToPosix(0),
				aH: 7,
				bZ: 0,
				a4: '',
				B: A3($justinmimbs$date$Date$fromCalendarDate, 2019, 0, 1),
				bv: url,
				gw: shared.gw,
				b2: $elm$time$Time$utc
			},
			$elm$core$Platform$Cmd$batch($author$project$Pages$Dashboard$initCommands));
	});
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Pages$Dashboard$load = F2(
	function (shared, model) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{hw: shared.hw, gw: shared.gw}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Pages$Dashboard$save = F2(
	function (_v0, shared) {
		return shared;
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Pages$Dashboard$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Pages$Dashboard$GotAssignmentModalData = function (a) {
	return {$: 18, a: a};
};
var $author$project$Pages$Dashboard$GotChangeAssignmentTitle = function (a) {
	return {$: 23, a: a};
};
var $author$project$Pages$Dashboard$GotCreateAssignmentData = function (a) {
	return {$: 7, a: a};
};
var $author$project$Pages$Dashboard$GotRemoveAssignmentData = function (a) {
	return {$: 12, a: a};
};
var $author$project$Pages$Dashboard$GotSearchCoursesData = function (a) {
	return {$: 2, a: a};
};
var $elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, value));
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Api$Homework$Assignment$updateTitleEncoder = function (title) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'title',
				$elm$json$Json$Encode$string(title))
			]));
};
var $author$project$Api$Homework$Assignment$changeAssignmentTitle = F3(
	function (id, newTitle, onResponse) {
		return $elm$http$Http$riskyRequest(
			{
				bc: $elm$http$Http$jsonBody(
					$author$project$Api$Homework$Assignment$updateTitleEncoder(newTitle)),
				bh: A2($author$project$Api$expectJson, onResponse, $author$project$Api$Homework$Course$assignmentDecoder),
				bk: _List_Nil,
				bl: 'PUT',
				bq: $elm$core$Maybe$Nothing,
				bt: $elm$core$Maybe$Nothing,
				bv: $author$project$Api$Api$apiAddress + ('/assignment/' + id)
			});
	});
var $elm$json$Json$Encode$bool = _Json_wrap;
var $author$project$Api$Homework$Assignment$epochStartOffset = 719162;
var $justinmimbs$date$Date$toRataDie = function (_v0) {
	var rd = _v0;
	return rd;
};
var $author$project$Api$Homework$Assignment$dateToPosixTime = function (date) {
	return (($justinmimbs$date$Date$toRataDie(date) - $author$project$Api$Homework$Assignment$epochStartOffset) * (((1000 * 60) * 60) * 24)) - (((1000 * 60) * 60) * 24);
};
var $author$project$Api$Homework$Assignment$dateEncoder = function (date) {
	return $author$project$Api$Homework$Assignment$dateToPosixTime(date);
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$Api$Homework$Assignment$assignmentEncoder = function (assignment) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'title',
				$elm$json$Json$Encode$string(assignment.jt)),
				_Utils_Tuple2(
				'course',
				$elm$json$Json$Encode$int(assignment.ho)),
				_Utils_Tuple2(
				'due_date',
				$elm$json$Json$Encode$int(
					$author$project$Api$Homework$Assignment$dateEncoder(assignment.hy))),
				_Utils_Tuple2(
				'from_moodle',
				$elm$json$Json$Encode$bool(assignment.hL))
			]));
};
var $author$project$Api$Homework$Assignment$createAssignment = F2(
	function (assignment, options) {
		return $elm$http$Http$riskyRequest(
			{
				bc: $elm$http$Http$jsonBody(
					$author$project$Api$Homework$Assignment$assignmentEncoder(assignment)),
				bh: A2($author$project$Api$expectJson, options.fT, $author$project$Api$Homework$Course$assignmentDecoder),
				bk: _List_Nil,
				bl: 'POST',
				bq: $elm$core$Maybe$Nothing,
				bt: $elm$core$Maybe$Nothing,
				bv: $author$project$Api$Api$apiAddress + '/assignment'
			});
	});
var $author$project$Pages$Dashboard$dayMonthYearToDate = F3(
	function (day, month, year) {
		return $elm$core$Maybe$Just(
			A3($justinmimbs$date$Date$fromCalendarDate, year, month, day));
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{s: nodeList, p: nodeListSize, r: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $author$project$Pages$Dashboard$intToMonth = function (month) {
	switch (month) {
		case 1:
			return $elm$core$Maybe$Just(0);
		case 2:
			return $elm$core$Maybe$Just(1);
		case 3:
			return $elm$core$Maybe$Just(2);
		case 4:
			return $elm$core$Maybe$Just(3);
		case 5:
			return $elm$core$Maybe$Just(4);
		case 6:
			return $elm$core$Maybe$Just(5);
		case 7:
			return $elm$core$Maybe$Just(6);
		case 8:
			return $elm$core$Maybe$Just(7);
		case 9:
			return $elm$core$Maybe$Just(8);
		case 10:
			return $elm$core$Maybe$Just(9);
		case 11:
			return $elm$core$Maybe$Just(10);
		case 12:
			return $elm$core$Maybe$Just(11);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $elm_community$maybe_extra$Maybe$Extra$join = function (mx) {
	if (!mx.$) {
		var x = mx.a;
		return x;
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		if (ma.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				if (mc.$ === 1) {
					return $elm$core$Maybe$Nothing;
				} else {
					var c = mc.a;
					return $elm$core$Maybe$Just(
						A3(func, a, b, c));
				}
			}
		}
	});
var $author$project$Pages$Dashboard$dateStringToDate = function (input) {
	var splitArray = $elm$core$Array$fromList(
		A2($elm$core$String$split, '.', input));
	var maybeYear = $elm_community$maybe_extra$Maybe$Extra$join(
		A2(
			$elm$core$Maybe$map,
			$elm$core$String$toInt,
			A2($elm$core$Array$get, 2, splitArray)));
	var maybeMonth = $elm_community$maybe_extra$Maybe$Extra$join(
		A2(
			$elm$core$Maybe$map,
			$author$project$Pages$Dashboard$intToMonth,
			$elm_community$maybe_extra$Maybe$Extra$join(
				A2(
					$elm$core$Maybe$map,
					$elm$core$String$toInt,
					A2($elm$core$Array$get, 1, splitArray)))));
	var maybeDay = $elm_community$maybe_extra$Maybe$Extra$join(
		A2(
			$elm$core$Maybe$map,
			$elm$core$String$toInt,
			A2($elm$core$Array$get, 0, splitArray)));
	return $elm_community$maybe_extra$Maybe$Extra$join(
		A4($elm$core$Maybe$map3, $author$project$Pages$Dashboard$dayMonthYearToDate, maybeDay, maybeMonth, maybeYear));
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Api$Homework$Assignment$getAssignmentByID = F2(
	function (id, onResponse) {
		return $elm$http$Http$riskyRequest(
			{
				bc: $elm$http$Http$emptyBody,
				bh: A2($author$project$Api$expectJson, onResponse, $author$project$Api$Homework$Course$assignmentDecoder),
				bk: _List_Nil,
				bl: 'GET',
				bq: $elm$core$Maybe$Nothing,
				bt: $elm$core$Maybe$Nothing,
				bv: $author$project$Api$Api$apiAddress + ('/assignment/' + id)
			});
	});
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $elm$core$String$append = _String_append;
var $author$project$Spa$Generated$Route$toString = function (route) {
	var segments = function () {
		switch (route) {
			case 0:
				return _List_Nil;
			case 1:
				return _List_fromArray(
					['dashboard']);
			case 2:
				return _List_fromArray(
					['login']);
			case 3:
				return _List_fromArray(
					['not-found']);
			case 4:
				return _List_fromArray(
					['register']);
			case 5:
				return _List_fromArray(
					['dashboard', 'admin']);
			default:
				return _List_fromArray(
					['dashboard', 'moodle']);
		}
	}();
	return A2(
		$elm$core$String$append,
		'/',
		A2($elm$core$String$join, '/', segments));
};
var $author$project$Utils$Route$navigate = F2(
	function (key, route) {
		return A2(
			$elm$browser$Browser$Navigation$pushUrl,
			key,
			$author$project$Spa$Generated$Route$toString(route));
	});
var $elm$core$Basics$not = _Basics_not;
var $author$project$Api$Homework$Assignment$removeAssignment = F2(
	function (id, options) {
		return $elm$http$Http$riskyRequest(
			{
				bc: $elm$http$Http$emptyBody,
				bh: A2($author$project$Api$expectJson, options.fT, $author$project$Api$Homework$Course$assignmentDecoder),
				bk: _List_Nil,
				bl: 'DELETE',
				bq: $elm$core$Maybe$Nothing,
				bt: $elm$core$Maybe$Nothing,
				bv: $author$project$Api$Api$apiAddress + ('/assignment?id=' + id)
			});
	});
var $author$project$Api$Homework$Course$MinimalCourse = F3(
	function (id, name, fromMoodle) {
		return {hL: fromMoodle, hU: id, ig: name};
	});
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $author$project$Api$Homework$Course$minimalCourseDecoder = A4(
	$elm$json$Json$Decode$map3,
	$author$project$Api$Homework$Course$MinimalCourse,
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$andThen,
		function (maybeBool) {
			if (!maybeBool.$) {
				var bool = maybeBool.a;
				return $elm$json$Json$Decode$succeed(bool);
			} else {
				return $elm$json$Json$Decode$succeed(false);
			}
		},
		A2(
			$elm$json$Json$Decode$field,
			'from_moodle',
			$elm$json$Json$Decode$nullable($elm$json$Json$Decode$bool))));
var $author$project$Api$Homework$Course$searchCourses = F2(
	function (searchterm, options) {
		return $elm$http$Http$riskyRequest(
			{
				bc: $elm$http$Http$emptyBody,
				bh: A2(
					$author$project$Api$expectJson,
					options.fT,
					$elm$json$Json$Decode$list($author$project$Api$Homework$Course$minimalCourseDecoder)),
				bk: _List_Nil,
				bl: 'GET',
				bq: $elm$core$Maybe$Nothing,
				bt: $elm$core$Maybe$Nothing,
				bv: $author$project$Api$Api$apiAddress + ('/courses/search/' + searchterm)
			});
	});
var $justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		case 6:
			return 7;
		case 7:
			return 8;
		case 8:
			return 9;
		case 9:
			return 10;
		case 10:
			return 11;
		default:
			return 12;
	}
};
var $justinmimbs$date$Date$numberToMonth = function (mn) {
	var _v0 = A2($elm$core$Basics$max, 1, mn);
	switch (_v0) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 3:
			return 2;
		case 4:
			return 3;
		case 5:
			return 4;
		case 6:
			return 5;
		case 7:
			return 6;
		case 8:
			return 7;
		case 9:
			return 8;
		case 10:
			return 9;
		case 11:
			return 10;
		default:
			return 11;
	}
};
var $justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2($justinmimbs$date$Date$daysInMonth, y, m);
			var mn = $justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = $justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {fa: d, fN: m, gI: y};
			}
		}
	});
var $justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2($justinmimbs$date$Date$floorDiv, a, b),
			A2($elm$core$Basics$modBy, b, a));
	});
var $justinmimbs$date$Date$year = function (_v0) {
	var rd = _v0;
	var _v1 = A2($justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _v1.a;
	var r400 = _v1.b;
	var _v2 = A2($justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _v2.a;
	var r100 = _v2.b;
	var _v3 = A2($justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _v3.a;
	var r4 = _v3.b;
	var _v4 = A2($justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _v4.a;
	var r1 = _v4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var $justinmimbs$date$Date$toOrdinalDate = function (_v0) {
	var rd = _v0;
	var y = $justinmimbs$date$Date$year(rd);
	return {
		eh: rd - $justinmimbs$date$Date$daysBeforeYear(y),
		gI: y
	};
};
var $justinmimbs$date$Date$toCalendarDate = function (_v0) {
	var rd = _v0;
	var date = $justinmimbs$date$Date$toOrdinalDate(rd);
	return A3($justinmimbs$date$Date$toCalendarDateHelp, date.gI, 0, date.eh);
};
var $justinmimbs$date$Date$day = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.fa;
	});
var $justinmimbs$date$Date$month = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.fN;
	});
var $justinmimbs$date$Date$monthNumber = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToNumber);
var $justinmimbs$date$Date$ordinalDay = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toOrdinalDate,
	function ($) {
		return $.eh;
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $justinmimbs$date$Date$padSignedInt = F2(
	function (length, _int) {
		return _Utils_ap(
			(_int < 0) ? '-' : '',
			A3(
				$elm$core$String$padLeft,
				length,
				'0',
				$elm$core$String$fromInt(
					$elm$core$Basics$abs(_int))));
	});
var $justinmimbs$date$Date$monthToQuarter = function (m) {
	return (($justinmimbs$date$Date$monthToNumber(m) + 2) / 3) | 0;
};
var $justinmimbs$date$Date$quarter = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToQuarter);
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $justinmimbs$date$Date$weekdayNumber = function (_v0) {
	var rd = _v0;
	var _v1 = A2($elm$core$Basics$modBy, 7, rd);
	if (!_v1) {
		return 7;
	} else {
		var n = _v1;
		return n;
	}
};
var $justinmimbs$date$Date$daysBeforeWeekYear = function (y) {
	var jan4 = $justinmimbs$date$Date$daysBeforeYear(y) + 4;
	return jan4 - $justinmimbs$date$Date$weekdayNumber(jan4);
};
var $elm$time$Time$Fri = 4;
var $elm$time$Time$Mon = 0;
var $elm$time$Time$Sat = 5;
var $elm$time$Time$Sun = 6;
var $elm$time$Time$Thu = 3;
var $elm$time$Time$Tue = 1;
var $elm$time$Time$Wed = 2;
var $justinmimbs$date$Date$numberToWeekday = function (wdn) {
	var _v0 = A2($elm$core$Basics$max, 1, wdn);
	switch (_v0) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 3:
			return 2;
		case 4:
			return 3;
		case 5:
			return 4;
		case 6:
			return 5;
		default:
			return 6;
	}
};
var $justinmimbs$date$Date$toWeekDate = function (_v0) {
	var rd = _v0;
	var wdn = $justinmimbs$date$Date$weekdayNumber(rd);
	var wy = $justinmimbs$date$Date$year(rd + (4 - wdn));
	var week1Day1 = $justinmimbs$date$Date$daysBeforeWeekYear(wy) + 1;
	return {
		gB: 1 + (((rd - week1Day1) / 7) | 0),
		gC: wy,
		jE: $justinmimbs$date$Date$numberToWeekday(wdn)
	};
};
var $justinmimbs$date$Date$weekNumber = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toWeekDate,
	function ($) {
		return $.gB;
	});
var $justinmimbs$date$Date$weekYear = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toWeekDate,
	function ($) {
		return $.gC;
	});
var $justinmimbs$date$Date$weekday = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$weekdayNumber, $justinmimbs$date$Date$numberToWeekday);
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $justinmimbs$date$Date$ordinalSuffix = function (n) {
	var nn = A2($elm$core$Basics$modBy, 100, n);
	var _v0 = A2(
		$elm$core$Basics$min,
		(nn < 20) ? nn : A2($elm$core$Basics$modBy, 10, nn),
		4);
	switch (_v0) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
};
var $justinmimbs$date$Date$withOrdinalSuffix = function (n) {
	return _Utils_ap(
		$elm$core$String$fromInt(n),
		$justinmimbs$date$Date$ordinalSuffix(n));
};
var $justinmimbs$date$Date$formatField = F4(
	function (language, _char, length, date) {
		switch (_char) {
			case 'y':
				if (length === 2) {
					return A2(
						$elm$core$String$right,
						2,
						A3(
							$elm$core$String$padLeft,
							2,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$year(date))));
				} else {
					return A2(
						$justinmimbs$date$Date$padSignedInt,
						length,
						$justinmimbs$date$Date$year(date));
				}
			case 'Y':
				if (length === 2) {
					return A2(
						$elm$core$String$right,
						2,
						A3(
							$elm$core$String$padLeft,
							2,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$weekYear(date))));
				} else {
					return A2(
						$justinmimbs$date$Date$padSignedInt,
						length,
						$justinmimbs$date$Date$weekYear(date));
				}
			case 'Q':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 2:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 3:
						return 'Q' + $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 4:
						return $justinmimbs$date$Date$withOrdinalSuffix(
							$justinmimbs$date$Date$quarter(date));
					case 5:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					default:
						return '';
				}
			case 'M':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$monthNumber(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$monthNumber(date)));
					case 3:
						return language.dh(
							$justinmimbs$date$Date$month(date));
					case 4:
						return language.ec(
							$justinmimbs$date$Date$month(date));
					case 5:
						return A2(
							$elm$core$String$left,
							1,
							language.dh(
								$justinmimbs$date$Date$month(date)));
					default:
						return '';
				}
			case 'w':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekNumber(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$weekNumber(date)));
					default:
						return '';
				}
			case 'd':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$day(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$day(date)));
					case 3:
						return language.dJ(
							$justinmimbs$date$Date$day(date));
					default:
						return '';
				}
			case 'D':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$ordinalDay(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$ordinalDay(date)));
					case 3:
						return A3(
							$elm$core$String$padLeft,
							3,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$ordinalDay(date)));
					default:
						return '';
				}
			case 'E':
				switch (length) {
					case 1:
						return language.bx(
							$justinmimbs$date$Date$weekday(date));
					case 2:
						return language.bx(
							$justinmimbs$date$Date$weekday(date));
					case 3:
						return language.bx(
							$justinmimbs$date$Date$weekday(date));
					case 4:
						return language.eT(
							$justinmimbs$date$Date$weekday(date));
					case 5:
						return A2(
							$elm$core$String$left,
							1,
							language.bx(
								$justinmimbs$date$Date$weekday(date)));
					case 6:
						return A2(
							$elm$core$String$left,
							2,
							language.bx(
								$justinmimbs$date$Date$weekday(date)));
					default:
						return '';
				}
			case 'e':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekdayNumber(date));
					case 2:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekdayNumber(date));
					default:
						return A4($justinmimbs$date$Date$formatField, language, 'E', length, date);
				}
			default:
				return '';
		}
	});
var $justinmimbs$date$Date$formatWithTokens = F3(
	function (language, tokens, date) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (token, formatted) {
					if (!token.$) {
						var _char = token.a;
						var length = token.b;
						return _Utils_ap(
							A4($justinmimbs$date$Date$formatField, language, _char, length, date),
							formatted);
					} else {
						var str = token.a;
						return _Utils_ap(str, formatted);
					}
				}),
			'',
			tokens);
	});
var $justinmimbs$date$Pattern$Literal = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0;
		return function (s0) {
			var _v1 = parseA(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				var _v2 = callback(a);
				var parseB = _v2;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {e8: col, hn: contextStack, f4: problem, gd: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.gd, s.e8, x, s.f));
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.b, s.gd, s.e8, s.a);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{e8: newCol, f: s.f, k: s.k, b: newOffset, gd: newRow, a: s.a});
	};
};
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
var $justinmimbs$date$Pattern$escapedQuote = A2(
	$elm$parser$Parser$ignorer,
	$elm$parser$Parser$succeed(
		$justinmimbs$date$Pattern$Literal('\'')),
	$elm$parser$Parser$token('\'\''));
var $elm$parser$Parser$UnexpectedChar = {$: 11};
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.b, s.a);
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{e8: 1, f: s.f, k: s.k, b: s.b + 1, gd: s.gd + 1, a: s.a}) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{e8: s.e8 + 1, f: s.f, k: s.k, b: newOffset, gd: s.gd, a: s.a}));
		};
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $justinmimbs$date$Pattern$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.a);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.b, offset) < 0,
					0,
					{e8: col, f: s0.f, k: s0.k, b: offset, gd: row, a: s0.a});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.b, s.gd, s.e8, s);
	};
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$parser$Parser$Advanced$getOffset = function (s) {
	return A3($elm$parser$Parser$Advanced$Good, false, s.b, s);
};
var $elm$parser$Parser$getOffset = $elm$parser$Parser$Advanced$getOffset;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $justinmimbs$date$Pattern$fieldRepeats = function (str) {
	var _v0 = $elm$core$String$toList(str);
	if (_v0.b && (!_v0.b.b)) {
		var _char = _v0.a;
		return A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F2(
						function (x, y) {
							return A2($justinmimbs$date$Pattern$Field, _char, 1 + (y - x));
						})),
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$getOffset,
					$elm$parser$Parser$chompWhile(
						$elm$core$Basics$eq(_char)))),
			$elm$parser$Parser$getOffset);
	} else {
		return $elm$parser$Parser$problem('expected exactly one char');
	}
};
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3($elm$core$String$slice, s0.b, s1.b, s0.a),
						a),
					s1);
			}
		};
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $justinmimbs$date$Pattern$field = A2(
	$elm$parser$Parser$andThen,
	$justinmimbs$date$Pattern$fieldRepeats,
	$elm$parser$Parser$getChompedString(
		$elm$parser$Parser$chompIf($elm$core$Char$isAlpha)));
var $justinmimbs$date$Pattern$finalize = A2(
	$elm$core$List$foldl,
	F2(
		function (token, tokens) {
			var _v0 = _Utils_Tuple2(token, tokens);
			if (((_v0.a.$ === 1) && _v0.b.b) && (_v0.b.a.$ === 1)) {
				var x = _v0.a.a;
				var _v1 = _v0.b;
				var y = _v1.a.a;
				var rest = _v1.b;
				return A2(
					$elm$core$List$cons,
					$justinmimbs$date$Pattern$Literal(
						_Utils_ap(x, y)),
					rest);
			} else {
				return A2($elm$core$List$cons, token, tokens);
			}
		}),
	_List_Nil);
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return function (s) {
		var _v0 = thunk(0);
		var parse = _v0;
		return parse(s);
	};
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $justinmimbs$date$Pattern$isLiteralChar = function (_char) {
	return (_char !== '\'') && (!$elm$core$Char$isAlpha(_char));
};
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $justinmimbs$date$Pattern$literal = A2(
	$elm$parser$Parser$map,
	$justinmimbs$date$Pattern$Literal,
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(0),
				$elm$parser$Parser$chompIf($justinmimbs$date$Pattern$isLiteralChar)),
			$elm$parser$Parser$chompWhile($justinmimbs$date$Pattern$isLiteralChar))));
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$ExpectingEnd = {$: 10};
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.a),
			s.b) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $justinmimbs$date$Pattern$quotedHelp = function (result) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$andThen,
				function (str) {
					return $justinmimbs$date$Pattern$quotedHelp(
						_Utils_ap(result, str));
				},
				$elm$parser$Parser$getChompedString(
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed(0),
							$elm$parser$Parser$chompIf(
								$elm$core$Basics$neq('\''))),
						$elm$parser$Parser$chompWhile(
							$elm$core$Basics$neq('\''))))),
				A2(
				$elm$parser$Parser$andThen,
				function (_v0) {
					return $justinmimbs$date$Pattern$quotedHelp(result + '\'');
				},
				$elm$parser$Parser$token('\'\'')),
				$elm$parser$Parser$succeed(result)
			]));
};
var $justinmimbs$date$Pattern$quoted = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($justinmimbs$date$Pattern$Literal),
		$elm$parser$Parser$chompIf(
			$elm$core$Basics$eq('\''))),
	A2(
		$elm$parser$Parser$ignorer,
		$justinmimbs$date$Pattern$quotedHelp(''),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					$elm$parser$Parser$chompIf(
					$elm$core$Basics$eq('\'')),
					$elm$parser$Parser$end
				]))));
var $justinmimbs$date$Pattern$patternHelp = function (tokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$andThen,
				function (token) {
					return $justinmimbs$date$Pattern$patternHelp(
						A2($elm$core$List$cons, token, tokens));
				},
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[$justinmimbs$date$Pattern$field, $justinmimbs$date$Pattern$literal, $justinmimbs$date$Pattern$escapedQuote, $justinmimbs$date$Pattern$quoted]))),
				$elm$parser$Parser$lazy(
				function (_v0) {
					return $elm$parser$Parser$succeed(
						$justinmimbs$date$Pattern$finalize(tokens));
				})
			]));
};
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {e8: col, f4: problem, gd: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.gd, p.e8, p.f4);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{e8: 1, f: _List_Nil, k: 1, b: 0, gd: 1, a: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $justinmimbs$date$Pattern$fromString = function (str) {
	return A2(
		$elm$core$Result$withDefault,
		_List_fromArray(
			[
				$justinmimbs$date$Pattern$Literal(str)
			]),
		A2(
			$elm$parser$Parser$run,
			$justinmimbs$date$Pattern$patternHelp(_List_Nil),
			str));
};
var $justinmimbs$date$Date$formatWithLanguage = F2(
	function (language, pattern) {
		var tokens = $elm$core$List$reverse(
			$justinmimbs$date$Pattern$fromString(pattern));
		return A2($justinmimbs$date$Date$formatWithTokens, language, tokens);
	});
var $justinmimbs$date$Date$monthToName = function (m) {
	switch (m) {
		case 0:
			return 'January';
		case 1:
			return 'February';
		case 2:
			return 'March';
		case 3:
			return 'April';
		case 4:
			return 'May';
		case 5:
			return 'June';
		case 6:
			return 'July';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'October';
		case 10:
			return 'November';
		default:
			return 'December';
	}
};
var $justinmimbs$date$Date$weekdayToName = function (wd) {
	switch (wd) {
		case 0:
			return 'Monday';
		case 1:
			return 'Tuesday';
		case 2:
			return 'Wednesday';
		case 3:
			return 'Thursday';
		case 4:
			return 'Friday';
		case 5:
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var $justinmimbs$date$Date$language_en = {
	dJ: $justinmimbs$date$Date$withOrdinalSuffix,
	ec: $justinmimbs$date$Date$monthToName,
	dh: A2(
		$elm$core$Basics$composeR,
		$justinmimbs$date$Date$monthToName,
		$elm$core$String$left(3)),
	eT: $justinmimbs$date$Date$weekdayToName,
	bx: A2(
		$elm$core$Basics$composeR,
		$justinmimbs$date$Date$weekdayToName,
		$elm$core$String$left(3))
};
var $justinmimbs$date$Date$format = function (pattern) {
	return A2($justinmimbs$date$Date$formatWithLanguage, $justinmimbs$date$Date$language_en, pattern);
};
var $author$project$Pages$Dashboard$toGermanDateString = function (date) {
	return A2($justinmimbs$date$Date$format, 'd.M.y', date);
};
var $elm$core$String$trim = _String_trim;
var $author$project$Pages$Dashboard$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var data = msg.a;
				if (data.$ === 2) {
					var e = data.a;
					if (e.$ === 3) {
						var s = e.a;
						return ((s === 401) || (s === 403)) ? _Utils_Tuple2(
							model,
							A2($author$project$Utils$Route$navigate, model.bv.h7, 2)) : _Utils_Tuple2(
							_Utils_update(
								model,
								{y: data}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{y: data}),
							$elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{y: data}),
						$elm$core$Platform$Cmd$none);
				}
			case 2:
				var data = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{a2: data}),
					$elm$core$Platform$Cmd$none);
			case 1:
				var text = msg.a;
				var errorMsg = 'no course selected';
				return $elm$core$String$isEmpty(
					$elm$core$String$trim(text)) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: A2($elm$core$List$member, errorMsg, model.d) ? model.d : A2(
								$elm$core$List$append,
								model.d,
								_List_fromArray(
									[errorMsg])),
							a2: $author$project$Api$NotAsked,
							aC: text,
							aD: $elm$core$Maybe$Nothing
						}),
					$elm$core$Platform$Cmd$none) : (_Utils_eq(model.aD, $elm$core$Maybe$Nothing) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: A2($elm$core$List$member, errorMsg, model.d) ? model.d : A2(
								$elm$core$List$append,
								model.d,
								_List_fromArray(
									[errorMsg])),
							aC: text,
							aD: $elm$core$Maybe$Nothing
						}),
					A2(
						$author$project$Api$Homework$Course$searchCourses,
						text,
						{fT: $author$project$Pages$Dashboard$GotSearchCoursesData})) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: A2(
								$elm$core$List$filter,
								function (error) {
									return !_Utils_eq(error, errorMsg);
								},
								model.d),
							aC: text,
							aD: $elm$core$Maybe$Nothing
						}),
					A2(
						$author$project$Api$Homework$Course$searchCourses,
						text,
						{fT: $author$project$Pages$Dashboard$GotSearchCoursesData})));
			case 3:
				var course = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: A2(
								$elm$core$List$filter,
								function (error) {
									return error !== 'no course selected';
								},
								model.d),
							a2: $author$project$Api$NotAsked,
							aC: course.ig,
							aD: $elm$core$Maybe$Just(course)
						}),
					$elm$core$Platform$Cmd$none);
			case 4:
				var text = msg.a;
				var errorMsg = 'missing title';
				return $elm$core$String$isEmpty(
					$elm$core$String$trim(text)) ? (A2($elm$core$List$member, errorMsg, model.d) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{a4: text}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: A2(
								$elm$core$List$append,
								model.d,
								_List_fromArray(
									[errorMsg])),
							a4: text
						}),
					$elm$core$Platform$Cmd$none)) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: A2(
								$elm$core$List$filter,
								function (error) {
									return !_Utils_eq(error, errorMsg);
								},
								model.d),
							a4: text
						}),
					$elm$core$Platform$Cmd$none);
			case 5:
				var text = msg.a;
				var errorMsg2 = 'due date is in the past!';
				var errorMsg = 'invalid date';
				var epochStartOffset = 719162;
				var _v3 = $author$project$Pages$Dashboard$dateStringToDate(text);
				if (!_v3.$) {
					var date = _v3.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ba: ($justinmimbs$date$Date$toRataDie(date) - epochStartOffset) - ($justinmimbs$date$Date$toRataDie(model.B) - epochStartOffset),
								at: text,
								d: A2(
									$elm$core$List$append,
									A2(
										$elm$core$List$filter,
										function (error) {
											return (!_Utils_eq(error, errorMsg)) && (!_Utils_eq(error, errorMsg2));
										},
										model.d),
									((($justinmimbs$date$Date$toRataDie(date) - epochStartOffset) - ($justinmimbs$date$Date$toRataDie(model.B) - epochStartOffset)) < 0) ? _List_fromArray(
										[errorMsg2]) : _List_Nil),
								aE: $elm$core$Maybe$Just(date),
								aF: $elm$time$Time$millisToPosix(
									($elm$core$Basics$floor(
										$justinmimbs$date$Date$toRataDie(date) - epochStartOffset) * (((1000 * 60) * 60) * 24)) - (((1000 * 60) * 60) * 24))
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return A2($elm$core$List$member, errorMsg, model.d) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ba: 0,
								at: text,
								d: A2(
									$elm$core$List$filter,
									function (error) {
										return !_Utils_eq(error, errorMsg2);
									},
									model.d),
								aE: $elm$core$Maybe$Nothing,
								aF: $elm$time$Time$millisToPosix(
									($elm$core$Basics$floor(
										$justinmimbs$date$Date$toRataDie(model.B) - epochStartOffset) * (((1000 * 60) * 60) * 24)) - (((1000 * 60) * 60) * 24))
							}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{
								ba: 0,
								at: text,
								d: A2(
									$elm$core$List$append,
									A2(
										$elm$core$List$filter,
										function (error) {
											return !_Utils_eq(error, errorMsg2);
										},
										model.d),
									_List_fromArray(
										[errorMsg])),
								aE: $elm$core$Maybe$Nothing,
								aF: $elm$time$Time$millisToPosix(
									($elm$core$Basics$floor(
										$justinmimbs$date$Date$toRataDie(model.B) - epochStartOffset) * (((1000 * 60) * 60) * 24)) - (((1000 * 60) * 60) * 24))
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 8:
				var time = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aF: time,
							B: A2($justinmimbs$date$Date$fromPosix, model.b2, time)
						}),
					$elm$core$Platform$Cmd$none);
			case 9:
				var zone = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{b2: zone}),
					$elm$core$Platform$Cmd$none);
			case 6:
				var _v4 = model.aD;
				if (!_v4.$) {
					var course = _v4.a;
					var _v5 = model.aE;
					if (!_v5.$) {
						var dueDate = _v5.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{at: '', d: _List_Nil, a2: $author$project$Api$NotAsked, aC: '', aD: $elm$core$Maybe$Nothing, aE: $elm$core$Maybe$Nothing}),
							A2(
								$author$project$Api$Homework$Assignment$createAssignment,
								{ho: course.hU, hy: dueDate, hL: course.hL, jt: model.a4},
								{fT: $author$project$Pages$Dashboard$GotCreateAssignmentData}));
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 7:
				var data = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{c$: data}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								$author$project$Api$Homework$Course$getActiveCourses(
								{fT: $author$project$Pages$Dashboard$GotCourseData}),
								A2($author$project$Api$Homework$Assignment$getAssignments, model.aH, $author$project$Pages$Dashboard$GotAssignmentData)
							])));
			case 10:
				var epochStartOffset = 719162;
				var date = A2(
					$justinmimbs$date$Date$fromPosix,
					model.b2,
					$elm$time$Time$millisToPosix(
						$elm$core$Basics$floor(
							$elm$time$Time$posixToMillis(model.aF) + (((1000 * 60) * 60) * 24))));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ba: ($justinmimbs$date$Date$toRataDie(date) - epochStartOffset) - ($justinmimbs$date$Date$toRataDie(model.B) - epochStartOffset),
							at: $author$project$Pages$Dashboard$toGermanDateString(date),
							d: A2(
								$elm$core$List$filter,
								function (error) {
									return error !== 'invalid date';
								},
								model.d),
							aE: $elm$core$Maybe$Just(date),
							aF: $elm$time$Time$millisToPosix(
								$elm$core$Basics$floor(
									$justinmimbs$date$Date$toRataDie(
										A2($justinmimbs$date$Date$fromPosix, model.b2, model.aF)) - epochStartOffset) * (((1000 * 60) * 60) * 24))
						}),
					$elm$core$Platform$Cmd$none);
			case 11:
				var id = msg.a;
				return _Utils_Tuple2(
					model,
					A2(
						$author$project$Api$Homework$Assignment$removeAssignment,
						id,
						{fT: $author$project$Pages$Dashboard$GotRemoveAssignmentData}));
			case 12:
				var data = msg.a;
				if (data.$ === 3) {
					var assignment = data.a;
					var _v7 = model.y;
					if (_v7.$ === 3) {
						var courseData = _v7.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									y: $author$project$Api$Success(
										A2(
											$elm$core$List$map,
											function (c) {
												return _Utils_update(
													c,
													{
														g_: A2(
															$elm$core$List$filter,
															function (a) {
																return !_Utils_eq(a.hU, assignment.hU);
															},
															c.g_)
													});
											},
											courseData)),
									bK: $elm$core$Maybe$Nothing
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 13:
				var data = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{b4: data}),
					$elm$core$Platform$Cmd$none);
			case 14:
				var days = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{b4: $author$project$Api$Loading, aH: days}),
					A2($author$project$Api$Homework$Assignment$getAssignments, days, $author$project$Pages$Dashboard$GotAssignmentData));
			case 15:
				var direction = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bZ: direction}),
					$elm$core$Platform$Cmd$none);
			case 16:
				var id = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							bK: $elm$core$Maybe$Just(id)
						}),
					A2($author$project$Api$Homework$Assignment$getAssignmentByID, id, $author$project$Pages$Dashboard$GotAssignmentModalData));
			case 18:
				var data = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{b5: data}),
					$elm$core$Platform$Cmd$none);
			case 17:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bK: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 19:
				var assignmentId = msg.a;
				var _v8 = model.y;
				if (_v8.$ === 3) {
					var courseData = _v8.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								y: $author$project$Api$Success(
									A2(
										$elm$core$List$map,
										function (c) {
											return _Utils_update(
												c,
												{
													g_: A2(
														$elm$core$List$map,
														function (a) {
															return _Utils_eq(a.hU, assignmentId) ? _Utils_update(
																a,
																{jt: model.bg}) : a;
														},
														c.g_)
												});
										},
										courseData))
							}),
						A3($author$project$Api$Homework$Assignment$changeAssignmentTitle, assignmentId, model.bg, $author$project$Pages$Dashboard$GotChangeAssignmentTitle));
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 20:
				var text = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bg: text}),
					$elm$core$Platform$Cmd$none);
			case 21:
				var title = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bz: true, bg: title}),
					$elm$core$Platform$Cmd$none);
			case 22:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{bz: false}),
					$elm$core$Platform$Cmd$none);
			case 23:
				var assignmentData = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{b5: assignmentData, bz: false}),
					$elm$core$Platform$Cmd$none);
			case 24:
				var data = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cc: data}),
					$elm$core$Platform$Cmd$none);
			default:
				var data = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{c_: data}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Pages$Dashboard$borderRadius = 20;
var $mdgriffith$elm_ui$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
	return (i > 31) ? $mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : $mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
};
var $mdgriffith$elm_ui$Internal$Flag$bgColor = $mdgriffith$elm_ui$Internal$Flag$flag(8);
var $elm$core$Basics$round = _Basics_round;
var $mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(x * 255));
};
var $mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return $mdgriffith$elm_ui$Internal$Model$floatClass(red) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(green) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
};
var $mdgriffith$elm_ui$Element$Background$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$bgColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var $mdgriffith$elm_ui$Internal$Flag$fontColor = $mdgriffith$elm_ui$Internal$Flag$flag(14);
var $mdgriffith$elm_ui$Element$Font$color = function (fontColor) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsColumn = 1;
var $mdgriffith$elm_ui$Internal$Model$asColumn = 1;
var $mdgriffith$elm_ui$Internal$Style$classes = {gK: 'a', gL: 'atv', gO: 'ab', gP: 'cx', gQ: 'cy', gR: 'acb', gS: 'accx', gT: 'accy', gU: 'acr', e$: 'al', e0: 'ar', gV: 'at', dy: 'ah', dz: 'av', gY: 's', g2: 'bh', g3: 'b', g5: 'w7', g7: 'bd', g8: 'bdt', cR: 'bn', g9: 'bs', cT: 'cpe', hh: 'cp', hi: 'cpx', hj: 'cpy', aR: 'c', cV: 'ctr', cX: 'cb', cY: 'ccx', aS: 'ccy', cb: 'cl', cZ: 'cr', hm: 'ct', hp: 'cptr', hq: 'ctxt', hJ: 'fcs', fl: 'focus-within', hM: 'fs', hO: 'g', dQ: 'hbh', dR: 'hc', fr: 'he', dS: 'hf', fs: 'hfp', hS: 'hv', hV: 'ic', hX: 'fr', c8: 'lbl', h0: 'iml', h1: 'imlf', h2: 'imlp', h3: 'implw', h4: 'it', h6: 'i', fJ: 'lnk', bO: 'nb', fQ: 'notxt', it: 'ol', iv: 'or', bm: 'oq', iD: 'oh', aB: 'pg', f_: 'p', iF: 'ppe', iO: 'ui', gd: 'r', iU: 'sb', iV: 'sbx', iW: 'sby', iY: 'sbt', i0: 'e', i1: 'cap', i2: 'sev', i9: 'sk', du: 't', jf: 'tc', jg: 'w8', jh: 'w2', ji: 'w9', jj: 'tj', dv: 'tja', jk: 'tl', jl: 'w3', jm: 'w5', jn: 'w4', jo: 'tr', jp: 'w6', jq: 'w1', jr: 'tun', aa: 'ts', bu: 'clr', jB: 'u', eU: 'wc', gD: 'we', eV: 'wf', gE: 'wfp', eW: 'wrp'};
var $mdgriffith$elm_ui$Internal$Model$Generic = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.gY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.aR);
var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.gY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.hO);
var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.gY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.aB);
var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.gY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.f_);
var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.gY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.gd);
var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.gY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.i0);
var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
	switch (context) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Model$rowClass;
		case 1:
			return $mdgriffith$elm_ui$Internal$Model$columnClass;
		case 2:
			return $mdgriffith$elm_ui$Internal$Model$singleClass;
		case 3:
			return $mdgriffith$elm_ui$Internal$Model$gridClass;
		case 4:
			return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
		default:
			return $mdgriffith$elm_ui$Internal$Model$pageClass;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addChildren = F2(
	function (existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(behind, existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(existing, inFront);
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					behind,
					_Utils_ap(existing, inFront));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3(
	function (key, existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 0:
				return existing;
			case 1:
				var behind = nearbyChildren.a;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					existing);
			case 2:
				var inFront = nearbyChildren.a;
				return _Utils_ap(
					existing,
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						inFront));
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					_Utils_ap(
						existing,
						A2(
							$elm$core$List$map,
							function (x) {
								return _Utils_Tuple2(key, x);
							},
							inFront)));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsEl = 2;
var $mdgriffith$elm_ui$Internal$Model$asEl = 2;
var $mdgriffith$elm_ui$Internal$Model$AsParagraph = 4;
var $mdgriffith$elm_ui$Internal$Model$asParagraph = 4;
var $mdgriffith$elm_ui$Internal$Flag$alignBottom = $mdgriffith$elm_ui$Internal$Flag$flag(41);
var $mdgriffith$elm_ui$Internal$Flag$alignRight = $mdgriffith$elm_ui$Internal$Flag$flag(40);
var $mdgriffith$elm_ui$Internal$Flag$centerX = $mdgriffith$elm_ui$Internal$Flag$flag(42);
var $mdgriffith$elm_ui$Internal$Flag$centerY = $mdgriffith$elm_ui$Internal$Flag$flag(43);
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$core$Set$Set_elm_builtin = $elm$core$Basics$identity;
var $elm$core$Set$empty = $elm$core$Dict$empty;
var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 0:
			var px = x.a;
			return $elm$core$String$fromInt(px) + 'px';
		case 1:
			return 'auto';
		case 2:
			var i = x.a;
			return $elm$core$String$fromInt(i) + 'fr';
		case 3:
			var min = x.a;
			var len = x.b;
			return 'min' + ($elm$core$String$fromInt(min) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + ($elm$core$String$fromInt(max) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
	}
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
	switch (transform.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'mv-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(x) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(y) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			return $elm$core$Maybe$Just(
				'tfrm-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 13:
			var name = style.a;
			return name;
		case 12:
			var name = style.a;
			var o = style.b;
			return name;
		case 0:
			var _class = style.a;
			return _class;
		case 1:
			var name = style.a;
			return name;
		case 2:
			var i = style.a;
			return 'font-size-' + $elm$core$String$fromInt(i);
		case 3:
			var _class = style.a;
			return _class;
		case 4:
			var _class = style.a;
			return _class;
		case 5:
			var cls = style.a;
			var x = style.b;
			var y = style.c;
			return cls;
		case 7:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 6:
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 8:
			var template = style.a;
			return 'grid-rows-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.iP)) + ('-cols-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.ar)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.i3.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.i3.b)))))));
		case 9:
			var pos = style.a;
			return 'gp grid-pos-' + ($elm$core$String$fromInt(pos.gd) + ('-' + ($elm$core$String$fromInt(pos.e8) + ('-' + ($elm$core$String$fromInt(pos.jF) + ('-' + $elm$core$String$fromInt(pos.hP)))))));
		case 11:
			var selector = style.a;
			var subStyle = style.b;
			var name = function () {
				switch (selector) {
					case 0:
						return 'fs';
					case 1:
						return 'hv';
					default:
						return 'act';
				}
			}();
			return A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					function (sty) {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
						if (_v1 === '') {
							return '';
						} else {
							var styleName = _v1;
							return styleName + ('-' + name);
						}
					},
					subStyle));
		default:
			var x = style.a;
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$mdgriffith$elm_ui$Internal$Model$transformClass(x));
	}
};
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0;
		return A3($elm$core$Dict$insert, key, 0, dict);
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0;
		return A2($elm$core$Dict$member, key, dict);
	});
var $mdgriffith$elm_ui$Internal$Model$reduceStyles = F2(
	function (style, nevermind) {
		var cache = nevermind.a;
		var existing = nevermind.b;
		var styleName = $mdgriffith$elm_ui$Internal$Model$getStyleName(style);
		return A2($elm$core$Set$member, styleName, cache) ? nevermind : _Utils_Tuple2(
			A2($elm$core$Set$insert, styleName, cache),
			A2($elm$core$List$cons, style, existing));
	});
var $mdgriffith$elm_ui$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$dot = function (c) {
	return '.' + c;
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $mdgriffith$elm_ui$Internal$Model$formatColor = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return 'rgba(' + ($elm$core$String$fromInt(
		$elm$core$Basics$round(red * 255)) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(green * 255))) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(blue * 255))) + (',' + ($elm$core$String$fromFloat(alpha) + ')')))));
};
var $mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.fy ? $elm$core$Maybe$Just('inset') : $elm$core$Maybe$Nothing,
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.b.a) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.b.b) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.bA) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.gk) + 'px'),
					$elm$core$Maybe$Just(
					$mdgriffith$elm_ui$Internal$Model$formatColor(shadow.bB))
				])));
};
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fl) + ':focus-within',
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.g6),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.g0),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										bA: shadow.bA,
										bB: shadow.bB,
										fy: false,
										b: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.b)),
										gk: shadow.gk
									}));
						},
						focus.i_),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					]))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY) + (':focus .focusable, ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY) + '.focusable:focus')),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.g6),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.g0),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										bA: shadow.bA,
										bB: shadow.bB,
										fy: false,
										b: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.b)),
										gk: shadow.gk
									}));
						},
						focus.i_),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					])))
		]);
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Style$AllChildren = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
	return {$: 6, a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Left = 3;
var $mdgriffith$elm_ui$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Right = 2;
var $mdgriffith$elm_ui$Internal$Style$Self = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Content = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$Bottom = 1;
var $mdgriffith$elm_ui$Internal$Style$CenterX = 4;
var $mdgriffith$elm_ui$Internal$Style$CenterY = 5;
var $mdgriffith$elm_ui$Internal$Style$Top = 0;
var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray(
	[0, 1, 2, 3, 4, 5]);
var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hm);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cX);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cZ);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cb);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cY);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aS);
	}
};
var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
	switch (desc) {
		case 0:
			var _v1 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gV);
		case 1:
			var _v2 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gO);
		case 2:
			var _v3 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e0);
		case 3:
			var _v4 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.e$);
		case 4:
			var _v5 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gP);
		default:
			var _v6 = desc;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gQ);
	}
};
var $mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _v0 = values(alignment);
		var content = _v0.a;
		var indiv = _v0.b;
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$contentName(alignment),
				content),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						indiv)
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray(
	[
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dQ),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g2),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iY),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.du),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dS),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eV),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'auto !important')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dR),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dS),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eV),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gE),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eU),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
			])),
		$mdgriffith$elm_ui$Internal$Style$describeAlignment(
		function (alignment) {
			switch (alignment) {
				case 0:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
							]));
				case 1:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
							]));
				case 2:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
							]));
				case 3:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							]));
				case 4:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
							]));
				default:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
									]))
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
							]));
			}
		})
	]);
var $mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(alignment),
						values(alignment))
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$Above = 0;
var $mdgriffith$elm_ui$Internal$Style$Behind = 5;
var $mdgriffith$elm_ui$Internal$Style$Below = 1;
var $mdgriffith$elm_ui$Internal$Style$OnLeft = 3;
var $mdgriffith$elm_ui$Internal$Style$OnRight = 2;
var $mdgriffith$elm_ui$Internal$Style$Within = 4;
var $mdgriffith$elm_ui$Internal$Style$locations = function () {
	var loc = 0;
	var _v0 = function () {
		switch (loc) {
			case 0:
				return 0;
			case 1:
				return 0;
			case 2:
				return 0;
			case 3:
				return 0;
			case 4:
				return 0;
			default:
				return 0;
		}
	}();
	return _List_fromArray(
		[0, 1, 2, 3, 4, 5]);
}();
var $mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray(
	[
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		'html,body',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		_Utils_ap(
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY),
			_Utils_ap(
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i0),
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hV))),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dS),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-height', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eV),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY) + ':focus',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'outline', 'none')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iO),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dS)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dS),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hX),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bO),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bO),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i0),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				$mdgriffith$elm_ui$Internal$Style$Batch(
				function (fn) {
					return A2($elm$core$List$map, fn, $mdgriffith$elm_ui$Internal$Style$locations);
				}(
					function (loc) {
						switch (loc) {
							case 0:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gK),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dS),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eV),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
												])),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 1:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g3),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dS),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												]))
										]));
							case 2:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iv),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 3:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.it),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'right', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 4:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hX),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							default:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g2),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
						}
					}))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'resize', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'box-sizing', 'border-box'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-size', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-family', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'inherit'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eW),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-wrap', 'wrap')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fQ),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-moz-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-webkit-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-ms-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'user-select', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hp),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'pointer')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hq),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iF),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cT),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bu),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bm),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hS, $mdgriffith$elm_ui$Internal$Style$classes.bu)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hS, $mdgriffith$elm_ui$Internal$Style$classes.bm)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hJ, $mdgriffith$elm_ui$Internal$Style$classes.bu)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hJ, $mdgriffith$elm_ui$Internal$Style$classes.bm)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.gL, $mdgriffith$elm_ui$Internal$Style$classes.bu)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.gL, $mdgriffith$elm_ui$Internal$Style$classes.bm)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aa),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Prop,
						'transition',
						A2(
							$elm$core$String$join,
							', ',
							A2(
								$elm$core$List$map,
								function (x) {
									return x + ' 160ms';
								},
								_List_fromArray(
									['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iU),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iV),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gd),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iW),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aR),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i0),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hh),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hi),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hj),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eU),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', 'auto')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cR),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g7),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dashed')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g8),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dotted')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g9),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.du),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h4),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1.05'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background', 'transparent'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'inherit')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i0),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gd),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gD),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fJ),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dS),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.fs),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eV),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cV),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.gU,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.gS,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gP),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-left', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.gS,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gP),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-right', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.gS,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gQ),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.gS + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.gU + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.gS)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_Nil);
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_Nil);
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i2),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.c8),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'baseline')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aR),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dS),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eV),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gE),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.eU),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.gR,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.gT,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gQ),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.gT,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gQ),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.gT,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gQ),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.gT + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.gR + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.gT)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
											]));
								case 1:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto')
											]));
								case 2:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 4:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cV),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i2),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hO),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', '-ms-grid'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'.gp',
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Supports,
						_Utils_Tuple2('display', 'grid'),
						_List_fromArray(
							[
								_Utils_Tuple2('display', 'grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$gridAlignments(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
										]);
								case 1:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
										]);
								case 2:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
										]);
								case 3:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
										]);
								case 4:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
										]);
								default:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
										]);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aB),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY + ':first-child'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.gY + ($mdgriffith$elm_ui$Internal$Style$selfName(3) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.gY))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.gY + ($mdgriffith$elm_ui$Internal$Style$selfName(2) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.gY))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h0),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background-color', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h3),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i0),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h2),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h1),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'transparent')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.f_),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-wrap', 'break-word'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dQ),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g2),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.du),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.f_),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::after',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::before',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i0),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gD),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hX),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g2),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gK),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g3),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.iv),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.it),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.du),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gd),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.aR),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hO),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment) {
								case 0:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 1:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 2:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right')
											]));
								case 3:
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left')
											]));
								case 4:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.hidden',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jq),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '100')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jh),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '200')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jl),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '300')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jn),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '400')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jm),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '500')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jp),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '600')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.g5),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '700')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jg),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '800')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.ji),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '900')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.h6),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'italic')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i9),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jB),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jB),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.i9)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jr),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'normal')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jj),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.dv),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify-all')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jf),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'center')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jo),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'right')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.jk),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'left')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.modal',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none')
					]))
			]))
	]);
var $mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + _var,
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\"'))
				])),
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + (_var + '-off'),
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\" 0'))
				]))
		]);
};
var $mdgriffith$elm_ui$Internal$Style$commonValues = $elm$core$List$concat(
	_List_fromArray(
		[
			A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.border-' + $elm$core$String$fromInt(x),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'border-width',
							$elm$core$String$fromInt(x) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 6)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 8, 32)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.p-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'padding',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 24)),
			_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'small-caps')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp-off',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'normal')
					]))
			]),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('zero'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('onum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('liga'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('dlig'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('ordn'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('tnum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('afrc'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('frac')
		]));
var $mdgriffith$elm_ui$Internal$Style$explainer = '\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .' + ($mdgriffith$elm_ui$Internal$Style$classes.gY + (' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .' + ($mdgriffith$elm_ui$Internal$Style$classes.gY + ' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n')));
var $mdgriffith$elm_ui$Internal$Style$inputTextReset = '\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$sliderReset = '\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$thumbReset = '\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n';
var $mdgriffith$elm_ui$Internal$Style$trackReset = '\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gd) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY) + (' { flex-basis: auto !important; } ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gd) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.gY) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cV) + (' { flex-basis: auto !important; }}' + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $mdgriffith$elm_ui$Internal$Style$Intermediate = $elm$core$Basics$identity;
var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return {cU: closing, w: _List_Nil, a0: _List_Nil, al: selector};
	});
var $mdgriffith$elm_ui$Internal$Style$renderRules = F2(
	function (_v0, rulesToRender) {
		var parent = _v0;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 0:
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								a0: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.a0)
							});
					case 3:
						var _v2 = rule.a;
						var prop = _v2.a;
						var value = _v2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								w: A2(
									$elm$core$List$cons,
									{cU: '\n}', w: _List_Nil, a0: props, al: '@supports (' + (prop + (':' + (value + (') {' + parent.al))))},
									rendered.w)
							});
					case 5:
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								w: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.al + (' + ' + selector), ''),
										adjRules),
									rendered.w)
							});
					case 1:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								w: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.al + (' > ' + child), ''),
										childRules),
									rendered.w)
							});
					case 2:
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								w: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.al + (' ' + child), ''),
										childRules),
									rendered.w)
							});
					case 4:
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								w: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(
											$mdgriffith$elm_ui$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.al, descriptor),
											''),
										descriptorRules),
									rendered.w)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								w: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.al, ''),
										batched),
									rendered.w)
							});
				}
			});
		return A3($elm$core$List$foldr, generateIntermediates, parent, rulesToRender);
	});
var $mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return $elm$core$String$concat(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var x = _v3.a;
					var y = _v3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _v2 = rule.a0;
		if (!_v2.b) {
			return '';
		} else {
			return rule.al + ('{' + (renderValues(rule.a0) + (rule.cU + '}')));
		}
	};
	var renderIntermediate = function (_v0) {
		var rule = _v0;
		return _Utils_ap(
			renderClass(rule),
			$elm$core$String$concat(
				A2($elm$core$List$map, renderIntermediate, rule.w)));
	};
	return $elm$core$String$concat(
		A2(
			$elm$core$List$map,
			renderIntermediate,
			A3(
				$elm$core$List$foldr,
				F2(
					function (_v1, existing) {
						var name = _v1.a;
						var styleRules = _v1.b;
						return A2(
							$elm$core$List$cons,
							A2(
								$mdgriffith$elm_ui$Internal$Style$renderRules,
								A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var $mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap(
	$mdgriffith$elm_ui$Internal$Style$overrides,
	$mdgriffith$elm_ui$Internal$Style$renderCompact(
		_Utils_ap($mdgriffith$elm_ui$Internal$Style$baseSheet, $mdgriffith$elm_ui$Internal$Style$commonValues)));
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
	var _v0 = opts.ie;
	switch (_v0) {
		case 0:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'div',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$virtual_dom$VirtualDom$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								$elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Style$rules)
							]))
					]));
		case 1:
			return $elm$virtual_dom$VirtualDom$text('');
		default:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'elm-ui-static-rules',
				_List_fromArray(
					[
						A2(
						$elm$virtual_dom$VirtualDom$property,
						'rules',
						$elm$json$Json$Encode$string($mdgriffith$elm_ui$Internal$Style$rules))
					]),
				_List_Nil);
	}
};
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var $mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
	switch (font.$) {
		case 0:
			return 'serif';
		case 1:
			return 'sans-serif';
		case 2:
			return 'monospace';
		case 3:
			var name = font.a;
			return '\"' + (name + '\"');
		case 4:
			var name = font.a;
			var url = font.b;
			return '\"' + (name + '\"');
		default:
			var name = font.a.ig;
			return '\"' + (name + '\"');
	}
};
var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return name === 'smcp';
		case 1:
			var name = _var.a;
			return false;
		default:
			var name = _var.a;
			var index = _var.b;
			return (name === 'smcp') && (index === 1);
	}
};
var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.gy);
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderProps = F3(
	function (force, _v0, existing) {
		var key = _v0.a;
		var val = _v0.b;
		return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
	});
var $mdgriffith$elm_ui$Internal$Model$renderStyle = F4(
	function (options, maybePseudo, selector, props) {
		if (maybePseudo.$ === 1) {
			return _List_fromArray(
				[
					selector + ('{' + (A3(
					$elm$core$List$foldl,
					$mdgriffith$elm_ui$Internal$Model$renderProps(false),
					'',
					props) + '\n}'))
				]);
		} else {
			var pseudo = maybePseudo.a;
			switch (pseudo) {
				case 1:
					var _v2 = options.hS;
					switch (_v2) {
						case 0:
							return _List_Nil;
						case 2:
							return _List_fromArray(
								[
									selector + ('-hv {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(true),
									'',
									props) + '\n}'))
								]);
						default:
							return _List_fromArray(
								[
									selector + ('-hv:hover {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(false),
									'',
									props) + '\n}'))
								]);
					}
				case 0:
					var renderedProps = A3(
						$elm$core$List$foldl,
						$mdgriffith$elm_ui$Internal$Model$renderProps(false),
						'',
						props);
					return _List_fromArray(
						[selector + ('-fs:focus {' + (renderedProps + '\n}')), ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.gY + (':focus ' + (selector + '-fs  {')))) + (renderedProps + '\n}'), (selector + '-fs:focus-within {') + (renderedProps + '\n}'), ('.focusable-parent:focus ~ ' + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.gY + (' ' + (selector + '-fs {'))))) + (renderedProps + '\n}')]);
				default:
					return _List_fromArray(
						[
							selector + ('-act:active {' + (A3(
							$elm$core$List$foldl,
							$mdgriffith$elm_ui$Internal$Model$renderProps(false),
							'',
							props) + '\n}'))
						]);
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
	switch (_var.$) {
		case 0:
			var name = _var.a;
			return '\"' + (name + '\"');
		case 1:
			var name = _var.a;
			return '\"' + (name + '\" 0');
		default:
			var name = _var.a;
			var index = _var.b;
			return '\"' + (name + ('\" ' + $elm$core$String$fromInt(index)));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
	if (typeface.$ === 5) {
		var font = typeface.a;
		return $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$renderVariant, font.gy)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
	switch (transform.$) {
		case 0:
			return $elm$core$Maybe$Nothing;
		case 1:
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'translate3d(' + ($elm$core$String$fromFloat(x) + ('px, ' + ($elm$core$String$fromFloat(y) + ('px, ' + ($elm$core$String$fromFloat(z) + 'px)'))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			var translate = 'translate3d(' + ($elm$core$String$fromFloat(tx) + ('px, ' + ($elm$core$String$fromFloat(ty) + ('px, ' + ($elm$core$String$fromFloat(tz) + 'px)')))));
			var scale = 'scale3d(' + ($elm$core$String$fromFloat(sx) + (', ' + ($elm$core$String$fromFloat(sy) + (', ' + ($elm$core$String$fromFloat(sz) + ')')))));
			var rotate = 'rotate3d(' + ($elm$core$String$fromFloat(ox) + (', ' + ($elm$core$String$fromFloat(oy) + (', ' + ($elm$core$String$fromFloat(oz) + (', ' + ($elm$core$String$fromFloat(angle) + 'rad)')))))));
			return $elm$core$Maybe$Just(translate + (' ' + (scale + (' ' + rotate))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3(
	function (options, rule, maybePseudo) {
		switch (rule.$) {
			case 0:
				var selector = rule.a;
				var props = rule.b;
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, selector, props);
			case 13:
				var name = rule.a;
				var prop = rule.b;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, 'box-shadow', prop)
						]));
			case 12:
				var name = rule.a;
				var transparency = rule.b;
				var opacity = A2(
					$elm$core$Basics$max,
					0,
					A2($elm$core$Basics$min, 1, 1 - transparency));
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'opacity',
							$elm$core$String$fromFloat(opacity))
						]));
			case 2:
				var i = rule.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			case 1:
				var name = rule.a;
				var typefaces = rule.b;
				var features = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
				var families = _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-family',
						A2(
							$elm$core$String$join,
							', ',
							A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'font-feature-settings', features),
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-variant',
						A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? 'small-caps' : 'normal')
					]);
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, '.' + name, families);
			case 3:
				var _class = rule.a;
				var prop = rule.b;
				var val = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, prop, val)
						]));
			case 4:
				var _class = rule.a;
				var prop = rule.b;
				var color = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							prop,
							$mdgriffith$elm_ui$Internal$Model$formatColor(color))
						]));
			case 5:
				var cls = rule.a;
				var x = rule.b;
				var y = rule.c;
				var yPx = $elm$core$String$fromInt(y) + 'px';
				var xPx = $elm$core$String$fromInt(x) + 'px';
				var single = '.' + $mdgriffith$elm_ui$Internal$Style$classes.i0;
				var row = '.' + $mdgriffith$elm_ui$Internal$Style$classes.gd;
				var wrappedRow = '.' + ($mdgriffith$elm_ui$Internal$Style$classes.eW + row);
				var right = '.' + $mdgriffith$elm_ui$Internal$Style$classes.e0;
				var paragraph = '.' + $mdgriffith$elm_ui$Internal$Style$classes.f_;
				var page = '.' + $mdgriffith$elm_ui$Internal$Style$classes.aB;
				var left = '.' + $mdgriffith$elm_ui$Internal$Style$classes.e$;
				var halfY = $elm$core$String$fromFloat(y / 2) + 'px';
				var halfX = $elm$core$String$fromFloat(x / 2) + 'px';
				var column = '.' + $mdgriffith$elm_ui$Internal$Style$classes.aR;
				var _class = '.' + cls;
				var any = '.' + $mdgriffith$elm_ui$Internal$Style$classes.gY;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (row + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (wrappedRow + (' > ' + any)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin', halfY + (' ' + halfX))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (column + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_Utils_ap(_class, paragraph),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'textarea' + (any + _class),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)')),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'height',
									'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::after'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-top',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::before'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-bottom',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								]))
						]));
			case 7:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'padding',
							$elm$core$String$fromFloat(top) + ('px ' + ($elm$core$String$fromFloat(right) + ('px ' + ($elm$core$String$fromFloat(bottom) + ('px ' + ($elm$core$String$fromFloat(left) + 'px')))))))
						]));
			case 6:
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'border-width',
							$elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 8:
				var template = rule.a;
				var toGridLengthHelper = F3(
					function (minimum, maximum, x) {
						toGridLengthHelper:
						while (true) {
							switch (x.$) {
								case 0:
									var px = x.a;
									return $elm$core$String$fromInt(px) + 'px';
								case 1:
									var _v2 = _Utils_Tuple2(minimum, maximum);
									if (_v2.a.$ === 1) {
										if (_v2.b.$ === 1) {
											var _v3 = _v2.a;
											var _v4 = _v2.b;
											return 'max-content';
										} else {
											var _v6 = _v2.a;
											var maxSize = _v2.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v2.b.$ === 1) {
											var minSize = _v2.a.a;
											var _v5 = _v2.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
										} else {
											var minSize = _v2.a.a;
											var maxSize = _v2.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 2:
									var i = x.a;
									var _v7 = _Utils_Tuple2(minimum, maximum);
									if (_v7.a.$ === 1) {
										if (_v7.b.$ === 1) {
											var _v8 = _v7.a;
											var _v9 = _v7.b;
											return $elm$core$String$fromInt(i) + 'fr';
										} else {
											var _v11 = _v7.a;
											var maxSize = _v7.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v7.b.$ === 1) {
											var minSize = _v7.a.a;
											var _v10 = _v7.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
										} else {
											var minSize = _v7.a.a;
											var maxSize = _v7.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 3:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = $elm$core$Maybe$Just(m),
										$temp$maximum = maximum,
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
								default:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = minimum,
										$temp$maximum = $elm$core$Maybe$Just(m),
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
							}
						}
					});
				var toGridLength = function (x) {
					return A3(toGridLengthHelper, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, x);
				};
				var xSpacing = toGridLength(template.i3.a);
				var ySpacing = toGridLength(template.i3.b);
				var rows = function (x) {
					return 'grid-template-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.iP)));
				var msRows = function (x) {
					return '-ms-grid-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.ar)));
				var msColumns = function (x) {
					return '-ms-grid-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.ar)));
				var gapY = 'grid-row-gap:' + (toGridLength(template.i3.b) + ';');
				var gapX = 'grid-column-gap:' + (toGridLength(template.i3.a) + ';');
				var columns = function (x) {
					return 'grid-template-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.ar)));
				var _class = '.grid-rows-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.iP)) + ('-cols-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.ar)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.i3.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.i3.b)))))));
				var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msColumns + (msRows + '}')));
				return _List_fromArray(
					[base, supports]);
			case 9:
				var position = rule.a;
				var msPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'-ms-grid-row: ' + ($elm$core$String$fromInt(position.gd) + ';'),
							'-ms-grid-row-span: ' + ($elm$core$String$fromInt(position.hP) + ';'),
							'-ms-grid-column: ' + ($elm$core$String$fromInt(position.e8) + ';'),
							'-ms-grid-column-span: ' + ($elm$core$String$fromInt(position.jF) + ';')
						]));
				var modernPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'grid-row: ' + ($elm$core$String$fromInt(position.gd) + (' / ' + ($elm$core$String$fromInt(position.gd + position.hP) + ';'))),
							'grid-column: ' + ($elm$core$String$fromInt(position.e8) + (' / ' + ($elm$core$String$fromInt(position.e8 + position.jF) + ';')))
						]));
				var _class = '.grid-pos-' + ($elm$core$String$fromInt(position.gd) + ('-' + ($elm$core$String$fromInt(position.e8) + ('-' + ($elm$core$String$fromInt(position.jF) + ('-' + $elm$core$String$fromInt(position.hP)))))));
				var modernGrid = _class + ('{' + (modernPosition + '}'));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msPosition + '}'));
				return _List_fromArray(
					[base, supports]);
			case 11:
				var _class = rule.a;
				var styles = rule.b;
				var renderPseudoRule = function (style) {
					return A3(
						$mdgriffith$elm_ui$Internal$Model$renderStyleRule,
						options,
						style,
						$elm$core$Maybe$Just(_class));
				};
				return A2($elm$core$List$concatMap, renderPseudoRule, styles);
			default:
				var transform = rule.a;
				var val = $mdgriffith$elm_ui$Internal$Model$transformValue(transform);
				var _class = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				var _v12 = _Utils_Tuple2(_class, val);
				if ((!_v12.a.$) && (!_v12.b.$)) {
					var cls = _v12.a.a;
					var v = _v12.b.a;
					return A4(
						$mdgriffith$elm_ui$Internal$Model$renderStyle,
						options,
						maybePseudo,
						'.' + cls,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Model$Property, 'transform', v)
							]));
				} else {
					return _List_Nil;
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$encodeStyles = F2(
	function (options, stylesheet) {
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				function (style) {
					var styled = A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing);
					return _Utils_Tuple2(
						$mdgriffith$elm_ui$Internal$Model$getStyleName(style),
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styled));
				},
				stylesheet));
	});
var $mdgriffith$elm_ui$Internal$Model$bracket = F2(
	function (selector, rules) {
		var renderPair = function (_v0) {
			var name = _v0.a;
			var val = _v0.b;
			return name + (': ' + (val + ';'));
		};
		return selector + (' {' + (A2(
			$elm$core$String$join,
			'',
			A2($elm$core$List$map, renderPair, rules)) + '}'));
	});
var $mdgriffith$elm_ui$Internal$Model$fontRule = F3(
	function (name, modifier, _v0) {
		var parentAdj = _v0.a;
		var textAdjustment = _v0.b;
		return _List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + (', ' + ('.' + (name + (' .' + modifier))))))), parentAdj),
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.du + (', .' + (name + (' .' + (modifier + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.du)))))))))), textAdjustment)
			]);
	});
var $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3(
	function (fontToAdjust, _v0, otherFontName) {
		var full = _v0.a;
		var capital = _v0.b;
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_Utils_ap(
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.i1, capital),
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.hM, full)));
	});
var $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2(
	function (fontToAdjust, otherFontName) {
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.i1 + (', ' + ('.' + (name + (' .' + $mdgriffith$elm_ui$Internal$Style$classes.i1))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('line-height', '1')
						])),
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.i1 + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.du + (', .' + (name + (' .' + ($mdgriffith$elm_ui$Internal$Style$classes.i1 + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.du)))))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('vertical-align', '0'),
							_Utils_Tuple2('line-height', '1')
						]))
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$adjust = F3(
	function (size, height, vertical) {
		return {hP: height / size, gk: size, gz: vertical};
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
	var lines = _List_fromArray(
		[adjustment.hc, adjustment.g1, adjustment.hv, adjustment.ia]);
	var lineHeight = 1.5;
	var normalDescender = (lineHeight - 1) / 2;
	var oldMiddle = lineHeight / 2;
	var descender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.hv,
		$elm$core$List$minimum(lines));
	var newBaseline = A2(
		$elm$core$Maybe$withDefault,
		adjustment.g1,
		$elm$core$List$minimum(
			A2(
				$elm$core$List$filter,
				function (x) {
					return !_Utils_eq(x, descender);
				},
				lines)));
	var base = lineHeight;
	var ascender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.hc,
		$elm$core$List$maximum(lines));
	var capitalSize = 1 / (ascender - newBaseline);
	var capitalVertical = 1 - ascender;
	var fullSize = 1 / (ascender - descender);
	var fullVertical = 1 - ascender;
	var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
	var newFullMiddle = ((ascender - descender) / 2) + descender;
	return {
		hc: A3($mdgriffith$elm_ui$Internal$Model$adjust, capitalSize, ascender - newBaseline, capitalVertical),
		fo: A3($mdgriffith$elm_ui$Internal$Model$adjust, fullSize, ascender - descender, fullVertical)
	};
};
var $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
	return _Utils_Tuple2(
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'block')
			]),
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'inline-block'),
				_Utils_Tuple2(
				'line-height',
				$elm$core$String$fromFloat(converted.hP)),
				_Utils_Tuple2(
				'vertical-align',
				$elm$core$String$fromFloat(converted.gz) + 'em'),
				_Utils_Tuple2(
				'font-size',
				$elm$core$String$fromFloat(converted.gk) + 'em')
			]));
};
var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (face, found) {
				if (found.$ === 1) {
					if (face.$ === 5) {
						var _with = face.a;
						var _v2 = _with.gN;
						if (_v2.$ === 1) {
							return found;
						} else {
							var adjustment = _v2.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.fo;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))),
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.hc;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
						}
					} else {
						return found;
					}
				} else {
					return found;
				}
			}),
		$elm$core$Maybe$Nothing,
		typefaces);
};
var $mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
	var withImport = function (font) {
		if (font.$ === 4) {
			var url = font.b;
			return $elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var fontImports = function (_v2) {
		var name = _v2.a;
		var typefaces = _v2.b;
		var imports = A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$filterMap, withImport, typefaces));
		return imports;
	};
	var allNames = A2($elm$core$List$map, $elm$core$Tuple$first, rules);
	var fontAdjustments = function (_v1) {
		var name = _v1.a;
		var typefaces = _v1.b;
		var _v0 = $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
		if (_v0.$ === 1) {
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					$mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name),
					allNames));
		} else {
			var adjustment = _v0.a;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					A2($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment),
					allNames));
		}
	};
	return _Utils_ap(
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontImports, rules)),
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontAdjustments, rules)));
};
var $mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
	if (rule.$ === 1) {
		var name = rule.a;
		var typefaces = rule.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(name, typefaces));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var combine = F2(
			function (style, rendered) {
				return {
					dr: _Utils_ap(
						rendered.dr,
						A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing)),
					cH: function () {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
						if (_v1.$ === 1) {
							return rendered.cH;
						} else {
							var topLevel = _v1.a;
							return A2($elm$core$List$cons, topLevel, rendered.cH);
						}
					}()
				};
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			combine,
			{dr: _List_Nil, cH: _List_Nil},
			stylesheet);
		var topLevel = _v0.cH;
		var rules = _v0.dr;
		return _Utils_ap(
			$mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel),
			$elm$core$String$concat(rules));
	});
var $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		var _v0 = options.ie;
		switch (_v0) {
			case 0:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			case 1:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			default:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'elm-ui-rules',
					_List_fromArray(
						[
							A2(
							$elm$virtual_dom$VirtualDom$property,
							'rules',
							A2($mdgriffith$elm_ui$Internal$Model$encodeStyles, options, styleSheet))
						]),
					_List_Nil);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$embedKeyed = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.hJ)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'static-stylesheet',
				$mdgriffith$elm_ui$Internal$Model$staticRoot(opts)),
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
				children)) : A2(
			$elm$core$List$cons,
			_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
			children);
	});
var $mdgriffith$elm_ui$Internal$Model$embedWith = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.hJ)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			$mdgriffith$elm_ui$Internal$Model$staticRoot(opts),
			A2($elm$core$List$cons, dynamicStyleSheet, children)) : A2($elm$core$List$cons, dynamicStyleSheet, children);
	});
var $mdgriffith$elm_ui$Internal$Flag$heightBetween = $mdgriffith$elm_ui$Internal$Flag$flag(45);
var $mdgriffith$elm_ui$Internal$Flag$heightFill = $mdgriffith$elm_ui$Internal$Flag$flag(37);
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $mdgriffith$elm_ui$Internal$Flag$present = F2(
	function (myFlag, _v0) {
		var fieldOne = _v0.a;
		var fieldTwo = _v0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var $elm$html$Html$s = _VirtualDom_node('s');
var $elm$html$Html$u = _VirtualDom_node('u');
var $mdgriffith$elm_ui$Internal$Flag$widthBetween = $mdgriffith$elm_ui$Internal$Flag$flag(44);
var $mdgriffith$elm_ui$Internal$Flag$widthFill = $mdgriffith$elm_ui$Internal$Flag$flag(39);
var $mdgriffith$elm_ui$Internal$Model$finalizeNode = F6(
	function (has, node, attributes, children, embedMode, parentContext) {
		var createNode = F2(
			function (nodeName, attrs) {
				if (children.$ === 1) {
					var keyed = children.a;
					return A3(
						$elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return keyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, false, opts, styles, keyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, true, opts, styles, keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A2(
						function () {
							switch (nodeName) {
								case 'div':
									return $elm$html$Html$div;
								case 'p':
									return $elm$html$Html$p;
								default:
									return $elm$virtual_dom$VirtualDom$node(nodeName);
							}
						}(),
						attrs,
						function () {
							switch (embedMode.$) {
								case 0:
									return unkeyed;
								case 2:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, false, opts, styles, unkeyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, true, opts, styles, unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 0:
					return A2(createNode, 'div', attributes);
				case 1:
					var nodeName = node.a;
					return A2(createNode, nodeName, attributes);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						$elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A2(
								createNode,
								internal,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.gY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.i0))
									]))
							]));
			}
		}();
		switch (parentContext) {
			case 0:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.gY, $mdgriffith$elm_ui$Internal$Style$classes.i0, $mdgriffith$elm_ui$Internal$Style$classes.cV, $mdgriffith$elm_ui$Internal$Style$classes.aS, $mdgriffith$elm_ui$Internal$Style$classes.gU])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerX, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.gY, $mdgriffith$elm_ui$Internal$Style$classes.i0, $mdgriffith$elm_ui$Internal$Style$classes.cV, $mdgriffith$elm_ui$Internal$Style$classes.aS, $mdgriffith$elm_ui$Internal$Style$classes.gS])))
						]),
					_List_fromArray(
						[html])) : html));
			case 1:
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerY, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.gY, $mdgriffith$elm_ui$Internal$Style$classes.i0, $mdgriffith$elm_ui$Internal$Style$classes.cV, $mdgriffith$elm_ui$Internal$Style$classes.gT])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.gY, $mdgriffith$elm_ui$Internal$Style$classes.i0, $mdgriffith$elm_ui$Internal$Style$classes.cV, $mdgriffith$elm_ui$Internal$Style$classes.gR])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.gY + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.du + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.eU + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.dR)))));
var $mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.gY + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.du + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.eV + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.dS)))));
var $mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$createElement = F3(
	function (context, children, rendered) {
		var gatherKeyed = F2(
			function (_v8, _v9) {
				var key = _v8.a;
				var child = _v8.b;
				var htmls = _v9.a;
				var existingStyles = _v9.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.hT, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.gq : _Utils_ap(styled.gq, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.hT, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.gq : _Utils_ap(styled.gq, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _v6) {
				var htmls = _v6.a;
				var existingStyles = _v6.b;
				switch (child.$) {
					case 0:
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 1:
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.hT, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.gq : _Utils_ap(styled.gq, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.hT, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.gq : _Utils_ap(styled.gq, existingStyles));
					case 2:
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		if (children.$ === 1) {
			var keyedChildren = children.a;
			var _v1 = A3(
				$elm$core$List$foldr,
				gatherKeyed,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				keyedChildren);
			var keyed = _v1.a;
			var styles = _v1.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.gq : _Utils_ap(rendered.gq, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.bj,
						rendered.fR,
						rendered.bb,
						$mdgriffith$elm_ui$Internal$Model$Keyed(
							A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.hf)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						hT: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.bj,
							rendered.fR,
							rendered.bb,
							$mdgriffith$elm_ui$Internal$Model$Keyed(
								A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.hf))),
						gq: allStyles
					});
			}
		} else {
			var unkeyedChildren = children.a;
			var _v3 = A3(
				$elm$core$List$foldr,
				gather,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				unkeyedChildren);
			var unkeyed = _v3.a;
			var styles = _v3.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.gq : _Utils_ap(rendered.gq, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.bj,
						rendered.fR,
						rendered.bb,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.hf)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						hT: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.bj,
							rendered.fR,
							rendered.bb,
							$mdgriffith$elm_ui$Internal$Model$Unkeyed(
								A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.hf))),
						gq: allStyles
					});
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
	return {$: 10, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $mdgriffith$elm_ui$Internal$Flag$add = F2(
	function (myFlag, _v0) {
		var one = _v0.a;
		var two = _v0.b;
		if (!myFlag.$) {
			var first = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, one, second | two);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2(
	function (location, elem) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					function () {
						switch (location) {
							case 0:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.bO, $mdgriffith$elm_ui$Internal$Style$classes.i0, $mdgriffith$elm_ui$Internal$Style$classes.gK]));
							case 1:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.bO, $mdgriffith$elm_ui$Internal$Style$classes.i0, $mdgriffith$elm_ui$Internal$Style$classes.g3]));
							case 2:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.bO, $mdgriffith$elm_ui$Internal$Style$classes.i0, $mdgriffith$elm_ui$Internal$Style$classes.iv]));
							case 3:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.bO, $mdgriffith$elm_ui$Internal$Style$classes.i0, $mdgriffith$elm_ui$Internal$Style$classes.it]));
							case 4:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.bO, $mdgriffith$elm_ui$Internal$Style$classes.i0, $mdgriffith$elm_ui$Internal$Style$classes.hX]));
							default:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.bO, $mdgriffith$elm_ui$Internal$Style$classes.i0, $mdgriffith$elm_ui$Internal$Style$classes.g2]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 3:
							return $elm$virtual_dom$VirtualDom$text('');
						case 2:
							var str = elem.a;
							return $mdgriffith$elm_ui$Internal$Model$textElement(str);
						case 0:
							var html = elem.a;
							return html($mdgriffith$elm_ui$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.hT, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
					}
				}()
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3(
	function (location, elem, existing) {
		var nearby = A2($mdgriffith$elm_ui$Internal$Model$nearbyElement, location, elem);
		switch (existing.$) {
			case 0:
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						_List_fromArray(
							[nearby]));
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						_List_fromArray(
							[nearby]));
				}
			case 1:
				var existingBehind = existing.a;
				if (location === 5) {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						A2($elm$core$List$cons, nearby, existingBehind));
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						_List_fromArray(
							[nearby]));
				}
			case 2:
				var existingInFront = existing.a;
				if (location === 5) {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						_List_fromArray(
							[nearby]),
						existingInFront);
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						A2($elm$core$List$cons, nearby, existingInFront));
				}
			default:
				var existingBehind = existing.a;
				var existingInFront = existing.b;
				if (location === 5) {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						A2($elm$core$List$cons, nearby, existingBehind),
						existingInFront);
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						A2($elm$core$List$cons, nearby, existingInFront));
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 0:
				return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
			case 1:
				var name = old.a;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, x, y);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.dy + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.e$);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.dy + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.e0);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.dy + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.gP);
	}
};
var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
	switch (align) {
		case 0:
			return $mdgriffith$elm_ui$Internal$Style$classes.dz + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.gV);
		case 2:
			return $mdgriffith$elm_ui$Internal$Style$classes.dz + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.gO);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.dz + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.gQ);
	}
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Model$FullTransform = F4(
	function (a, b, c, d) {
		return {$: 2, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2(
	function (transform, component) {
		switch (transform.$) {
			case 0:
				switch (component.$) {
					case 0:
						var x = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, 0, 0));
					case 1:
						var y = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, y, 0));
					case 2:
						var z = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, 0, z));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var xyz = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							xyz,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			case 1:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(newX, y, z));
					case 1:
						var newY = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, newY, z));
					case 2:
						var newZ = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, y, newZ));
					case 3:
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 4:
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var scale = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							scale,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			default:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				var scaled = transform.b;
				var origin = transform.c;
				var angle = transform.d;
				switch (component.$) {
					case 0:
						var newX = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(newX, y, z),
							scaled,
							origin,
							angle);
					case 1:
						var newY = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, newY, z),
							scaled,
							origin,
							angle);
					case 2:
						var newZ = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, y, newZ),
							scaled,
							origin,
							angle);
					case 3:
						var newMove = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, newMove, scaled, origin, angle);
					case 4:
						var newOrigin = component.a;
						var newAngle = component.b;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, scaled, newOrigin, newAngle);
					default:
						var newScale = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, newScale, origin, angle);
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$height = $mdgriffith$elm_ui$Internal$Flag$flag(7);
var $mdgriffith$elm_ui$Internal$Flag$heightContent = $mdgriffith$elm_ui$Internal$Flag$flag(36);
var $mdgriffith$elm_ui$Internal$Flag$merge = F2(
	function (_v0, _v1) {
		var one = _v0.a;
		var two = _v0.b;
		var three = _v1.a;
		var four = _v1.b;
		return A2($mdgriffith$elm_ui$Internal$Flag$Field, one | three, two | four);
	});
var $mdgriffith$elm_ui$Internal$Flag$none = A2($mdgriffith$elm_ui$Internal$Flag$Field, 0, 0);
var $mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
	switch (h.$) {
		case 0:
			var px = h.a;
			var val = $elm$core$String$fromInt(px);
			var name = 'height-px-' + val;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.fr + (' ' + name),
				_List_fromArray(
					[
						A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height', val + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.dR,
				_List_Nil);
		case 2:
			var portion = h.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.dS,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.fs + (' height-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.gY + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.aR + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'height-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = h.a;
			var len = h.b;
			var cls = 'min-height-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-height',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = h.a;
			var len = h.b;
			var cls = 'max-height-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-height',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$widthContent = $mdgriffith$elm_ui$Internal$Flag$flag(38);
var $mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
	switch (w.$) {
		case 0:
			var px = w.a;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.gD + (' width-px-' + $elm$core$String$fromInt(px)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						'width-px-' + $elm$core$String$fromInt(px),
						'width',
						$elm$core$String$fromInt(px) + 'px')
					]));
		case 1:
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.eU,
				_List_Nil);
		case 2:
			var portion = w.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.eV,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.gE + (' width-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.gY + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.gd + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'width-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 3:
			var minSize = w.a;
			var len = w.b;
			var cls = 'min-width-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-width',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = w.a;
			var len = w.b;
			var cls = 'max-width-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-width',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$borderWidth = $mdgriffith$elm_ui$Internal$Flag$flag(27);
var $mdgriffith$elm_ui$Internal$Model$skippable = F2(
	function (flag, style) {
		if (_Utils_eq(flag, $mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
			if (style.$ === 3) {
				var val = style.c;
				switch (val) {
					case '0px':
						return true;
					case '1px':
						return true;
					case '2px':
						return true;
					case '3px':
						return true;
					case '4px':
						return true;
					case '5px':
						return true;
					case '6px':
						return true;
					default:
						return false;
				}
			} else {
				return false;
			}
		} else {
			switch (style.$) {
				case 2:
					var i = style.a;
					return (i >= 8) && (i <= 32);
				case 7:
					var name = style.a;
					var t = style.b;
					var r = style.c;
					var b = style.d;
					var l = style.e;
					return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
				default:
					return false;
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$width = $mdgriffith$elm_ui$Internal$Flag$flag(6);
var $mdgriffith$elm_ui$Internal$Flag$xAlign = $mdgriffith$elm_ui$Internal$Flag$flag(30);
var $mdgriffith$elm_ui$Internal$Flag$yAlign = $mdgriffith$elm_ui$Internal$Flag$flag(29);
var $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8(
	function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
		gatherAttrRecursive:
		while (true) {
			if (!elementAttrs.b) {
				var _v1 = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				if (_v1.$ === 1) {
					return {
						bb: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes),
							attrs),
						hf: children,
						bj: has,
						fR: node,
						gq: styles
					};
				} else {
					var _class = _v1.a;
					return {
						bb: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes + (' ' + _class)),
							attrs),
						hf: children,
						bj: has,
						fR: node,
						gq: A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$Transform(transform),
							styles)
					};
				}
			} else {
				var attribute = elementAttrs.a;
				var remaining = elementAttrs.b;
				switch (attribute.$) {
					case 0:
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 3:
						var flag = attribute.a;
						var exactClassName = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = exactClassName + (' ' + classes),
								$temp$node = node,
								$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					case 1:
						var actualAttribute = attribute.a;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = A2($elm$core$List$cons, actualAttribute, attrs),
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 4:
						var flag = attribute.a;
						var style = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							if (A2($mdgriffith$elm_ui$Internal$Model$skippable, flag, style)) {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							} else {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = A2($elm$core$List$cons, style, styles),
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							}
						}
					case 10:
						var flag = attribute.a;
						var component = attribute.b;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
							$temp$transform = A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, transform, component),
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 7:
						var width = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$width, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (width.$) {
								case 0:
									var px = width.a;
									var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.gD + (' width-px-' + $elm$core$String$fromInt(px))) + (' ' + classes),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3(
											$mdgriffith$elm_ui$Internal$Model$Single,
											'width-px-' + $elm$core$String$fromInt(px),
											'width',
											$elm$core$String$fromInt(px) + 'px'),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.eU),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$widthContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = width.a;
									if (portion === 1) {
										var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.eV),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.gE + (' width-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.gY + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.gd + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'width-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v4 = $mdgriffith$elm_ui$Internal$Model$renderWidth(width);
									var addToFlags = _v4.a;
									var newClass = _v4.b;
									var newStyles = _v4.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 8:
						var height = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$height, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (height.$) {
								case 0:
									var px = height.a;
									var val = $elm$core$String$fromInt(px) + 'px';
									var name = 'height-px-' + val;
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.fr + (' ' + (name + (' ' + classes))),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height ', val),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 1:
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.dR + (' ' + classes),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$heightContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 2:
									var portion = height.a;
									if (portion === 1) {
										var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.dS + (' ' + classes),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.fs + (' height-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.gY + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.aR + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'height-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v6 = $mdgriffith$elm_ui$Internal$Model$renderHeight(height);
									var addToFlags = _v6.a;
									var newClass = _v6.b;
									var newStyles = _v6.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 2:
						var description = attribute.a;
						switch (description.$) {
							case 0:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'main', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 1:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'nav', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 2:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'footer', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 3:
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'aside', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 4:
								var i = description.a;
								if (i <= 1) {
									var $temp$classes = classes,
										$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h1', node),
										$temp$has = has,
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								} else {
									if (i < 7) {
										var $temp$classes = classes,
											$temp$node = A2(
											$mdgriffith$elm_ui$Internal$Model$addNodeName,
											'h' + $elm$core$String$fromInt(i),
											node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes,
											$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h6', node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								}
							case 9:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 8:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 5:
								var label = description.a;
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 6:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							default:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
						}
					case 9:
						var location = attribute.a;
						var elem = attribute.b;
						var newStyles = function () {
							switch (elem.$) {
								case 3:
									return styles;
								case 2:
									var str = elem.a;
									return styles;
								case 0:
									var html = elem.a;
									return styles;
								default:
									var styled = elem.a;
									return _Utils_ap(styles, styled.gq);
							}
						}();
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = newStyles,
							$temp$attrs = attrs,
							$temp$children = A3($mdgriffith$elm_ui$Internal$Model$addNearbyElement, location, elem, children),
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 6:
						var x = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignXName(x) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (x) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerX, flags);
									case 2:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					default:
						var y = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignYName(y) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (y) {
									case 1:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerY, flags);
									case 2:
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Untransformed = {$: 0};
var $mdgriffith$elm_ui$Internal$Model$untransformed = $mdgriffith$elm_ui$Internal$Model$Untransformed;
var $mdgriffith$elm_ui$Internal$Model$element = F4(
	function (context, node, attributes, children) {
		return A3(
			$mdgriffith$elm_ui$Internal$Model$createElement,
			context,
			children,
			A8(
				$mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive,
				$mdgriffith$elm_ui$Internal$Model$contextClasses(context),
				node,
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Model$untransformed,
				_List_Nil,
				_List_Nil,
				$mdgriffith$elm_ui$Internal$Model$NoNearbyChildren,
				$elm$core$List$reverse(attributes)));
	});
var $mdgriffith$elm_ui$Internal$Model$Height = function (a) {
	return {$: 8, a: a};
};
var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		$elm$html$Html$Attributes$class(cls));
};
var $mdgriffith$elm_ui$Internal$Model$Content = {$: 1};
var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
	return {$: 7, a: a};
};
var $mdgriffith$elm_ui$Element$width = $mdgriffith$elm_ui$Internal$Model$Width;
var $mdgriffith$elm_ui$Element$column = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.hm + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cb)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Element$rgb255 = F3(
	function (red, green, blue) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, red / 255, green / 255, blue / 255, 1);
	});
var $author$project$Styling$Colors$darkGreyColor = A3($mdgriffith$elm_ui$Element$rgb255, 26, 28, 33);
var $mdgriffith$elm_ui$Element$el = F2(
	function (attrs, child) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					attrs)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var $mdgriffith$elm_ui$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$fontFamily = $mdgriffith$elm_ui$Internal$Flag$flag(5);
var $elm$core$String$toLower = _String_toLower;
var $elm$core$String$words = _String_words;
var $mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 0:
						return 'serif';
					case 1:
						return 'sans-serif';
					case 2:
						return 'monospace';
					case 3:
						var name = font.a;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					case 4:
						var name = font.a;
						var url = font.b;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					default:
						var name = font.a.ig;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
				}
			}());
	});
var $mdgriffith$elm_ui$Element$Font$family = function (families) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontFamily,
		A2(
			$mdgriffith$elm_ui$Internal$Model$FontFamily,
			A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'ff-', families),
			families));
};
var $mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
var $mdgriffith$elm_ui$Element$fillPortion = $mdgriffith$elm_ui$Internal$Model$Fill;
var $mdgriffith$elm_ui$Internal$Model$InFront = 4;
var $mdgriffith$elm_ui$Internal$Model$Nearby = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NoAttribute = {$: 0};
var $mdgriffith$elm_ui$Element$createNearby = F2(
	function (loc, element) {
		if (element.$ === 3) {
			return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
		} else {
			return A2($mdgriffith$elm_ui$Internal$Model$Nearby, loc, element);
		}
	});
var $mdgriffith$elm_ui$Element$inFront = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, 4, element);
};
var $author$project$Styling$Colors$lighterGreyColor = A3($mdgriffith$elm_ui$Element$rgb255, 29, 32, 37);
var $mdgriffith$elm_ui$Internal$Model$Min = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$minimum = F2(
	function (i, l) {
		return A2($mdgriffith$elm_ui$Internal$Model$Min, i, l);
	});
var $mdgriffith$elm_ui$Internal$Model$PaddingStyle = F5(
	function (a, b, c, d, e) {
		return {$: 7, a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Flag$padding = $mdgriffith$elm_ui$Internal$Flag$flag(2);
var $mdgriffith$elm_ui$Element$padding = function (x) {
	var f = x;
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			'p-' + $elm$core$String$fromInt(x),
			f,
			f,
			f,
			f));
};
var $mdgriffith$elm_ui$Element$rgb = F3(
	function (r, g, b) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, r, g, b, 1);
	});
var $mdgriffith$elm_ui$Internal$Flag$borderRound = $mdgriffith$elm_ui$Internal$Flag$flag(17);
var $mdgriffith$elm_ui$Element$Border$rounded = function (radius) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderRound,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			'br-' + $elm$core$String$fromInt(radius),
			'border-radius',
			$elm$core$String$fromInt(radius) + 'px'));
};
var $mdgriffith$elm_ui$Internal$Model$AsRow = 0;
var $mdgriffith$elm_ui$Internal$Model$asRow = 0;
var $mdgriffith$elm_ui$Element$row = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asRow,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.cb + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.aS)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Internal$Model$SansSerif = {$: 1};
var $mdgriffith$elm_ui$Element$Font$sansSerif = $mdgriffith$elm_ui$Internal$Model$SansSerif;
var $mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3(
	function (a, b, c) {
		return {$: 5, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Flag$spacing = $mdgriffith$elm_ui$Internal$Flag$flag(3);
var $mdgriffith$elm_ui$Internal$Model$spacingName = F2(
	function (x, y) {
		return 'spacing-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y)));
	});
var $mdgriffith$elm_ui$Element$spacing = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$spacing,
		A3(
			$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
			A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, x),
			x,
			x));
};
var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
	return {$: 3, a: a};
};
var $mdgriffith$elm_ui$Element$Font$typeface = $mdgriffith$elm_ui$Internal$Model$Typeface;
var $author$project$Pages$Dashboard$ChangeAssignmentTitle = function (a) {
	return {$: 19, a: a};
};
var $author$project$Pages$Dashboard$ChangeAssignmentTitleTfText = function (a) {
	return {$: 20, a: a};
};
var $author$project$Pages$Dashboard$CloseModal = {$: 17};
var $author$project$Pages$Dashboard$FocusAssignmentTitle = function (a) {
	return {$: 21, a: a};
};
var $author$project$Pages$Dashboard$RemoveAssignment = function (a) {
	return {$: 11, a: a};
};
var $author$project$Pages$Dashboard$UnfocusAssignmentTitle = {$: 22};
var $mdgriffith$elm_ui$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$fontWeight = $mdgriffith$elm_ui$Internal$Flag$flag(13);
var $mdgriffith$elm_ui$Element$Font$bold = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontWeight, $mdgriffith$elm_ui$Internal$Style$classes.g5);
var $mdgriffith$elm_ui$Internal$Flag$fontAlignment = $mdgriffith$elm_ui$Internal$Flag$flag(12);
var $mdgriffith$elm_ui$Element$Font$center = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontAlignment, $mdgriffith$elm_ui$Internal$Style$classes.jf);
var $mdgriffith$elm_ui$Internal$Model$AlignX = function (a) {
	return {$: 6, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$CenterX = 1;
var $mdgriffith$elm_ui$Element$centerX = $mdgriffith$elm_ui$Internal$Model$AlignX(1);
var $author$project$Api$errorToString = function (error) {
	switch (error.$) {
		case 3:
			var status = error.a;
			var errors = error.b;
			return 'an error occured: ' + A2($elm$core$String$join, '; ', errors);
		case 4:
			var err = error.a;
			return 'an error occured';
		case 0:
			var err = error.a;
			return 'an error occured';
		case 2:
			return 'unable to reach server';
		default:
			return 'request timed out';
	}
};
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$autofocus = $elm$html$Html$Attributes$boolProperty('autofocus');
var $mdgriffith$elm_ui$Element$Input$focusedOnLoad = $mdgriffith$elm_ui$Internal$Model$Attr(
	$elm$html$Html$Attributes$autofocus(true));
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Pages$Dashboard$getCourseNameById = F2(
	function (courses, id) {
		return A2(
			$elm$core$Maybe$map,
			function (c) {
				return c.ig;
			},
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (c) {
						return _Utils_eq(c.hU, id);
					},
					courses)));
	});
var $mdgriffith$elm_ui$Element$htmlAttribute = $mdgriffith$elm_ui$Internal$Model$Attr;
var $mdgriffith$elm_ui$Element$Input$HiddenLabel = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Element$Input$labelHidden = $mdgriffith$elm_ui$Element$Input$HiddenLabel;
var $mdgriffith$elm_ui$Internal$Model$Max = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$maximum = F2(
	function (i, l) {
		return A2($mdgriffith$elm_ui$Internal$Model$Max, i, l);
	});
var $mdgriffith$elm_ui$Internal$Model$Empty = {$: 3};
var $mdgriffith$elm_ui$Element$none = $mdgriffith$elm_ui$Internal$Model$Empty;
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onClick = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onClick);
var $elm$json$Json$Decode$fail = _Json_fail;
var $author$project$Utils$OnEnter$onEnterEsc = F2(
	function (a, b) {
		return $mdgriffith$elm_ui$Element$htmlAttribute(
			A2(
				$elm$html$Html$Events$on,
				'keyup',
				A2(
					$elm$json$Json$Decode$andThen,
					function (key) {
						return (key === 'Escape') ? $elm$json$Json$Decode$succeed(b) : ((key === 'Enter') ? $elm$json$Json$Decode$succeed(a) : $elm$json$Json$Decode$fail('Not the enter key'));
					},
					A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string))));
	});
var $mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Paragraph = {$: 9};
var $mdgriffith$elm_ui$Element$paragraph = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asParagraph,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Paragraph),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$spacing(5),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
var $mdgriffith$elm_ui$Element$pointer = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.hp);
var $author$project$Styling$Colors$redColor = A3($mdgriffith$elm_ui$Element$rgb255, 232, 65, 24);
var $mdgriffith$elm_ui$Element$rgba = $mdgriffith$elm_ui$Internal$Model$Rgba;
var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$fontSize = $mdgriffith$elm_ui$Internal$Flag$flag(4);
var $mdgriffith$elm_ui$Element$Font$size = function (i) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontSize,
		$mdgriffith$elm_ui$Internal$Model$FontSize(i));
};
var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$text = function (content) {
	return $mdgriffith$elm_ui$Internal$Model$Text(content);
};
var $mdgriffith$elm_ui$Element$Input$TextInputNode = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Element$Input$TextArea = {$: 1};
var $mdgriffith$elm_ui$Internal$Model$LivePolite = {$: 6};
var $mdgriffith$elm_ui$Element$Region$announce = $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$LivePolite);
var $mdgriffith$elm_ui$Element$Input$applyLabel = F3(
	function (attrs, label, input) {
		if (label.$ === 1) {
			var labelText = label.a;
			return A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asColumn,
				$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
				attrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[input])));
		} else {
			var position = label.a;
			var labelAttrs = label.b;
			var labelChild = label.c;
			var labelElement = A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				labelAttrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[labelChild])));
			switch (position) {
				case 2:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.c8),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
				case 3:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.c8),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				case 0:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.c8),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				default:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.c8),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
			}
		}
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $mdgriffith$elm_ui$Element$Input$autofill = A2(
	$elm$core$Basics$composeL,
	$mdgriffith$elm_ui$Internal$Model$Attr,
	$elm$html$Html$Attributes$attribute('autocomplete'));
var $mdgriffith$elm_ui$Internal$Model$Behind = 5;
var $mdgriffith$elm_ui$Element$behindContent = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, 5, element);
};
var $mdgriffith$elm_ui$Internal$Model$MoveY = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$TransformComponent = F2(
	function (a, b) {
		return {$: 10, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$moveY = $mdgriffith$elm_ui$Internal$Flag$flag(26);
var $mdgriffith$elm_ui$Element$moveUp = function (y) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$moveY,
		$mdgriffith$elm_ui$Internal$Model$MoveY(-y));
};
var $mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding = function (attrs) {
	var gatherSpacing = F2(
		function (attr, found) {
			if ((attr.$ === 4) && (attr.b.$ === 5)) {
				var _v2 = attr.b;
				var x = _v2.b;
				var y = _v2.c;
				if (found.$ === 1) {
					return $elm$core$Maybe$Just(y);
				} else {
					return found;
				}
			} else {
				return found;
			}
		});
	var _v0 = A3($elm$core$List$foldr, gatherSpacing, $elm$core$Maybe$Nothing, attrs);
	if (_v0.$ === 1) {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	} else {
		var vSpace = _v0.a;
		return $mdgriffith$elm_ui$Element$moveUp(
			$elm$core$Basics$floor(vSpace / 2));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$overflow = $mdgriffith$elm_ui$Internal$Flag$flag(20);
var $mdgriffith$elm_ui$Element$clip = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.hh);
var $mdgriffith$elm_ui$Internal$Flag$borderColor = $mdgriffith$elm_ui$Internal$Flag$flag(28);
var $mdgriffith$elm_ui$Element$Border$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var $mdgriffith$elm_ui$Element$Input$darkGrey = A3($mdgriffith$elm_ui$Element$rgb, 186 / 255, 189 / 255, 182 / 255);
var $mdgriffith$elm_ui$Element$paddingXY = F2(
	function (x, y) {
		if (_Utils_eq(x, y)) {
			var f = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + $elm$core$String$fromInt(x),
					f,
					f,
					f,
					f));
		} else {
			var yFloat = y;
			var xFloat = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y))),
					yFloat,
					xFloat,
					yFloat,
					xFloat));
		}
	});
var $mdgriffith$elm_ui$Element$Input$defaultTextPadding = A2($mdgriffith$elm_ui$Element$paddingXY, 12, 12);
var $mdgriffith$elm_ui$Element$Input$white = A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1);
var $mdgriffith$elm_ui$Internal$Model$BorderWidth = F5(
	function (a, b, c, d, e) {
		return {$: 6, a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Element$Border$width = function (v) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + $elm$core$String$fromInt(v),
			v,
			v,
			v,
			v));
};
var $mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Input$defaultTextPadding,
		$mdgriffith$elm_ui$Element$Border$rounded(3),
		$mdgriffith$elm_ui$Element$Border$color($mdgriffith$elm_ui$Element$Input$darkGrey),
		$mdgriffith$elm_ui$Element$Background$color($mdgriffith$elm_ui$Element$Input$white),
		$mdgriffith$elm_ui$Element$Border$width(1),
		$mdgriffith$elm_ui$Element$spacing(5),
		$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
		$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink)
	]);
var $mdgriffith$elm_ui$Element$Input$getHeight = function (attr) {
	if (attr.$ === 8) {
		var h = attr.a;
		return $elm$core$Maybe$Just(h);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Element$Input$hasFocusStyle = function (attr) {
	if (((attr.$ === 4) && (attr.b.$ === 11)) && (!attr.b.a)) {
		var _v1 = attr.b;
		var _v2 = _v1.a;
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Label = function (a) {
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute = function (label) {
	if (label.$ === 1) {
		var textLabel = label.a;
		return $mdgriffith$elm_ui$Internal$Model$Describe(
			$mdgriffith$elm_ui$Internal$Model$Label(textLabel));
	} else {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	}
};
var $mdgriffith$elm_ui$Element$Input$isConstrained = function (len) {
	isConstrained:
	while (true) {
		switch (len.$) {
			case 1:
				return false;
			case 0:
				return true;
			case 2:
				return true;
			case 3:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isConstrained;
			default:
				var l = len.b;
				return true;
		}
	}
};
var $mdgriffith$elm_ui$Element$Input$isHiddenLabel = function (label) {
	if (label.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$isStacked = function (label) {
	if (!label.$) {
		var loc = label.a;
		switch (loc) {
			case 0:
				return false;
			case 1:
				return false;
			case 2:
				return true;
			default:
				return true;
		}
	} else {
		return true;
	}
};
var $mdgriffith$elm_ui$Element$Input$negateBox = function (box) {
	return {b8: -box.b8, cp: -box.cp, cy: -box.cy, cF: -box.cF};
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $mdgriffith$elm_ui$Internal$Model$paddingName = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($elm$core$String$fromInt(top) + ('-' + ($elm$core$String$fromInt(right) + ('-' + ($elm$core$String$fromInt(bottom) + ('-' + $elm$core$String$fromInt(left)))))));
	});
var $mdgriffith$elm_ui$Element$paddingEach = function (_v0) {
	var top = _v0.cF;
	var right = _v0.cy;
	var bottom = _v0.b8;
	var left = _v0.cp;
	if (_Utils_eq(top, right) && (_Utils_eq(top, bottom) && _Utils_eq(top, left))) {
		var topFloat = top;
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				'p-' + $elm$core$String$fromInt(top),
				topFloat,
				topFloat,
				topFloat,
				topFloat));
	} else {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				A4($mdgriffith$elm_ui$Internal$Model$paddingName, top, right, bottom, left),
				top,
				right,
				bottom,
				left));
	}
};
var $mdgriffith$elm_ui$Element$Input$isFill = function (len) {
	isFill:
	while (true) {
		switch (len.$) {
			case 2:
				return true;
			case 1:
				return false;
			case 0:
				return false;
			case 3:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isFill;
			default:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isFill;
		}
	}
};
var $mdgriffith$elm_ui$Element$Input$isPixel = function (len) {
	isPixel:
	while (true) {
		switch (len.$) {
			case 1:
				return false;
			case 0:
				return true;
			case 2:
				return false;
			case 3:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isPixel;
			default:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isPixel;
		}
	}
};
var $mdgriffith$elm_ui$Internal$Model$paddingNameFloat = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(top) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(right) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(bottom) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(left)))))));
	});
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $mdgriffith$elm_ui$Element$Input$redistributeOver = F4(
	function (isMultiline, stacked, attr, els) {
		switch (attr.$) {
			case 9:
				return _Utils_update(
					els,
					{
						c: A2($elm$core$List$cons, attr, els.c)
					});
			case 7:
				var width = attr.a;
				return $mdgriffith$elm_ui$Element$Input$isFill(width) ? _Utils_update(
					els,
					{
						n: A2($elm$core$List$cons, attr, els.n),
						v: A2($elm$core$List$cons, attr, els.v),
						c: A2($elm$core$List$cons, attr, els.c)
					}) : (stacked ? _Utils_update(
					els,
					{
						n: A2($elm$core$List$cons, attr, els.n)
					}) : _Utils_update(
					els,
					{
						c: A2($elm$core$List$cons, attr, els.c)
					}));
			case 8:
				var height = attr.a;
				return (!stacked) ? _Utils_update(
					els,
					{
						n: A2($elm$core$List$cons, attr, els.n),
						c: A2($elm$core$List$cons, attr, els.c)
					}) : ($mdgriffith$elm_ui$Element$Input$isFill(height) ? _Utils_update(
					els,
					{
						n: A2($elm$core$List$cons, attr, els.n),
						c: A2($elm$core$List$cons, attr, els.c)
					}) : ($mdgriffith$elm_ui$Element$Input$isPixel(height) ? _Utils_update(
					els,
					{
						c: A2($elm$core$List$cons, attr, els.c)
					}) : _Utils_update(
					els,
					{
						c: A2($elm$core$List$cons, attr, els.c)
					})));
			case 6:
				return _Utils_update(
					els,
					{
						n: A2($elm$core$List$cons, attr, els.n)
					});
			case 5:
				return _Utils_update(
					els,
					{
						n: A2($elm$core$List$cons, attr, els.n)
					});
			case 4:
				switch (attr.b.$) {
					case 5:
						var _v1 = attr.b;
						return _Utils_update(
							els,
							{
								n: A2($elm$core$List$cons, attr, els.n),
								v: A2($elm$core$List$cons, attr, els.v),
								c: A2($elm$core$List$cons, attr, els.c),
								b1: A2($elm$core$List$cons, attr, els.b1)
							});
					case 7:
						var cls = attr.a;
						var _v2 = attr.b;
						var pad = _v2.a;
						var t = _v2.b;
						var r = _v2.c;
						var b = _v2.d;
						var l = _v2.e;
						if (isMultiline) {
							return _Utils_update(
								els,
								{
									Q: A2($elm$core$List$cons, attr, els.Q),
									c: A2($elm$core$List$cons, attr, els.c)
								});
						} else {
							var newTop = t - A2($elm$core$Basics$min, t, b);
							var newLineHeight = $mdgriffith$elm_ui$Element$htmlAttribute(
								A2(
									$elm$html$Html$Attributes$style,
									'line-height',
									'calc(1.0em + ' + ($elm$core$String$fromFloat(
										2 * A2($elm$core$Basics$min, t, b)) + 'px)')));
							var newHeight = $mdgriffith$elm_ui$Element$htmlAttribute(
								A2(
									$elm$html$Html$Attributes$style,
									'height',
									'calc(1.0em + ' + ($elm$core$String$fromFloat(
										2 * A2($elm$core$Basics$min, t, b)) + 'px)')));
							var newBottom = b - A2($elm$core$Basics$min, t, b);
							var reducedVerticalPadding = A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$padding,
								A5(
									$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
									A4($mdgriffith$elm_ui$Internal$Model$paddingNameFloat, newTop, r, newBottom, l),
									newTop,
									r,
									newBottom,
									l));
							return _Utils_update(
								els,
								{
									Q: A2($elm$core$List$cons, attr, els.Q),
									v: A2(
										$elm$core$List$cons,
										newHeight,
										A2($elm$core$List$cons, newLineHeight, els.v)),
									c: A2($elm$core$List$cons, reducedVerticalPadding, els.c)
								});
						}
					case 6:
						var _v3 = attr.b;
						return _Utils_update(
							els,
							{
								Q: A2($elm$core$List$cons, attr, els.Q),
								c: A2($elm$core$List$cons, attr, els.c)
							});
					case 10:
						return _Utils_update(
							els,
							{
								Q: A2($elm$core$List$cons, attr, els.Q),
								c: A2($elm$core$List$cons, attr, els.c)
							});
					case 2:
						return _Utils_update(
							els,
							{
								n: A2($elm$core$List$cons, attr, els.n)
							});
					case 1:
						var _v4 = attr.b;
						return _Utils_update(
							els,
							{
								n: A2($elm$core$List$cons, attr, els.n)
							});
					default:
						var flag = attr.a;
						var cls = attr.b;
						return _Utils_update(
							els,
							{
								c: A2($elm$core$List$cons, attr, els.c)
							});
				}
			case 0:
				return els;
			case 1:
				var a = attr.a;
				return _Utils_update(
					els,
					{
						v: A2($elm$core$List$cons, attr, els.v)
					});
			case 2:
				return _Utils_update(
					els,
					{
						v: A2($elm$core$List$cons, attr, els.v)
					});
			case 3:
				return _Utils_update(
					els,
					{
						c: A2($elm$core$List$cons, attr, els.c)
					});
			default:
				return _Utils_update(
					els,
					{
						v: A2($elm$core$List$cons, attr, els.v)
					});
		}
	});
var $mdgriffith$elm_ui$Element$Input$redistribute = F3(
	function (isMultiline, stacked, attrs) {
		return function (redist) {
			return {
				Q: $elm$core$List$reverse(redist.Q),
				n: $elm$core$List$reverse(redist.n),
				v: $elm$core$List$reverse(redist.v),
				c: $elm$core$List$reverse(redist.c),
				b1: $elm$core$List$reverse(redist.b1)
			};
		}(
			A3(
				$elm$core$List$foldl,
				A2($mdgriffith$elm_ui$Element$Input$redistributeOver, isMultiline, stacked),
				{Q: _List_Nil, n: _List_Nil, v: _List_Nil, c: _List_Nil, b1: _List_Nil},
				attrs));
	});
var $mdgriffith$elm_ui$Element$Input$renderBox = function (_v0) {
	var top = _v0.cF;
	var right = _v0.cy;
	var bottom = _v0.b8;
	var left = _v0.cp;
	return $elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px'))))));
};
var $mdgriffith$elm_ui$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 12, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$transparency = $mdgriffith$elm_ui$Internal$Flag$flag(0);
var $mdgriffith$elm_ui$Element$alpha = function (o) {
	var transparency = function (x) {
		return 1 - x;
	}(
		A2(
			$elm$core$Basics$min,
			1.0,
			A2($elm$core$Basics$max, 0.0, o)));
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$transparency,
		A2(
			$mdgriffith$elm_ui$Internal$Model$Transparency,
			'transparency-' + $mdgriffith$elm_ui$Internal$Model$floatClass(transparency),
			transparency));
};
var $mdgriffith$elm_ui$Element$Input$charcoal = A3($mdgriffith$elm_ui$Element$rgb, 136 / 255, 138 / 255, 133 / 255);
var $mdgriffith$elm_ui$Element$Input$renderPlaceholder = F3(
	function (_v0, forPlaceholder, on) {
		var placeholderAttrs = _v0.a;
		var placeholderEl = _v0.b;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_Utils_ap(
				forPlaceholder,
				_Utils_ap(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$Input$charcoal),
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.fQ + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.iF)),
							$mdgriffith$elm_ui$Element$clip,
							$mdgriffith$elm_ui$Element$Border$color(
							A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
							$mdgriffith$elm_ui$Element$Background$color(
							A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$alpha(
							on ? 1 : 0)
						]),
					placeholderAttrs)),
			placeholderEl);
	});
var $mdgriffith$elm_ui$Element$scrollbarY = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.iW);
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$Attributes$spellcheck = $elm$html$Html$Attributes$boolProperty('spellcheck');
var $mdgriffith$elm_ui$Element$Input$spellcheck = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$spellcheck);
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $mdgriffith$elm_ui$Internal$Model$unstyled = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Unstyled, $elm$core$Basics$always);
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $mdgriffith$elm_ui$Element$Input$value = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$value);
var $mdgriffith$elm_ui$Element$Input$textHelper = F3(
	function (textInput, attrs, textOptions) {
		var withDefaults = _Utils_ap($mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle, attrs);
		var redistributed = A3(
			$mdgriffith$elm_ui$Element$Input$redistribute,
			_Utils_eq(textInput.E, $mdgriffith$elm_ui$Element$Input$TextArea),
			$mdgriffith$elm_ui$Element$Input$isStacked(textOptions.h8),
			withDefaults);
		var onlySpacing = function (attr) {
			if ((attr.$ === 4) && (attr.b.$ === 5)) {
				var _v9 = attr.b;
				return true;
			} else {
				return false;
			}
		};
		var heightConstrained = function () {
			var _v7 = textInput.E;
			if (!_v7.$) {
				var inputType = _v7.a;
				return false;
			} else {
				return A2(
					$elm$core$Maybe$withDefault,
					false,
					A2(
						$elm$core$Maybe$map,
						$mdgriffith$elm_ui$Element$Input$isConstrained,
						$elm$core$List$head(
							$elm$core$List$reverse(
								A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Element$Input$getHeight, withDefaults)))));
			}
		}();
		var getPadding = function (attr) {
			if ((attr.$ === 4) && (attr.b.$ === 7)) {
				var cls = attr.a;
				var _v6 = attr.b;
				var pad = _v6.a;
				var t = _v6.b;
				var r = _v6.c;
				var b = _v6.d;
				var l = _v6.e;
				return $elm$core$Maybe$Just(
					{
						b8: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(b - 3)),
						cp: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(l - 3)),
						cy: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(r - 3)),
						cF: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(t - 3))
					});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		};
		var parentPadding = A2(
			$elm$core$Maybe$withDefault,
			{b8: 0, cp: 0, cy: 0, cF: 0},
			$elm$core$List$head(
				$elm$core$List$reverse(
					A2($elm$core$List$filterMap, getPadding, withDefaults))));
		var inputElement = A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			function () {
				var _v3 = textInput.E;
				if (!_v3.$) {
					var inputType = _v3.a;
					return $mdgriffith$elm_ui$Internal$Model$NodeName('input');
				} else {
					return $mdgriffith$elm_ui$Internal$Model$NodeName('textarea');
				}
			}(),
			_Utils_ap(
				function () {
					var _v4 = textInput.E;
					if (!_v4.$) {
						var inputType = _v4.a;
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$type_(inputType)),
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.h4)
							]);
					} else {
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Element$clip,
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.h0),
								$mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding(withDefaults),
								$mdgriffith$elm_ui$Element$paddingEach(parentPadding),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								A2(
									$elm$html$Html$Attributes$style,
									'margin',
									$mdgriffith$elm_ui$Element$Input$renderBox(
										$mdgriffith$elm_ui$Element$Input$negateBox(parentPadding)))),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$style, 'box-sizing', 'content-box'))
							]);
					}
				}(),
				_Utils_ap(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Input$value(textOptions.du),
							$mdgriffith$elm_ui$Internal$Model$Attr(
							$elm$html$Html$Events$onInput(textOptions.dk)),
							$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(textOptions.h8),
							$mdgriffith$elm_ui$Element$Input$spellcheck(textInput.an),
							A2(
							$elm$core$Maybe$withDefault,
							$mdgriffith$elm_ui$Internal$Model$NoAttribute,
							A2($elm$core$Maybe$map, $mdgriffith$elm_ui$Element$Input$autofill, textInput.ag))
						]),
					redistributed.v)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil));
		var wrappedInput = function () {
			var _v0 = textInput.E;
			if (_v0.$ === 1) {
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					_Utils_ap(
						(heightConstrained ? $elm$core$List$cons($mdgriffith$elm_ui$Element$scrollbarY) : $elm$core$Basics$identity)(
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.fl),
									$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.h3)
								])),
						redistributed.c),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[
								A4(
								$mdgriffith$elm_ui$Internal$Model$element,
								$mdgriffith$elm_ui$Internal$Model$asParagraph,
								$mdgriffith$elm_ui$Internal$Model$div,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
										A2(
											$elm$core$List$cons,
											$mdgriffith$elm_ui$Element$inFront(inputElement),
											A2(
												$elm$core$List$cons,
												$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.h2),
												redistributed.b1)))),
								$mdgriffith$elm_ui$Internal$Model$Unkeyed(
									function () {
										if (textOptions.du === '') {
											var _v1 = textOptions.dp;
											if (_v1.$ === 1) {
												return _List_fromArray(
													[
														$mdgriffith$elm_ui$Element$text('\u00A0')
													]);
											} else {
												var place = _v1.a;
												return _List_fromArray(
													[
														A3($mdgriffith$elm_ui$Element$Input$renderPlaceholder, place, _List_Nil, textOptions.du === '')
													]);
											}
										} else {
											return _List_fromArray(
												[
													$mdgriffith$elm_ui$Internal$Model$unstyled(
													A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.h1)
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(textOptions.du + '\u00A0')
															])))
												]);
										}
									}()))
							])));
			} else {
				var inputType = _v0.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						A2(
							$elm$core$List$cons,
							A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.fl),
							$elm$core$List$concat(
								_List_fromArray(
									[
										redistributed.c,
										function () {
										var _v2 = textOptions.dp;
										if (_v2.$ === 1) {
											return _List_Nil;
										} else {
											var place = _v2.a;
											return _List_fromArray(
												[
													$mdgriffith$elm_ui$Element$behindContent(
													A3($mdgriffith$elm_ui$Element$Input$renderPlaceholder, place, redistributed.Q, textOptions.du === ''))
												]);
										}
									}()
									])))),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[inputElement])));
			}
		}();
		return A3(
			$mdgriffith$elm_ui$Element$Input$applyLabel,
			A2(
				$elm$core$List$cons,
				A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.hq),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$Input$isHiddenLabel(textOptions.h8) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Element$spacing(5),
					A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Region$announce, redistributed.n))),
			textOptions.h8,
			wrappedInput);
	});
var $mdgriffith$elm_ui$Element$Input$text = $mdgriffith$elm_ui$Element$Input$textHelper(
	{
		ag: $elm$core$Maybe$Nothing,
		an: false,
		E: $mdgriffith$elm_ui$Element$Input$TextInputNode('text')
	});
var $author$project$Pages$Dashboard$viewButton = F3(
	function (text_, color, msg) {
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Font$color(color),
					$mdgriffith$elm_ui$Element$Events$onClick(msg),
					$mdgriffith$elm_ui$Element$pointer,
					$mdgriffith$elm_ui$Element$htmlAttribute(
					$elm$html$Html$Attributes$class('button'))
				]),
			$mdgriffith$elm_ui$Element$text(text_));
	});
var $author$project$Pages$Dashboard$viewAssignmentModal = function (model) {
	var _v0 = model.bK;
	if (!_v0.$) {
		var _v1 = model.y;
		if (_v1.$ === 3) {
			var courses = _v1.a;
			var _v2 = model.gw;
			if (!_v2.$) {
				var user = _v2.a;
				return A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Background$color(
							A4($mdgriffith$elm_ui$Element$rgba, 1, 1, 1, 0.1)),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$padding(200)
						]),
					A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$centerX,
								$mdgriffith$elm_ui$Element$width(
								A2(
									$mdgriffith$elm_ui$Element$maximum,
									1000,
									A2($mdgriffith$elm_ui$Element$minimum, 800, $mdgriffith$elm_ui$Element$shrink))),
								$mdgriffith$elm_ui$Element$Background$color(
								A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
								$mdgriffith$elm_ui$Element$Font$color(
								A3($mdgriffith$elm_ui$Element$rgb, 0, 0, 0)),
								$mdgriffith$elm_ui$Element$padding(40),
								$mdgriffith$elm_ui$Element$spacing(20),
								$mdgriffith$elm_ui$Element$Border$rounded(10),
								$mdgriffith$elm_ui$Element$Font$family(
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Font$typeface('Hack')
									]))
							]),
						function () {
							var _v3 = model.b5;
							switch (_v3.$) {
								case 3:
									var assignment = _v3.a;
									return _List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$row,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
												]),
											_List_fromArray(
												[
													A2(
													$mdgriffith$elm_ui$Element$paragraph,
													_List_Nil,
													_List_fromArray(
														[
															A2(
															$mdgriffith$elm_ui$Element$el,
															_List_fromArray(
																[
																	$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
																	_Utils_eq(user.hU, assignment.gw.hU) ? $mdgriffith$elm_ui$Element$Events$onClick(
																	$author$project$Pages$Dashboard$FocusAssignmentTitle(assignment.jt)) : $mdgriffith$elm_ui$Element$pointer,
																	$mdgriffith$elm_ui$Element$pointer
																]),
															model.bz ? A2(
																$mdgriffith$elm_ui$Element$Input$text,
																_List_fromArray(
																	[
																		$mdgriffith$elm_ui$Element$Font$bold,
																		$mdgriffith$elm_ui$Element$Font$size(24),
																		$mdgriffith$elm_ui$Element$padding(0),
																		$mdgriffith$elm_ui$Element$Input$focusedOnLoad,
																		A2(
																		$author$project$Utils$OnEnter$onEnterEsc,
																		$author$project$Pages$Dashboard$ChangeAssignmentTitle(assignment.hU),
																		$author$project$Pages$Dashboard$UnfocusAssignmentTitle)
																	]),
																{
																	h8: $mdgriffith$elm_ui$Element$Input$labelHidden('edit assignment title'),
																	dk: $author$project$Pages$Dashboard$ChangeAssignmentTitleTfText,
																	dp: $elm$core$Maybe$Nothing,
																	du: model.bg
																}) : A2(
																$mdgriffith$elm_ui$Element$el,
																_List_fromArray(
																	[
																		$mdgriffith$elm_ui$Element$Font$bold,
																		$mdgriffith$elm_ui$Element$Font$size(24),
																		$mdgriffith$elm_ui$Element$htmlAttribute(
																		$elm$html$Html$Attributes$class('button'))
																	]),
																$mdgriffith$elm_ui$Element$text(assignment.jt)))
														])),
													A2(
													$mdgriffith$elm_ui$Element$el,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$Events$onClick($author$project$Pages$Dashboard$CloseModal),
															$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$Colors$redColor),
															$mdgriffith$elm_ui$Element$Font$center,
															$mdgriffith$elm_ui$Element$pointer,
															$mdgriffith$elm_ui$Element$Font$size(24),
															$mdgriffith$elm_ui$Element$htmlAttribute(
															$elm$html$Html$Attributes$class('button'))
														]),
													$mdgriffith$elm_ui$Element$text('[x]'))
												])),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text(
												'Course: ' + A2(
													$elm$core$Maybe$withDefault,
													'undefined',
													A2($author$project$Pages$Dashboard$getCourseNameById, courses, assignment.ho)))),
											A2(
											$mdgriffith$elm_ui$Element$row,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
												]),
											_List_fromArray(
												[
													_Utils_eq(user.hU, assignment.gw.hU) ? A3(
													$author$project$Pages$Dashboard$viewButton,
													'[delete]',
													$author$project$Styling$Colors$redColor,
													$author$project$Pages$Dashboard$RemoveAssignment(assignment.hU)) : $mdgriffith$elm_ui$Element$none
												]))
										]);
								case 1:
									return _List_fromArray(
										[
											$mdgriffith$elm_ui$Element$text('Loading...')
										]);
								case 0:
									return _List_fromArray(
										[$mdgriffith$elm_ui$Element$none]);
								default:
									var err = _v3.a;
									return _List_fromArray(
										[
											$mdgriffith$elm_ui$Element$text(
											$author$project$Api$errorToString(err))
										]);
							}
						}()));
			} else {
				return $mdgriffith$elm_ui$Element$none;
			}
		} else {
			return $mdgriffith$elm_ui$Element$none;
		}
	} else {
		return $mdgriffith$elm_ui$Element$none;
	}
};
var $mdgriffith$elm_ui$Element$html = $mdgriffith$elm_ui$Internal$Model$unstyled;
var $elm$core$List$sortWith = _List_sortWith;
var $elm_community$typed_svg$TypedSvg$Types$Translate = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $elm$core$Basics$pi = _Basics_pi;
var $gampleman$elm_visualization$Shape$defaultPieConfig = {dH: 0, dO: 2 * $elm$core$Basics$pi, h$: 0, fV: 100, ei: 0, ej: 0, gm: $elm$core$Basics$compare, cB: 0, gx: $elm$core$Basics$identity};
var $elm$virtual_dom$VirtualDom$nodeNS = function (tag) {
	return _VirtualDom_nodeNS(
		_VirtualDom_noScript(tag));
};
var $elm_community$typed_svg$TypedSvg$Core$node = $elm$virtual_dom$VirtualDom$nodeNS('http://www.w3.org/2000/svg');
var $elm_community$typed_svg$TypedSvg$g = $elm_community$typed_svg$TypedSvg$Core$node('g');
var $author$project$Components$PieChart$h = 300;
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $gampleman$elm_visualization$Shape$Pie$pie = F2(
	function (settings, data) {
		var unsafeGet = F2(
			function (index, array) {
				unsafeGet:
				while (true) {
					var _v0 = A2($elm$core$Array$get, index, array);
					if (!_v0.$) {
						var v = _v0.a;
						return v;
					} else {
						var $temp$index = index,
							$temp$array = array;
						index = $temp$index;
						array = $temp$array;
						continue unsafeGet;
					}
				}
			});
		var summer = F2(
			function (a, b) {
				var v = settings.gx(a);
				return (v > 0) ? (v + b) : b;
			});
		var sum = A3($elm$core$List$foldr, summer, 0, data);
		var sortedIndices = A2(
			$elm$core$Basics$composeL,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$List$map($elm$core$Tuple$first),
				$elm$core$List$sortWith(
					F2(
						function (_v2, _v3) {
							var a = _v2.b;
							var b = _v3.b;
							return A2(settings.gm, a, b);
						}))),
			$elm$core$List$indexedMap($elm$core$Tuple$pair));
		var dataArray = $elm$core$Array$fromList(data);
		var da = A2(
			$elm$core$Basics$min,
			2 * $elm$core$Basics$pi,
			A2($elm$core$Basics$max, (-2) * $elm$core$Basics$pi, settings.dO - settings.cB));
		var p = A2(
			$elm$core$Basics$min,
			$elm$core$Basics$abs(da) / $elm$core$List$length(data),
			settings.ei);
		var pa = p * ((da < 0) ? (-1) : 1);
		var k = (!sum) ? 0 : ((da - ($elm$core$List$length(data) * pa)) / sum);
		var computeValue = F2(
			function (el, angle) {
				var value = settings.gx(el);
				return {
					dH: settings.dH,
					dO: (angle + ((value > 0) ? (value * k) : 0)) + pa,
					h$: settings.h$,
					fV: settings.fV,
					ei: p,
					ej: settings.ej,
					cB: angle
				};
			});
		var helper = F2(
			function (index, _v1) {
				var angle = _v1.a;
				var result = _v1.b;
				var r = A2(
					computeValue,
					A2(unsafeGet, index, dataArray),
					angle);
				return _Utils_Tuple2(
					r.dO,
					A3($elm$core$Dict$insert, index, r, result));
			});
		return $elm$core$Dict$values(
			A3(
				$elm$core$List$foldl,
				helper,
				_Utils_Tuple2(settings.cB, $elm$core$Dict$empty),
				sortedIndices(data)).b);
	});
var $gampleman$elm_visualization$Shape$pie = $gampleman$elm_visualization$Shape$Pie$pie;
var $elm_community$typed_svg$TypedSvg$Types$AnchorMiddle = 2;
var $elm$core$Basics$cos = _Basics_cos;
var $elm$core$Basics$sin = _Basics_sin;
var $gampleman$elm_visualization$Shape$Pie$centroid = function (arcData) {
	var r = (arcData.h$ + arcData.fV) / 2;
	var a = ((arcData.cB + arcData.dO) / 2) - ($elm$core$Basics$pi / 2);
	return _Utils_Tuple2(
		$elm$core$Basics$cos(a) * r,
		$elm$core$Basics$sin(a) * r);
};
var $gampleman$elm_visualization$Shape$centroid = $gampleman$elm_visualization$Shape$Pie$centroid;
var $elm_community$typed_svg$TypedSvg$Core$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString = function (length) {
	switch (length.$) {
		case 0:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'cm';
		case 1:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'em';
		case 2:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'ex';
		case 3:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'in';
		case 4:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'mm';
		case 5:
			var x = length.a;
			return $elm$core$String$fromFloat(x);
		case 6:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'pc';
		case 7:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + '%';
		case 8:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'pt';
		default:
			var x = length.a;
			return $elm$core$String$fromFloat(x) + 'px';
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$dy = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'dy',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Types$Em = function (a) {
	return {$: 1, a: a};
};
var $elm_community$typed_svg$TypedSvg$Types$em = $elm_community$typed_svg$TypedSvg$Types$Em;
var $author$project$Components$PieChart$w = 500;
var $author$project$Components$PieChart$radius = A2($elm$core$Basics$min, $author$project$Components$PieChart$w, $author$project$Components$PieChart$h) / 2;
var $elm_community$typed_svg$TypedSvg$Core$text = $elm$virtual_dom$VirtualDom$text;
var $elm_community$typed_svg$TypedSvg$TypesToStrings$anchorAlignmentToString = function (anchorAlignment) {
	switch (anchorAlignment) {
		case 0:
			return 'inherit';
		case 1:
			return 'start';
		case 2:
			return 'middle';
		default:
			return 'end';
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$textAnchor = function (anchorAlignment) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'text-anchor',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$anchorAlignmentToString(anchorAlignment));
};
var $elm_community$typed_svg$TypedSvg$text_ = $elm_community$typed_svg$TypedSvg$Core$node('text');
var $elm_community$typed_svg$TypedSvg$TypesToStrings$transformToString = function (xform) {
	var tr = F2(
		function (name, args) {
			return $elm$core$String$concat(
				_List_fromArray(
					[
						name,
						'(',
						A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, $elm$core$String$fromFloat, args)),
						')'
					]));
		});
	switch (xform.$) {
		case 0:
			var a = xform.a;
			var b = xform.b;
			var c = xform.c;
			var d = xform.d;
			var e = xform.e;
			var f = xform.f;
			return A2(
				tr,
				'matrix',
				_List_fromArray(
					[a, b, c, d, e, f]));
		case 1:
			var a = xform.a;
			var x = xform.b;
			var y = xform.c;
			return A2(
				tr,
				'rotate',
				_List_fromArray(
					[a, x, y]));
		case 2:
			var x = xform.a;
			var y = xform.b;
			return A2(
				tr,
				'scale',
				_List_fromArray(
					[x, y]));
		case 3:
			var x = xform.a;
			return A2(
				tr,
				'skewX',
				_List_fromArray(
					[x]));
		case 4:
			var y = xform.a;
			return A2(
				tr,
				'skewY',
				_List_fromArray(
					[y]));
		default:
			var x = xform.a;
			var y = xform.b;
			return A2(
				tr,
				'translate',
				_List_fromArray(
					[x, y]));
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$transform = function (transforms) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'transform',
		A2(
			$elm$core$String$join,
			' ',
			A2($elm$core$List$map, $elm_community$typed_svg$TypedSvg$TypesToStrings$transformToString, transforms)));
};
var $author$project$Components$PieChart$pieLabel = F2(
	function (slice, _v0) {
		var label = _v0.a;
		var value = _v0.b;
		var dings = 10;
		var _v1 = $gampleman$elm_visualization$Shape$centroid(
			_Utils_update(
				slice,
				{h$: $author$project$Components$PieChart$radius - dings, fV: $author$project$Components$PieChart$radius - dings}));
		var x = _v1.a;
		var y = _v1.b;
		return A2(
			$elm_community$typed_svg$TypedSvg$text_,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$transform(
					_List_fromArray(
						[
							A2($elm_community$typed_svg$TypedSvg$Types$Translate, x, y)
						])),
					$elm_community$typed_svg$TypedSvg$Attributes$dy(
					$elm_community$typed_svg$TypedSvg$Types$em(0.1)),
					$elm_community$typed_svg$TypedSvg$Attributes$textAnchor(2)
				]),
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Core$text(
					label + (' (' + ($elm$core$String$fromInt(
						$elm$core$Basics$round(value)) + ')')))
				]));
	});
var $elm_community$typed_svg$TypedSvg$Types$Paint = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$acos = _Basics_acos;
var $folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc = function (a) {
	return {$: 3, a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$arcTo = $folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$LargestArc = 1;
var $folkertdev$one_true_path_experiment$LowLevel$Command$largestArc = 1;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$SmallestArc = 0;
var $folkertdev$one_true_path_experiment$LowLevel$Command$smallestArc = 0;
var $gampleman$elm_visualization$Shape$Pie$boolToArc = function (b) {
	return b ? $folkertdev$one_true_path_experiment$LowLevel$Command$largestArc : $folkertdev$one_true_path_experiment$LowLevel$Command$smallestArc;
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$Clockwise = 0;
var $folkertdev$one_true_path_experiment$LowLevel$Command$clockwise = 0;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$CounterClockwise = 1;
var $folkertdev$one_true_path_experiment$LowLevel$Command$counterClockwise = 1;
var $gampleman$elm_visualization$Shape$Pie$boolToDirection = function (b) {
	return b ? $folkertdev$one_true_path_experiment$LowLevel$Command$counterClockwise : $folkertdev$one_true_path_experiment$LowLevel$Command$clockwise;
};
var $folkertdev$one_true_path_experiment$SubPath$Empty = {$: 1};
var $folkertdev$one_true_path_experiment$SubPath$empty = $folkertdev$one_true_path_experiment$SubPath$Empty;
var $gampleman$elm_visualization$Shape$Pie$epsilon = 1.0e-12;
var $elm$core$Basics$truncate = _Basics_truncate;
var $gampleman$elm_visualization$Shape$Pie$mod = F2(
	function (a, b) {
		var frac = a / b;
		return (frac - (frac | 0)) * b;
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$MoveTo = $elm$core$Basics$identity;
var $folkertdev$one_true_path_experiment$LowLevel$Command$moveTo = $elm$core$Basics$identity;
var $folkertdev$one_true_path_experiment$SubPath$SubPath = function (a) {
	return {$: 0, a: a};
};
var $folkertdev$elm_deque$Deque$Deque = $elm$core$Basics$identity;
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $folkertdev$elm_deque$Internal$rebalance = function (deque) {
	var sizeF = deque.L;
	var sizeR = deque.M;
	var front = deque.V;
	var rear = deque.X;
	var size1 = ((sizeF + sizeR) / 2) | 0;
	var size2 = (sizeF + sizeR) - size1;
	var balanceConstant = 4;
	if ((sizeF + sizeR) < 2) {
		return deque;
	} else {
		if (_Utils_cmp(sizeF, (balanceConstant * sizeR) + 1) > 0) {
			var newRear = _Utils_ap(
				rear,
				$elm$core$List$reverse(
					A2($elm$core$List$drop, size1, front)));
			var newFront = A2($elm$core$List$take, size1, front);
			return {V: newFront, X: newRear, L: size1, M: size2};
		} else {
			if (_Utils_cmp(sizeR, (balanceConstant * sizeF) + 1) > 0) {
				var newRear = A2($elm$core$List$take, size1, rear);
				var newFront = _Utils_ap(
					front,
					$elm$core$List$reverse(
						A2($elm$core$List$drop, size1, rear)));
				return {V: newFront, X: newRear, L: size1, M: size2};
			} else {
				return deque;
			}
		}
	}
};
var $folkertdev$elm_deque$Internal$fromList = function (list) {
	return $folkertdev$elm_deque$Internal$rebalance(
		{
			V: list,
			X: _List_Nil,
			L: $elm$core$List$length(list),
			M: 0
		});
};
var $folkertdev$elm_deque$Deque$fromList = A2($elm$core$Basics$composeL, $elm$core$Basics$identity, $folkertdev$elm_deque$Internal$fromList);
var $folkertdev$one_true_path_experiment$SubPath$with = F2(
	function (moveto, drawtos) {
		return $folkertdev$one_true_path_experiment$SubPath$SubPath(
			{
				fd: $folkertdev$elm_deque$Deque$fromList(drawtos),
				fP: moveto
			});
	});
var $gampleman$elm_visualization$Shape$Pie$arc_ = F6(
	function (x, y, radius, a0, a1, ccw) {
		var tau = 2 * $elm$core$Basics$pi;
		var r = $elm$core$Basics$abs(radius);
		var dy = r * $elm$core$Basics$sin(a0);
		var y0_ = y + dy;
		var dx = r * $elm$core$Basics$cos(a0);
		var x0_ = x + dx;
		var origin = $folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
			_Utils_Tuple2(x0_, y0_));
		var da = ccw ? (a0 - a1) : (a1 - a0);
		var cw = $gampleman$elm_visualization$Shape$Pie$boolToDirection(!ccw);
		if (!r) {
			return $folkertdev$one_true_path_experiment$SubPath$empty;
		} else {
			if (_Utils_cmp(da, tau - $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) {
				return A2(
					$folkertdev$one_true_path_experiment$SubPath$with,
					origin,
					_List_fromArray(
						[
							$folkertdev$one_true_path_experiment$LowLevel$Command$arcTo(
							_List_fromArray(
								[
									{
									dB: $folkertdev$one_true_path_experiment$LowLevel$Command$largestArc,
									dL: cw,
									a1: _Utils_Tuple2(r, r),
									Z: _Utils_Tuple2(x - dx, y - dy),
									aM: 0
								}
								])),
							$folkertdev$one_true_path_experiment$LowLevel$Command$arcTo(
							_List_fromArray(
								[
									{
									dB: $folkertdev$one_true_path_experiment$LowLevel$Command$largestArc,
									dL: cw,
									a1: _Utils_Tuple2(r, r),
									Z: _Utils_Tuple2(x0_, y0_),
									aM: 0
								}
								]))
						]));
			} else {
				var da_ = (da < 0) ? (A2($gampleman$elm_visualization$Shape$Pie$mod, da, tau) + tau) : da;
				return A2(
					$folkertdev$one_true_path_experiment$SubPath$with,
					origin,
					_List_fromArray(
						[
							$folkertdev$one_true_path_experiment$LowLevel$Command$arcTo(
							_List_fromArray(
								[
									{
									dB: $gampleman$elm_visualization$Shape$Pie$boolToArc(
										_Utils_cmp(da_, $elm$core$Basics$pi) > -1),
									dL: cw,
									a1: _Utils_Tuple2(r, r),
									Z: _Utils_Tuple2(
										x + (r * $elm$core$Basics$cos(a1)),
										y + (r * $elm$core$Basics$sin(a1))),
									aM: 0
								}
								]))
						]));
			}
		}
	});
var $elm$core$Basics$atan2 = _Basics_atan2;
var $folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath = {$: 4};
var $folkertdev$one_true_path_experiment$LowLevel$Command$closePath = $folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath;
var $folkertdev$elm_deque$Internal$empty = {V: _List_Nil, X: _List_Nil, L: 0, M: 0};
var $folkertdev$elm_deque$Internal$popBack = function (deque) {
	var front = deque.V;
	var rear = deque.X;
	var _v0 = _Utils_Tuple2(front, rear);
	if (!_v0.b.b) {
		if (!_v0.a.b) {
			return _Utils_Tuple2($elm$core$Maybe$Nothing, $folkertdev$elm_deque$Internal$empty);
		} else {
			if (!_v0.a.b.b) {
				var _v1 = _v0.a;
				var x = _v1.a;
				return _Utils_Tuple2(
					$elm$core$Maybe$Just(x),
					$folkertdev$elm_deque$Internal$empty);
			} else {
				return _Utils_Tuple2($elm$core$Maybe$Nothing, $folkertdev$elm_deque$Internal$empty);
			}
		}
	} else {
		var _v2 = _v0.b;
		var r = _v2.a;
		var rs = _v2.b;
		return _Utils_Tuple2(
			$elm$core$Maybe$Just(r),
			$folkertdev$elm_deque$Internal$rebalance(
				{V: deque.V, X: rs, L: deque.L, M: deque.M - 1}));
	}
};
var $folkertdev$elm_deque$Deque$unwrap = function (_v0) {
	var boundedDeque = _v0;
	return boundedDeque;
};
var $folkertdev$elm_deque$Deque$popBack = A2(
	$elm$core$Basics$composeL,
	A2(
		$elm$core$Basics$composeL,
		$elm$core$Tuple$mapSecond($elm$core$Basics$identity),
		$folkertdev$elm_deque$Internal$popBack),
	$folkertdev$elm_deque$Deque$unwrap);
var $folkertdev$elm_deque$Deque$mapAbstract = F2(
	function (f, _v0) {
		var _abstract = _v0;
		return f(_abstract);
	});
var $folkertdev$elm_deque$Deque$pushBack = F2(
	function (elem, _v0) {
		var deque = _v0;
		return A2(
			$folkertdev$elm_deque$Deque$mapAbstract,
			$folkertdev$elm_deque$Internal$rebalance,
			{
				V: deque.V,
				X: A2($elm$core$List$cons, elem, deque.X),
				L: deque.L,
				M: deque.M + 1
			});
	});
var $folkertdev$one_true_path_experiment$SubPath$close = function (subpath) {
	if (subpath.$ === 1) {
		return $folkertdev$one_true_path_experiment$SubPath$Empty;
	} else {
		var moveto = subpath.a.fP;
		var drawtos = subpath.a.fd;
		var _v1 = $folkertdev$elm_deque$Deque$popBack(drawtos);
		if ((!_v1.a.$) && (_v1.a.a.$ === 4)) {
			var _v2 = _v1.a.a;
			var preceding = _v1.b;
			return subpath;
		} else {
			return $folkertdev$one_true_path_experiment$SubPath$SubPath(
				{
					fd: A2($folkertdev$elm_deque$Deque$pushBack, $folkertdev$one_true_path_experiment$LowLevel$Command$closePath, drawtos),
					fP: moveto
				});
		}
	}
};
var $folkertdev$one_true_path_experiment$SubPath$firstPoint = function (_v0) {
	var moveto = _v0.fP;
	var p = moveto;
	return p;
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo = function (a) {
	return {$: 0, a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$lineTo = $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo;
var $folkertdev$one_true_path_experiment$SubPath$map2 = F3(
	function (f, sub1, sub2) {
		var _v0 = _Utils_Tuple2(sub1, sub2);
		if (_v0.a.$ === 1) {
			if (_v0.b.$ === 1) {
				var _v1 = _v0.a;
				var _v2 = _v0.b;
				return $folkertdev$one_true_path_experiment$SubPath$Empty;
			} else {
				var _v3 = _v0.a;
				var subpath = _v0.b;
				return subpath;
			}
		} else {
			if (_v0.b.$ === 1) {
				var subpath = _v0.a;
				var _v4 = _v0.b;
				return subpath;
			} else {
				var a = _v0.a.a;
				var b = _v0.b.a;
				return A2(f, a, b);
			}
		}
	});
var $folkertdev$one_true_path_experiment$SubPath$pushBack = F2(
	function (drawto, data) {
		return _Utils_update(
			data,
			{
				fd: A2($folkertdev$elm_deque$Deque$pushBack, drawto, data.fd)
			});
	});
var $folkertdev$elm_deque$Internal$length = function (deque) {
	return deque.L + deque.M;
};
var $folkertdev$elm_deque$Internal$isEmpty = function (deque) {
	return !$folkertdev$elm_deque$Internal$length(deque);
};
var $folkertdev$elm_deque$Deque$isEmpty = A2($elm$core$Basics$composeL, $folkertdev$elm_deque$Internal$isEmpty, $folkertdev$elm_deque$Deque$unwrap);
var $folkertdev$elm_deque$Deque$append = F2(
	function (p, q) {
		var x = p;
		var y = q;
		return $folkertdev$elm_deque$Deque$isEmpty(p) ? q : ($folkertdev$elm_deque$Deque$isEmpty(q) ? p : {
			V: _Utils_ap(
				x.V,
				$elm$core$List$reverse(x.X)),
			X: $elm$core$List$reverse(
				_Utils_ap(
					y.V,
					$elm$core$List$reverse(y.X))),
			L: x.L + x.M,
			M: y.L + y.M
		});
	});
var $folkertdev$one_true_path_experiment$SubPath$unsafeConcatenate = F2(
	function (a, b) {
		return _Utils_update(
			a,
			{
				fd: A2($folkertdev$elm_deque$Deque$append, a.fd, b.fd)
			});
	});
var $folkertdev$one_true_path_experiment$SubPath$connect = function () {
	var helper = F2(
		function (right, left) {
			return $folkertdev$one_true_path_experiment$SubPath$SubPath(
				A2(
					$folkertdev$one_true_path_experiment$SubPath$unsafeConcatenate,
					A2(
						$folkertdev$one_true_path_experiment$SubPath$pushBack,
						$folkertdev$one_true_path_experiment$LowLevel$Command$lineTo(
							_List_fromArray(
								[
									$folkertdev$one_true_path_experiment$SubPath$firstPoint(right)
								])),
						left),
					right));
		});
	return $folkertdev$one_true_path_experiment$SubPath$map2(helper);
}();
var $elm$core$Basics$pow = _Basics_pow;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $gampleman$elm_visualization$Shape$Pie$cornerTangents = F7(
	function (x0, y0, x1, y1, r1, rc, cw) {
		var y01 = y0 - y1;
		var x01 = x0 - x1;
		var r = r1 - rc;
		var lo = (cw ? rc : (-rc)) / $elm$core$Basics$sqrt(
			A2($elm$core$Basics$pow, x01, 2) + A2($elm$core$Basics$pow, y01, 2));
		var ox = lo * y01;
		var x10 = x1 + ox;
		var x11 = x0 + ox;
		var x00 = (x11 + x10) / 2;
		var oy = (-lo) * x01;
		var y10 = y1 + oy;
		var y11 = y0 + oy;
		var y00 = (y11 + y10) / 2;
		var dy = y10 - y11;
		var dx = x10 - x11;
		var dd = (x11 * y10) - (x10 * y11);
		var d2 = A2($elm$core$Basics$pow, dx, 2) + A2($elm$core$Basics$pow, dy, 2);
		var d = ((dy < 0) ? (-1) : 1) * $elm$core$Basics$sqrt(
			A2(
				$elm$core$Basics$max,
				0,
				(A2($elm$core$Basics$pow, r, 2) * d2) - A2($elm$core$Basics$pow, dd, 2)));
		var cy1 = (((-dd) * dx) + (dy * d)) / d2;
		var dy1 = cy1 - y00;
		var cy0 = (((-dd) * dx) - (dy * d)) / d2;
		var dy0 = cy0 - y00;
		var cx1 = ((dd * dy) + (dx * d)) / d2;
		var dx1 = cx1 - x00;
		var cx0 = ((dd * dy) - (dx * d)) / d2;
		var dx0 = cx0 - x00;
		var _v0 = (_Utils_cmp(
			A2($elm$core$Basics$pow, dx0, 2) + A2($elm$core$Basics$pow, dy0, 2),
			A2($elm$core$Basics$pow, dx1, 2) + A2($elm$core$Basics$pow, dy1, 2)) > 0) ? _Utils_Tuple2(cx1, cy1) : _Utils_Tuple2(cx0, cy0);
		var fcx = _v0.a;
		var fxy = _v0.b;
		return {F: fcx, G: fxy, ad: -ox, aL: fcx * ((r1 / r) - 1), ae: -oy, aN: fxy * ((r1 / r) - 1)};
	});
var $gampleman$elm_visualization$Shape$Pie$intersect = F8(
	function (x0, y0, x1, y1, x2, y2, x3, y3) {
		var y32 = y3 - y2;
		var y10 = y1 - y0;
		var x32 = x3 - x2;
		var x10 = x1 - x0;
		var t = ((x32 * (y0 - y2)) - (y32 * (x0 - x2))) / ((y32 * x10) - (x32 * y10));
		return _Utils_Tuple2(x0 + (t * x10), y0 + (t * y10));
	});
var $ianmackenzie$elm_geometry$Vector2d$components = function (_v0) {
	var components_ = _v0;
	return components_;
};
var $ianmackenzie$elm_geometry$Geometry$Types$Vector2d = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Vector2d$fromComponents = $elm$core$Basics$identity;
var $ianmackenzie$elm_geometry$Vector2d$difference = F2(
	function (firstVector, secondVector) {
		var _v0 = $ianmackenzie$elm_geometry$Vector2d$components(secondVector);
		var x2 = _v0.a;
		var y2 = _v0.b;
		var _v1 = $ianmackenzie$elm_geometry$Vector2d$components(firstVector);
		var x1 = _v1.a;
		var y1 = _v1.b;
		return $ianmackenzie$elm_geometry$Vector2d$fromComponents(
			_Utils_Tuple2(x1 - x2, y1 - y2));
	});
var $folkertdev$elm_deque$Internal$foldl = F3(
	function (f, initial, deque) {
		return function (initial_) {
			return A3($elm$core$List$foldr, f, initial_, deque.X);
		}(
			A3($elm$core$List$foldl, f, initial, deque.V));
	});
var $folkertdev$elm_deque$Deque$foldl = F2(
	function (f, initial) {
		return A2(
			$elm$core$Basics$composeL,
			A2($folkertdev$elm_deque$Internal$foldl, f, initial),
			$folkertdev$elm_deque$Deque$unwrap);
	});
var $elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$updateCursorState = F2(
	function (drawto, state) {
		var noControlPoint = function (currentState) {
			return _Utils_update(
				currentState,
				{x: $elm$core$Maybe$Nothing});
		};
		var maybeUpdateCursor = function (coordinate) {
			return _Utils_update(
				state,
				{
					l: A2($elm$core$Maybe$withDefault, state.l, coordinate)
				});
		};
		var _v0 = state.l;
		var cursorX = _v0.a;
		var cursorY = _v0.b;
		switch (drawto.$) {
			case 0:
				var coordinates = drawto.a;
				return noControlPoint(
					maybeUpdateCursor(
						$elm_community$list_extra$List$Extra$last(coordinates)));
			case 1:
				var coordinates = drawto.a;
				var _v2 = $elm_community$list_extra$List$Extra$last(coordinates);
				if (_v2.$ === 1) {
					return state;
				} else {
					var _v3 = _v2.a;
					var control1 = _v3.a;
					var control2 = _v3.b;
					var target = _v3.c;
					return _Utils_update(
						state,
						{
							l: target,
							x: $elm$core$Maybe$Just(control2)
						});
				}
			case 2:
				var coordinates = drawto.a;
				var _v4 = $elm_community$list_extra$List$Extra$last(coordinates);
				if (_v4.$ === 1) {
					return state;
				} else {
					var _v5 = _v4.a;
					var control = _v5.a;
					var target = _v5.b;
					return _Utils_update(
						state,
						{
							l: target,
							x: $elm$core$Maybe$Just(control)
						});
				}
			case 3:
				var _arguments = drawto.a;
				return noControlPoint(
					maybeUpdateCursor(
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.Z;
							},
							$elm_community$list_extra$List$Extra$last(_arguments))));
			default:
				return noControlPoint(state);
		}
	});
var $folkertdev$one_true_path_experiment$SubPath$finalCursorState = function (_v0) {
	var moveto = _v0.fP;
	var drawtos = _v0.fd;
	var _v1 = moveto;
	var start = _v1;
	var initial = {l: start, x: $elm$core$Maybe$Nothing, eI: start};
	return A3($folkertdev$elm_deque$Deque$foldl, $folkertdev$one_true_path_experiment$LowLevel$Command$updateCursorState, initial, drawtos);
};
var $folkertdev$one_true_path_experiment$SubPath$finalPoint = A2(
	$elm$core$Basics$composeR,
	$folkertdev$one_true_path_experiment$SubPath$finalCursorState,
	function ($) {
		return $.l;
	});
var $folkertdev$elm_deque$Internal$map = F2(
	function (f, deque) {
		return {
			V: A2($elm$core$List$map, f, deque.V),
			X: A2($elm$core$List$map, f, deque.X),
			L: deque.L,
			M: deque.M
		};
	});
var $folkertdev$elm_deque$Deque$map = function (f) {
	return $folkertdev$elm_deque$Deque$mapAbstract(
		$folkertdev$elm_deque$Internal$map(f));
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo = function (a) {
	return {$: 2, a: a};
};
var $folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple2 = F2(
	function (f, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		return _Utils_Tuple2(
			f(a),
			f(b));
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple3 = F2(
	function (f, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		return _Utils_Tuple3(
			f(a),
			f(b),
			f(c));
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$mapCoordinateDrawTo = F2(
	function (f, drawto) {
		switch (drawto.$) {
			case 0:
				var coordinates = drawto.a;
				return $folkertdev$one_true_path_experiment$LowLevel$Command$LineTo(
					A2($elm$core$List$map, f, coordinates));
			case 1:
				var coordinates = drawto.a;
				return $folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo(
					A2(
						$elm$core$List$map,
						$folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple3(f),
						coordinates));
			case 2:
				var coordinates = drawto.a;
				return $folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo(
					A2(
						$elm$core$List$map,
						$folkertdev$one_true_path_experiment$LowLevel$Command$mapTuple2(f),
						coordinates));
			case 3:
				var _arguments = drawto.a;
				return $folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc(
					A2(
						$elm$core$List$map,
						function (argument) {
							return _Utils_update(
								argument,
								{
									Z: f(argument.Z)
								});
						},
						_arguments));
			default:
				return $folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath;
		}
	});
var $folkertdev$one_true_path_experiment$SubPath$mapCoordinateInstructions = F2(
	function (f, _v0) {
		var moveto = _v0.fP;
		var drawtos = _v0.fd;
		var coordinate = moveto;
		return {
			fd: A2(
				$folkertdev$elm_deque$Deque$map,
				$folkertdev$one_true_path_experiment$LowLevel$Command$mapCoordinateDrawTo(f),
				drawtos),
			fP: f(coordinate)
		};
	});
var $ianmackenzie$elm_geometry$Vector2d$sum = F2(
	function (firstVector, secondVector) {
		var _v0 = $ianmackenzie$elm_geometry$Vector2d$components(secondVector);
		var x2 = _v0.a;
		var y2 = _v0.b;
		var _v1 = $ianmackenzie$elm_geometry$Vector2d$components(firstVector);
		var x1 = _v1.a;
		var y1 = _v1.b;
		return $ianmackenzie$elm_geometry$Vector2d$fromComponents(
			_Utils_Tuple2(x1 + x2, y1 + y2));
	});
var $folkertdev$one_true_path_experiment$SubPath$continue = function () {
	var helper = F2(
		function (right, left) {
			var distance = A2(
				$ianmackenzie$elm_geometry$Vector2d$difference,
				$ianmackenzie$elm_geometry$Vector2d$fromComponents(
					$folkertdev$one_true_path_experiment$SubPath$finalPoint(left)),
				$ianmackenzie$elm_geometry$Vector2d$fromComponents(
					$folkertdev$one_true_path_experiment$SubPath$firstPoint(right)));
			var mapper = A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					$ianmackenzie$elm_geometry$Vector2d$components,
					$ianmackenzie$elm_geometry$Vector2d$sum(distance)),
				$ianmackenzie$elm_geometry$Vector2d$fromComponents);
			return $folkertdev$one_true_path_experiment$SubPath$SubPath(
				A2(
					$folkertdev$one_true_path_experiment$SubPath$unsafeConcatenate,
					left,
					A2($folkertdev$one_true_path_experiment$SubPath$mapCoordinateInstructions, mapper, right)));
		});
	return $folkertdev$one_true_path_experiment$SubPath$map2(helper);
}();
var $gampleman$elm_visualization$Shape$Pie$makeArc = F6(
	function (x, y, radius, a0, a1, ccw) {
		return $folkertdev$one_true_path_experiment$SubPath$continue(
			A6($gampleman$elm_visualization$Shape$Pie$arc_, x, y, radius, a0, a1, ccw));
	});
var $elm$core$Basics$asin = _Basics_asin;
var $gampleman$elm_visualization$Shape$Pie$myAsin = function (x) {
	return (x >= 1) ? ($elm$core$Basics$pi / 2) : ((_Utils_cmp(x, -1) < 1) ? ((-$elm$core$Basics$pi) / 2) : $elm$core$Basics$asin(x));
};
var $gampleman$elm_visualization$Shape$Pie$arc = function (arcData) {
	var a1 = arcData.dO - ($elm$core$Basics$pi / 2);
	var a0 = arcData.cB - ($elm$core$Basics$pi / 2);
	var cw = _Utils_cmp(a1, a0) > 0;
	var da = $elm$core$Basics$abs(a1 - a0);
	var _v0 = (_Utils_cmp(arcData.h$, arcData.fV) > 0) ? _Utils_Tuple2(arcData.fV, arcData.h$) : _Utils_Tuple2(arcData.h$, arcData.fV);
	var r0 = _v0.a;
	var r1 = _v0.b;
	var path = function () {
		if (_Utils_cmp(r1, $gampleman$elm_visualization$Shape$Pie$epsilon) < 1) {
			return _List_fromArray(
				[
					$folkertdev$one_true_path_experiment$SubPath$close(
					A2(
						$folkertdev$one_true_path_experiment$SubPath$with,
						$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
							_Utils_Tuple2(0, 0)),
						_List_Nil))
				]);
		} else {
			if (_Utils_cmp(da, (2 * $elm$core$Basics$pi) - $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) {
				var p = A7(
					$gampleman$elm_visualization$Shape$Pie$makeArc,
					0,
					0,
					r1,
					a0,
					a1,
					!cw,
					A2(
						$folkertdev$one_true_path_experiment$SubPath$with,
						$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
							_Utils_Tuple2(
								r1 * $elm$core$Basics$cos(a0),
								r1 * $elm$core$Basics$sin(a0))),
						_List_Nil));
				return (_Utils_cmp(r0, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? _List_fromArray(
					[
						p,
						$folkertdev$one_true_path_experiment$SubPath$close(
						A7(
							$gampleman$elm_visualization$Shape$Pie$makeArc,
							0,
							0,
							r0,
							a1,
							a0,
							cw,
							A2(
								$folkertdev$one_true_path_experiment$SubPath$with,
								$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
									_Utils_Tuple2(
										r0 * $elm$core$Basics$cos(a1),
										r0 * $elm$core$Basics$sin(a1))),
								_List_Nil)))
					]) : _List_fromArray(
					[
						$folkertdev$one_true_path_experiment$SubPath$close(p)
					]);
			} else {
				var rc = A2(
					$elm$core$Basics$min,
					$elm$core$Basics$abs(r1 - r0) / 2,
					arcData.dH);
				var ap = arcData.ei / 2;
				var rp = (_Utils_cmp(ap, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? ((arcData.ej > 0) ? arcData.ej : $elm$core$Basics$sqrt(
					A2($elm$core$Basics$pow, r0, 2) + A2($elm$core$Basics$pow, r1, 2))) : 0;
				var p0 = $gampleman$elm_visualization$Shape$Pie$myAsin(
					(rp / r0) * $elm$core$Basics$sin(ap));
				var p1 = $gampleman$elm_visualization$Shape$Pie$myAsin(
					(rp / r1) * $elm$core$Basics$sin(ap));
				var _v1 = (_Utils_cmp(rp, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? ((_Utils_cmp(da - (p1 * 2), $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? (cw ? _Utils_Tuple3(a0 + p1, a1 - p1, da - (p1 * 2)) : _Utils_Tuple3(a0 - p1, a1 + p1, da - (p1 * 2))) : _Utils_Tuple3((a0 + a1) / 2, (a0 + a1) / 2, 0)) : _Utils_Tuple3(a0, a1, da);
				var a01 = _v1.a;
				var a11 = _v1.b;
				var da1 = _v1.c;
				var x01 = r1 * $elm$core$Basics$cos(a01);
				var y01 = r1 * $elm$core$Basics$sin(a01);
				var x11 = r1 * $elm$core$Basics$cos(a11);
				var y11 = r1 * $elm$core$Basics$sin(a11);
				var _v2 = (_Utils_cmp(rp, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? ((_Utils_cmp(da - (p0 * 2), $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? (cw ? _Utils_Tuple3(a0 + p0, a1 - p0, da - (p0 * 2)) : _Utils_Tuple3(a0 - p0, a1 + p0, da - (p0 * 2))) : _Utils_Tuple3((a0 + a1) / 2, (a0 + a1) / 2, 0)) : _Utils_Tuple3(a0, a1, da);
				var a00 = _v2.a;
				var a10 = _v2.b;
				var da0 = _v2.c;
				var x00 = r0 * $elm$core$Basics$cos(a00);
				var y00 = r0 * $elm$core$Basics$sin(a00);
				var x10 = r0 * $elm$core$Basics$cos(a10);
				var y10 = r0 * $elm$core$Basics$sin(a10);
				var _v3 = (_Utils_cmp(da0, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) ? A8($gampleman$elm_visualization$Shape$Pie$intersect, x01, y01, x00, y00, x11, y11, x10, y10) : _Utils_Tuple2(x10, y10);
				var ocx = _v3.a;
				var ocy = _v3.b;
				var lc = $elm$core$Basics$sqrt(
					A2($elm$core$Basics$pow, ocx, 2) + A2($elm$core$Basics$pow, ocy, 2));
				var _v4 = _Utils_Tuple2(x11 - ocx, y11 - ocy);
				var bx = _v4.a;
				var by = _v4.b;
				var _v5 = _Utils_Tuple2(x01 - ocx, y01 - ocy);
				var ax = _v5.a;
				var ay = _v5.b;
				var kc = 1 / $elm$core$Basics$sin(
					$elm$core$Basics$acos(
						((ax * bx) + (ay * by)) / ($elm$core$Basics$sqrt(
							A2($elm$core$Basics$pow, ax, 2) + A2($elm$core$Basics$pow, ay, 2)) * $elm$core$Basics$sqrt(
							A2($elm$core$Basics$pow, bx, 2) + A2($elm$core$Basics$pow, by, 2)))) / 2);
				var _v6 = ((_Utils_cmp(rc, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) && (_Utils_cmp(da, $elm$core$Basics$pi) < 0)) ? _Utils_Tuple2(
					A2($elm$core$Basics$min, rc, (r0 - lc) / (kc - 1)),
					A2($elm$core$Basics$min, rc, (r1 - lc) / (kc + 1))) : _Utils_Tuple2(rc, rc);
				var rc0 = _v6.a;
				var rc1 = _v6.b;
				var outerRing = function () {
					if (_Utils_cmp(da1, $gampleman$elm_visualization$Shape$Pie$epsilon) < 1) {
						return A2(
							$folkertdev$one_true_path_experiment$SubPath$with,
							$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
								_Utils_Tuple2(x01, y01)),
							_List_Nil);
					} else {
						if (_Utils_cmp(rc1, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) {
							var t1 = A7($gampleman$elm_visualization$Shape$Pie$cornerTangents, x11, y11, x10, y10, r1, rc1, cw);
							var t0 = A7($gampleman$elm_visualization$Shape$Pie$cornerTangents, x00, y00, x01, y01, r1, rc1, cw);
							var p = A2(
								$folkertdev$one_true_path_experiment$SubPath$with,
								$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
									_Utils_Tuple2(t0.F + t0.ad, t0.G + t0.ae)),
								_List_Nil);
							return (_Utils_cmp(rc1, rc) < 0) ? A7(
								$gampleman$elm_visualization$Shape$Pie$makeArc,
								t0.F,
								t0.G,
								rc1,
								A2($elm$core$Basics$atan2, t0.ae, t0.ad),
								A2($elm$core$Basics$atan2, t1.ae, t1.ad),
								!cw,
								p) : A7(
								$gampleman$elm_visualization$Shape$Pie$makeArc,
								t1.F,
								t1.G,
								rc1,
								A2($elm$core$Basics$atan2, t1.aN, t1.aL),
								A2($elm$core$Basics$atan2, t1.ae, t1.ad),
								!cw,
								A7(
									$gampleman$elm_visualization$Shape$Pie$makeArc,
									0,
									0,
									r1,
									A2($elm$core$Basics$atan2, t0.G + t0.aN, t0.F + t0.aL),
									A2($elm$core$Basics$atan2, t1.G + t1.aN, t1.F + t1.aL),
									!cw,
									A7(
										$gampleman$elm_visualization$Shape$Pie$makeArc,
										t0.F,
										t0.G,
										rc1,
										A2($elm$core$Basics$atan2, t0.ae, t0.ad),
										A2($elm$core$Basics$atan2, t0.aN, t0.aL),
										!cw,
										p)));
						} else {
							return A7(
								$gampleman$elm_visualization$Shape$Pie$makeArc,
								0,
								0,
								r1,
								a01,
								a11,
								!cw,
								A2(
									$folkertdev$one_true_path_experiment$SubPath$with,
									$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
										_Utils_Tuple2(x01, y01)),
									_List_Nil));
						}
					}
				}();
				if ((_Utils_cmp(r0, $gampleman$elm_visualization$Shape$Pie$epsilon) < 1) || (_Utils_cmp(da0, $gampleman$elm_visualization$Shape$Pie$epsilon) < 1)) {
					return _List_fromArray(
						[
							$folkertdev$one_true_path_experiment$SubPath$close(
							A2(
								$folkertdev$one_true_path_experiment$SubPath$connect,
								A2(
									$folkertdev$one_true_path_experiment$SubPath$with,
									$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
										_Utils_Tuple2(x10, y10)),
									_List_Nil),
								outerRing))
						]);
				} else {
					if (_Utils_cmp(rc0, $gampleman$elm_visualization$Shape$Pie$epsilon) > 0) {
						var t1 = A7($gampleman$elm_visualization$Shape$Pie$cornerTangents, x01, y01, x00, y00, r0, -rc0, cw);
						var t0 = A7($gampleman$elm_visualization$Shape$Pie$cornerTangents, x10, y10, x11, y11, r0, -rc0, cw);
						var p = A2(
							$folkertdev$one_true_path_experiment$SubPath$connect,
							A2(
								$folkertdev$one_true_path_experiment$SubPath$with,
								$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(
									_Utils_Tuple2(t0.F + t0.ad, t0.G + t0.ae)),
								_List_Nil),
							outerRing);
						return (_Utils_cmp(rc0, rc) < 0) ? _List_fromArray(
							[
								$folkertdev$one_true_path_experiment$SubPath$close(
								A7(
									$gampleman$elm_visualization$Shape$Pie$makeArc,
									t0.F,
									t0.G,
									rc0,
									A2($elm$core$Basics$atan2, t0.ae, t0.ad),
									A2($elm$core$Basics$atan2, t1.ae, t1.ad),
									!cw,
									p))
							]) : _List_fromArray(
							[
								$folkertdev$one_true_path_experiment$SubPath$close(
								A7(
									$gampleman$elm_visualization$Shape$Pie$makeArc,
									t1.F,
									t1.G,
									rc0,
									A2($elm$core$Basics$atan2, t1.aN, t1.aL),
									A2($elm$core$Basics$atan2, t1.ae, t1.ad),
									!cw,
									A7(
										$gampleman$elm_visualization$Shape$Pie$makeArc,
										0,
										0,
										r0,
										A2($elm$core$Basics$atan2, t0.G + t0.aN, t0.F + t0.aL),
										A2($elm$core$Basics$atan2, t1.G + t1.aN, t1.F + t1.aL),
										cw,
										A7(
											$gampleman$elm_visualization$Shape$Pie$makeArc,
											t0.F,
											t0.G,
											rc0,
											A2($elm$core$Basics$atan2, t0.ae, t0.ad),
											A2($elm$core$Basics$atan2, t0.aN, t0.aL),
											!cw,
											p))))
							]);
					} else {
						return _List_fromArray(
							[
								$folkertdev$one_true_path_experiment$SubPath$close(
								A2(
									$folkertdev$one_true_path_experiment$SubPath$connect,
									A6($gampleman$elm_visualization$Shape$Pie$arc_, 0, 0, r0, a10, a00, cw),
									outerRing))
							]);
					}
				}
			}
		}
	}();
	return path;
};
var $gampleman$elm_visualization$Shape$arc = $gampleman$elm_visualization$Shape$Pie$arc;
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $avh4$elm_color$Color$RgbaSpace = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $avh4$elm_color$Color$scaleFrom255 = function (c) {
	return c / 255;
};
var $avh4$elm_color$Color$rgb255 = F3(
	function (r, g, b) {
		return A4(
			$avh4$elm_color$Color$RgbaSpace,
			$avh4$elm_color$Color$scaleFrom255(r),
			$avh4$elm_color$Color$scaleFrom255(g),
			$avh4$elm_color$Color$scaleFrom255(b),
			1.0);
	});
var $gampleman$elm_visualization$Scale$Color$tableau10 = _List_fromArray(
	[
		A3($avh4$elm_color$Color$rgb255, 78, 121, 167),
		A3($avh4$elm_color$Color$rgb255, 242, 142, 44),
		A3($avh4$elm_color$Color$rgb255, 225, 87, 89),
		A3($avh4$elm_color$Color$rgb255, 118, 183, 178),
		A3($avh4$elm_color$Color$rgb255, 89, 161, 79),
		A3($avh4$elm_color$Color$rgb255, 237, 201, 73),
		A3($avh4$elm_color$Color$rgb255, 175, 122, 161),
		A3($avh4$elm_color$Color$rgb255, 255, 157, 167),
		A3($avh4$elm_color$Color$rgb255, 156, 117, 95),
		A3($avh4$elm_color$Color$rgb255, 186, 176, 171)
	]);
var $author$project$Components$PieChart$colors = function (totalElements) {
	return $elm$core$List$concat(
		A2($elm$core$List$repeat, ((totalElements / 10) | 0) + 10, $gampleman$elm_visualization$Scale$Color$tableau10));
};
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $folkertdev$elm_deque$Deque$empty = $folkertdev$elm_deque$Internal$empty;
var $folkertdev$one_true_path_experiment$LowLevel$Command$merge = F2(
	function (instruction1, instruction2) {
		var _v0 = _Utils_Tuple2(instruction1, instruction2);
		_v0$5:
		while (true) {
			switch (_v0.a.$) {
				case 0:
					if (!_v0.b.$) {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$LineTo(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				case 1:
					if (_v0.b.$ === 1) {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$CurveTo(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				case 2:
					if (_v0.b.$ === 2) {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$QuadraticBezierCurveTo(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				case 3:
					if (_v0.b.$ === 3) {
						var p1 = _v0.a.a;
						var p2 = _v0.b.a;
						return $elm$core$Result$Ok(
							$folkertdev$one_true_path_experiment$LowLevel$Command$EllipticalArc(
								_Utils_ap(p1, p2)));
					} else {
						break _v0$5;
					}
				default:
					if (_v0.b.$ === 4) {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						return $elm$core$Result$Ok($folkertdev$one_true_path_experiment$LowLevel$Command$ClosePath);
					} else {
						break _v0$5;
					}
			}
		}
		return $elm$core$Result$Err(
			_Utils_Tuple2(instruction1, instruction2));
	});
var $folkertdev$elm_deque$Internal$toList = function (deque) {
	return _Utils_ap(
		deque.V,
		$elm$core$List$reverse(deque.X));
};
var $folkertdev$elm_deque$Deque$toList = A2($elm$core$Basics$composeL, $folkertdev$elm_deque$Internal$toList, $folkertdev$elm_deque$Deque$unwrap);
var $folkertdev$one_true_path_experiment$SubPath$compressHelper = function (drawtos) {
	var folder = F2(
		function (instruction, _v3) {
			var previous = _v3.a;
			var accum = _v3.b;
			var _v2 = A2($folkertdev$one_true_path_experiment$LowLevel$Command$merge, previous, instruction);
			if (!_v2.$) {
				var merged = _v2.a;
				return _Utils_Tuple2(merged, accum);
			} else {
				return _Utils_Tuple2(
					instruction,
					A2($elm$core$List$cons, previous, accum));
			}
		});
	var _v0 = $folkertdev$elm_deque$Deque$toList(drawtos);
	if (!_v0.b) {
		return $folkertdev$elm_deque$Deque$empty;
	} else {
		var first = _v0.a;
		var rest = _v0.b;
		return $folkertdev$elm_deque$Deque$fromList(
			$elm$core$List$reverse(
				function (_v1) {
					var a = _v1.a;
					var b = _v1.b;
					return A2($elm$core$List$cons, a, b);
				}(
					A3(
						$elm$core$List$foldl,
						folder,
						_Utils_Tuple2(first, _List_Nil),
						rest))));
	}
};
var $folkertdev$one_true_path_experiment$SubPath$compress = function (subpath) {
	if (subpath.$ === 1) {
		return $folkertdev$one_true_path_experiment$SubPath$Empty;
	} else {
		var data = subpath.a;
		return $folkertdev$one_true_path_experiment$SubPath$SubPath(
			_Utils_update(
				data,
				{
					fd: $folkertdev$one_true_path_experiment$SubPath$compressHelper(data.fd)
				}));
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$DecimalPlaces = $elm$core$Basics$identity;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$decimalPlaces = $elm$core$Basics$identity;
var $folkertdev$one_true_path_experiment$SubPath$defaultConfig = {c3: $elm$core$Maybe$Nothing, dg: false};
var $folkertdev$one_true_path_experiment$SubPath$optionFolder = F2(
	function (option, config) {
		if (!option.$) {
			var n = option.a;
			return _Utils_update(
				config,
				{
					c3: $elm$core$Maybe$Just(n)
				});
		} else {
			return _Utils_update(
				config,
				{dg: true});
		}
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$Absolute = 1;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$ClosePath = {$: 8};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$CurveTo = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$EllipticalArc = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$LineTo = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$QuadraticBezierCurveTo = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelDrawTo = function (drawto) {
	switch (drawto.$) {
		case 0:
			var coordinates = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$LineTo, 1, coordinates);
		case 1:
			var coordinates = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$CurveTo, 1, coordinates);
		case 2:
			var coordinates = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$QuadraticBezierCurveTo, 1, coordinates);
		case 3:
			var _arguments = drawto.a;
			return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$EllipticalArc, 1, _arguments);
		default:
			return $folkertdev$svg_path_lowlevel$Path$LowLevel$ClosePath;
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$MoveTo = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelMoveTo = function (_v0) {
	var target = _v0;
	return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$MoveTo, 1, target);
};
var $folkertdev$one_true_path_experiment$SubPath$toLowLevel = function (subpath) {
	if (subpath.$ === 1) {
		return $elm$core$Maybe$Nothing;
	} else {
		var moveto = subpath.a.fP;
		var drawtos = subpath.a.fd;
		return $elm$core$Maybe$Just(
			{
				fd: A2(
					$elm$core$List$map,
					$folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelDrawTo,
					$folkertdev$elm_deque$Deque$toList(drawtos)),
				fP: $folkertdev$one_true_path_experiment$LowLevel$Command$toLowLevelMoveTo(moveto)
			});
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$defaultConfig = {cn: $elm$core$String$fromFloat};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$roundTo = F2(
	function (n, value) {
		if (!n) {
			return $elm$core$String$fromInt(
				$elm$core$Basics$round(value));
		} else {
			var sign = (value < 0.0) ? '-' : '';
			var exp = A2($elm$core$Basics$pow, 10, n);
			var raised = $elm$core$Basics$abs(
				$elm$core$Basics$round(value * exp));
			var decimals = raised % exp;
			return (!decimals) ? _Utils_ap(
				sign,
				$elm$core$String$fromInt((raised / exp) | 0)) : (sign + ($elm$core$String$fromInt((raised / exp) | 0) + ('.' + $elm$core$String$fromInt(decimals))));
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$optionFolder = F2(
	function (option, config) {
		var n = option;
		return _Utils_update(
			config,
			{
				cn: $folkertdev$svg_path_lowlevel$Path$LowLevel$roundTo(n)
			});
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$accumulateOptions = A2($elm$core$List$foldl, $folkertdev$svg_path_lowlevel$Path$LowLevel$optionFolder, $folkertdev$svg_path_lowlevel$Path$LowLevel$defaultConfig);
var $folkertdev$svg_path_lowlevel$Path$LowLevel$isEmpty = function (command) {
	switch (command.$) {
		case 0:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 1:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 2:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 3:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 4:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 5:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 6:
			var mode = command.a;
			var coordinates = command.b;
			return $elm$core$List$isEmpty(coordinates);
		case 7:
			var mode = command.a;
			var _arguments = command.b;
			return $elm$core$List$isEmpty(_arguments);
		default:
			return false;
	}
};
var $elm$core$Char$toLower = _Char_toLower;
var $elm$core$Char$toUpper = _Char_toUpper;
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter = F2(
	function (mode, character) {
		if (mode === 1) {
			return $elm$core$String$fromChar(
				$elm$core$Char$toUpper(character));
		} else {
			return $elm$core$String$fromChar(
				$elm$core$Char$toLower(character));
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate = F2(
	function (config, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return config.cn(x) + (',' + config.cn(y));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2 = F2(
	function (config, _v0) {
		var c1 = _v0.a;
		var c2 = _v0.b;
		return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c1) + (' ' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c2));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate3 = F2(
	function (config, _v0) {
		var c1 = _v0.a;
		var c2 = _v0.b;
		var c3 = _v0.c;
		return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c1) + (' ' + (A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c2) + (' ' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, c3))));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags = function (_v0) {
	var arcFlag = _v0.a;
	var direction = _v0.b;
	var _v1 = _Utils_Tuple2(arcFlag, direction);
	if (_v1.a === 1) {
		if (!_v1.b) {
			var _v2 = _v1.a;
			var _v3 = _v1.b;
			return _Utils_Tuple2(1, 0);
		} else {
			var _v6 = _v1.a;
			var _v7 = _v1.b;
			return _Utils_Tuple2(1, 1);
		}
	} else {
		if (!_v1.b) {
			var _v4 = _v1.a;
			var _v5 = _v1.b;
			return _Utils_Tuple2(0, 0);
		} else {
			var _v8 = _v1.a;
			var _v9 = _v1.b;
			return _Utils_Tuple2(0, 1);
		}
	}
};
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyEllipticalArcArgument = F2(
	function (config, _v0) {
		var radii = _v0.a1;
		var xAxisRotate = _v0.aM;
		var arcFlag = _v0.dB;
		var direction = _v0.dL;
		var target = _v0.Z;
		var _v1 = $folkertdev$svg_path_lowlevel$Path$LowLevel$encodeFlags(
			_Utils_Tuple2(arcFlag, direction));
		var arc = _v1.a;
		var sweep = _v1.b;
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, radii),
					$elm$core$String$fromFloat(xAxisRotate),
					$elm$core$String$fromInt(arc),
					$elm$core$String$fromInt(sweep),
					A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, target)
				]));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyDrawTo = F2(
	function (config, command) {
		if ($folkertdev$svg_path_lowlevel$Path$LowLevel$isEmpty(command)) {
			return '';
		} else {
			switch (command.$) {
				case 0:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'L'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate(config),
								coordinates)));
				case 1:
					var mode = command.a;
					var coordinates = command.b;
					return $elm$core$List$isEmpty(coordinates) ? '' : _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'H'),
						A2(
							$elm$core$String$join,
							' ',
							A2($elm$core$List$map, $elm$core$String$fromFloat, coordinates)));
				case 2:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'V'),
						A2(
							$elm$core$String$join,
							' ',
							A2($elm$core$List$map, $elm$core$String$fromFloat, coordinates)));
				case 3:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'C'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate3(config),
								coordinates)));
				case 4:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'S'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2(config),
								coordinates)));
				case 5:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'Q'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate2(config),
								coordinates)));
				case 6:
					var mode = command.a;
					var coordinates = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'T'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate(config),
								coordinates)));
				case 7:
					var mode = command.a;
					var _arguments = command.b;
					return _Utils_ap(
						A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCharacter, mode, 'A'),
						A2(
							$elm$core$String$join,
							' ',
							A2(
								$elm$core$List$map,
								$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyEllipticalArcArgument(config),
								_arguments)));
				default:
					return 'Z';
			}
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyMoveTo = F2(
	function (config, _v0) {
		var mode = _v0.a;
		var coordinate = _v0.b;
		if (mode === 1) {
			return 'M' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, coordinate);
		} else {
			return 'm' + A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyCoordinate, config, coordinate);
		}
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$toStringSubPath = F2(
	function (config, _v0) {
		var moveto = _v0.fP;
		var drawtos = _v0.fd;
		return A2($folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyMoveTo, config, moveto) + (' ' + A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$folkertdev$svg_path_lowlevel$Path$LowLevel$stringifyDrawTo(config),
				drawtos)));
	});
var $folkertdev$svg_path_lowlevel$Path$LowLevel$toStringWith = F2(
	function (options, subpaths) {
		var config = $folkertdev$svg_path_lowlevel$Path$LowLevel$accumulateOptions(options);
		return A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$folkertdev$svg_path_lowlevel$Path$LowLevel$toStringSubPath(config),
				subpaths));
	});
var $folkertdev$one_true_path_experiment$SubPath$toStringWith = F2(
	function (options, subpath) {
		var config = A3($elm$core$List$foldl, $folkertdev$one_true_path_experiment$SubPath$optionFolder, $folkertdev$one_true_path_experiment$SubPath$defaultConfig, options);
		var lowLevelOptions = function () {
			var _v0 = config.c3;
			if (_v0.$ === 1) {
				return _List_Nil;
			} else {
				var n = _v0.a;
				return _List_fromArray(
					[
						$folkertdev$svg_path_lowlevel$Path$LowLevel$decimalPlaces(n)
					]);
			}
		}();
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				A2(
					$elm$core$Basics$composeL,
					$folkertdev$svg_path_lowlevel$Path$LowLevel$toStringWith(lowLevelOptions),
					$elm$core$List$singleton),
				$folkertdev$one_true_path_experiment$SubPath$toLowLevel(
					(config.dg ? $folkertdev$one_true_path_experiment$SubPath$compress : $elm$core$Basics$identity)(subpath))));
	});
var $folkertdev$one_true_path_experiment$SubPath$toString = function (subpath) {
	return A2($folkertdev$one_true_path_experiment$SubPath$toStringWith, _List_Nil, subpath);
};
var $folkertdev$one_true_path_experiment$Path$toString = A2(
	$elm$core$Basics$composeL,
	$elm$core$String$join(' '),
	$elm$core$List$map($folkertdev$one_true_path_experiment$SubPath$toString));
var $folkertdev$one_true_path_experiment$Path$element = F2(
	function (path, attributes) {
		return A2(
			$elm$svg$Svg$path,
			A2(
				$elm$core$List$cons,
				$elm$svg$Svg$Attributes$d(
					$folkertdev$one_true_path_experiment$Path$toString(path)),
				attributes),
			_List_Nil);
	});
var $avh4$elm_color$Color$toCssString = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	var roundTo = function (x) {
		return $elm$core$Basics$round(x * 1000) / 1000;
	};
	var pct = function (x) {
		return $elm$core$Basics$round(x * 10000) / 100;
	};
	return $elm$core$String$concat(
		_List_fromArray(
			[
				'rgba(',
				$elm$core$String$fromFloat(
				pct(r)),
				'%,',
				$elm$core$String$fromFloat(
				pct(g)),
				'%,',
				$elm$core$String$fromFloat(
				pct(b)),
				'%,',
				$elm$core$String$fromFloat(
				roundTo(a)),
				')'
			]));
};
var $elm_community$typed_svg$TypedSvg$TypesToStrings$paintToString = function (paint) {
	switch (paint.$) {
		case 0:
			var color = paint.a;
			return $avh4$elm_color$Color$toCssString(color);
		case 1:
			var string = paint.a;
			return $elm$core$String$concat(
				_List_fromArray(
					['url(#', string, ')']));
		case 2:
			return 'context-fill';
		case 3:
			return 'context-stroke';
		default:
			return 'none';
	}
};
var $elm_community$typed_svg$TypedSvg$Attributes$fill = A2(
	$elm$core$Basics$composeL,
	$elm_community$typed_svg$TypedSvg$Core$attribute('fill'),
	$elm_community$typed_svg$TypedSvg$TypesToStrings$paintToString);
var $elm_community$typed_svg$TypedSvg$Attributes$stroke = A2(
	$elm$core$Basics$composeL,
	$elm_community$typed_svg$TypedSvg$Core$attribute('stroke'),
	$elm_community$typed_svg$TypedSvg$TypesToStrings$paintToString);
var $avh4$elm_color$Color$white = A4($avh4$elm_color$Color$RgbaSpace, 255 / 255, 255 / 255, 255 / 255, 1.0);
var $author$project$Components$PieChart$pieSlice = F3(
	function (total, index, datum) {
		return A2(
			$folkertdev$one_true_path_experiment$Path$element,
			$gampleman$elm_visualization$Shape$arc(datum),
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Paint(
						A2(
							$elm$core$Maybe$withDefault,
							$avh4$elm_color$Color$white,
							A2(
								$elm$core$Array$get,
								index,
								$elm$core$Array$fromList(
									$author$project$Components$PieChart$colors(total)))))),
					$elm_community$typed_svg$TypedSvg$Attributes$stroke(
					$elm_community$typed_svg$TypedSvg$Types$Paint($avh4$elm_color$Color$white))
				]));
	});
var $elm_community$typed_svg$TypedSvg$style = $elm_community$typed_svg$TypedSvg$Core$node('style');
var $elm_community$typed_svg$TypedSvg$svg = $elm_community$typed_svg$TypedSvg$Core$node('svg');
var $elm_community$typed_svg$TypedSvg$Attributes$viewBox = F4(
	function (minX, minY, vWidth, vHeight) {
		return A2(
			$elm_community$typed_svg$TypedSvg$Core$attribute,
			'viewBox',
			A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					$elm$core$String$fromFloat,
					_List_fromArray(
						[minX, minY, vWidth, vHeight]))));
	});
var $author$project$Components$PieChart$view = function (model) {
	var pieData = A2(
		$gampleman$elm_visualization$Shape$pie,
		_Utils_update(
			$gampleman$elm_visualization$Shape$defaultPieConfig,
			{fV: $author$project$Components$PieChart$radius}),
		A2(
			$elm$core$List$map,
			$elm$core$Basics$toFloat,
			A2($elm$core$List$map, $elm$core$Tuple$second, model)));
	return A2(
		$elm_community$typed_svg$TypedSvg$svg,
		_List_fromArray(
			[
				A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Components$PieChart$w, $author$project$Components$PieChart$h)
			]),
		_List_fromArray(
			[
				A2(
				$elm_community$typed_svg$TypedSvg$style,
				_List_Nil,
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Core$text('.domain {display:none}\n        .tick line {display: none}\n        .tick text {fill: #7f8c8d}\n        text {fill: #ffffff; font-size: 8pt}\n        ')
					])),
				A2(
				$elm_community$typed_svg$TypedSvg$g,
				_List_fromArray(
					[
						$elm_community$typed_svg$TypedSvg$Attributes$transform(
						_List_fromArray(
							[
								A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$Components$PieChart$w / 2, $author$project$Components$PieChart$h / 2)
							]))
					]),
				_List_fromArray(
					[
						A2(
						$elm_community$typed_svg$TypedSvg$g,
						_List_Nil,
						A2(
							$elm$core$List$indexedMap,
							$author$project$Components$PieChart$pieSlice(
								$elm$core$List$length(model)),
							pieData)),
						A2(
						$elm_community$typed_svg$TypedSvg$g,
						_List_Nil,
						A3(
							$elm$core$List$map2,
							$author$project$Components$PieChart$pieLabel,
							pieData,
							A2(
								$elm$core$List$map,
								function (x) {
									return _Utils_Tuple2(x.a, x.b);
								},
								model)))
					]))
			]));
};
var $author$project$Components$PieChart$mainn = function (users) {
	return $author$project$Components$PieChart$view(
		A2(
			$elm$core$List$sortWith,
			F2(
				function (x, y) {
					return A2($elm$core$Basics$compare, x.b, y.b);
				}),
			A2(
				$elm$core$List$filter,
				function (x) {
					return x.b > 0;
				},
				users)));
};
var $author$project$Pages$Dashboard$viewContributorChart = function (model) {
	var foo = function () {
		var _v1 = model.cc;
		if (_v1.$ === 3) {
			var contributorInfo = _v1.a;
			return ' -- ' + ($elm$core$String$fromInt(
				A3(
					$elm$core$List$foldl,
					F2(
						function (a, b) {
							return a.b + b;
						}),
					0,
					contributorInfo)) + ' total contributions');
		} else {
			return '';
		}
	}();
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height(
				A2($mdgriffith$elm_ui$Element$minimum, 400, $mdgriffith$elm_ui$Element$shrink)),
				$mdgriffith$elm_ui$Element$padding($author$project$Pages$Dashboard$borderRadius)
			]),
		A2(
			$elm$core$List$cons,
			A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$bold,
						$mdgriffith$elm_ui$Element$Font$size(30)
					]),
				$mdgriffith$elm_ui$Element$text('contributors' + foo)),
			function () {
				var _v0 = model.cc;
				switch (_v0.$) {
					case 3:
						var contributors = _v0.a;
						return _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
									]),
								$mdgriffith$elm_ui$Element$html(
									$author$project$Components$PieChart$mainn(contributors)))
							]);
					case 2:
						var error = _v0.a;
						return _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_Nil,
								$mdgriffith$elm_ui$Element$text(
									$author$project$Api$errorToString(error)))
							]);
					default:
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text('Loading...')
							]);
				}
			}()));
};
var $mdgriffith$elm_ui$Internal$Model$AlignY = function (a) {
	return {$: 5, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$CenterY = 1;
var $mdgriffith$elm_ui$Element$centerY = $mdgriffith$elm_ui$Internal$Model$AlignY(1);
var $mdgriffith$elm_ui$Element$Font$italic = $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.h6);
var $author$project$Pages$Dashboard$viewCourseChart = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$padding($author$project$Pages$Dashboard$borderRadius)
			]),
		function () {
			var _v0 = model.c_;
			switch (_v0.$) {
				case 3:
					var courseStats = _v0.a;
					return $mdgriffith$elm_ui$Element$html(
						$author$project$Components$PieChart$mainn(courseStats));
				case 2:
					var e = _v0.a;
					return A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$centerX,
								$mdgriffith$elm_ui$Element$centerY,
								$mdgriffith$elm_ui$Element$Font$bold,
								$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$Colors$redColor),
								$mdgriffith$elm_ui$Element$Font$size(30)
							]),
						$mdgriffith$elm_ui$Element$text(
							'Error: ' + $author$project$Api$errorToString(e)));
				case 1:
					return A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$centerX,
								$mdgriffith$elm_ui$Element$centerY,
								$mdgriffith$elm_ui$Element$Font$bold,
								$mdgriffith$elm_ui$Element$Font$italic,
								$mdgriffith$elm_ui$Element$Font$size(30)
							]),
						$mdgriffith$elm_ui$Element$text('Loading...'));
				default:
					return $mdgriffith$elm_ui$Element$none;
			}
		}());
};
var $author$project$Pages$Dashboard$Add1Day = {$: 10};
var $author$project$Pages$Dashboard$CAFChangeDate = function (a) {
	return {$: 5, a: a};
};
var $author$project$Pages$Dashboard$CAFChangeTitle = function (a) {
	return {$: 4, a: a};
};
var $author$project$Pages$Dashboard$CreateAssignment = {$: 6};
var $author$project$Pages$Dashboard$SearchCourses = function (a) {
	return {$: 1, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Bottom = 2;
var $mdgriffith$elm_ui$Element$alignBottom = $mdgriffith$elm_ui$Internal$Model$AlignY(2);
var $mdgriffith$elm_ui$Internal$Model$Top = 0;
var $mdgriffith$elm_ui$Element$alignTop = $mdgriffith$elm_ui$Internal$Model$AlignY(0);
var $author$project$Styling$Colors$blueColor = A3($mdgriffith$elm_ui$Element$rgb255, 0, 168, 255);
var $mdgriffith$elm_ui$Internal$Model$Button = {$: 8};
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $mdgriffith$elm_ui$Element$Input$focusDefault = function (attrs) {
	return A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, attrs) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass('focusable');
};
var $mdgriffith$elm_ui$Element$Input$enter = 'Enter';
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $mdgriffith$elm_ui$Element$Input$onKey = F2(
	function (desiredCode, msg) {
		var decode = function (code) {
			return _Utils_eq(code, desiredCode) ? $elm$json$Json$Decode$succeed(msg) : $elm$json$Json$Decode$fail('Not the enter key');
		};
		var isKey = A2(
			$elm$json$Json$Decode$andThen,
			decode,
			A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
		return $mdgriffith$elm_ui$Internal$Model$Attr(
			A2(
				$elm$html$Html$Events$preventDefaultOn,
				'keyup',
				A2(
					$elm$json$Json$Decode$map,
					function (fired) {
						return _Utils_Tuple2(fired, true);
					},
					isKey)));
	});
var $mdgriffith$elm_ui$Element$Input$onEnter = function (msg) {
	return A2($mdgriffith$elm_ui$Element$Input$onKey, $mdgriffith$elm_ui$Element$Input$enter, msg);
};
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $mdgriffith$elm_ui$Element$Input$button = F2(
	function (attrs, _v0) {
		var onPress = _v0.ay;
		var label = _v0.h8;
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.cY + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.aS + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.iY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.fQ)))))),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$pointer,
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$Input$focusDefault(attrs),
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Button),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Internal$Model$Attr(
											$elm$html$Html$Attributes$tabindex(0)),
										function () {
											if (onPress.$ === 1) {
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Internal$Model$Attr(
														$elm$html$Html$Attributes$disabled(true)),
													attrs);
											} else {
												var msg = onPress.a;
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Element$Events$onClick(msg),
													A2(
														$elm$core$List$cons,
														$mdgriffith$elm_ui$Element$Input$onEnter(msg),
														attrs));
											}
										}()))))))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var $mdgriffith$elm_ui$Element$toRgb = function (_v0) {
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	var a = _v0.d;
	return {by: a, g4: b, hN: g, iJ: r};
};
var $author$project$Utils$Darken$darken = F2(
	function (original, factor) {
		var extracted = $mdgriffith$elm_ui$Element$toRgb(original);
		var g = extracted.hN;
		var r = extracted.iJ;
		var b = extracted.g4;
		return A3($mdgriffith$elm_ui$Element$rgb, r - factor, g - factor, b - factor);
	});
var $mdgriffith$elm_ui$Internal$Flag$borderStyle = $mdgriffith$elm_ui$Internal$Flag$flag(11);
var $mdgriffith$elm_ui$Element$Border$dotted = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$borderStyle, $mdgriffith$elm_ui$Internal$Style$classes.g8);
var $author$project$Pages$Dashboard$inputColor = A2($author$project$Utils$Darken$darken, $author$project$Styling$Colors$lighterGreyColor, -0.05);
var $author$project$Pages$Dashboard$inputTextColor = A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1);
var $mdgriffith$elm_ui$Internal$Model$Px = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Element$px = $mdgriffith$elm_ui$Internal$Model$Px;
var $author$project$Pages$Dashboard$inputStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Background$color($author$project$Pages$Dashboard$inputColor),
		$mdgriffith$elm_ui$Element$Border$width(0),
		$mdgriffith$elm_ui$Element$Border$rounded(10),
		$mdgriffith$elm_ui$Element$Font$color($author$project$Pages$Dashboard$inputTextColor),
		$mdgriffith$elm_ui$Element$alignTop,
		$mdgriffith$elm_ui$Element$height(
		$mdgriffith$elm_ui$Element$px(50))
	]);
var $mdgriffith$elm_ui$Element$Input$Above = 2;
var $mdgriffith$elm_ui$Element$Input$Label = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Element$Input$labelAbove = $mdgriffith$elm_ui$Element$Input$Label(2);
var $mdgriffith$elm_ui$Internal$Model$Hover = 1;
var $mdgriffith$elm_ui$Internal$Model$PseudoSelector = F2(
	function (a, b) {
		return {$: 11, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$hover = $mdgriffith$elm_ui$Internal$Flag$flag(33);
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $mdgriffith$elm_ui$Internal$Model$map = F2(
	function (fn, el) {
		switch (el.$) {
			case 1:
				var styled = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						hT: F2(
							function (add, context) {
								return A2(
									$elm$virtual_dom$VirtualDom$map,
									fn,
									A2(styled.hT, add, context));
							}),
						gq: styled.gq
					});
			case 0:
				var html = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A2(
						$elm$core$Basics$composeL,
						$elm$virtual_dom$VirtualDom$map(fn),
						html));
			case 2:
				var str = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Text(str);
			default:
				return $mdgriffith$elm_ui$Internal$Model$Empty;
		}
	});
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle = F2(
	function (fn, attr) {
		switch (attr.$) {
			case 0:
				return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
			case 2:
				var description = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Describe(description);
			case 6:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignX(x);
			case 5:
				var y = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignY(y);
			case 7:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Width(x);
			case 8:
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Height(x);
			case 3:
				var x = attr.a;
				var y = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Class, x, y);
			case 4:
				var flag = attr.a;
				var style = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$StyleClass, flag, style);
			case 9:
				var location = attr.a;
				var elem = attr.b;
				return A2(
					$mdgriffith$elm_ui$Internal$Model$Nearby,
					location,
					A2($mdgriffith$elm_ui$Internal$Model$map, fn, elem));
			case 1:
				var htmlAttr = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Attr(
					A2($elm$virtual_dom$VirtualDom$mapAttribute, fn, htmlAttr));
			default:
				var fl = attr.a;
				var trans = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$TransformComponent, fl, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$removeNever = function (style) {
	return A2($mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle, $elm$core$Basics$never, style);
};
var $mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper = F2(
	function (attr, _v0) {
		var styles = _v0.a;
		var trans = _v0.b;
		var _v1 = $mdgriffith$elm_ui$Internal$Model$removeNever(attr);
		switch (_v1.$) {
			case 4:
				var style = _v1.b;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, style, styles),
					trans);
			case 10:
				var flag = _v1.a;
				var component = _v1.b;
				return _Utils_Tuple2(
					styles,
					A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, trans, component));
			default:
				return _Utils_Tuple2(styles, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$unwrapDecorations = function (attrs) {
	var _v0 = A3(
		$elm$core$List$foldl,
		$mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper,
		_Utils_Tuple2(_List_Nil, $mdgriffith$elm_ui$Internal$Model$Untransformed),
		attrs);
	var styles = _v0.a;
	var transform = _v0.b;
	return A2(
		$elm$core$List$cons,
		$mdgriffith$elm_ui$Internal$Model$Transform(transform),
		styles);
};
var $mdgriffith$elm_ui$Element$mouseOver = function (decs) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$hover,
		A2(
			$mdgriffith$elm_ui$Internal$Model$PseudoSelector,
			1,
			$mdgriffith$elm_ui$Internal$Model$unwrapDecorations(decs)));
};
var $author$project$Utils$OnEnter$onEnter = function (msg) {
	return $mdgriffith$elm_ui$Element$htmlAttribute(
		A2(
			$elm$html$Html$Events$on,
			'keyup',
			A2(
				$elm$json$Json$Decode$andThen,
				function (key) {
					return (key === 'Enter') ? $elm$json$Json$Decode$succeed(msg) : $elm$json$Json$Decode$fail('Not the enter key');
				},
				A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string))));
};
var $mdgriffith$elm_ui$Element$Input$Placeholder = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$Input$placeholder = $mdgriffith$elm_ui$Element$Input$Placeholder;
var $mdgriffith$elm_ui$Element$Border$roundEach = function (_v0) {
	var topLeft = _v0.a5;
	var topRight = _v0.a6;
	var bottomLeft = _v0.aP;
	var bottomRight = _v0.aQ;
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderRound,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			'br-' + ($elm$core$String$fromInt(topLeft) + ('-' + ($elm$core$String$fromInt(topRight) + ($elm$core$String$fromInt(bottomLeft) + ('-' + $elm$core$String$fromInt(bottomRight)))))),
			'border-radius',
			$elm$core$String$fromInt(topLeft) + ('px ' + ($elm$core$String$fromInt(topRight) + ('px ' + ($elm$core$String$fromInt(bottomRight) + ('px ' + ($elm$core$String$fromInt(bottomLeft) + 'px'))))))));
};
var $author$project$Pages$Dashboard$viewCreateAssignmentFormError = function (error) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Font$bold,
				$mdgriffith$elm_ui$Element$Font$color(
				A2($author$project$Utils$Darken$darken, $author$project$Styling$Colors$redColor, 0.8))
			]),
		$mdgriffith$elm_ui$Element$text(error));
};
var $author$project$Pages$Dashboard$viewCreateAssignmentFormErrors = function (errors) {
	return $elm$core$List$isEmpty(errors) ? $mdgriffith$elm_ui$Element$text('') : A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$redColor),
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$Border$rounded(10),
				$mdgriffith$elm_ui$Element$padding(10),
				$mdgriffith$elm_ui$Element$spacing(5)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$bold,
						$mdgriffith$elm_ui$Element$Font$size(30),
						$mdgriffith$elm_ui$Element$Font$color(
						A2($author$project$Utils$Darken$darken, $author$project$Styling$Colors$redColor, 0.8))
					]),
				$mdgriffith$elm_ui$Element$text('Errors')),
				A2(
				$mdgriffith$elm_ui$Element$column,
				_List_Nil,
				A2($elm$core$List$map, $author$project$Pages$Dashboard$viewCreateAssignmentFormError, errors))
			]));
};
var $author$project$Styling$Colors$greenColor = A3($mdgriffith$elm_ui$Element$rgb255, 76, 209, 55);
var $author$project$Pages$Dashboard$viewCreateAssignmentFormStatus = function (data) {
	switch (data.$) {
		case 3:
			return A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$greenColor),
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$Border$rounded(10),
						A2($mdgriffith$elm_ui$Element$paddingXY, 10, 20),
						$mdgriffith$elm_ui$Element$spacing(5)
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$bold,
								$mdgriffith$elm_ui$Element$Font$size(20),
								$mdgriffith$elm_ui$Element$Font$color(
								A2($author$project$Utils$Darken$darken, $author$project$Styling$Colors$greenColor, 0.8))
							]),
						$mdgriffith$elm_ui$Element$text('Success 🎉'))
					]));
		case 2:
			return A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$redColor),
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$Border$rounded(10),
						A2($mdgriffith$elm_ui$Element$paddingXY, 10, 30),
						$mdgriffith$elm_ui$Element$spacing(5)
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$bold,
								$mdgriffith$elm_ui$Element$Font$size(30),
								$mdgriffith$elm_ui$Element$Font$color(
								A2($author$project$Utils$Darken$darken, $author$project$Styling$Colors$redColor, 0.8))
							]),
						$mdgriffith$elm_ui$Element$text('Error. Try again?'))
					]));
		default:
			return $mdgriffith$elm_ui$Element$none;
	}
};
var $mdgriffith$elm_ui$Element$Keyed$column = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.hm + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.cb)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Keyed(children));
	});
var $author$project$Pages$Dashboard$CAFSelectCourse = function (a) {
	return {$: 3, a: a};
};
var $author$project$Pages$Dashboard$viewSearchDropdownElement = F2(
	function (course, isLast) {
		return A2(
			$mdgriffith$elm_ui$Element$Input$button,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
				]),
			{
				h8: A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Background$color($author$project$Pages$Dashboard$inputColor),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$height(
							A2($mdgriffith$elm_ui$Element$minimum, 50, $mdgriffith$elm_ui$Element$shrink)),
							$mdgriffith$elm_ui$Element$padding(15),
							isLast ? $mdgriffith$elm_ui$Element$Border$roundEach(
							{aP: 10, aQ: 10, a5: 0, a6: 0}) : $mdgriffith$elm_ui$Element$Border$rounded(0),
							$mdgriffith$elm_ui$Element$mouseOver(
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Background$color(
									A2($author$project$Utils$Darken$darken, $author$project$Pages$Dashboard$inputColor, -0.05))
								])),
							$mdgriffith$elm_ui$Element$spacing(10)
						]),
					_List_fromArray(
						[
							course.hL ? A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Background$color(
									A3($mdgriffith$elm_ui$Element$rgb255, 249, 128, 18)),
									$mdgriffith$elm_ui$Element$Font$bold,
									$mdgriffith$elm_ui$Element$Font$color(
									A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
									$mdgriffith$elm_ui$Element$Border$rounded(5),
									$mdgriffith$elm_ui$Element$padding(5)
								]),
							$mdgriffith$elm_ui$Element$text('moodle')) : $mdgriffith$elm_ui$Element$none,
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Font$bold,
									$mdgriffith$elm_ui$Element$Font$color($author$project$Pages$Dashboard$inputTextColor),
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
								]),
							A2(
								$mdgriffith$elm_ui$Element$paragraph,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
									]),
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$text(course.ig)
									])))
						])),
				ay: $elm$core$Maybe$Just(
					$author$project$Pages$Dashboard$CAFSelectCourse(course))
			});
	});
var $author$project$Pages$Dashboard$courseToKeyValue = F2(
	function (last, course) {
		return _Utils_Tuple2(
			$elm$core$String$fromInt(course.hU),
			A2(
				$author$project$Pages$Dashboard$viewSearchDropdownElement,
				course,
				_Utils_eq(course.hU, last.hU)));
	});
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.r)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.r, tail);
		return (notAppended < 0) ? {
			s: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.s),
			p: builder.p + 1,
			r: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			s: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.s),
			p: builder.p + 1,
			r: $elm$core$Elm$JsArray$empty
		} : {s: builder.s, p: builder.p, r: appended});
	});
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (!node.$) {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						s: _List_Nil,
						p: 0,
						r: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (!_v0.$) {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (!_v0.$) {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $author$project$Pages$Dashboard$viewSearchDropdown = function (data) {
	switch (data.$) {
		case 3:
			var courses = data.a;
			var shortedCourses = $elm$core$Array$toList(
				A3(
					$elm$core$Array$slice,
					0,
					10,
					$elm$core$Array$fromList(courses)));
			var maybeLast = $elm$core$List$head(
				$elm$core$List$reverse(shortedCourses));
			if (!maybeLast.$) {
				var last = maybeLast.a;
				return A2(
					$mdgriffith$elm_ui$Element$Keyed$column,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$scrollbarY
						]),
					A2(
						$elm$core$List$map,
						$author$project$Pages$Dashboard$courseToKeyValue(last),
						shortedCourses));
			} else {
				return $mdgriffith$elm_ui$Element$none;
			}
		case 1:
			return $mdgriffith$elm_ui$Element$text('Loading...');
		case 2:
			var e = data.a;
			return $mdgriffith$elm_ui$Element$text(
				$author$project$Api$errorToString(e));
		default:
			return $mdgriffith$elm_ui$Element$none;
	}
};
var $mdgriffith$elm_ui$Element$Border$widthXY = F2(
	function (x, y) {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$borderWidth,
			A5(
				$mdgriffith$elm_ui$Internal$Model$BorderWidth,
				'b-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y))),
				y,
				x,
				y,
				x));
	});
var $mdgriffith$elm_ui$Element$Border$widthEach = function (_v0) {
	var bottom = _v0.b8;
	var top = _v0.cF;
	var left = _v0.cp;
	var right = _v0.cy;
	return (_Utils_eq(top, bottom) && _Utils_eq(left, right)) ? (_Utils_eq(top, right) ? $mdgriffith$elm_ui$Element$Border$width(top) : A2($mdgriffith$elm_ui$Element$Border$widthXY, left, top)) : A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + ($elm$core$String$fromInt(top) + ('-' + ($elm$core$String$fromInt(right) + ('-' + ($elm$core$String$fromInt(bottom) + ('-' + $elm$core$String$fromInt(left))))))),
			top,
			right,
			bottom,
			left));
};
var $author$project$Pages$Dashboard$viewCreateAssignmentForm = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$lighterGreyColor),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$fillPortion(1)),
				$mdgriffith$elm_ui$Element$Border$rounded($author$project$Pages$Dashboard$borderRadius),
				$mdgriffith$elm_ui$Element$padding(20),
				$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$Colors$darkGreyColor),
				$mdgriffith$elm_ui$Element$spacing(10)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$bold,
						$mdgriffith$elm_ui$Element$Font$size(30),
						$mdgriffith$elm_ui$Element$Font$color($author$project$Pages$Dashboard$inputTextColor)
					]),
				$mdgriffith$elm_ui$Element$text('Create Assignment')),
				$author$project$Pages$Dashboard$viewCreateAssignmentFormErrors(model.d),
				$author$project$Pages$Dashboard$viewCreateAssignmentFormStatus(model.c$),
				A2(
				function () {
					var _v0 = model.hw.hg;
					if (!_v0) {
						return $mdgriffith$elm_ui$Element$column;
					} else {
						return $mdgriffith$elm_ui$Element$row;
					}
				}(),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$spacing(10)
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
							]),
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$Input$text,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Background$color($author$project$Pages$Dashboard$inputColor),
										$mdgriffith$elm_ui$Element$Border$width(0),
										_Utils_eq(model.a2, $author$project$Api$NotAsked) ? $mdgriffith$elm_ui$Element$Border$rounded(10) : $mdgriffith$elm_ui$Element$Border$roundEach(
										{aP: 0, aQ: 0, a5: 10, a6: 10}),
										$mdgriffith$elm_ui$Element$Font$color(
										A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
										$mdgriffith$elm_ui$Element$height(
										$mdgriffith$elm_ui$Element$px(50))
									]),
								{
									h8: A2(
										$mdgriffith$elm_ui$Element$Input$labelAbove,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$Font$color(
												A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1))
											]),
										$mdgriffith$elm_ui$Element$text('search courses (required)')),
									dk: $author$project$Pages$Dashboard$SearchCourses,
									dp: $elm$core$Maybe$Just(
										A2(
											$mdgriffith$elm_ui$Element$Input$placeholder,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text('Emily Oliver: History'))),
									du: model.aC
								}),
								$author$project$Pages$Dashboard$viewSearchDropdown(model.a2)
							])),
						A2(
						$mdgriffith$elm_ui$Element$Input$text,
						A2(
							$elm$core$List$append,
							$author$project$Pages$Dashboard$inputStyle,
							_List_fromArray(
								[$mdgriffith$elm_ui$Element$alignTop])),
						{
							h8: A2(
								$mdgriffith$elm_ui$Element$Input$labelAbove,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Font$color(
										A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1))
									]),
								$mdgriffith$elm_ui$Element$text('title (required)')),
							dk: $author$project$Pages$Dashboard$CAFChangeTitle,
							dp: $elm$core$Maybe$Just(
								A2(
									$mdgriffith$elm_ui$Element$Input$placeholder,
									_List_Nil,
									$mdgriffith$elm_ui$Element$text('sb. page 105, 1-3a'))),
							du: model.a4
						})
					])),
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$Input$text,
						A2(
							$elm$core$List$append,
							$author$project$Pages$Dashboard$inputStyle,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Border$roundEach(
									{aP: 10, aQ: 0, a5: 10, a6: 0}),
									$author$project$Utils$OnEnter$onEnter($author$project$Pages$Dashboard$CreateAssignment)
								])),
						{
							h8: A2(
								$mdgriffith$elm_ui$Element$Input$labelAbove,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Font$color(
										A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1))
									]),
								$mdgriffith$elm_ui$Element$text(
									function () {
										var _v1 = model.aE;
										if (!_v1.$) {
											return 'due date (required) -- selected date ' + ($elm$core$String$fromInt(model.ba) + ' days from now.');
										} else {
											return 'due date (required)';
										}
									}())),
							dk: $author$project$Pages$Dashboard$CAFChangeDate,
							dp: $elm$core$Maybe$Just(
								A2(
									$mdgriffith$elm_ui$Element$Input$placeholder,
									_List_Nil,
									$mdgriffith$elm_ui$Element$text(
										$author$project$Pages$Dashboard$toGermanDateString(model.B)))),
							du: model.at
						}),
						A2(
						$mdgriffith$elm_ui$Element$el,
						A2(
							$elm$core$List$append,
							$author$project$Pages$Dashboard$inputStyle,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width(
									$mdgriffith$elm_ui$Element$px(50)),
									$mdgriffith$elm_ui$Element$height(
									$mdgriffith$elm_ui$Element$px(50)),
									$mdgriffith$elm_ui$Element$alignBottom,
									$mdgriffith$elm_ui$Element$Border$roundEach(
									{aP: 0, aQ: 10, a5: 0, a6: 10}),
									$mdgriffith$elm_ui$Element$Border$widthEach(
									{b8: 0, cp: 2, cy: 0, cF: 0}),
									$mdgriffith$elm_ui$Element$Border$dotted,
									$mdgriffith$elm_ui$Element$Border$color($author$project$Pages$Dashboard$inputTextColor),
									$mdgriffith$elm_ui$Element$mouseOver(
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Background$color(
											A2($author$project$Utils$Darken$darken, $author$project$Pages$Dashboard$inputColor, -0.05))
										])),
									$mdgriffith$elm_ui$Element$Events$onClick($author$project$Pages$Dashboard$Add1Day),
									$mdgriffith$elm_ui$Element$pointer
								])),
						A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$centerX,
									$mdgriffith$elm_ui$Element$centerY,
									$mdgriffith$elm_ui$Element$Font$size(30),
									$mdgriffith$elm_ui$Element$Font$bold,
									$mdgriffith$elm_ui$Element$htmlAttribute(
									$elm$html$Html$Attributes$class('button'))
								]),
							$mdgriffith$elm_ui$Element$text('+1')))
					])),
				((!$elm$core$List$isEmpty(model.d)) || ($elm$core$String$isEmpty(model.a4) || ($elm$core$String$isEmpty(model.aC) || $elm$core$String$isEmpty(model.at)))) ? A2(
				$mdgriffith$elm_ui$Element$Input$button,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height(
						$mdgriffith$elm_ui$Element$px(50)),
						$mdgriffith$elm_ui$Element$Background$color(
						A2($author$project$Utils$Darken$darken, $author$project$Pages$Dashboard$inputColor, -0.1)),
						$mdgriffith$elm_ui$Element$Font$color(
						A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
						$mdgriffith$elm_ui$Element$Font$bold,
						$mdgriffith$elm_ui$Element$Border$rounded(10),
						$mdgriffith$elm_ui$Element$padding(10)
					]),
				{
					h8: A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
						$mdgriffith$elm_ui$Element$text('Submit')),
					ay: $elm$core$Maybe$Nothing
				}) : A2(
				$mdgriffith$elm_ui$Element$Input$button,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height(
						$mdgriffith$elm_ui$Element$px(50)),
						$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$blueColor),
						$mdgriffith$elm_ui$Element$Font$color(
						A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
						$mdgriffith$elm_ui$Element$Font$bold,
						$mdgriffith$elm_ui$Element$Border$rounded(10),
						$mdgriffith$elm_ui$Element$padding(10)
					]),
				{
					h8: A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
						$mdgriffith$elm_ui$Element$text('Submit')),
					ay: $elm$core$Maybe$Just($author$project$Pages$Dashboard$CreateAssignment)
				})
			]));
};
var $justinmimbs$date$Date$Days = 3;
var $justinmimbs$date$Date$Months = 1;
var $justinmimbs$date$Date$add = F3(
	function (unit, n, _v0) {
		var rd = _v0;
		switch (unit) {
			case 0:
				return A3($justinmimbs$date$Date$add, 1, 12 * n, rd);
			case 1:
				var date = $justinmimbs$date$Date$toCalendarDate(rd);
				var wholeMonths = ((12 * (date.gI - 1)) + ($justinmimbs$date$Date$monthToNumber(date.fN) - 1)) + n;
				var m = $justinmimbs$date$Date$numberToMonth(
					A2($elm$core$Basics$modBy, 12, wholeMonths) + 1);
				var y = A2($justinmimbs$date$Date$floorDiv, wholeMonths, 12) + 1;
				return ($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A2(
					$elm$core$Basics$min,
					date.fa,
					A2($justinmimbs$date$Date$daysInMonth, y, m));
			case 2:
				return rd + (7 * n);
			default:
				return rd + n;
		}
	});
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var $mdgriffith$elm_ui$Element$link = F2(
	function (attrs, _v0) {
		var url = _v0.bv;
		var label = _v0.h8;
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$NodeName('a'),
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$Attr(
					$elm$html$Html$Attributes$href(url)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Internal$Model$Attr(
						$elm$html$Html$Attributes$rel('noopener noreferrer')),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.cY + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.aS + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.fJ)))),
								attrs))))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var $author$project$Pages$Dashboard$dueDateAfterDate = F2(
	function (dueDate, date) {
		return _Utils_cmp(
			$justinmimbs$date$Date$toRataDie(dueDate),
			$justinmimbs$date$Date$toRataDie(date)) > 0;
	});
var $author$project$Pages$Dashboard$otherOutstandingAssignments = F2(
	function (today, courses) {
		var validAssignments = A2(
			$elm$core$List$filter,
			function (assignment) {
				return A2(
					$author$project$Pages$Dashboard$dueDateAfterDate,
					assignment.hy,
					A3($justinmimbs$date$Date$add, 3, 2, today));
			},
			$elm$core$List$concat(
				A2(
					$elm$core$List$map,
					function (course) {
						return course.g_;
					},
					courses)));
		var validCourseIds = A2(
			$elm$core$List$map,
			function (assignment) {
				return assignment.ho;
			},
			validAssignments);
		return A2(
			$elm$core$List$map,
			function (course) {
				return _Utils_update(
					course,
					{
						g_: A2(
							$elm$core$List$filter,
							function (a) {
								return _Utils_eq(a.ho, course.hU);
							},
							validAssignments)
					});
			},
			A2(
				$elm$core$List$filter,
				function (course) {
					return A2($elm$core$List$member, course.hU, validCourseIds);
				},
				courses));
	});
var $mdgriffith$elm_ui$Element$Border$solid = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$borderStyle, $mdgriffith$elm_ui$Internal$Style$classes.g9);
var $author$project$Pages$Dashboard$ViewAssignmentModal = function (a) {
	return {$: 16, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Right = 2;
var $mdgriffith$elm_ui$Element$alignRight = $mdgriffith$elm_ui$Internal$Model$AlignX(2);
var $author$project$Pages$Dashboard$viewAssignment = F3(
	function (assignment, color, displayDate) {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Background$color(
					A2($author$project$Utils$Darken$darken, color, 0.1)),
					$mdgriffith$elm_ui$Element$padding(10),
					$mdgriffith$elm_ui$Element$Border$rounded(10),
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$pointer,
					$mdgriffith$elm_ui$Element$Events$onClick(
					$author$project$Pages$Dashboard$ViewAssignmentModal(assignment.hU)),
					$mdgriffith$elm_ui$Element$htmlAttribute(
					$elm$html$Html$Attributes$class('button'))
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_Nil,
					A2(
						$mdgriffith$elm_ui$Element$paragraph,
						_List_Nil,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text(
								_Utils_ap(
									displayDate ? ($author$project$Pages$Dashboard$toGermanDateString(assignment.hy) + ': ') : '',
									assignment.jt))
							]))),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[$mdgriffith$elm_ui$Element$alignRight, $mdgriffith$elm_ui$Element$Font$italic]),
					$mdgriffith$elm_ui$Element$text(assignment.gw.eS))
				]));
	});
var $author$project$Pages$Dashboard$assignmentToKeyValue = F3(
	function (color, displayDate, assignment) {
		return _Utils_Tuple2(
			assignment.hU,
			A3($author$project$Pages$Dashboard$viewAssignment, assignment, color, displayDate));
	});
var $author$project$Pages$Dashboard$viewAssignmentCourseGroup = F4(
	function (course, color, maybeDate, displayDate) {
		var assignments = function () {
			if (!maybeDate.$) {
				var date = maybeDate.a;
				return A2(
					$elm$core$List$filter,
					function (assignment) {
						return _Utils_eq(assignment.hy, date);
					},
					course.g_);
			} else {
				return course.g_;
			}
		}();
		return (!$elm$core$List$isEmpty(assignments)) ? A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Background$color(
					A2($author$project$Utils$Darken$darken, color, 0.05)),
					$mdgriffith$elm_ui$Element$padding(10),
					$mdgriffith$elm_ui$Element$spacing(10),
					$mdgriffith$elm_ui$Element$Border$rounded(10),
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[$mdgriffith$elm_ui$Element$Font$bold]),
					A2(
						$mdgriffith$elm_ui$Element$paragraph,
						_List_Nil,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text(course.ig)
							]))),
					A2(
					$mdgriffith$elm_ui$Element$Keyed$column,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$spacing(5),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
						]),
					A2(
						$elm$core$List$map,
						function (a) {
							return A3($author$project$Pages$Dashboard$assignmentToKeyValue, color, displayDate, a);
						},
						assignments))
				])) : $mdgriffith$elm_ui$Element$none;
	});
var $author$project$Pages$Dashboard$courseGroupToKeyValue = F4(
	function (color, date, displayDate, course) {
		return _Utils_Tuple2(
			$elm$core$String$fromInt(course.hU),
			A4($author$project$Pages$Dashboard$viewAssignmentCourseGroup, course, color, date, displayDate));
	});
var $author$project$Pages$Dashboard$filterCoursesByWhetherAssignmentsAreDueOnDate = F2(
	function (courses, date) {
		var validCourses = A2(
			$elm$core$List$map,
			function (idAssignmentTuple) {
				return idAssignmentTuple.a;
			},
			A2(
				$elm$core$List$filter,
				function (_v0) {
					return !$elm$core$List$isEmpty(
						A2(
							$elm$core$List$filter,
							function (assignment) {
								return _Utils_eq(assignment.hy, date);
							},
							$elm$core$List$concat(
								A2(
									$elm$core$List$map,
									function (course) {
										return course.g_;
									},
									courses))));
				},
				A2(
					$elm$core$List$map,
					function (course) {
						return _Utils_Tuple2(course.hU, course.g_);
					},
					courses)));
		return A2(
			$elm$core$List$filter,
			function (course) {
				return A2($elm$core$List$member, course.hU, validCourses);
			},
			courses);
	});
var $author$project$Pages$Dashboard$viewAssignmentsDayColumn = F4(
	function (courseData, title, color, date) {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Background$color(color),
					$mdgriffith$elm_ui$Element$height(
					A2($mdgriffith$elm_ui$Element$minimum, 200, $mdgriffith$elm_ui$Element$fill)),
					$mdgriffith$elm_ui$Element$Border$rounded($author$project$Pages$Dashboard$borderRadius),
					$mdgriffith$elm_ui$Element$padding(20),
					$mdgriffith$elm_ui$Element$width(
					$mdgriffith$elm_ui$Element$fillPortion(1)),
					$mdgriffith$elm_ui$Element$spacing(10)
				]),
			function () {
				switch (courseData.$) {
					case 3:
						var allCourses = courseData.a;
						var courses = A2($author$project$Pages$Dashboard$filterCoursesByWhetherAssignmentsAreDueOnDate, allCourses, date);
						var assignments = A2(
							$elm$core$List$filter,
							function (a) {
								return _Utils_eq(a.hy, date);
							},
							A3(
								$elm$core$List$foldl,
								$elm$core$Basics$append,
								_List_Nil,
								A2(
									$elm$core$List$map,
									function (c) {
										return c.g_;
									},
									courses)));
						return $elm$core$List$isEmpty(courses) ? _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[$mdgriffith$elm_ui$Element$Font$bold]),
								$mdgriffith$elm_ui$Element$text(
									title + ('{' + ($elm$core$String$fromInt(
										$elm$core$List$length(assignments)) + '}')))),
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$centerX,
										$mdgriffith$elm_ui$Element$centerY,
										$mdgriffith$elm_ui$Element$Font$size(30),
										$mdgriffith$elm_ui$Element$Font$bold
									]),
								$mdgriffith$elm_ui$Element$text('*nothing 🎉*'))
							]) : _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[$mdgriffith$elm_ui$Element$Font$bold]),
								$mdgriffith$elm_ui$Element$text(
									title + ('{' + ($elm$core$String$fromInt(
										$elm$core$List$length(assignments)) + '}')))),
								A2(
								$mdgriffith$elm_ui$Element$Keyed$column,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
										$mdgriffith$elm_ui$Element$spacing(5)
									]),
								A2(
									$elm$core$List$map,
									A3(
										$author$project$Pages$Dashboard$courseGroupToKeyValue,
										color,
										$elm$core$Maybe$Just(date),
										false),
									courses))
							]);
					case 2:
						var e = courseData.a;
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Element$text(
								$author$project$Api$errorToString(e))
							]);
					case 1:
						return _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$centerX,
										$mdgriffith$elm_ui$Element$centerY,
										$mdgriffith$elm_ui$Element$Font$size(30),
										$mdgriffith$elm_ui$Element$Font$bold
									]),
								$mdgriffith$elm_ui$Element$text('Loading...'))
							]);
					default:
						return _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$centerX,
										$mdgriffith$elm_ui$Element$centerY,
										$mdgriffith$elm_ui$Element$Font$size(30),
										$mdgriffith$elm_ui$Element$Font$bold
									]),
								$mdgriffith$elm_ui$Element$text('Loading...'))
							]);
				}
			}());
	});
var $author$project$Styling$Colors$greyBlueColor = A3($mdgriffith$elm_ui$Element$rgb255, 72, 126, 176);
var $author$project$Pages$Dashboard$viewOtherAssignments = F2(
	function (apiData, date) {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$Border$rounded($author$project$Pages$Dashboard$borderRadius),
					$mdgriffith$elm_ui$Element$spacing(10),
					$mdgriffith$elm_ui$Element$padding(20),
					$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$greyBlueColor)
				]),
			function () {
				switch (apiData.$) {
					case 3:
						var data = apiData.a;
						var courses = A2($author$project$Pages$Dashboard$otherOutstandingAssignments, date, data);
						var assignments = A3(
							$elm$core$List$foldr,
							$elm$core$Basics$append,
							_List_Nil,
							A2(
								$elm$core$List$map,
								function (c) {
									return c.g_;
								},
								courses));
						return $elm$core$List$isEmpty(courses) ? _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[$mdgriffith$elm_ui$Element$Font$bold]),
								$mdgriffith$elm_ui$Element$text(
									'other' + ('{' + ($elm$core$String$fromInt(
										$elm$core$List$length(assignments)) + '}'))))
							]) : _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[$mdgriffith$elm_ui$Element$Font$bold]),
								$mdgriffith$elm_ui$Element$text(
									'other' + ('{' + ($elm$core$String$fromInt(
										$elm$core$List$length(assignments)) + '}')))),
								A2(
								$mdgriffith$elm_ui$Element$Keyed$column,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
										$mdgriffith$elm_ui$Element$spacing(5)
									]),
								A2(
									$elm$core$List$map,
									A3($author$project$Pages$Dashboard$courseGroupToKeyValue, $author$project$Styling$Colors$greyBlueColor, $elm$core$Maybe$Nothing, true),
									courses))
							]);
					case 1:
						return _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$centerX,
										$mdgriffith$elm_ui$Element$centerY,
										$mdgriffith$elm_ui$Element$Font$size(30),
										$mdgriffith$elm_ui$Element$Font$bold
									]),
								$mdgriffith$elm_ui$Element$text('Loading...'))
							]);
					default:
						return _List_fromArray(
							[$mdgriffith$elm_ui$Element$none]);
				}
			}());
	});
var $author$project$Styling$Colors$yellowColor = A3($mdgriffith$elm_ui$Element$rgb255, 251, 197, 49);
var $author$project$Pages$Dashboard$viewOustandingAssignments = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$spacing(30),
				$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$lighterGreyColor),
				$mdgriffith$elm_ui$Element$padding(30),
				$mdgriffith$elm_ui$Element$Border$rounded($author$project$Pages$Dashboard$borderRadius),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				A2(
				function () {
					var _v0 = model.hw.hg;
					if (_v0 === 2) {
						return $mdgriffith$elm_ui$Element$row;
					} else {
						return $mdgriffith$elm_ui$Element$column;
					}
				}(),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height(
						A2($mdgriffith$elm_ui$Element$minimum, 400, $mdgriffith$elm_ui$Element$shrink)),
						$mdgriffith$elm_ui$Element$spacing(30)
					]),
				function () {
					var _v1 = model.gw;
					if (!_v1.$) {
						var user = _v1.a;
						return (user.$8 !== '') ? _List_fromArray(
							[
								A4($author$project$Pages$Dashboard$viewAssignmentsDayColumn, model.y, 'today', $author$project$Styling$Colors$redColor, model.B),
								A4(
								$author$project$Pages$Dashboard$viewAssignmentsDayColumn,
								model.y,
								'tomorrow',
								$author$project$Styling$Colors$yellowColor,
								A3($justinmimbs$date$Date$add, 3, 1, model.B)),
								A4(
								$author$project$Pages$Dashboard$viewAssignmentsDayColumn,
								model.y,
								'the day after tomorrow',
								$author$project$Styling$Colors$greenColor,
								A3($justinmimbs$date$Date$add, 3, 2, model.B))
							]) : _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$column,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
										$mdgriffith$elm_ui$Element$spacing(20)
									]),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Element$paragraph,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$centerX,
												$mdgriffith$elm_ui$Element$centerY,
												$mdgriffith$elm_ui$Element$Font$bold,
												$mdgriffith$elm_ui$Element$Font$size(30),
												$mdgriffith$elm_ui$Element$Font$center
											]),
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$text('you actually need to link your moodle account in order to use this service lol :)')
											])),
										A2(
										$mdgriffith$elm_ui$Element$link,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$centerX,
												$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$greenColor),
												A2($mdgriffith$elm_ui$Element$paddingXY, 40, 20),
												$mdgriffith$elm_ui$Element$Border$rounded(10),
												$mdgriffith$elm_ui$Element$mouseOver(
												_List_fromArray(
													[
														$mdgriffith$elm_ui$Element$Background$color(
														A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
														$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$Colors$greenColor)
													])),
												$mdgriffith$elm_ui$Element$Border$solid,
												$mdgriffith$elm_ui$Element$Border$width(3),
												$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$Colors$greenColor)
											]),
										{
											h8: A2(
												$mdgriffith$elm_ui$Element$el,
												_List_fromArray(
													[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY, $mdgriffith$elm_ui$Element$Font$bold]),
												$mdgriffith$elm_ui$Element$text('do that')),
											bv: $author$project$Spa$Generated$Route$toString(6)
										})
									]))
							]);
					} else {
						return _List_fromArray(
							[$mdgriffith$elm_ui$Element$none]);
					}
				}()),
				function () {
				var _v2 = model.y;
				if (_v2.$ === 3) {
					var courses = _v2.a;
					return ($elm$core$List$length(
						A2($author$project$Pages$Dashboard$otherOutstandingAssignments, model.B, courses)) > 0) ? A2($author$project$Pages$Dashboard$viewOtherAssignments, model.y, model.B) : $mdgriffith$elm_ui$Element$none;
				} else {
					return $mdgriffith$elm_ui$Element$none;
				}
			}()
			]));
};
var $author$project$Components$Sidebar$borderRadius = 20;
var $author$project$Components$Sidebar$viewLink = F2(
	function (linkData, active) {
		return A2(
			$mdgriffith$elm_ui$Element$link,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Font$bold,
					$mdgriffith$elm_ui$Element$mouseOver(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Background$color(
							A2($author$project$Utils$Darken$darken, $author$project$Styling$Colors$darkGreyColor, -0.1))
						])),
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height(
					$mdgriffith$elm_ui$Element$px(50)),
					$mdgriffith$elm_ui$Element$Border$rounded(10),
					$mdgriffith$elm_ui$Element$padding(10)
				]),
			{
				h8: A2(
					$mdgriffith$elm_ui$Element$el,
					active ? _List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$Colors$blueColor)
						]) : _List_Nil,
					$mdgriffith$elm_ui$Element$text(linkData.a)),
				bv: $author$project$Spa$Generated$Route$toString(linkData.b)
			});
	});
var $author$project$Components$Sidebar$viewLinks = F2(
	function (links, maybeActive) {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
				]),
			function () {
				if (!maybeActive.$) {
					var active = maybeActive.a;
					return A2(
						$elm$core$List$map,
						function (link) {
							return A2(
								$author$project$Components$Sidebar$viewLink,
								link,
								_Utils_eq(link.a, active));
						},
						links);
				} else {
					return A2(
						$elm$core$List$map,
						function (link) {
							return A2($author$project$Components$Sidebar$viewLink, link, false);
						},
						links);
				}
			}());
	});
var $mdgriffith$elm_ui$Element$Font$semiBold = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontWeight, $mdgriffith$elm_ui$Internal$Style$classes.jp);
var $author$project$Components$Sidebar$viewUserComponent = function (user) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$spacing(10)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$size(30),
						$mdgriffith$elm_ui$Element$Font$semiBold,
						$mdgriffith$elm_ui$Element$Font$color(
						A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
						$mdgriffith$elm_ui$Element$Font$center
					]),
				($elm$core$String$length(user.eS) > 12) ? $mdgriffith$elm_ui$Element$text(
					'Hey, ' + (A3($elm$core$String$slice, 0, 12, user.eS) + '...')) : $mdgriffith$elm_ui$Element$text('Hey, ' + user.eS)),
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_Nil,
				function () {
					var _v0 = user.f3;
					if (_v0 === 1) {
						return $mdgriffith$elm_ui$Element$text('Administrator');
					} else {
						return $mdgriffith$elm_ui$Element$none;
					}
				}())
			]));
};
var $author$project$Components$Sidebar$viewUser = function (maybeUser) {
	if (!maybeUser.$) {
		var user = maybeUser.a;
		return $author$project$Components$Sidebar$viewUserComponent(user);
	} else {
		return $mdgriffith$elm_ui$Element$none;
	}
};
var $author$project$Components$Sidebar$viewSidebar = function (model) {
	var links = _Utils_ap(
		_List_fromArray(
			[
				_Utils_Tuple2('dashboard', 1),
				_Utils_Tuple2('moodle integration', 6)
			]),
		function () {
			var _v1 = model.gw;
			if (!_v1.$) {
				var user = _v1.a;
				var _v2 = user.f3;
				if (_v2 === 1) {
					return _List_fromArray(
						[
							_Utils_Tuple2('admin', 5)
						]);
				} else {
					return _List_Nil;
				}
			} else {
				return _List_Nil;
			}
		}());
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width(
				function () {
					var _v0 = model.hw.hg;
					if (_v0 === 2) {
						return A2(
							$mdgriffith$elm_ui$Element$minimum,
							300,
							$mdgriffith$elm_ui$Element$fillPortion(1));
					} else {
						return $mdgriffith$elm_ui$Element$fill;
					}
				}()),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$lighterGreyColor),
				$mdgriffith$elm_ui$Element$padding(40),
				$mdgriffith$elm_ui$Element$Border$rounded($author$project$Components$Sidebar$borderRadius)
			]),
		_List_fromArray(
			[
				$author$project$Components$Sidebar$viewUser(model.gw),
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						A2($mdgriffith$elm_ui$Element$paddingXY, 0, 50)
					]),
				A2($author$project$Components$Sidebar$viewLinks, links, model.gL))
			]));
};
var $author$project$Pages$Dashboard$ChangeTimeRange = function (a) {
	return {$: 14, a: a};
};
var $author$project$Pages$Dashboard$ChangeTimeRangeDirection = function (a) {
	return {$: 15, a: a};
};
var $author$project$Components$LineChart$Past = 1;
var $author$project$Components$LineChart$epochStartOffset = 719162;
var $author$project$Components$LineChart$dateToPosixTime = function (date) {
	return $elm$time$Time$millisToPosix(
		(($justinmimbs$date$Date$toRataDie(date) - $author$project$Components$LineChart$epochStartOffset) * (((1000 * 60) * 60) * 24)) - (((1000 * 60) * 60) * 24));
};
var $author$project$Components$LineChart$oneDayInMillis = 86400 * 1000;
var $author$project$Components$LineChart$generateDayTuples = F5(
	function (current, last, todayMillis, maxDays, direction) {
		generateDayTuples:
		while (true) {
			var offset = function () {
				if (direction === 1) {
					return -1;
				} else {
					return 1;
				}
			}();
			if (_Utils_cmp(
				$elm$core$List$length(current),
				maxDays) < 0) {
				var $temp$current = A2(
					$elm$core$List$append,
					current,
					_List_fromArray(
						[
							_Utils_Tuple2(
							$elm$time$Time$millisToPosix(todayMillis + ((last - offset) * $author$project$Components$LineChart$oneDayInMillis)),
							0)
						])),
					$temp$last = last + offset,
					$temp$todayMillis = todayMillis,
					$temp$maxDays = maxDays,
					$temp$direction = direction;
				current = $temp$current;
				last = $temp$last;
				todayMillis = $temp$todayMillis;
				maxDays = $temp$maxDays;
				direction = $temp$direction;
				continue generateDayTuples;
			} else {
				return current;
			}
		}
	});
var $author$project$Components$LineChart$processData = F4(
	function (assignments, today, maxDays, direction) {
		var dayTuples = A5(
			$author$project$Components$LineChart$generateDayTuples,
			_List_Nil,
			0,
			$elm$time$Time$posixToMillis(
				$author$project$Components$LineChart$dateToPosixTime(today)),
			maxDays,
			direction);
		return A2(
			$elm$core$List$map,
			function (x) {
				return _Utils_Tuple2(
					x.a,
					$elm$core$List$length(
						A2(
							$elm$core$List$filter,
							function (a) {
								return _Utils_eq(
									$author$project$Components$LineChart$dateToPosixTime(a.hy),
									x.a);
							},
							assignments)));
			},
			dayTuples);
	});
var $elm_community$typed_svg$TypedSvg$Types$PaintNone = {$: 4};
var $gampleman$elm_visualization$Shape$Generators$area = F2(
	function (curve, data) {
		var makeShape = F2(
			function (topline, bottomline) {
				return A2(
					$folkertdev$one_true_path_experiment$SubPath$connect,
					curve(bottomline),
					curve(topline));
			});
		var makeCurves = F3(
			function (acc, datum, _v3) {
				var prev = _v3.a;
				var list = _v3.b;
				var _v0 = _Utils_Tuple3(prev, datum, list);
				if (_v0.b.$ === 1) {
					var _v1 = _v0.b;
					var l = _v0.c;
					return _Utils_Tuple2(false, l);
				} else {
					if (!_v0.a) {
						var point = _v0.b.a;
						var l = _v0.c;
						return _Utils_Tuple2(
							true,
							A2(
								$elm$core$List$cons,
								_List_fromArray(
									[
										acc(point)
									]),
								l));
					} else {
						if (_v0.c.b) {
							var p1 = _v0.b.a;
							var _v2 = _v0.c;
							var ps = _v2.a;
							var l = _v2.b;
							return _Utils_Tuple2(
								true,
								A2(
									$elm$core$List$cons,
									A2(
										$elm$core$List$cons,
										acc(p1),
										ps),
									l));
						} else {
							var p1 = _v0.b.a;
							var l = _v0.c;
							return _Utils_Tuple2(
								true,
								A2(
									$elm$core$List$cons,
									_List_fromArray(
										[
											acc(p1)
										]),
									l));
						}
					}
				}
			});
		var topLineData = A3(
			$elm$core$List$foldr,
			makeCurves($elm$core$Tuple$first),
			_Utils_Tuple2(false, _List_Nil),
			data).b;
		var bottomLineData = A2(
			$elm$core$List$map,
			$elm$core$List$reverse,
			A3(
				$elm$core$List$foldr,
				makeCurves($elm$core$Tuple$second),
				_Utils_Tuple2(false, _List_Nil),
				data).b);
		var shapes = A3($elm$core$List$map2, makeShape, topLineData, bottomLineData);
		return A3($elm$core$List$map2, makeShape, topLineData, bottomLineData);
	});
var $gampleman$elm_visualization$Shape$area = $gampleman$elm_visualization$Shape$Generators$area;
var $folkertdev$one_true_path_experiment$Curve$linear = function (points) {
	if (!points.b) {
		return $folkertdev$one_true_path_experiment$SubPath$empty;
	} else {
		var x = points.a;
		var xs = points.b;
		return A2(
			$folkertdev$one_true_path_experiment$SubPath$with,
			$folkertdev$one_true_path_experiment$LowLevel$Command$moveTo(x),
			_List_fromArray(
				[
					$folkertdev$one_true_path_experiment$LowLevel$Command$lineTo(xs)
				]));
	}
};
var $gampleman$elm_visualization$Shape$linearCurve = $folkertdev$one_true_path_experiment$Curve$linear;
var $gampleman$elm_visualization$Scale$convert = F2(
	function (_v0, value) {
		var scale = _v0;
		return A3(scale.P, scale.dM, scale.D, value);
	});
var $gampleman$elm_visualization$Scale$rangeExtent = function (_v0) {
	var options = _v0;
	return A2(options.bR, options.dM, options.D);
};
var $author$project$Components$LineChart$padding = 30;
var $gampleman$elm_visualization$Scale$Scale = $elm$core$Basics$identity;
var $gampleman$elm_visualization$Scale$Internal$bimap = F4(
	function (_v0, _v1, deinterpolate, reinterpolate) {
		var d0 = _v0.a;
		var d1 = _v0.b;
		var r0 = _v1.a;
		var r1 = _v1.b;
		var _v2 = (_Utils_cmp(d1, d0) < 0) ? _Utils_Tuple2(
			A2(deinterpolate, d1, d0),
			A2(reinterpolate, r1, r0)) : _Utils_Tuple2(
			A2(deinterpolate, d0, d1),
			A2(reinterpolate, r0, r1));
		var de = _v2.a;
		var re = _v2.b;
		return A2($elm$core$Basics$composeL, re, de);
	});
var $gampleman$elm_visualization$Scale$Linear$deinterpolate = F3(
	function (a, b, x) {
		var normalizedB = b - a;
		return (!normalizedB) ? 0 : ((x - a) / normalizedB);
	});
var $gampleman$elm_visualization$Scale$Time$deinterpolate = $gampleman$elm_visualization$Scale$Linear$deinterpolate;
var $gampleman$elm_visualization$Scale$Internal$interpolateFloat = F3(
	function (from, to, time) {
		return from + ((to - from) * time);
	});
var $gampleman$elm_visualization$Scale$Time$toTime = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	return _Utils_Tuple2(
		$elm$time$Time$posixToMillis(a),
		$elm$time$Time$posixToMillis(b));
};
var $gampleman$elm_visualization$Scale$Time$convert = F2(
	function (domain, range) {
		return A4(
			$gampleman$elm_visualization$Scale$Internal$bimap,
			$gampleman$elm_visualization$Scale$Time$toTime(domain),
			range,
			F3(
				function (d, r, v) {
					return A3(
						$gampleman$elm_visualization$Scale$Time$deinterpolate,
						d,
						r,
						$elm$time$Time$posixToMillis(v));
				}),
			$gampleman$elm_visualization$Scale$Internal$interpolateFloat);
	});
var $gampleman$elm_visualization$Scale$Time$interpolate = F2(
	function (a, b) {
		return A2($gampleman$elm_visualization$Scale$Internal$interpolateFloat, a, b);
	});
var $gampleman$elm_visualization$Scale$Time$invert = F2(
	function (domain, range) {
		return A4(
			$gampleman$elm_visualization$Scale$Internal$bimap,
			range,
			$gampleman$elm_visualization$Scale$Time$toTime(domain),
			$gampleman$elm_visualization$Scale$Time$deinterpolate,
			F3(
				function (d, r, v) {
					return $elm$time$Time$millisToPosix(
						$elm$core$Basics$round(
							A3($gampleman$elm_visualization$Scale$Time$interpolate, d, r, v)));
				}));
	});
var $justinmimbs$time_extra$Time$Extra$Day = 11;
var $justinmimbs$time_extra$Time$Extra$Millisecond = 15;
var $justinmimbs$time_extra$Time$Extra$Month = 2;
var $justinmimbs$time_extra$Time$Extra$dateToMillis = function (date) {
	var daysSinceEpoch = $justinmimbs$date$Date$toRataDie(date) - 719163;
	return daysSinceEpoch * 86400000;
};
var $justinmimbs$time_extra$Time$Extra$timeFromClock = F4(
	function (hour, minute, second, millisecond) {
		return (((hour * 3600000) + (minute * 60000)) + (second * 1000)) + millisecond;
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $elm$time$Time$toMillis = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			1000,
			$elm$time$Time$posixToMillis(time));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $justinmimbs$time_extra$Time$Extra$timeFromPosix = F2(
	function (zone, posix) {
		return A4(
			$justinmimbs$time_extra$Time$Extra$timeFromClock,
			A2($elm$time$Time$toHour, zone, posix),
			A2($elm$time$Time$toMinute, zone, posix),
			A2($elm$time$Time$toSecond, zone, posix),
			A2($elm$time$Time$toMillis, zone, posix));
	});
var $justinmimbs$time_extra$Time$Extra$toOffset = F2(
	function (zone, posix) {
		var millis = $elm$time$Time$posixToMillis(posix);
		var localMillis = $justinmimbs$time_extra$Time$Extra$dateToMillis(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix);
		return ((localMillis - millis) / 60000) | 0;
	});
var $justinmimbs$time_extra$Time$Extra$posixFromDateTime = F3(
	function (zone, date, time) {
		var millis = $justinmimbs$time_extra$Time$Extra$dateToMillis(date) + time;
		var offset0 = A2(
			$justinmimbs$time_extra$Time$Extra$toOffset,
			zone,
			$elm$time$Time$millisToPosix(millis));
		var posix1 = $elm$time$Time$millisToPosix(millis - (offset0 * 60000));
		var offset1 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix1);
		if (_Utils_eq(offset0, offset1)) {
			return posix1;
		} else {
			var posix2 = $elm$time$Time$millisToPosix(millis - (offset1 * 60000));
			var offset2 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix2);
			return _Utils_eq(offset1, offset2) ? posix2 : posix1;
		}
	});
var $justinmimbs$time_extra$Time$Extra$add = F4(
	function (interval, n, zone, posix) {
		add:
		while (true) {
			switch (interval) {
				case 15:
					return $elm$time$Time$millisToPosix(
						$elm$time$Time$posixToMillis(posix) + n);
				case 14:
					var $temp$interval = 15,
						$temp$n = n * 1000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 13:
					var $temp$interval = 15,
						$temp$n = n * 60000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 12:
					var $temp$interval = 15,
						$temp$n = n * 3600000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 11:
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							3,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 2:
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							1,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 0:
					var $temp$interval = 2,
						$temp$n = n * 12,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 1:
					var $temp$interval = 2,
						$temp$n = n * 3,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 3:
					var $temp$interval = 11,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				default:
					var weekday = interval;
					var $temp$interval = 11,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
			}
		}
	});
var $justinmimbs$date$Date$Day = 11;
var $justinmimbs$date$Date$Friday = 8;
var $justinmimbs$date$Date$Monday = 4;
var $justinmimbs$date$Date$Month = 2;
var $justinmimbs$date$Date$Quarter = 1;
var $justinmimbs$date$Date$Saturday = 9;
var $justinmimbs$date$Date$Sunday = 10;
var $justinmimbs$date$Date$Thursday = 7;
var $justinmimbs$date$Date$Tuesday = 5;
var $justinmimbs$date$Date$Wednesday = 6;
var $justinmimbs$date$Date$Week = 3;
var $justinmimbs$date$Date$Year = 0;
var $justinmimbs$date$Date$weekdayToNumber = function (wd) {
	switch (wd) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		default:
			return 7;
	}
};
var $justinmimbs$date$Date$daysSincePreviousWeekday = F2(
	function (wd, date) {
		return A2(
			$elm$core$Basics$modBy,
			7,
			($justinmimbs$date$Date$weekdayNumber(date) + 7) - $justinmimbs$date$Date$weekdayToNumber(wd));
	});
var $justinmimbs$date$Date$firstOfMonth = F2(
	function (y, m) {
		return ($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + 1;
	});
var $justinmimbs$date$Date$firstOfYear = function (y) {
	return $justinmimbs$date$Date$daysBeforeYear(y) + 1;
};
var $justinmimbs$date$Date$quarterToMonth = function (q) {
	return $justinmimbs$date$Date$numberToMonth((q * 3) - 2);
};
var $justinmimbs$date$Date$floor = F2(
	function (interval, date) {
		var rd = date;
		switch (interval) {
			case 0:
				return $justinmimbs$date$Date$firstOfYear(
					$justinmimbs$date$Date$year(date));
			case 1:
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$quarterToMonth(
						$justinmimbs$date$Date$quarter(date)));
			case 2:
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$month(date));
			case 3:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 0, date);
			case 4:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 0, date);
			case 5:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 1, date);
			case 6:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 2, date);
			case 7:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 3, date);
			case 8:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 4, date);
			case 9:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 5, date);
			case 10:
				return rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, 6, date);
			default:
				return date;
		}
	});
var $justinmimbs$time_extra$Time$Extra$floorDate = F3(
	function (dateInterval, zone, posix) {
		return A3(
			$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
			zone,
			A2(
				$justinmimbs$date$Date$floor,
				dateInterval,
				A2($justinmimbs$date$Date$fromPosix, zone, posix)),
			0);
	});
var $justinmimbs$time_extra$Time$Extra$floor = F3(
	function (interval, zone, posix) {
		switch (interval) {
			case 15:
				return posix;
			case 14:
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						A2($elm$time$Time$toSecond, zone, posix),
						0));
			case 13:
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						0,
						0));
			case 12:
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						0,
						0,
						0));
			case 11:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 11, zone, posix);
			case 2:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 2, zone, posix);
			case 0:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 0, zone, posix);
			case 1:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 1, zone, posix);
			case 3:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 3, zone, posix);
			case 4:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 4, zone, posix);
			case 5:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 5, zone, posix);
			case 6:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 6, zone, posix);
			case 7:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 7, zone, posix);
			case 8:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 8, zone, posix);
			case 9:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 9, zone, posix);
			default:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, 10, zone, posix);
		}
	});
var $justinmimbs$time_extra$Time$Extra$ceiling = F3(
	function (interval, zone, posix) {
		var floored = A3($justinmimbs$time_extra$Time$Extra$floor, interval, zone, posix);
		return _Utils_eq(floored, posix) ? posix : A4($justinmimbs$time_extra$Time$Extra$add, interval, 1, zone, floored);
	});
var $justinmimbs$time_extra$Time$Extra$Year = 0;
var $gampleman$elm_visualization$Scale$Time$timeLength = function (interval) {
	switch (interval) {
		case 15:
			return 1;
		case 14:
			return 1000;
		case 13:
			return 60 * 1000;
		case 12:
			return (60 * 60) * 1000;
		case 11:
			return ((24 * 60) * 60) * 1000;
		case 2:
			return (((30 * 24) * 60) * 60) * 1000;
		case 0:
			return ((((365 * 30) * 24) * 60) * 60) * 1000;
		case 1:
			return ((((4 * 30) * 24) * 60) * 60) * 1000;
		case 3:
			return (((7 * 24) * 60) * 60) * 1000;
		default:
			return 0;
	}
};
var $gampleman$elm_visualization$Scale$Time$findInterval = F2(
	function (target, intervals) {
		findInterval:
		while (true) {
			if (!intervals.b) {
				return _Utils_Tuple2(0, 1);
			} else {
				if (intervals.b.b) {
					var _v1 = intervals.a;
					var interval = _v1.a;
					var step = _v1.b;
					var _v2 = intervals.b;
					var _v3 = _v2.a;
					var interval_ = _v3.a;
					var step_ = _v3.b;
					var xs = _v2.b;
					var ratio_ = (step_ * $gampleman$elm_visualization$Scale$Time$timeLength(interval_)) / target;
					var ratio = target / (step * $gampleman$elm_visualization$Scale$Time$timeLength(interval));
					if (_Utils_cmp(ratio, ratio_) < 0) {
						return _Utils_Tuple2(interval, step);
					} else {
						var $temp$target = target,
							$temp$intervals = A2(
							$elm$core$List$cons,
							_Utils_Tuple2(interval_, step_),
							xs);
						target = $temp$target;
						intervals = $temp$intervals;
						continue findInterval;
					}
				} else {
					var x = intervals.a;
					var xs = intervals.b;
					return x;
				}
			}
		}
	});
var $justinmimbs$time_extra$Time$Extra$Hour = 12;
var $justinmimbs$time_extra$Time$Extra$Minute = 13;
var $justinmimbs$time_extra$Time$Extra$Second = 14;
var $justinmimbs$time_extra$Time$Extra$Week = 3;
var $gampleman$elm_visualization$Scale$Time$tickIntervals = _List_fromArray(
	[
		_Utils_Tuple2(14, 1),
		_Utils_Tuple2(14, 5),
		_Utils_Tuple2(14, 15),
		_Utils_Tuple2(14, 30),
		_Utils_Tuple2(13, 1),
		_Utils_Tuple2(13, 5),
		_Utils_Tuple2(13, 15),
		_Utils_Tuple2(13, 30),
		_Utils_Tuple2(12, 1),
		_Utils_Tuple2(12, 3),
		_Utils_Tuple2(12, 6),
		_Utils_Tuple2(12, 12),
		_Utils_Tuple2(11, 1),
		_Utils_Tuple2(11, 2),
		_Utils_Tuple2(3, 1),
		_Utils_Tuple2(2, 1),
		_Utils_Tuple2(2, 3),
		_Utils_Tuple2(0, 1)
	]);
var $gampleman$elm_visualization$Scale$Time$nice = F3(
	function (zone, domain, count) {
		var _v0 = $gampleman$elm_visualization$Scale$Time$toTime(domain);
		var start = _v0.a;
		var end = _v0.b;
		var target = $elm$core$Basics$abs(start - end) / count;
		var _v1 = A2($gampleman$elm_visualization$Scale$Time$findInterval, target, $gampleman$elm_visualization$Scale$Time$tickIntervals);
		var interval = _v1.a;
		return _Utils_Tuple2(
			A3($justinmimbs$time_extra$Time$Extra$floor, interval, zone, domain.a),
			A3($justinmimbs$time_extra$Time$Extra$ceiling, interval, zone, domain.b));
	});
var $gampleman$elm_visualization$Scale$Time$rangeExtent = F2(
	function (d, r) {
		return r;
	});
var $ryannhg$date_format$DateFormat$AmPmLowercase = {$: 23};
var $ryannhg$date_format$DateFormat$amPmLowercase = $ryannhg$date_format$DateFormat$AmPmLowercase;
var $ryannhg$date_format$DateFormat$DayOfMonthFixed = {$: 7};
var $ryannhg$date_format$DateFormat$dayOfMonthFixed = $ryannhg$date_format$DateFormat$DayOfMonthFixed;
var $ryannhg$date_format$DateFormat$Language$Language = F6(
	function (toMonthName, toMonthAbbreviation, toWeekdayName, toWeekdayAbbreviation, toAmPm, toOrdinalSuffix) {
		return {ju: toAmPm, jv: toMonthAbbreviation, jw: toMonthName, b_: toOrdinalSuffix, jz: toWeekdayAbbreviation, jA: toWeekdayName};
	});
var $ryannhg$date_format$DateFormat$Language$toEnglishAmPm = function (hour) {
	return (hour > 11) ? 'pm' : 'am';
};
var $ryannhg$date_format$DateFormat$Language$toEnglishMonthName = function (month) {
	switch (month) {
		case 0:
			return 'January';
		case 1:
			return 'February';
		case 2:
			return 'March';
		case 3:
			return 'April';
		case 4:
			return 'May';
		case 5:
			return 'June';
		case 6:
			return 'July';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'October';
		case 10:
			return 'November';
		default:
			return 'December';
	}
};
var $ryannhg$date_format$DateFormat$Language$toEnglishSuffix = function (num) {
	var _v0 = A2($elm$core$Basics$modBy, 100, num);
	switch (_v0) {
		case 11:
			return 'th';
		case 12:
			return 'th';
		case 13:
			return 'th';
		default:
			var _v1 = A2($elm$core$Basics$modBy, 10, num);
			switch (_v1) {
				case 1:
					return 'st';
				case 2:
					return 'nd';
				case 3:
					return 'rd';
				default:
					return 'th';
			}
	}
};
var $ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName = function (weekday) {
	switch (weekday) {
		case 0:
			return 'Monday';
		case 1:
			return 'Tuesday';
		case 2:
			return 'Wednesday';
		case 3:
			return 'Thursday';
		case 4:
			return 'Friday';
		case 5:
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var $ryannhg$date_format$DateFormat$Language$english = A6(
	$ryannhg$date_format$DateFormat$Language$Language,
	$ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
	A2(
		$elm$core$Basics$composeR,
		$ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
		$elm$core$String$left(3)),
	$ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
	A2(
		$elm$core$Basics$composeR,
		$ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
		$elm$core$String$left(3)),
	$ryannhg$date_format$DateFormat$Language$toEnglishAmPm,
	$ryannhg$date_format$DateFormat$Language$toEnglishSuffix);
var $ryannhg$date_format$DateFormat$amPm = F3(
	function (language, zone, posix) {
		return language.ju(
			A2($elm$time$Time$toHour, zone, posix));
	});
var $ryannhg$date_format$DateFormat$dayOfMonth = $elm$time$Time$toDay;
var $ryannhg$date_format$DateFormat$days = _List_fromArray(
	[6, 0, 1, 2, 3, 4, 5]);
var $elm$time$Time$toWeekday = F2(
	function (zone, time) {
		var _v0 = A2(
			$elm$core$Basics$modBy,
			7,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60 * 24));
		switch (_v0) {
			case 0:
				return 3;
			case 1:
				return 4;
			case 2:
				return 5;
			case 3:
				return 6;
			case 4:
				return 0;
			case 5:
				return 1;
			default:
				return 2;
		}
	});
var $ryannhg$date_format$DateFormat$dayOfWeek = F2(
	function (zone, posix) {
		return function (_v1) {
			var i = _v1.a;
			return i;
		}(
			A2(
				$elm$core$Maybe$withDefault,
				_Utils_Tuple2(0, 6),
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (_v0) {
							var day = _v0.b;
							return _Utils_eq(
								day,
								A2($elm$time$Time$toWeekday, zone, posix));
						},
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (i, day) {
									return _Utils_Tuple2(i, day);
								}),
							$ryannhg$date_format$DateFormat$days)))));
	});
var $ryannhg$date_format$DateFormat$isLeapYear = function (year_) {
	return (!(!A2($elm$core$Basics$modBy, 4, year_))) ? false : ((!(!A2($elm$core$Basics$modBy, 100, year_))) ? true : ((!(!A2($elm$core$Basics$modBy, 400, year_))) ? false : true));
};
var $ryannhg$date_format$DateFormat$daysInMonth = F2(
	function (year_, month) {
		switch (month) {
			case 0:
				return 31;
			case 1:
				return $ryannhg$date_format$DateFormat$isLeapYear(year_) ? 29 : 28;
			case 2:
				return 31;
			case 3:
				return 30;
			case 4:
				return 31;
			case 5:
				return 30;
			case 6:
				return 31;
			case 7:
				return 31;
			case 8:
				return 30;
			case 9:
				return 31;
			case 10:
				return 30;
			default:
				return 31;
		}
	});
var $ryannhg$date_format$DateFormat$months = _List_fromArray(
	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
var $ryannhg$date_format$DateFormat$monthPair = F2(
	function (zone, posix) {
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, 0),
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (_v0) {
						var i = _v0.a;
						var m = _v0.b;
						return _Utils_eq(
							m,
							A2($elm$time$Time$toMonth, zone, posix));
					},
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (a, b) {
								return _Utils_Tuple2(a, b);
							}),
						$ryannhg$date_format$DateFormat$months))));
	});
var $ryannhg$date_format$DateFormat$monthNumber_ = F2(
	function (zone, posix) {
		return 1 + function (_v0) {
			var i = _v0.a;
			var m = _v0.b;
			return i;
		}(
			A2($ryannhg$date_format$DateFormat$monthPair, zone, posix));
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $ryannhg$date_format$DateFormat$dayOfYear = F2(
	function (zone, posix) {
		var monthsBeforeThisOne = A2(
			$elm$core$List$take,
			A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix) - 1,
			$ryannhg$date_format$DateFormat$months);
		var daysBeforeThisMonth = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				$ryannhg$date_format$DateFormat$daysInMonth(
					A2($elm$time$Time$toYear, zone, posix)),
				monthsBeforeThisOne));
		return daysBeforeThisMonth + A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix);
	});
var $ryannhg$date_format$DateFormat$quarter = F2(
	function (zone, posix) {
		return (A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix) / 4) | 0;
	});
var $ryannhg$date_format$DateFormat$toFixedLength = F2(
	function (totalChars, num) {
		var numStr = $elm$core$String$fromInt(num);
		var numZerosNeeded = totalChars - $elm$core$String$length(numStr);
		var zeros = A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				function (_v0) {
					return '0';
				},
				A2($elm$core$List$range, 1, numZerosNeeded)));
		return _Utils_ap(zeros, numStr);
	});
var $ryannhg$date_format$DateFormat$toNonMilitary = function (num) {
	return (!num) ? 12 : ((num <= 12) ? num : (num - 12));
};
var $elm$core$String$toUpper = _String_toUpper;
var $ryannhg$date_format$DateFormat$millisecondsPerYear = $elm$core$Basics$round((((1000 * 60) * 60) * 24) * 365.25);
var $ryannhg$date_format$DateFormat$firstDayOfYear = F2(
	function (zone, time) {
		return $elm$time$Time$millisToPosix(
			$ryannhg$date_format$DateFormat$millisecondsPerYear * A2($elm$time$Time$toYear, zone, time));
	});
var $ryannhg$date_format$DateFormat$weekOfYear = F2(
	function (zone, posix) {
		var firstDay = A2($ryannhg$date_format$DateFormat$firstDayOfYear, zone, posix);
		var firstDayOffset = A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, firstDay);
		var daysSoFar = A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix);
		return (((daysSoFar + firstDayOffset) / 7) | 0) + 1;
	});
var $ryannhg$date_format$DateFormat$year = F2(
	function (zone, time) {
		return $elm$core$String$fromInt(
			A2($elm$time$Time$toYear, zone, time));
	});
var $ryannhg$date_format$DateFormat$piece = F4(
	function (language, zone, posix, token) {
		switch (token.$) {
			case 0:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 1:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.b_(num));
				}(
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 2:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 3:
				return language.jv(
					A2($elm$time$Time$toMonth, zone, posix));
			case 4:
				return language.jw(
					A2($elm$time$Time$toMonth, zone, posix));
			case 17:
				return $elm$core$String$fromInt(
					1 + A2($ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 18:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.b_(num));
				}(
					1 + A2($ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 5:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 6:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.b_(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 7:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 8:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 9:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.b_(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 10:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 11:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 12:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.b_(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 13:
				return language.jz(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 14:
				return language.jA(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 19:
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 20:
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.b_(num));
				}(
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 21:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 15:
				return A2(
					$elm$core$String$right,
					2,
					A2($ryannhg$date_format$DateFormat$year, zone, posix));
			case 16:
				return A2($ryannhg$date_format$DateFormat$year, zone, posix);
			case 22:
				return $elm$core$String$toUpper(
					A3($ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 23:
				return $elm$core$String$toLower(
					A3($ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 24:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toHour, zone, posix));
			case 25:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toHour, zone, posix));
			case 26:
				return $elm$core$String$fromInt(
					$ryannhg$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 27:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					$ryannhg$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 28:
				return $elm$core$String$fromInt(
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 29:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 30:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMinute, zone, posix));
			case 31:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toMinute, zone, posix));
			case 32:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toSecond, zone, posix));
			case 33:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toSecond, zone, posix));
			case 34:
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMillis, zone, posix));
			case 35:
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2($elm$time$Time$toMillis, zone, posix));
			default:
				var string = token.a;
				return string;
		}
	});
var $ryannhg$date_format$DateFormat$formatWithLanguage = F4(
	function (language, tokens, zone, time) {
		return A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				A3($ryannhg$date_format$DateFormat$piece, language, zone, time),
				tokens));
	});
var $ryannhg$date_format$DateFormat$format = $ryannhg$date_format$DateFormat$formatWithLanguage($ryannhg$date_format$DateFormat$Language$english);
var $ryannhg$date_format$DateFormat$HourFixed = {$: 27};
var $ryannhg$date_format$DateFormat$hourFixed = $ryannhg$date_format$DateFormat$HourFixed;
var $ryannhg$date_format$DateFormat$MillisecondFixed = {$: 35};
var $ryannhg$date_format$DateFormat$millisecondFixed = $ryannhg$date_format$DateFormat$MillisecondFixed;
var $ryannhg$date_format$DateFormat$MinuteFixed = {$: 31};
var $ryannhg$date_format$DateFormat$minuteFixed = $ryannhg$date_format$DateFormat$MinuteFixed;
var $ryannhg$date_format$DateFormat$MonthNameAbbreviated = {$: 3};
var $ryannhg$date_format$DateFormat$monthNameAbbreviated = $ryannhg$date_format$DateFormat$MonthNameAbbreviated;
var $ryannhg$date_format$DateFormat$MonthNameFull = {$: 4};
var $ryannhg$date_format$DateFormat$monthNameFull = $ryannhg$date_format$DateFormat$MonthNameFull;
var $ryannhg$date_format$DateFormat$SecondFixed = {$: 33};
var $ryannhg$date_format$DateFormat$secondFixed = $ryannhg$date_format$DateFormat$SecondFixed;
var $ryannhg$date_format$DateFormat$Text = function (a) {
	return {$: 36, a: a};
};
var $ryannhg$date_format$DateFormat$text = $ryannhg$date_format$DateFormat$Text;
var $ryannhg$date_format$DateFormat$YearNumber = {$: 16};
var $ryannhg$date_format$DateFormat$yearNumber = $ryannhg$date_format$DateFormat$YearNumber;
var $gampleman$elm_visualization$Scale$Time$tickFormat = F4(
	function (zone, _v0, _v1, date) {
		var time = $elm$time$Time$posixToMillis(date);
		var significant = function (interval) {
			return _Utils_cmp(
				$elm$time$Time$posixToMillis(
					A3($justinmimbs$time_extra$Time$Extra$floor, interval, zone, date)),
				time) < 0;
		};
		var format = significant(14) ? _List_fromArray(
			[
				$ryannhg$date_format$DateFormat$text('.'),
				$ryannhg$date_format$DateFormat$millisecondFixed
			]) : (significant(13) ? _List_fromArray(
			[
				$ryannhg$date_format$DateFormat$text(':'),
				$ryannhg$date_format$DateFormat$secondFixed
			]) : (significant(12) ? _List_fromArray(
			[
				$ryannhg$date_format$DateFormat$hourFixed,
				$ryannhg$date_format$DateFormat$text(':'),
				$ryannhg$date_format$DateFormat$minuteFixed
			]) : (significant(11) ? _List_fromArray(
			[
				$ryannhg$date_format$DateFormat$hourFixed,
				$ryannhg$date_format$DateFormat$text(' '),
				$ryannhg$date_format$DateFormat$amPmLowercase
			]) : (significant(2) ? _List_fromArray(
			[
				$ryannhg$date_format$DateFormat$dayOfMonthFixed,
				$ryannhg$date_format$DateFormat$text(' '),
				$ryannhg$date_format$DateFormat$monthNameAbbreviated
			]) : (significant(0) ? _List_fromArray(
			[$ryannhg$date_format$DateFormat$monthNameFull]) : _List_fromArray(
			[$ryannhg$date_format$DateFormat$yearNumber]))))));
		return A3($ryannhg$date_format$DateFormat$format, format, zone, date);
	});
var $justinmimbs$time_extra$Time$Extra$rangeHelp = F6(
	function (interval, step, zone, until, revList, current) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(
				$elm$time$Time$posixToMillis(current),
				$elm$time$Time$posixToMillis(until)) < 0) {
				var $temp$interval = interval,
					$temp$step = step,
					$temp$zone = zone,
					$temp$until = until,
					$temp$revList = A2($elm$core$List$cons, current, revList),
					$temp$current = A4($justinmimbs$time_extra$Time$Extra$add, interval, step, zone, current);
				interval = $temp$interval;
				step = $temp$step;
				zone = $temp$zone;
				until = $temp$until;
				revList = $temp$revList;
				current = $temp$current;
				continue rangeHelp;
			} else {
				return $elm$core$List$reverse(revList);
			}
		}
	});
var $justinmimbs$time_extra$Time$Extra$range = F5(
	function (interval, step, zone, start, until) {
		return A6(
			$justinmimbs$time_extra$Time$Extra$rangeHelp,
			interval,
			A2($elm$core$Basics$max, 1, step),
			zone,
			until,
			_List_Nil,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, interval, zone, start));
	});
var $gampleman$elm_visualization$Scale$Time$ticks = F3(
	function (zone, domain, count) {
		var _v0 = $gampleman$elm_visualization$Scale$Time$toTime(domain);
		var start = _v0.a;
		var end = _v0.b;
		var target = $elm$core$Basics$abs(start - end) / count;
		var _v1 = A2($gampleman$elm_visualization$Scale$Time$findInterval, target, $gampleman$elm_visualization$Scale$Time$tickIntervals);
		var interval = _v1.a;
		var step = _v1.b;
		return A5(
			$justinmimbs$time_extra$Time$Extra$range,
			interval,
			$elm$core$Basics$round(step),
			zone,
			domain.a,
			domain.b);
	});
var $gampleman$elm_visualization$Scale$time = F3(
	function (zone, range_, domain_) {
		return {
			P: $gampleman$elm_visualization$Scale$Time$convert,
			dM: domain_,
			c9: $gampleman$elm_visualization$Scale$Time$invert,
			ct: $gampleman$elm_visualization$Scale$Time$nice(zone),
			D: range_,
			bR: $gampleman$elm_visualization$Scale$Time$rangeExtent,
			eM: $gampleman$elm_visualization$Scale$Time$tickFormat(zone),
			eN: $gampleman$elm_visualization$Scale$Time$ticks(zone)
		};
	});
var $author$project$Components$LineChart$w = 500;
var $author$project$Components$LineChart$xScale = function (model) {
	var onlyTimes = A2(
		$elm$core$List$map,
		function (x) {
			return $elm$time$Time$posixToMillis(x.a);
		},
		model);
	var _v0 = $elm$core$List$minimum(onlyTimes);
	if (!_v0.$) {
		var min = _v0.a;
		var _v1 = $elm$core$List$maximum(onlyTimes);
		if (!_v1.$) {
			var max = _v1.a;
			return A3(
				$gampleman$elm_visualization$Scale$time,
				$elm$time$Time$utc,
				_Utils_Tuple2(0, $author$project$Components$LineChart$w - (2 * $author$project$Components$LineChart$padding)),
				_Utils_Tuple2(
					$elm$time$Time$millisToPosix(min),
					$elm$time$Time$millisToPosix(max)));
		} else {
			return A3(
				$gampleman$elm_visualization$Scale$time,
				$elm$time$Time$utc,
				_Utils_Tuple2(0, $author$project$Components$LineChart$w - (2 * $author$project$Components$LineChart$padding)),
				_Utils_Tuple2(
					$elm$time$Time$millisToPosix(0),
					$elm$time$Time$millisToPosix(0)));
		}
	} else {
		return A3(
			$gampleman$elm_visualization$Scale$time,
			$elm$time$Time$utc,
			_Utils_Tuple2(0, $author$project$Components$LineChart$w - (2 * $author$project$Components$LineChart$padding)),
			_Utils_Tuple2(
				$elm$time$Time$millisToPosix(0),
				$elm$time$Time$millisToPosix(0)));
	}
};
var $author$project$Components$LineChart$h = 200;
var $gampleman$elm_visualization$Scale$Linear$convert = F2(
	function (domain, range) {
		return A4($gampleman$elm_visualization$Scale$Internal$bimap, domain, range, $gampleman$elm_visualization$Scale$Linear$deinterpolate, $gampleman$elm_visualization$Scale$Internal$interpolateFloat);
	});
var $gampleman$elm_visualization$Scale$Linear$interpolate = $gampleman$elm_visualization$Scale$Internal$interpolateFloat;
var $gampleman$elm_visualization$Scale$Linear$invert = F2(
	function (domain, range) {
		return A4($gampleman$elm_visualization$Scale$Internal$bimap, range, domain, $gampleman$elm_visualization$Scale$Linear$deinterpolate, $gampleman$elm_visualization$Scale$Linear$interpolate);
	});
var $elm$core$Basics$e = _Basics_e;
var $gampleman$elm_visualization$Statistics$tickStep = F3(
	function (start, stop, count) {
		var step0 = $elm$core$Basics$abs(stop - start) / A2($elm$core$Basics$max, 0, count);
		var step1 = A2(
			$elm$core$Basics$pow,
			10,
			$elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Basics$e, step0) / A2($elm$core$Basics$logBase, $elm$core$Basics$e, 10)));
		var error = step0 / step1;
		var step2 = (_Utils_cmp(
			error,
			$elm$core$Basics$sqrt(50)) > -1) ? (step1 * 10) : ((_Utils_cmp(
			error,
			$elm$core$Basics$sqrt(10)) > -1) ? (step1 * 5) : ((_Utils_cmp(
			error,
			$elm$core$Basics$sqrt(2)) > -1) ? (step1 * 2) : step1));
		return (_Utils_cmp(stop, start) < 0) ? (-step2) : step2;
	});
var $gampleman$elm_visualization$Scale$Linear$nice = F2(
	function (_v0, count) {
		var start = _v0.a;
		var stop = _v0.b;
		var step0 = A3($gampleman$elm_visualization$Statistics$tickStep, start, stop, count);
		var step1 = A3(
			$gampleman$elm_visualization$Statistics$tickStep,
			$elm$core$Basics$floor(start / step0) * step0,
			$elm$core$Basics$ceiling(stop / step0) * step0,
			count);
		return _Utils_Tuple2(
			$elm$core$Basics$floor(start / step1) * step1,
			$elm$core$Basics$ceiling(stop / step1) * step1);
	});
var $gampleman$elm_visualization$Scale$Linear$rangeExtent = F2(
	function (d, r) {
		return r;
	});
var $gampleman$elm_visualization$Scale$Linear$exponent = function (x) {
	return (!x) ? 0 : ((x < 1) ? (1 + $gampleman$elm_visualization$Scale$Linear$exponent(x * 10)) : 0);
};
var $gampleman$elm_visualization$Scale$Linear$precisionFixed = function (step) {
	return A2(
		$elm$core$Basics$max,
		0,
		$gampleman$elm_visualization$Scale$Linear$exponent(
			$elm$core$Basics$abs(step)));
};
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $gampleman$elm_visualization$Scale$Internal$toFixed = F2(
	function (precision, value) {
		var power = A2($elm$core$Basics$pow, 10, precision);
		var pad = function (num) {
			_v0$2:
			while (true) {
				if (num.b) {
					if (num.b.b) {
						if (!num.b.b.b) {
							var x = num.a;
							var _v1 = num.b;
							var y = _v1.a;
							return _List_fromArray(
								[
									x,
									A3($elm$core$String$padRight, precision, '0', y)
								]);
						} else {
							break _v0$2;
						}
					} else {
						var val = num.a;
						return (precision > 0) ? _List_fromArray(
							[
								val,
								A3($elm$core$String$padRight, precision, '0', '')
							]) : _List_fromArray(
							[val]);
					}
				} else {
					break _v0$2;
				}
			}
			var val = num;
			return val;
		};
		return A2(
			$elm$core$String$join,
			'.',
			pad(
				A2(
					$elm$core$String$split,
					'.',
					$elm$core$String$fromFloat(
						$elm$core$Basics$round(value * power) / power))));
	});
var $gampleman$elm_visualization$Scale$Linear$tickFormat = F2(
	function (_v0, count) {
		var start = _v0.a;
		var stop = _v0.b;
		return $gampleman$elm_visualization$Scale$Internal$toFixed(
			$gampleman$elm_visualization$Scale$Linear$precisionFixed(
				A3($gampleman$elm_visualization$Statistics$tickStep, start, stop, count)));
	});
var $gampleman$elm_visualization$Statistics$range = F3(
	function (start, stop, step) {
		var n = A2(
			$elm$core$Basics$max,
			0,
			0 | $elm$core$Basics$ceiling((stop - start) / step));
		var helper = F2(
			function (i, list) {
				return (i >= 0) ? A2(
					helper,
					i - 1,
					A2($elm$core$List$cons, start + (step * i), list)) : list;
			});
		return A2(helper, n - 1, _List_Nil);
	});
var $gampleman$elm_visualization$Statistics$ticks = F3(
	function (start, stop, count) {
		var step = A3($gampleman$elm_visualization$Statistics$tickStep, start, stop, count);
		var end = ($elm$core$Basics$floor(stop / step) * step) + (step / 2);
		var beg = $elm$core$Basics$ceiling(start / step) * step;
		return A3($gampleman$elm_visualization$Statistics$range, beg, end, step);
	});
var $gampleman$elm_visualization$Scale$Linear$ticks = F2(
	function (_v0, count) {
		var start = _v0.a;
		var end = _v0.b;
		return A3($gampleman$elm_visualization$Statistics$ticks, start, end, count);
	});
var $gampleman$elm_visualization$Scale$linear = F2(
	function (range_, domain_) {
		return {P: $gampleman$elm_visualization$Scale$Linear$convert, dM: domain_, c9: $gampleman$elm_visualization$Scale$Linear$invert, ct: $gampleman$elm_visualization$Scale$Linear$nice, D: range_, bR: $gampleman$elm_visualization$Scale$Linear$rangeExtent, eM: $gampleman$elm_visualization$Scale$Linear$tickFormat, eN: $gampleman$elm_visualization$Scale$Linear$ticks};
	});
var $author$project$Components$LineChart$yScale = A2(
	$gampleman$elm_visualization$Scale$linear,
	_Utils_Tuple2($author$project$Components$LineChart$h - (2 * $author$project$Components$LineChart$padding), 0),
	_Utils_Tuple2(0, 10));
var $author$project$Components$LineChart$tranfromToAreaData = F2(
	function (model, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(
				_Utils_Tuple2(
					A2(
						$gampleman$elm_visualization$Scale$convert,
						$author$project$Components$LineChart$xScale(model),
						x),
					$gampleman$elm_visualization$Scale$rangeExtent($author$project$Components$LineChart$yScale).a),
				_Utils_Tuple2(
					A2(
						$gampleman$elm_visualization$Scale$convert,
						$author$project$Components$LineChart$xScale(model),
						x),
					A2($gampleman$elm_visualization$Scale$convert, $author$project$Components$LineChart$yScale, y))));
	});
var $author$project$Components$LineChart$area = function (model) {
	return A2(
		$gampleman$elm_visualization$Shape$area,
		$gampleman$elm_visualization$Shape$linearCurve,
		A2(
			$elm$core$List$map,
			function (x) {
				return A2($author$project$Components$LineChart$tranfromToAreaData, model, x);
			},
			model));
};
var $elm_community$typed_svg$TypedSvg$line = $elm_community$typed_svg$TypedSvg$Core$node('line');
var $elm_community$typed_svg$TypedSvg$Types$Px = function (a) {
	return {$: 9, a: a};
};
var $elm_community$typed_svg$TypedSvg$Types$px = $elm_community$typed_svg$TypedSvg$Types$Px;
var $elm_community$typed_svg$TypedSvg$Attributes$x1 = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'x1',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(position));
};
var $elm_community$typed_svg$TypedSvg$Attributes$InPx$x1 = function (value) {
	return $elm_community$typed_svg$TypedSvg$Attributes$x1(
		$elm_community$typed_svg$TypedSvg$Types$px(value));
};
var $elm_community$typed_svg$TypedSvg$Attributes$x2 = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'x2',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(position));
};
var $elm_community$typed_svg$TypedSvg$Attributes$InPx$x2 = function (value) {
	return $elm_community$typed_svg$TypedSvg$Attributes$x2(
		$elm_community$typed_svg$TypedSvg$Types$px(value));
};
var $elm_community$typed_svg$TypedSvg$Attributes$y1 = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'y1',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(position));
};
var $elm_community$typed_svg$TypedSvg$Attributes$InPx$y1 = function (value) {
	return $elm_community$typed_svg$TypedSvg$Attributes$y1(
		$elm_community$typed_svg$TypedSvg$Types$px(value));
};
var $elm_community$typed_svg$TypedSvg$Attributes$y2 = function (position) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'y2',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(position));
};
var $elm_community$typed_svg$TypedSvg$Attributes$InPx$y2 = function (value) {
	return $elm_community$typed_svg$TypedSvg$Attributes$y2(
		$elm_community$typed_svg$TypedSvg$Types$px(value));
};
var $author$project$Components$LineChart$backgroundLine = F3(
	function (min, max, yHeight) {
		return A2(
			$elm_community$typed_svg$TypedSvg$line,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$InPx$x1(min),
					$elm_community$typed_svg$TypedSvg$Attributes$InPx$y1(yHeight),
					$elm_community$typed_svg$TypedSvg$Attributes$InPx$x2(max),
					$elm_community$typed_svg$TypedSvg$Attributes$InPx$y2(yHeight),
					$elm_community$typed_svg$TypedSvg$Attributes$stroke(
					$elm_community$typed_svg$TypedSvg$Types$Paint(
						A3($avh4$elm_color$Color$rgb255, 127, 140, 141)))
				]),
			_List_Nil);
	});
var $author$project$Components$LineChart$backgroundLines = F4(
	function (model, min, max, ticksY) {
		return A2(
			$elm$core$List$map,
			function (y) {
				return A3(
					$author$project$Components$LineChart$backgroundLine,
					A2(
						$gampleman$elm_visualization$Scale$convert,
						$author$project$Components$LineChart$xScale(model),
						min),
					A2(
						$gampleman$elm_visualization$Scale$convert,
						$author$project$Components$LineChart$xScale(model),
						max),
					A2($gampleman$elm_visualization$Scale$convert, $author$project$Components$LineChart$yScale, y));
			},
			ticksY);
	});
var $elm_community$typed_svg$TypedSvg$Attributes$class = function (names) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'class',
		A2($elm$core$String$join, ' ', names));
};
var $avh4$elm_color$Color$rgba = F4(
	function (r, g, b, a) {
		return A4($avh4$elm_color$Color$RgbaSpace, r, g, b, a);
	});
var $author$project$Components$LineChart$fliederColor = function (alpha) {
	return A4($avh4$elm_color$Color$rgba, 156 / 255, 136 / 255, 255 / 255, alpha);
};
var $author$project$Components$LineChart$generateTicks = F2(
	function (current, last) {
		generateTicks:
		while (true) {
			if (last < 10) {
				var $temp$current = A2(
					$elm$core$List$append,
					current,
					_List_fromArray(
						[last + 2])),
					$temp$last = last + 2;
				current = $temp$current;
				last = $temp$last;
				continue generateTicks;
			} else {
				return current;
			}
		}
	});
var $gampleman$elm_visualization$Shape$Generators$line = F2(
	function (curve, data) {
		var makeCurves = F2(
			function (datum, _v3) {
				var prev = _v3.a;
				var list = _v3.b;
				var _v0 = _Utils_Tuple3(prev, datum, list);
				if (_v0.b.$ === 1) {
					var _v1 = _v0.b;
					var l = _v0.c;
					return _Utils_Tuple2(false, l);
				} else {
					if (!_v0.a) {
						var point = _v0.b.a;
						var l = _v0.c;
						return _Utils_Tuple2(
							true,
							A2(
								$elm$core$List$cons,
								_List_fromArray(
									[point]),
								l));
					} else {
						if (_v0.c.b) {
							var p1 = _v0.b.a;
							var _v2 = _v0.c;
							var ps = _v2.a;
							var l = _v2.b;
							return _Utils_Tuple2(
								true,
								A2(
									$elm$core$List$cons,
									A2($elm$core$List$cons, p1, ps),
									l));
						} else {
							var p1 = _v0.b.a;
							var l = _v0.c;
							return _Utils_Tuple2(
								true,
								A2(
									$elm$core$List$cons,
									_List_fromArray(
										[p1]),
									l));
						}
					}
				}
			});
		return A2(
			$elm$core$List$map,
			curve,
			A3(
				$elm$core$List$foldr,
				makeCurves,
				_Utils_Tuple2(false, _List_Nil),
				data).b);
	});
var $gampleman$elm_visualization$Shape$line = $gampleman$elm_visualization$Shape$Generators$line;
var $author$project$Components$LineChart$transformToLineData = F2(
	function (model, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(
				A2(
					$gampleman$elm_visualization$Scale$convert,
					$author$project$Components$LineChart$xScale(model),
					x),
				A2($gampleman$elm_visualization$Scale$convert, $author$project$Components$LineChart$yScale, y)));
	});
var $author$project$Components$LineChart$line = function (model) {
	return A2(
		$gampleman$elm_visualization$Shape$line,
		$gampleman$elm_visualization$Shape$linearCurve,
		A2(
			$elm$core$List$map,
			function (x) {
				return A2($author$project$Components$LineChart$transformToLineData, model, x);
			},
			model));
};
var $elm_community$typed_svg$TypedSvg$circle = $elm_community$typed_svg$TypedSvg$Core$node('circle');
var $elm_community$typed_svg$TypedSvg$Attributes$cx = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'cx',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$InPx$cx = function (value) {
	return $elm_community$typed_svg$TypedSvg$Attributes$cx(
		$elm_community$typed_svg$TypedSvg$Types$px(value));
};
var $elm_community$typed_svg$TypedSvg$Attributes$cy = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'cy',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$InPx$cy = function (value) {
	return $elm_community$typed_svg$TypedSvg$Attributes$cy(
		$elm_community$typed_svg$TypedSvg$Types$px(value));
};
var $elm_community$typed_svg$TypedSvg$Attributes$r = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'r',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$InPx$r = function (value) {
	return $elm_community$typed_svg$TypedSvg$Attributes$r(
		$elm_community$typed_svg$TypedSvg$Types$px(value));
};
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Components$LineChart$marker = function (data) {
	if (!data.$) {
		var x = data.a;
		return A2(
			$elm_community$typed_svg$TypedSvg$circle,
			_List_fromArray(
				[
					$elm_community$typed_svg$TypedSvg$Attributes$InPx$r(3),
					$elm_community$typed_svg$TypedSvg$Attributes$InPx$cx(x.a),
					$elm_community$typed_svg$TypedSvg$Attributes$InPx$cy(x.b),
					$elm_community$typed_svg$TypedSvg$Attributes$fill(
					$elm_community$typed_svg$TypedSvg$Types$Paint(
						$author$project$Components$LineChart$fliederColor(1.0)))
				]),
			_List_Nil);
	} else {
		return $elm$svg$Svg$text('');
	}
};
var $author$project$Components$LineChart$markers = function (model) {
	return A2(
		$elm$core$List$map,
		$author$project$Components$LineChart$marker,
		A2(
			$elm$core$List$map,
			function (x) {
				return A2($author$project$Components$LineChart$transformToLineData, model, x);
			},
			model));
};
var $elm_community$typed_svg$TypedSvg$Attributes$strokeWidth = function (length) {
	return A2(
		$elm_community$typed_svg$TypedSvg$Core$attribute,
		'stroke-width',
		$elm_community$typed_svg$TypedSvg$TypesToStrings$lengthToString(length));
};
var $elm_community$typed_svg$TypedSvg$Attributes$InPx$strokeWidth = function (value) {
	return $elm_community$typed_svg$TypedSvg$Attributes$strokeWidth(
		$elm_community$typed_svg$TypedSvg$Types$px(value));
};
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $gampleman$elm_visualization$Scale$tickFormat = function (_v0) {
	var opts = _v0;
	return opts.eM(opts.dM);
};
var $gampleman$elm_visualization$Scale$ticks = F2(
	function (_v0, count) {
		var scale = _v0;
		return A2(scale.eN, scale.dM, count);
	});
var $gampleman$elm_visualization$Axis$computeOptions = F2(
	function (attrs, scale) {
		var _v0 = A3(
			$elm$core$List$foldl,
			F2(
				function (attr, _v1) {
					var babyOpts = _v1.a;
					var post = _v1.b;
					switch (attr.$) {
						case 2:
							var val = attr.a;
							return _Utils_Tuple2(
								_Utils_update(
									babyOpts,
									{bX: val}),
								post);
						case 3:
							var val = attr.a;
							return _Utils_Tuple2(
								_Utils_update(
									babyOpts,
									{bY: val}),
								post);
						case 4:
							var val = attr.a;
							return _Utils_Tuple2(
								_Utils_update(
									babyOpts,
									{a3: val}),
								post);
						case 5:
							var val = attr.a;
							return _Utils_Tuple2(
								_Utils_update(
									babyOpts,
									{cD: val}),
								post);
						default:
							return _Utils_Tuple2(
								babyOpts,
								A2($elm$core$List$cons, attr, post));
					}
				}),
			_Utils_Tuple2(
				{bX: 10, cD: 3, bY: 6, a3: 6},
				_List_Nil),
			attrs);
		var opts = _v0.a;
		var postList = _v0.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (attr, options) {
					switch (attr.$) {
						case 0:
							var val = attr.a;
							return _Utils_update(
								options,
								{eN: val});
						case 1:
							var val = attr.a;
							return _Utils_update(
								options,
								{eM: val});
						default:
							return options;
					}
				}),
			{
				bX: opts.bX,
				eM: A2($gampleman$elm_visualization$Scale$tickFormat, scale, opts.bX),
				cD: opts.cD,
				bY: opts.bY,
				a3: opts.a3,
				eN: A2($gampleman$elm_visualization$Scale$ticks, scale, opts.bX)
			},
			postList);
	});
var $elm$svg$Svg$Attributes$dy = _VirtualDom_attribute('dy');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$fontFamily = _VirtualDom_attribute('font-family');
var $elm$svg$Svg$Attributes$fontSize = _VirtualDom_attribute('font-size');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $gampleman$elm_visualization$Axis$element = F4(
	function (_v0, k, displacement, textAnchorPosition) {
		var x = _v0.gF;
		var y = _v0.gH;
		var x1 = _v0.jH;
		var x2 = _v0.jI;
		var y1 = _v0.jL;
		var y2 = _v0.jM;
		var translate = _v0.eP;
		var horizontal = _v0.dT;
		return F2(
			function (attrs, scale) {
				var rangeExtent = $gampleman$elm_visualization$Scale$rangeExtent(scale);
				var range1 = rangeExtent.b + 0.5;
				var range0 = rangeExtent.a + 0.5;
				var position = $gampleman$elm_visualization$Scale$convert(scale);
				var opts = A2($gampleman$elm_visualization$Axis$computeOptions, attrs, scale);
				var spacing = A2($elm$core$Basics$max, opts.bY, 0) + opts.cD;
				var drawTick = function (tick) {
					return A2(
						$elm$svg$Svg$g,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$class('tick'),
								$elm$svg$Svg$Attributes$transform(
								translate(
									position(tick)))
							]),
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$line,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$stroke('#000'),
										x2(k * opts.bY),
										y1(0.5),
										y2(0.5)
									]),
								_List_Nil),
								A2(
								$elm$svg$Svg$text_,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$fill('#000'),
										x(k * spacing),
										y(0.5),
										$elm$svg$Svg$Attributes$dy(displacement)
									]),
								_List_fromArray(
									[
										$elm$svg$Svg$text(
										opts.eM(tick))
									]))
							]));
				};
				var domainLine = horizontal ? ('M' + ($elm$core$String$fromFloat(k * opts.a3) + (',' + ($elm$core$String$fromFloat(range0) + ('H0.5V' + ($elm$core$String$fromFloat(range1) + ('H' + $elm$core$String$fromFloat(k * opts.a3)))))))) : ('M' + ($elm$core$String$fromFloat(range0) + (',' + ($elm$core$String$fromFloat(k * opts.a3) + ('V0.5H' + ($elm$core$String$fromFloat(range1) + ('V' + $elm$core$String$fromFloat(k * opts.a3))))))));
				return A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$fill('none'),
							$elm$svg$Svg$Attributes$fontSize('10'),
							$elm$svg$Svg$Attributes$fontFamily('sans-serif'),
							$elm$svg$Svg$Attributes$textAnchor(textAnchorPosition)
						]),
					A2(
						$elm$core$List$cons,
						A2(
							$elm$svg$Svg$path,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('domain'),
									$elm$svg$Svg$Attributes$stroke('#000'),
									$elm$svg$Svg$Attributes$d(domainLine)
								]),
							_List_Nil),
						A2($elm$core$List$map, drawTick, opts.eN)));
			});
	});
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $gampleman$elm_visualization$Axis$verticalAttrs = {
	dT: false,
	eP: function (x) {
		return 'translate(' + ($elm$core$String$fromFloat(x) + ', 0)');
	},
	gF: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$y, $elm$core$String$fromFloat),
	jH: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$y1, $elm$core$String$fromFloat),
	jI: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$y2, $elm$core$String$fromFloat),
	gH: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$x, $elm$core$String$fromFloat),
	jL: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$x1, $elm$core$String$fromFloat),
	jM: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$x2, $elm$core$String$fromFloat)
};
var $gampleman$elm_visualization$Axis$bottom = A4($gampleman$elm_visualization$Axis$element, $gampleman$elm_visualization$Axis$verticalAttrs, 1, '0.71em', 'middle');
var $gampleman$elm_visualization$Axis$TickCount = function (a) {
	return {$: 2, a: a};
};
var $gampleman$elm_visualization$Axis$tickCount = $gampleman$elm_visualization$Axis$TickCount;
var $author$project$Components$LineChart$xAxis = function (model) {
	var days = $elm$core$List$length(model);
	var tickCount = (days < 10) ? days : ((days < 100) ? ((days / 7) | 0) : ((days / 31) | 0));
	return A2(
		$gampleman$elm_visualization$Axis$bottom,
		_List_fromArray(
			[
				$gampleman$elm_visualization$Axis$tickCount(tickCount)
			]),
		$author$project$Components$LineChart$xScale(model));
};
var $gampleman$elm_visualization$Axis$horizontalAttrs = {
	dT: true,
	eP: function (y) {
		return 'translate(0, ' + ($elm$core$String$fromFloat(y) + ')');
	},
	gF: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$x, $elm$core$String$fromFloat),
	jH: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$x1, $elm$core$String$fromFloat),
	jI: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$x2, $elm$core$String$fromFloat),
	gH: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$y, $elm$core$String$fromFloat),
	jL: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$y1, $elm$core$String$fromFloat),
	jM: A2($elm$core$Basics$composeL, $elm$svg$Svg$Attributes$y2, $elm$core$String$fromFloat)
};
var $gampleman$elm_visualization$Axis$left = A4($gampleman$elm_visualization$Axis$element, $gampleman$elm_visualization$Axis$horizontalAttrs, -1, '0.32em', 'end');
var $author$project$Components$LineChart$yAxis = A2(
	$gampleman$elm_visualization$Axis$left,
	_List_fromArray(
		[
			$gampleman$elm_visualization$Axis$tickCount(5)
		]),
	$author$project$Components$LineChart$yScale);
var $author$project$Components$LineChart$view = F4(
	function (model, today, maxDays, direction) {
		return A2(
			$elm_community$typed_svg$TypedSvg$svg,
			_List_fromArray(
				[
					A4($elm_community$typed_svg$TypedSvg$Attributes$viewBox, 0, 0, $author$project$Components$LineChart$w, $author$project$Components$LineChart$h)
				]),
			_List_fromArray(
				[
					A2(
					$elm_community$typed_svg$TypedSvg$style,
					_List_Nil,
					_List_fromArray(
						[
							$elm_community$typed_svg$TypedSvg$Core$text('.domain {display:none}\n        .tick line {display: none}\n        .tick text {fill: #7f8c8d}\n        ')
						])),
					A2(
					$elm_community$typed_svg$TypedSvg$g,
					_List_fromArray(
						[
							$elm_community$typed_svg$TypedSvg$Attributes$transform(
							_List_fromArray(
								[
									A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$Components$LineChart$padding - 1, $author$project$Components$LineChart$h - $author$project$Components$LineChart$padding)
								])),
							$elm_community$typed_svg$TypedSvg$Attributes$class(
							_List_fromArray(
								['xAxis']))
						]),
					_List_fromArray(
						[
							$author$project$Components$LineChart$xAxis(model)
						])),
					A2(
					$elm_community$typed_svg$TypedSvg$g,
					_List_fromArray(
						[
							$elm_community$typed_svg$TypedSvg$Attributes$transform(
							_List_fromArray(
								[
									A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$Components$LineChart$padding - 1, $author$project$Components$LineChart$padding)
								]))
						]),
					_List_fromArray(
						[$author$project$Components$LineChart$yAxis])),
					A2(
					$elm_community$typed_svg$TypedSvg$g,
					_List_fromArray(
						[
							$elm_community$typed_svg$TypedSvg$Attributes$transform(
							_List_fromArray(
								[
									A2($elm_community$typed_svg$TypedSvg$Types$Translate, $author$project$Components$LineChart$padding, $author$project$Components$LineChart$padding)
								])),
							$elm_community$typed_svg$TypedSvg$Attributes$class(
							_List_fromArray(
								['series']))
						]),
					_List_fromArray(
						[
							function () {
							var dayTuples = A5(
								$author$project$Components$LineChart$generateDayTuples,
								_List_Nil,
								0,
								$elm$time$Time$posixToMillis(
									$author$project$Components$LineChart$dateToPosixTime(today)),
								maxDays,
								direction);
							return A2(
								$elm_community$typed_svg$TypedSvg$g,
								_List_Nil,
								function () {
									var _v0 = $elm$core$List$head(dayTuples);
									if (!_v0.$) {
										var firstItem = _v0.a;
										var _v1 = $elm$core$List$head(
											$elm$core$List$reverse(dayTuples));
										if (!_v1.$) {
											var lastItem = _v1.a;
											return A4(
												$author$project$Components$LineChart$backgroundLines,
												model,
												firstItem.a,
												lastItem.a,
												A2($author$project$Components$LineChart$generateTicks, _List_Nil, -2));
										} else {
											return _List_fromArray(
												[
													$elm$svg$Svg$text('')
												]);
										}
									} else {
										return _List_fromArray(
											[
												$elm$svg$Svg$text('')
											]);
									}
								}());
						}(),
							A2(
							$folkertdev$one_true_path_experiment$Path$element,
							$author$project$Components$LineChart$area(model),
							_List_fromArray(
								[
									$elm_community$typed_svg$TypedSvg$Attributes$InPx$strokeWidth(2),
									$elm_community$typed_svg$TypedSvg$Attributes$fill(
									$elm_community$typed_svg$TypedSvg$Types$Paint(
										$author$project$Components$LineChart$fliederColor(0.3)))
								])),
							A2(
							$folkertdev$one_true_path_experiment$Path$element,
							$author$project$Components$LineChart$line(model),
							_List_fromArray(
								[
									$elm_community$typed_svg$TypedSvg$Attributes$stroke(
									$elm_community$typed_svg$TypedSvg$Types$Paint(
										$author$project$Components$LineChart$fliederColor(1.0))),
									$elm_community$typed_svg$TypedSvg$Attributes$InPx$strokeWidth(2),
									$elm_community$typed_svg$TypedSvg$Attributes$fill($elm_community$typed_svg$TypedSvg$Types$PaintNone)
								])),
							A2(
							$elm_community$typed_svg$TypedSvg$g,
							_List_Nil,
							$author$project$Components$LineChart$markers(
								($elm$core$List$length(model) < 69) ? model : _List_Nil))
						]))
				]));
	});
var $author$project$Components$LineChart$mainn = F4(
	function (assignments, today, maxDays, timeRangeDirection) {
		return A4(
			$author$project$Components$LineChart$view,
			A4($author$project$Components$LineChart$processData, assignments, today, maxDays, timeRangeDirection),
			today,
			maxDays,
			timeRangeDirection);
	});
var $mdgriffith$elm_ui$Element$Font$underline = $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.jB);
var $author$project$Pages$Dashboard$viewWeekAssignmentVisualization = function (model) {
	var buttonStyle = _List_fromArray(
		[
			A2($mdgriffith$elm_ui$Element$paddingXY, 14, 6),
			$mdgriffith$elm_ui$Element$Font$center,
			$mdgriffith$elm_ui$Element$centerY,
			$mdgriffith$elm_ui$Element$mouseOver(
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Background$color(
					A2($author$project$Utils$Darken$darken, $author$project$Pages$Dashboard$inputColor, -0.05))
				])),
			$mdgriffith$elm_ui$Element$pointer,
			$mdgriffith$elm_ui$Element$Border$solid,
			$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$Colors$lighterGreyColor),
			$mdgriffith$elm_ui$Element$Background$color($author$project$Pages$Dashboard$inputColor)
		]);
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$size(25),
						$mdgriffith$elm_ui$Element$alignRight,
						$mdgriffith$elm_ui$Element$spacing(30)
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$row,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$Input$button,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Element$Border$roundEach(
										{aP: 10, aQ: 0, a5: 10, a6: 0}),
									buttonStyle),
								{
									h8: A2(
										$mdgriffith$elm_ui$Element$el,
										(model.aH === 7) ? _List_fromArray(
											[$mdgriffith$elm_ui$Element$Font$bold, $mdgriffith$elm_ui$Element$Font$underline]) : _List_Nil,
										$mdgriffith$elm_ui$Element$text('7 days')),
									ay: $elm$core$Maybe$Just(
										$author$project$Pages$Dashboard$ChangeTimeRange(7))
								}),
								A2(
								$mdgriffith$elm_ui$Element$Input$button,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Element$Border$widthEach(
										{b8: 0, cp: 2, cy: 0, cF: 0}),
									buttonStyle),
								{
									h8: A2(
										$mdgriffith$elm_ui$Element$el,
										(model.aH === 31) ? _List_fromArray(
											[$mdgriffith$elm_ui$Element$Font$bold, $mdgriffith$elm_ui$Element$Font$underline]) : _List_Nil,
										$mdgriffith$elm_ui$Element$text('31 days')),
									ay: $elm$core$Maybe$Just(
										$author$project$Pages$Dashboard$ChangeTimeRange(31))
								}),
								A2(
								$mdgriffith$elm_ui$Element$Input$button,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Element$Border$widthEach(
										{b8: 0, cp: 2, cy: 0, cF: 0}),
									buttonStyle),
								{
									h8: A2(
										$mdgriffith$elm_ui$Element$el,
										(model.aH === 90) ? _List_fromArray(
											[$mdgriffith$elm_ui$Element$Font$bold, $mdgriffith$elm_ui$Element$Font$underline]) : _List_Nil,
										$mdgriffith$elm_ui$Element$text('3 months')),
									ay: $elm$core$Maybe$Just(
										$author$project$Pages$Dashboard$ChangeTimeRange(90))
								}),
								A2(
								$mdgriffith$elm_ui$Element$Input$button,
								_Utils_ap(
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Border$widthEach(
											{b8: 0, cp: 2, cy: 0, cF: 0}),
											$mdgriffith$elm_ui$Element$Border$roundEach(
											{aP: 0, aQ: 10, a5: 0, a6: 10})
										]),
									buttonStyle),
								{
									h8: A2(
										$mdgriffith$elm_ui$Element$el,
										(model.aH === 187) ? _List_fromArray(
											[$mdgriffith$elm_ui$Element$Font$bold, $mdgriffith$elm_ui$Element$Font$underline]) : _List_Nil,
										$mdgriffith$elm_ui$Element$text('6 months')),
									ay: $elm$core$Maybe$Just(
										$author$project$Pages$Dashboard$ChangeTimeRange(187))
								})
							])),
						A2(
						$mdgriffith$elm_ui$Element$row,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$row,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Element$Input$button,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Element$paddingXY, 13, 6),
												$mdgriffith$elm_ui$Element$Font$center,
												$mdgriffith$elm_ui$Element$centerY,
												$mdgriffith$elm_ui$Element$Background$color($author$project$Pages$Dashboard$inputColor),
												$mdgriffith$elm_ui$Element$Border$roundEach(
												{aP: 10, aQ: 0, a5: 10, a6: 0}),
												$mdgriffith$elm_ui$Element$mouseOver(
												_List_fromArray(
													[
														$mdgriffith$elm_ui$Element$Background$color(
														A2($author$project$Utils$Darken$darken, $author$project$Pages$Dashboard$inputColor, -0.05))
													])),
												$mdgriffith$elm_ui$Element$pointer
											]),
										{
											h8: A2(
												$mdgriffith$elm_ui$Element$el,
												(model.bZ === 1) ? _List_fromArray(
													[$mdgriffith$elm_ui$Element$Font$bold, $mdgriffith$elm_ui$Element$Font$underline]) : _List_Nil,
												$mdgriffith$elm_ui$Element$text('past')),
											ay: $elm$core$Maybe$Just(
												$author$project$Pages$Dashboard$ChangeTimeRangeDirection(1))
										}),
										A2(
										$mdgriffith$elm_ui$Element$Input$button,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Element$paddingXY, 13, 6),
												$mdgriffith$elm_ui$Element$Background$color($author$project$Pages$Dashboard$inputColor),
												$mdgriffith$elm_ui$Element$Border$roundEach(
												{aP: 0, aQ: 10, a5: 0, a6: 10}),
												$mdgriffith$elm_ui$Element$Border$solid,
												$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$Colors$lighterGreyColor),
												$mdgriffith$elm_ui$Element$Border$widthEach(
												{b8: 0, cp: 2, cy: 0, cF: 0}),
												$mdgriffith$elm_ui$Element$Font$center,
												$mdgriffith$elm_ui$Element$centerY,
												$mdgriffith$elm_ui$Element$mouseOver(
												_List_fromArray(
													[
														$mdgriffith$elm_ui$Element$Background$color(
														A2($author$project$Utils$Darken$darken, $author$project$Pages$Dashboard$inputColor, -0.05))
													])),
												$mdgriffith$elm_ui$Element$pointer
											]),
										{
											h8: A2(
												$mdgriffith$elm_ui$Element$el,
												(!model.bZ) ? _List_fromArray(
													[$mdgriffith$elm_ui$Element$Font$bold, $mdgriffith$elm_ui$Element$Font$underline]) : _List_Nil,
												$mdgriffith$elm_ui$Element$text('future')),
											ay: $elm$core$Maybe$Just(
												$author$project$Pages$Dashboard$ChangeTimeRangeDirection(0))
										})
									]))
							]))
					])),
				function () {
				var _v0 = model.b4;
				switch (_v0.$) {
					case 3:
						var assignments = _v0.a;
						return $mdgriffith$elm_ui$Element$html(
							A4($author$project$Components$LineChart$mainn, assignments, model.B, model.aH, model.bZ));
					case 2:
						var error = _v0.a;
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_Nil,
							$mdgriffith$elm_ui$Element$text(
								$author$project$Api$errorToString(error)));
					default:
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_Nil,
							$mdgriffith$elm_ui$Element$text('Loading...'));
				}
			}()
			]));
};
var $mdgriffith$elm_ui$Internal$Model$Padding = F5(
	function (a, b, c, d, e) {
		return {$: 0, a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Model$Spaced = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$extractSpacingAndPadding = function (attrs) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (attr, _v0) {
				var pad = _v0.a;
				var spacing = _v0.b;
				return _Utils_Tuple2(
					function () {
						if (!pad.$) {
							var x = pad.a;
							return pad;
						} else {
							if ((attr.$ === 4) && (attr.b.$ === 7)) {
								var _v3 = attr.b;
								var name = _v3.a;
								var t = _v3.b;
								var r = _v3.c;
								var b = _v3.d;
								var l = _v3.e;
								return $elm$core$Maybe$Just(
									A5($mdgriffith$elm_ui$Internal$Model$Padding, name, t, r, b, l));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}
					}(),
					function () {
						if (!spacing.$) {
							var x = spacing.a;
							return spacing;
						} else {
							if ((attr.$ === 4) && (attr.b.$ === 5)) {
								var _v6 = attr.b;
								var name = _v6.a;
								var x = _v6.b;
								var y = _v6.c;
								return $elm$core$Maybe$Just(
									A3($mdgriffith$elm_ui$Internal$Model$Spaced, name, x, y));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}
					}());
			}),
		_Utils_Tuple2($elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing),
		attrs);
};
var $mdgriffith$elm_ui$Element$wrappedRow = F2(
	function (attrs, children) {
		var _v0 = $mdgriffith$elm_ui$Internal$Model$extractSpacingAndPadding(attrs);
		var padded = _v0.a;
		var spaced = _v0.b;
		if (spaced.$ === 1) {
			return A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asRow,
				$mdgriffith$elm_ui$Internal$Model$div,
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.cb + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.aS + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.eW)))),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
							attrs))),
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
		} else {
			var _v2 = spaced.a;
			var spaceName = _v2.a;
			var x = _v2.b;
			var y = _v2.c;
			var newPadding = function () {
				if (!padded.$) {
					var _v5 = padded.a;
					var name = _v5.a;
					var t = _v5.b;
					var r = _v5.c;
					var b = _v5.d;
					var l = _v5.e;
					if ((_Utils_cmp(r, x / 2) > -1) && (_Utils_cmp(b, y / 2) > -1)) {
						var newTop = t - (y / 2);
						var newRight = r - (x / 2);
						var newLeft = l - (x / 2);
						var newBottom = b - (y / 2);
						return $elm$core$Maybe$Just(
							A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$padding,
								A5(
									$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
									A4($mdgriffith$elm_ui$Internal$Model$paddingNameFloat, newTop, newRight, newBottom, newLeft),
									newTop,
									newRight,
									newBottom,
									newLeft)));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}();
			if (!newPadding.$) {
				var pad = newPadding.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asRow,
					$mdgriffith$elm_ui$Internal$Model$div,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.cb + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.aS + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.eW)))),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
								_Utils_ap(
									attrs,
									_List_fromArray(
										[pad]))))),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
			} else {
				var halfY = -(y / 2);
				var halfX = -(x / 2);
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					attrs,
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[
								A4(
								$mdgriffith$elm_ui$Internal$Model$element,
								$mdgriffith$elm_ui$Internal$Model$asRow,
								$mdgriffith$elm_ui$Internal$Model$div,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.cb + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.aS + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.eW)))),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Internal$Model$Attr(
											A2(
												$elm$html$Html$Attributes$style,
												'margin',
												$elm$core$String$fromFloat(halfY) + ('px' + (' ' + ($elm$core$String$fromFloat(halfX) + 'px'))))),
										A2(
											$elm$core$List$cons,
											$mdgriffith$elm_ui$Internal$Model$Attr(
												A2(
													$elm$html$Html$Attributes$style,
													'width',
													'calc(100% + ' + ($elm$core$String$fromInt(x) + 'px)'))),
											A2(
												$elm$core$List$cons,
												$mdgriffith$elm_ui$Internal$Model$Attr(
													A2(
														$elm$html$Html$Attributes$style,
														'height',
														'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))),
												A2(
													$elm$core$List$cons,
													A2(
														$mdgriffith$elm_ui$Internal$Model$StyleClass,
														$mdgriffith$elm_ui$Internal$Flag$spacing,
														A3($mdgriffith$elm_ui$Internal$Model$SpacingStyle, spaceName, x, y)),
													_List_Nil))))),
								$mdgriffith$elm_ui$Internal$Model$Unkeyed(children))
							])));
			}
		}
	});
var $author$project$Pages$Dashboard$view = function (model) {
	return {
		bc: _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$typeface('Source Sans Pro'),
								$mdgriffith$elm_ui$Element$Font$sansSerif
							])),
						$mdgriffith$elm_ui$Element$Font$color(
						A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
						$mdgriffith$elm_ui$Element$padding(30),
						$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$darkGreyColor),
						$mdgriffith$elm_ui$Element$inFront(
						$author$project$Pages$Dashboard$viewAssignmentModal(model))
					]),
				A2(
					function () {
						var _v0 = model.hw.hg;
						if (_v0 === 2) {
							return $mdgriffith$elm_ui$Element$wrappedRow;
						} else {
							return $mdgriffith$elm_ui$Element$column;
						}
					}(),
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$spacing(30),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
						]),
					_List_fromArray(
						[
							$author$project$Components$Sidebar$viewSidebar(
							{
								gL: $elm$core$Maybe$Just('dashboard'),
								hw: model.hw,
								gw: model.gw
							}),
							A2(
							$mdgriffith$elm_ui$Element$column,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width(
									function () {
										var _v1 = model.hw.hg;
										if (!_v1) {
											return $mdgriffith$elm_ui$Element$fill;
										} else {
											return $mdgriffith$elm_ui$Element$fillPortion(4);
										}
									}()),
									$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
									$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$darkGreyColor),
									$mdgriffith$elm_ui$Element$spacing(30)
								]),
							_List_fromArray(
								[
									$author$project$Pages$Dashboard$viewOustandingAssignments(model),
									A2(
									function () {
										var _v2 = model.hw.hg;
										if (_v2 === 2) {
											return $mdgriffith$elm_ui$Element$row;
										} else {
											return $mdgriffith$elm_ui$Element$column;
										}
									}(),
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
											$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
											$mdgriffith$elm_ui$Element$spacing(30)
										]),
									_List_fromArray(
										[
											$author$project$Pages$Dashboard$viewCreateAssignmentForm(model),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$width(
													$mdgriffith$elm_ui$Element$fillPortion(1)),
													$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$lighterGreyColor),
													$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
													$mdgriffith$elm_ui$Element$Border$rounded($author$project$Pages$Dashboard$borderRadius),
													$mdgriffith$elm_ui$Element$padding(20)
												]),
											$author$project$Pages$Dashboard$viewWeekAssignmentVisualization(model))
										])),
									A2(
									function () {
										var _v3 = model.hw.hg;
										if (_v3 === 2) {
											return $mdgriffith$elm_ui$Element$row;
										} else {
											return $mdgriffith$elm_ui$Element$column;
										}
									}(),
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
											$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
											$mdgriffith$elm_ui$Element$spacing(30)
										]),
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$width(
													$mdgriffith$elm_ui$Element$fillPortion(1)),
													$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$lighterGreyColor),
													$mdgriffith$elm_ui$Element$Border$rounded($author$project$Pages$Dashboard$borderRadius),
													$mdgriffith$elm_ui$Element$height(
													function () {
														var _v4 = model.hw.hg;
														if (_v4 === 2) {
															return A2($mdgriffith$elm_ui$Element$minimum, 500, $mdgriffith$elm_ui$Element$shrink);
														} else {
															return $mdgriffith$elm_ui$Element$fill;
														}
													}())
												]),
											$author$project$Pages$Dashboard$viewContributorChart(model)),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$width(
													$mdgriffith$elm_ui$Element$fillPortion(1)),
													$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$lighterGreyColor),
													$mdgriffith$elm_ui$Element$Border$rounded($author$project$Pages$Dashboard$borderRadius),
													$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
												]),
											$author$project$Pages$Dashboard$viewCourseChart(model))
										]))
								]))
						])))
			]),
		jt: 'dashboard'
	};
};
var $author$project$Pages$Dashboard$page = $author$project$Spa$Page$application(
	{h_: $author$project$Pages$Dashboard$init, h9: $author$project$Pages$Dashboard$load, iQ: $author$project$Pages$Dashboard$save, ja: $author$project$Pages$Dashboard$subscriptions, jC: $author$project$Pages$Dashboard$update, jD: $author$project$Pages$Dashboard$view});
var $author$project$Pages$Dashboard$Admin$GotContributorInfo = $elm$core$Basics$identity;
var $author$project$Api$Homework$Assignment$getContributorsAdmin = function (onResponse) {
	return $elm$http$Http$riskyRequest(
		{
			bc: $elm$http$Http$emptyBody,
			bh: A2($author$project$Api$expectJson, onResponse, $author$project$Api$Homework$Assignment$contributorsDecoder),
			bk: _List_Nil,
			bl: 'GET',
			bq: $elm$core$Maybe$Nothing,
			bt: $elm$core$Maybe$Nothing,
			bv: $author$project$Api$Api$apiAddress + '/assignments/contributors/all'
		});
};
var $author$project$Pages$Dashboard$Admin$init = F2(
	function (shared, url) {
		return _Utils_Tuple2(
			{cd: $author$project$Api$Loading, hw: shared.hw, bv: url, gw: shared.gw},
			$author$project$Api$Homework$Assignment$getContributorsAdmin($elm$core$Basics$identity));
	});
var $author$project$Pages$Dashboard$Admin$load = F2(
	function (shared, model) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{hw: shared.hw, gw: shared.gw}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Pages$Dashboard$Admin$save = F2(
	function (model, shared) {
		return shared;
	});
var $author$project$Pages$Dashboard$Admin$subscriptions = function (model) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Pages$Dashboard$Admin$update = F2(
	function (msg, model) {
		var data = msg;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{cd: data}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Pages$Dashboard$Admin$viewContributorChart = function (model) {
	var foo = function () {
		var _v1 = model.cd;
		if (_v1.$ === 3) {
			var contributorInfo = _v1.a;
			return ' -- ' + ($elm$core$String$fromInt(
				A3(
					$elm$core$List$foldl,
					F2(
						function (a, b) {
							return a.b + b;
						}),
					0,
					contributorInfo)) + ' total contributions');
		} else {
			return '';
		}
	}();
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$fillPortion(1)),
				$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$lighterGreyColor),
				$mdgriffith$elm_ui$Element$Border$rounded(20),
				$mdgriffith$elm_ui$Element$padding(20),
				$mdgriffith$elm_ui$Element$height(
				A2($mdgriffith$elm_ui$Element$minimum, 400, $mdgriffith$elm_ui$Element$shrink))
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$size(30),
						$mdgriffith$elm_ui$Element$Font$bold
					]),
				$mdgriffith$elm_ui$Element$text('Contributors (total)' + foo)),
				function () {
				var _v0 = model.cd;
				switch (_v0.$) {
					case 3:
						var contributorInfo = _v0.a;
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$padding(20),
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									$mdgriffith$elm_ui$Element$height(
									A2($mdgriffith$elm_ui$Element$maximum, 400, $mdgriffith$elm_ui$Element$fill))
								]),
							$mdgriffith$elm_ui$Element$html(
								$author$project$Components$PieChart$mainn(contributorInfo)));
					case 1:
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY, $mdgriffith$elm_ui$Element$Font$bold, $mdgriffith$elm_ui$Element$Font$italic]),
							$mdgriffith$elm_ui$Element$text('Loading...'));
					case 2:
						var e = _v0.a;
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$centerX,
									$mdgriffith$elm_ui$Element$centerY,
									$mdgriffith$elm_ui$Element$Font$bold,
									$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$Colors$redColor),
									$mdgriffith$elm_ui$Element$Font$size(30)
								]),
							$mdgriffith$elm_ui$Element$text(
								'Error: ' + $author$project$Api$errorToString(e)));
					default:
						return $mdgriffith$elm_ui$Element$none;
				}
			}()
			]));
};
var $author$project$Pages$Dashboard$Admin$view = function (model) {
	return {
		bc: _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$typeface('Source Sans Pro'),
								$mdgriffith$elm_ui$Element$Font$sansSerif
							])),
						$mdgriffith$elm_ui$Element$Font$color(
						A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
						$mdgriffith$elm_ui$Element$padding(30),
						$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$darkGreyColor)
					]),
				A2(
					function () {
						var _v0 = model.hw.hg;
						if (_v0 === 2) {
							return $mdgriffith$elm_ui$Element$wrappedRow;
						} else {
							return $mdgriffith$elm_ui$Element$column;
						}
					}(),
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$spacing(30),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
						]),
					_List_fromArray(
						[
							$author$project$Components$Sidebar$viewSidebar(
							{
								gL: $elm$core$Maybe$Just('admin'),
								hw: model.hw,
								gw: model.gw
							}),
							A2(
							$mdgriffith$elm_ui$Element$column,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width(
									function () {
										var _v1 = model.hw.hg;
										if (!_v1) {
											return $mdgriffith$elm_ui$Element$fill;
										} else {
											return $mdgriffith$elm_ui$Element$fillPortion(4);
										}
									}()),
									$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
									$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$darkGreyColor),
									$mdgriffith$elm_ui$Element$spacing(30)
								]),
							function () {
								var _v2 = model.gw;
								if (!_v2.$) {
									var user = _v2.a;
									return (user.f3 === 1) ? _List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$column,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$mdgriffith$elm_ui$Element$el,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$Font$size(40),
															$mdgriffith$elm_ui$Element$Font$bold,
															$mdgriffith$elm_ui$Element$alignTop
														]),
													$mdgriffith$elm_ui$Element$text('admin dashboard')),
													A2(
													$mdgriffith$elm_ui$Element$el,
													_List_Nil,
													$mdgriffith$elm_ui$Element$text('you are obviously very cool because in your row the permission field is 1, not 0'))
												])),
											A2(
											function () {
												var _v3 = model.hw.hg;
												if (!_v3) {
													return $mdgriffith$elm_ui$Element$column;
												} else {
													return $mdgriffith$elm_ui$Element$row;
												}
											}(),
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
												]),
											_List_fromArray(
												[
													$author$project$Pages$Dashboard$Admin$viewContributorChart(model),
													function () {
													var _v4 = model.hw.hg;
													if (_v4 === 2) {
														return A2(
															$mdgriffith$elm_ui$Element$el,
															_List_fromArray(
																[
																	$mdgriffith$elm_ui$Element$width(
																	$mdgriffith$elm_ui$Element$fillPortion(1))
																]),
															$mdgriffith$elm_ui$Element$none);
													} else {
														return $mdgriffith$elm_ui$Element$none;
													}
												}()
												]))
										]) : _List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text('permission denied'))
										]);
								} else {
									return _List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text('permission denied'))
										]);
								}
							}())
						])))
			]),
		jt: 'admin dashboard'
	};
};
var $author$project$Pages$Dashboard$Admin$page = $author$project$Spa$Page$application(
	{h_: $author$project$Pages$Dashboard$Admin$init, h9: $author$project$Pages$Dashboard$Admin$load, iQ: $author$project$Pages$Dashboard$Admin$save, ja: $author$project$Pages$Dashboard$Admin$subscriptions, jC: $author$project$Pages$Dashboard$Admin$update, jD: $author$project$Pages$Dashboard$Admin$view});
var $author$project$Pages$Dashboard$Moodle$init = F2(
	function (shared, url) {
		return _Utils_Tuple2(
			{b6: $author$project$Api$NotAsked, y: $author$project$Api$NotAsked, hw: shared.hw, aW: '', aX: $author$project$Api$NotAsked, cs: '', aY: '', bv: url, gw: shared.gw},
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Pages$Dashboard$Moodle$load = F2(
	function (shared, model) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{hw: shared.hw, gw: shared.gw}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Pages$Dashboard$Moodle$save = F2(
	function (model, shared) {
		var _v0 = model.b6;
		if (_v0.$ === 3) {
			var user = _v0.a;
			return _Utils_update(
				shared,
				{
					gw: $elm$core$Maybe$Just(user)
				});
		} else {
			return shared;
		}
	});
var $author$project$Pages$Dashboard$Moodle$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Pages$Dashboard$Moodle$GotAuthenticationData = function (a) {
	return {$: 5, a: a};
};
var $author$project$Pages$Dashboard$Moodle$GotSiteData = function (a) {
	return {$: 1, a: a};
};
var $author$project$Pages$Dashboard$Moodle$addHttpSchemeIfMissing = function (input) {
	return (A2($elm$core$String$startsWith, 'http://', input) || A2($elm$core$String$startsWith, 'https://', input)) ? input : ('http://' + input);
};
var $author$project$Api$Moodle$Moodle$credentialsEncoder = F3(
	function (url, username, password) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'url',
					$elm$json$Json$Encode$string(url)),
					_Utils_Tuple2(
					'username',
					$elm$json$Json$Encode$string(username)),
					_Utils_Tuple2(
					'password',
					$elm$json$Json$Encode$string(password))
				]));
	});
var $author$project$Api$Moodle$Moodle$authenticateUser = F4(
	function (url, username, password, onResponse) {
		return $elm$http$Http$riskyRequest(
			{
				bc: $elm$http$Http$jsonBody(
					A3($author$project$Api$Moodle$Moodle$credentialsEncoder, url, username, password)),
				bh: A2($author$project$Api$expectJson, onResponse, $author$project$Api$Homework$User$userDecoder),
				bk: _List_Nil,
				bl: 'POST',
				bq: $elm$core$Maybe$Nothing,
				bt: $elm$core$Maybe$Nothing,
				bv: $author$project$Api$Api$apiAddress + '/moodle/authenticate'
			});
	});
var $author$project$Api$Moodle$Moodle$decoder = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['sitename']),
	$elm$json$Json$Decode$string);
var $author$project$Api$Moodle$Moodle$encoder = function (url) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'url',
				$elm$json$Json$Encode$string(url))
			]));
};
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{gW: false, bc: r.bc, bh: r.bh, bk: r.bk, bl: r.bl, bq: r.bq, bt: r.bt, bv: r.bv}));
};
var $elm$http$Http$post = function (r) {
	return $elm$http$Http$request(
		{bc: r.bc, bh: r.bh, bk: _List_Nil, bl: 'POST', bq: $elm$core$Maybe$Nothing, bt: $elm$core$Maybe$Nothing, bv: r.bv});
};
var $author$project$Api$Moodle$Moodle$getSiteName = F2(
	function (url, options) {
		return $elm$http$Http$post(
			{
				bc: $elm$http$Http$jsonBody(
					$author$project$Api$Moodle$Moodle$encoder(url)),
				bh: A2($author$project$Api$expectJson, options.fT, $author$project$Api$Moodle$Moodle$decoder),
				bv: 'https://api.hausis.3nt3.de' + '/moodle/get-school-info'
			});
	});
var $author$project$Pages$Dashboard$Moodle$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var text = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cs: text}),
					A2(
						$author$project$Api$Moodle$Moodle$getSiteName,
						$author$project$Pages$Dashboard$Moodle$addHttpSchemeIfMissing(text),
						{fT: $author$project$Pages$Dashboard$Moodle$GotSiteData}));
			case 1:
				var data = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aX: data}),
					$elm$core$Platform$Cmd$none);
			case 2:
				var text = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aY: text}),
					$elm$core$Platform$Cmd$none);
			case 3:
				var text = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aW: text}),
					$elm$core$Platform$Cmd$none);
			case 4:
				return _Utils_Tuple2(
					model,
					A4(
						$author$project$Api$Moodle$Moodle$authenticateUser,
						$author$project$Pages$Dashboard$Moodle$addHttpSchemeIfMissing(model.cs),
						model.aY,
						model.aW,
						$author$project$Pages$Dashboard$Moodle$GotAuthenticationData));
			default:
				var data = msg.a;
				var sitename = function () {
					if (data.$ === 2) {
						var e = data.a;
						if (e.$ === 3) {
							var status = e.a;
							return (status === 401) ? model.aX : $author$project$Api$NotAsked;
						} else {
							return $author$project$Api$NotAsked;
						}
					} else {
						return model.aX;
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{b6: data, aW: '', aX: sitename, aY: ''}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Pages$Dashboard$Moodle$Authenticate = {$: 4};
var $author$project$Pages$Dashboard$Moodle$ChangeMoodlePasswordInput = function (a) {
	return {$: 3, a: a};
};
var $author$project$Pages$Dashboard$Moodle$ChangeMoodleUrlInput = function (a) {
	return {$: 0, a: a};
};
var $author$project$Pages$Dashboard$Moodle$ChangeMoodleUsernameInput = function (a) {
	return {$: 2, a: a};
};
var $author$project$Pages$Dashboard$Moodle$borderRadius = 20;
var $mdgriffith$elm_ui$Element$Input$currentPassword = F2(
	function (attrs, pass) {
		return A3(
			$mdgriffith$elm_ui$Element$Input$textHelper,
			{
				ag: $elm$core$Maybe$Just('current-password'),
				an: false,
				E: $mdgriffith$elm_ui$Element$Input$TextInputNode(
					pass.i$ ? 'text' : 'password')
			},
			attrs,
			{h8: pass.h8, dk: pass.dk, dp: pass.dp, du: pass.du});
	});
var $mdgriffith$elm_ui$Element$Region$description = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Describe, $mdgriffith$elm_ui$Internal$Model$Label);
var $author$project$Pages$Dashboard$Moodle$inputColor = A2($author$project$Utils$Darken$darken, $author$project$Styling$Colors$darkGreyColor, -0.05);
var $author$project$Pages$Dashboard$Moodle$inputTextColor = A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1);
var $author$project$Pages$Dashboard$Moodle$inputStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Background$color($author$project$Pages$Dashboard$Moodle$inputColor),
		$mdgriffith$elm_ui$Element$Border$width(0),
		$mdgriffith$elm_ui$Element$Border$rounded(10),
		$mdgriffith$elm_ui$Element$Font$color($author$project$Pages$Dashboard$Moodle$inputTextColor),
		$mdgriffith$elm_ui$Element$alignTop,
		$mdgriffith$elm_ui$Element$height(
		$mdgriffith$elm_ui$Element$px(50))
	]);
var $author$project$Pages$Dashboard$Moodle$viewStatusIndicatorThingy = function (userData) {
	var message = function () {
		switch (userData.$) {
			case 2:
				var e = userData.a;
				return $author$project$Api$errorToString(e);
			case 3:
				return 'Success 🎉';
			default:
				return '';
		}
	}();
	var color = function () {
		switch (userData.$) {
			case 2:
				return $author$project$Styling$Colors$redColor;
			case 3:
				return $author$project$Styling$Colors$greenColor;
			default:
				return $author$project$Styling$Colors$darkGreyColor;
		}
	}();
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Background$color(color),
				$mdgriffith$elm_ui$Element$Border$rounded(10),
				$mdgriffith$elm_ui$Element$padding(10),
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$size(25),
						$mdgriffith$elm_ui$Element$Font$bold
					]),
				$mdgriffith$elm_ui$Element$text(message))
			]));
};
var $author$project$Pages$Dashboard$Moodle$viewCredentialsForm = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Border$rounded($author$project$Pages$Dashboard$Moodle$borderRadius),
				$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$darkGreyColor),
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$fillPortion(1)),
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$fillPortion(1)),
				$mdgriffith$elm_ui$Element$padding(20),
				$mdgriffith$elm_ui$Element$spacing(20)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$column,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$size(30),
								$mdgriffith$elm_ui$Element$Font$bold
							]),
						$mdgriffith$elm_ui$Element$text('enter credentials')),
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_Nil,
						$mdgriffith$elm_ui$Element$text('make your moodle account accessible to our service'))
					])),
				function () {
				var _v0 = model.aX;
				switch (_v0.$) {
					case 3:
						var name = _v0.a;
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$centerX,
									$mdgriffith$elm_ui$Element$Font$bold,
									A2($mdgriffith$elm_ui$Element$paddingXY, 0, 10),
									$mdgriffith$elm_ui$Element$Font$size(30),
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Pages$Dashboard$Moodle$GotSiteData($author$project$Api$NotAsked)),
									$mdgriffith$elm_ui$Element$pointer
								]),
							$mdgriffith$elm_ui$Element$text(name));
					case 1:
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_Nil,
							$mdgriffith$elm_ui$Element$text('Loading...'));
					default:
						return $mdgriffith$elm_ui$Element$text('');
				}
			}(),
				A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$spacing(10)
					]),
				function () {
					var _v1 = model.aX;
					if (_v1.$ === 3) {
						return _List_fromArray(
							[
								$author$project$Pages$Dashboard$Moodle$viewStatusIndicatorThingy(model.b6),
								A2(
								$mdgriffith$elm_ui$Element$Input$text,
								_Utils_ap(
									$author$project$Pages$Dashboard$Moodle$inputStyle,
									_List_fromArray(
										[
											$author$project$Utils$OnEnter$onEnter($author$project$Pages$Dashboard$Moodle$Authenticate)
										])),
								{
									h8: A2(
										$mdgriffith$elm_ui$Element$Input$labelAbove,
										_List_Nil,
										$mdgriffith$elm_ui$Element$text('username')),
									dk: $author$project$Pages$Dashboard$Moodle$ChangeMoodleUsernameInput,
									dp: $elm$core$Maybe$Just(
										A2(
											$mdgriffith$elm_ui$Element$Input$placeholder,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text('username'))),
									du: model.aY
								}),
								A2(
								$mdgriffith$elm_ui$Element$Input$currentPassword,
								_Utils_ap(
									$author$project$Pages$Dashboard$Moodle$inputStyle,
									_List_fromArray(
										[
											$author$project$Utils$OnEnter$onEnter($author$project$Pages$Dashboard$Moodle$Authenticate)
										])),
								{
									h8: A2(
										$mdgriffith$elm_ui$Element$Input$labelAbove,
										_List_Nil,
										$mdgriffith$elm_ui$Element$text('password')),
									dk: $author$project$Pages$Dashboard$Moodle$ChangeMoodlePasswordInput,
									dp: $elm$core$Maybe$Just(
										A2(
											$mdgriffith$elm_ui$Element$Input$placeholder,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text('password'))),
									i$: false,
									du: model.aW
								}),
								A2(
								$mdgriffith$elm_ui$Element$Input$button,
								_Utils_ap(
									$author$project$Pages$Dashboard$Moodle$inputStyle,
									_Utils_ap(
										($elm$core$String$isEmpty(model.aY) || $elm$core$String$isEmpty(model.aW)) ? _List_fromArray(
											[
												$mdgriffith$elm_ui$Element$Background$color($author$project$Pages$Dashboard$Moodle$inputColor),
												$mdgriffith$elm_ui$Element$Region$description('Username and password are required.')
											]) : _List_fromArray(
											[
												$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$blueColor),
												$mdgriffith$elm_ui$Element$pointer
											]),
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$Font$bold,
												$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
											]))),
								{
									h8: A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
										$mdgriffith$elm_ui$Element$text('Authenticate')),
									ay: ($elm$core$String$isEmpty(model.aY) || $elm$core$String$isEmpty(model.aW)) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just($author$project$Pages$Dashboard$Moodle$Authenticate)
								})
							]);
					} else {
						return _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$Input$text,
								$author$project$Pages$Dashboard$Moodle$inputStyle,
								{
									h8: A2(
										$mdgriffith$elm_ui$Element$Input$labelAbove,
										_List_Nil,
										$mdgriffith$elm_ui$Element$text('moodle url')),
									dk: $author$project$Pages$Dashboard$Moodle$ChangeMoodleUrlInput,
									dp: $elm$core$Maybe$Just(
										A2(
											$mdgriffith$elm_ui$Element$Input$placeholder,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text('moodle.examplesite.com'))),
									du: model.cs
								})
							]);
					}
				}()),
				A2(
				$mdgriffith$elm_ui$Element$paragraph,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$alignBottom,
						$mdgriffith$elm_ui$Element$Font$color(
						A3($mdgriffith$elm_ui$Element$rgb, 0.8, 0.8, 0.8))
					]),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text('We don\'t keep your username or password. We just use them to get a token from your moodle site. This token is also kept safe of course.')
					]))
			]));
};
var $author$project$Pages$Dashboard$Moodle$view = function (model) {
	return {
		bc: _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$typeface('Source Sans Pro'),
								$mdgriffith$elm_ui$Element$Font$sansSerif
							])),
						$mdgriffith$elm_ui$Element$Font$color(
						A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
						$mdgriffith$elm_ui$Element$padding(30),
						$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$darkGreyColor)
					]),
				A2(
					function () {
						var _v0 = model.hw.hg;
						if (_v0 === 2) {
							return $mdgriffith$elm_ui$Element$wrappedRow;
						} else {
							return $mdgriffith$elm_ui$Element$column;
						}
					}(),
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$spacing(30),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
						]),
					_List_fromArray(
						[
							$author$project$Components$Sidebar$viewSidebar(
							{
								gL: $elm$core$Maybe$Just('moodle integration'),
								hw: model.hw,
								gw: model.gw
							}),
							A2(
							$mdgriffith$elm_ui$Element$column,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width(
									function () {
										var _v1 = model.hw.hg;
										if (!_v1) {
											return $mdgriffith$elm_ui$Element$fill;
										} else {
											return $mdgriffith$elm_ui$Element$fillPortion(4);
										}
									}()),
									$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
									$mdgriffith$elm_ui$Element$spacing(20)
								]),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Element$column,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$Font$size(40),
													$mdgriffith$elm_ui$Element$Font$bold,
													$mdgriffith$elm_ui$Element$alignTop
												]),
											$mdgriffith$elm_ui$Element$text('moodle integration')),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text('here are some things that have to do with the online learning platform moodle and ways to integrate them into your experience'))
										])),
									A2(
									$mdgriffith$elm_ui$Element$row,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
											$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
										]),
									_List_fromArray(
										[
											$author$project$Pages$Dashboard$Moodle$viewCredentialsForm(model),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$width(
													$mdgriffith$elm_ui$Element$fillPortion(1))
												]),
											$mdgriffith$elm_ui$Element$none)
										]))
								]))
						])))
			]),
		jt: 'dashboard/moodle'
	};
};
var $author$project$Pages$Dashboard$Moodle$page = $author$project$Spa$Page$application(
	{h_: $author$project$Pages$Dashboard$Moodle$init, h9: $author$project$Pages$Dashboard$Moodle$load, iQ: $author$project$Pages$Dashboard$Moodle$save, ja: $author$project$Pages$Dashboard$Moodle$subscriptions, jC: $author$project$Pages$Dashboard$Moodle$update, jD: $author$project$Pages$Dashboard$Moodle$view});
var $author$project$Pages$Login$init = F2(
	function (_v0, url) {
		return _Utils_Tuple2(
			{bH: $author$project$Api$NotAsked, cx: '', bv: url, cL: ''},
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Pages$Login$load = F2(
	function (shared, model) {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Pages$Login$save = F2(
	function (model, shared) {
		var _v0 = model.bH;
		if (_v0.$ === 3) {
			var user = _v0.a;
			return _Utils_update(
				shared,
				{
					gw: $elm$core$Maybe$Just(user)
				});
		} else {
			return shared;
		}
	});
var $author$project$Pages$Login$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Pages$Login$GotLoginData = function (a) {
	return {$: 2, a: a};
};
var $author$project$Api$Homework$User$credentialsEncoder = function (credentials) {
	var _v0 = credentials.ff;
	if (_v0.$ === 1) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'username',
					$elm$json$Json$Encode$string(credentials.eS)),
					_Utils_Tuple2(
					'password',
					$elm$json$Json$Encode$string(credentials.es))
				]));
	} else {
		var email = _v0.a;
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'username',
					$elm$json$Json$Encode$string(credentials.eS)),
					_Utils_Tuple2(
					'password',
					$elm$json$Json$Encode$string(credentials.es)),
					_Utils_Tuple2(
					'email',
					$elm$json$Json$Encode$string(email))
				]));
	}
};
var $author$project$Api$Homework$User$login = F2(
	function (credentials, options) {
		return $elm$http$Http$riskyRequest(
			{
				bc: $elm$http$Http$jsonBody(
					$author$project$Api$Homework$User$credentialsEncoder(credentials)),
				bh: A2($author$project$Api$expectJson, options.fT, $author$project$Api$Homework$User$userDecoder),
				bk: _List_Nil,
				bl: 'POST',
				bq: $elm$core$Maybe$Nothing,
				bt: $elm$core$Maybe$Nothing,
				bv: $author$project$Api$Api$apiAddress + '/user/login'
			});
	});
var $author$project$Pages$Login$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var input = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cL: input}),
					$elm$core$Platform$Cmd$none);
			case 1:
				var input = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cx: input}),
					$elm$core$Platform$Cmd$none);
			case 2:
				var data = msg.a;
				if (data.$ === 3) {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bH: data}),
						A2($author$project$Utils$Route$navigate, model.bv.h7, 1));
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bH: data}),
						$elm$core$Platform$Cmd$none);
				}
			default:
				return _Utils_Tuple2(
					model,
					A2(
						$author$project$Api$Homework$User$login,
						{ff: $elm$core$Maybe$Nothing, es: model.cx, eS: model.cL},
						{fT: $author$project$Pages$Login$GotLoginData}));
		}
	});
var $author$project$Pages$Login$Login = {$: 3};
var $author$project$Pages$Login$PasswordInput = function (a) {
	return {$: 1, a: a};
};
var $author$project$Pages$Login$UsernameInput = function (a) {
	return {$: 0, a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Serif = {$: 0};
var $mdgriffith$elm_ui$Element$Font$serif = $mdgriffith$elm_ui$Internal$Model$Serif;
var $author$project$Pages$Login$inputStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Font$family(
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Font$typeface('Noto Serif'),
				$mdgriffith$elm_ui$Element$Font$serif
			])),
		$mdgriffith$elm_ui$Element$Font$size(25)
	]);
var $author$project$Pages$Login$omgSoGreatColor = A3($mdgriffith$elm_ui$Element$rgb255, 52, 172, 224);
var $icidasset$elm_material_icons$Material$Icons$Types$Inherit = {$: 1};
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $icidasset$elm_material_icons$Material$Icons$Internal$icon = F4(
	function (attributes, nodes, size, coloring) {
		var sizeAsString = $elm$core$String$fromInt(size);
		return A2(
			$elm$svg$Svg$svg,
			_Utils_ap(
				attributes,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$height(sizeAsString),
						$elm$svg$Svg$Attributes$width(sizeAsString)
					])),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							function () {
							if (!coloring.$) {
								var color = coloring.a;
								return $elm$svg$Svg$Attributes$fill(
									$avh4$elm_color$Color$toCssString(color));
							} else {
								return $elm$svg$Svg$Attributes$fill('currentColor');
							}
						}()
						]),
					nodes)
				]));
	});
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $icidasset$elm_material_icons$Material$Icons$check = A2(
	$icidasset$elm_material_icons$Material$Icons$Internal$icon,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$viewBox('0 0 24 24')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M0 0h24v24H0z'),
					$elm$svg$Svg$Attributes$fill('none')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z')
				]),
			_List_Nil)
		]));
var $icidasset$elm_material_icons$Material$Icons$close = A2(
	$icidasset$elm_material_icons$Material$Icons$Internal$icon,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$viewBox('0 0 24 24')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M0 0h24v24H0z'),
					$elm$svg$Svg$Attributes$fill('none')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z')
				]),
			_List_Nil)
		]));
var $author$project$Pages$Login$darkGreenColor = A3($mdgriffith$elm_ui$Element$rgb255, 39, 174, 96);
var $author$project$Pages$Login$errorColor = A3($mdgriffith$elm_ui$Element$rgb255, 255, 82, 82);
var $elm$svg$Svg$Attributes$enableBackground = _VirtualDom_attribute('enable-background');
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $icidasset$elm_material_icons$Material$Icons$hourglass_bottom = A2(
	$icidasset$elm_material_icons$Material$Icons$Internal$icon,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$enableBackground('new 0 0 24 24'),
			$elm$svg$Svg$Attributes$viewBox('0 0 24 24')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$g,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$rect,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$fill('none')
						]),
					_List_Nil)
				])),
			A2(
			$elm$svg$Svg$g,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M18,22l-0.01-6L14,12l3.99-4.01L18,2H6v6l4,4l-4,3.99V22H18z M8,7.5V4h8v3.5l-4,4L8,7.5z')
						]),
					_List_Nil)
				]))
		]));
var $author$project$Pages$Login$viewLoginButton = function (model) {
	var size = 42;
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_Nil,
		function () {
			var _v0 = model.bH;
			switch (_v0.$) {
				case 3:
					return A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$centerX,
								$mdgriffith$elm_ui$Element$centerY,
								$mdgriffith$elm_ui$Element$Font$color($author$project$Pages$Login$darkGreenColor)
							]),
						$mdgriffith$elm_ui$Element$html(
							A2($icidasset$elm_material_icons$Material$Icons$check, size, $icidasset$elm_material_icons$Material$Icons$Types$Inherit)));
				case 1:
					return A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
						$mdgriffith$elm_ui$Element$html(
							A2($icidasset$elm_material_icons$Material$Icons$hourglass_bottom, size, $icidasset$elm_material_icons$Material$Icons$Types$Inherit)));
				case 2:
					return A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$centerX,
								$mdgriffith$elm_ui$Element$centerY,
								$mdgriffith$elm_ui$Element$Font$color($author$project$Pages$Login$errorColor)
							]),
						$mdgriffith$elm_ui$Element$html(
							A2($icidasset$elm_material_icons$Material$Icons$close, size, $icidasset$elm_material_icons$Material$Icons$Types$Inherit)));
				default:
					return A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$family(
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Font$typeface('Source Sans Pro')
									]))
							]),
						$mdgriffith$elm_ui$Element$text('Login'));
			}
		}());
};
var $author$project$Pages$Login$view = function (model) {
	return {
		bc: _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
						A2(
							$mdgriffith$elm_ui$Element$column,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Background$color(
									A3($mdgriffith$elm_ui$Element$rgb255, 230, 230, 230)),
									$mdgriffith$elm_ui$Element$padding(50),
									$mdgriffith$elm_ui$Element$spacing(10)
								]),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Font$family(
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$Font$typeface('Noto Serif'),
													$mdgriffith$elm_ui$Element$Font$serif
												])),
											$mdgriffith$elm_ui$Element$Font$size(40)
										]),
									$mdgriffith$elm_ui$Element$text('Login')),
									A2(
									$mdgriffith$elm_ui$Element$column,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
										]),
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$Input$text,
											_Utils_ap(
												$author$project$Pages$Login$inputStyle,
												_List_fromArray(
													[
														$author$project$Utils$OnEnter$onEnter($author$project$Pages$Login$Login)
													])),
											{
												h8: $mdgriffith$elm_ui$Element$Input$labelHidden('username'),
												dk: $author$project$Pages$Login$UsernameInput,
												dp: $elm$core$Maybe$Just(
													A2(
														$mdgriffith$elm_ui$Element$Input$placeholder,
														_List_Nil,
														$mdgriffith$elm_ui$Element$text('enter username'))),
												du: model.cL
											})
										])),
									A2(
									$mdgriffith$elm_ui$Element$column,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
											$mdgriffith$elm_ui$Element$spacing(5)
										]),
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$Input$currentPassword,
											_Utils_ap(
												$author$project$Pages$Login$inputStyle,
												_List_fromArray(
													[
														$author$project$Utils$OnEnter$onEnter($author$project$Pages$Login$Login)
													])),
											{
												h8: $mdgriffith$elm_ui$Element$Input$labelHidden('password'),
												dk: $author$project$Pages$Login$PasswordInput,
												dp: $elm$core$Maybe$Just(
													A2(
														$mdgriffith$elm_ui$Element$Input$placeholder,
														_List_Nil,
														$mdgriffith$elm_ui$Element$text('enter password'))),
												i$: false,
												du: model.cx
											})
										])),
									A2(
									$mdgriffith$elm_ui$Element$Input$button,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Background$color($author$project$Pages$Login$omgSoGreatColor),
											$mdgriffith$elm_ui$Element$Font$size(20),
											$mdgriffith$elm_ui$Element$Font$color(
											A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
											$mdgriffith$elm_ui$Element$Border$rounded(5),
											$mdgriffith$elm_ui$Element$centerX,
											A2($mdgriffith$elm_ui$Element$paddingXY, 30, 15),
											$mdgriffith$elm_ui$Element$Font$bold
										]),
									{
										h8: $author$project$Pages$Login$viewLoginButton(model),
										ay: $elm$core$Maybe$Just($author$project$Pages$Login$Login)
									})
								])))
					]))
			]),
		jt: 'Login'
	};
};
var $author$project$Pages$Login$page = $author$project$Spa$Page$application(
	{h_: $author$project$Pages$Login$init, h9: $author$project$Pages$Login$load, iQ: $author$project$Pages$Login$save, ja: $author$project$Pages$Login$subscriptions, jC: $author$project$Pages$Login$update, jD: $author$project$Pages$Login$view});
var $author$project$Spa$Page$ignoreEffect = function (model) {
	return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
};
var $author$project$Spa$Page$static = function (page) {
	return {
		h_: F2(
			function (_v0, url) {
				return _Utils_Tuple2(url, $elm$core$Platform$Cmd$none);
			}),
		h9: $elm$core$Basics$always(
			A2($elm$core$Basics$composeR, $elm$core$Basics$identity, $author$project$Spa$Page$ignoreEffect)),
		iQ: $elm$core$Basics$always($elm$core$Basics$identity),
		ja: function (_v1) {
			return $elm$core$Platform$Sub$none;
		},
		jC: F2(
			function (_v2, model) {
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			}),
		jD: page.jD
	};
};
var $author$project$Pages$NotFound$view = function (_v0) {
	var params = _v0.iE;
	return {
		bc: _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$centerX,
						$mdgriffith$elm_ui$Element$centerY,
						$mdgriffith$elm_ui$Element$Font$family(
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$typeface('Merriweather'),
								$mdgriffith$elm_ui$Element$Font$serif
							])),
						$mdgriffith$elm_ui$Element$spacing(20)
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$centerX,
								$mdgriffith$elm_ui$Element$Font$size(60)
							]),
						$mdgriffith$elm_ui$Element$text('no page lol')),
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$centerX]),
						$mdgriffith$elm_ui$Element$text('Error 404. Go somewhere else'))
					]))
			]),
		jt: '404'
	};
};
var $author$project$Pages$NotFound$page = $author$project$Spa$Page$static(
	{jD: $author$project$Pages$NotFound$view});
var $author$project$Pages$Register$init = F2(
	function (_v0, url) {
		return _Utils_Tuple2(
			{
				cl: '',
				d: {ff: $elm$core$Maybe$Nothing, es: $elm$core$Maybe$Nothing, eS: $elm$core$Maybe$Nothing},
				cx: '',
				bS: $author$project$Api$NotAsked,
				bv: url,
				cL: '',
				cM: $author$project$Api$NotAsked,
				cN: ''
			},
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Pages$Register$load = F2(
	function (shared, model) {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Pages$Register$save = F2(
	function (model, shared) {
		var _v0 = model.bS;
		if (_v0.$ === 3) {
			var user = _v0.a;
			return _Utils_update(
				shared,
				{
					gw: $elm$core$Maybe$Just(user)
				});
		} else {
			return shared;
		}
	});
var $author$project$Pages$Register$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Pages$Register$GotRegistrationData = function (a) {
	return {$: 5, a: a};
};
var $author$project$Pages$Register$GotUsernameTaken = function (a) {
	return {$: 4, a: a};
};
var $author$project$Pages$Register$areErrorsEmpty = function (errors) {
	var _v0 = errors.eS;
	if (!_v0.$) {
		return false;
	} else {
		var _v1 = errors.es;
		if (!_v1.$) {
			return false;
		} else {
			var _v2 = errors.ff;
			if (!_v2.$) {
				return false;
			} else {
				return true;
			}
		}
	}
};
var $author$project$Api$Homework$User$register = F2(
	function (credentials, options) {
		return $elm$http$Http$riskyRequest(
			{
				bc: $elm$http$Http$jsonBody(
					$author$project$Api$Homework$User$credentialsEncoder(credentials)),
				bh: A2($author$project$Api$expectJson, options.fT, $author$project$Api$Homework$User$userDecoder),
				bk: _List_Nil,
				bl: 'POST',
				bq: $elm$core$Maybe$Nothing,
				bt: $elm$core$Maybe$Nothing,
				bv: $author$project$Api$Api$apiAddress + '/user/register'
			});
	});
var $author$project$Pages$Register$setEmailError = F2(
	function (original, newError) {
		return _Utils_update(
			original,
			{ff: newError});
	});
var $author$project$Pages$Register$setPasswordError = F2(
	function (original, newError) {
		return _Utils_update(
			original,
			{es: newError});
	});
var $author$project$Pages$Register$setUsernameError = F2(
	function (original, newError) {
		return _Utils_update(
			original,
			{eS: newError});
	});
var $elm$http$Http$get = function (r) {
	return $elm$http$Http$request(
		{bc: $elm$http$Http$emptyBody, bh: r.bh, bk: _List_Nil, bl: 'GET', bq: $elm$core$Maybe$Nothing, bt: $elm$core$Maybe$Nothing, bv: r.bv});
};
var $author$project$Api$Homework$UsernameTaken$usernameTaken = F2(
	function (username, options) {
		return $elm$http$Http$get(
			{
				bh: A2($author$project$Api$expectJson, options.fT, $elm$json$Json$Decode$bool),
				bv: $author$project$Api$Api$apiAddress + ('/username-taken/' + username)
			});
	});
var $author$project$Pages$Register$validateEmailInput = function (input) {
	return A2($elm$core$String$contains, '@', input) ? $elm$core$Maybe$Nothing : ((input === '') ? $elm$core$Maybe$Just('no email address specified') : $elm$core$Maybe$Just('not a valid address'));
};
var $author$project$Pages$Register$validatePasswordInput = F2(
	function (input, validationInput) {
		return ($elm$core$String$length(input) < 8) ? $elm$core$Maybe$Just('password too short') : ((!_Utils_eq(validationInput, input)) ? $elm$core$Maybe$Just('passwords don\'t match') : $elm$core$Maybe$Nothing);
	});
var $author$project$Pages$Register$validateUsernameInput = function (input) {
	return (input === '') ? $elm$core$Maybe$Just('no username specified') : (A2($elm$core$String$contains, ' ', input) ? $elm$core$Maybe$Just('no spaces allowed') : $elm$core$Maybe$Nothing);
};
var $author$project$Pages$Register$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var input = msg.a;
				return ($elm$core$String$length(input) > 0) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: A2(
								$author$project$Pages$Register$setUsernameError,
								model.d,
								$author$project$Pages$Register$validateUsernameInput(input)),
							cL: input
						}),
					A2(
						$author$project$Api$Homework$UsernameTaken$usernameTaken,
						input,
						{fT: $author$project$Pages$Register$GotUsernameTaken})) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: A2(
								$author$project$Pages$Register$setUsernameError,
								model.d,
								$author$project$Pages$Register$validateUsernameInput(input)),
							cL: input,
							cM: $author$project$Api$NotAsked
						}),
					$elm$core$Platform$Cmd$none);
			case 1:
				var input = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: A2(
								$author$project$Pages$Register$setPasswordError,
								model.d,
								A2($author$project$Pages$Register$validatePasswordInput, input, model.cN)),
							cx: input
						}),
					$elm$core$Platform$Cmd$none);
			case 2:
				var input = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							d: A2(
								$author$project$Pages$Register$setPasswordError,
								model.d,
								A2($author$project$Pages$Register$validatePasswordInput, model.cx, input)),
							cN: input
						}),
					$elm$core$Platform$Cmd$none);
			case 3:
				var input = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cl: input,
							d: A2(
								$author$project$Pages$Register$setEmailError,
								model.d,
								$author$project$Pages$Register$validateEmailInput(input))
						}),
					$elm$core$Platform$Cmd$none);
			case 4:
				var data = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cM: data}),
					$elm$core$Platform$Cmd$none);
			case 5:
				var data = msg.a;
				if (data.$ === 3) {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bS: data}),
						A2($author$project$Utils$Route$navigate, model.bv.h7, 1));
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{bS: data}),
						$elm$core$Platform$Cmd$none);
				}
			default:
				return $author$project$Pages$Register$areErrorsEmpty(model.d) ? _Utils_Tuple2(
					model,
					A2(
						$author$project$Api$Homework$User$register,
						{
							ff: $elm$core$Maybe$Just(model.cl),
							es: model.cx,
							eS: model.cL
						},
						{fT: $author$project$Pages$Register$GotRegistrationData})) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Pages$Register$EmailInput = function (a) {
	return {$: 3, a: a};
};
var $author$project$Pages$Register$PasswordInput = function (a) {
	return {$: 1, a: a};
};
var $author$project$Pages$Register$Register = {$: 6};
var $author$project$Pages$Register$UsernameInput = function (a) {
	return {$: 0, a: a};
};
var $author$project$Pages$Register$ValidatePasswordInput = function (a) {
	return {$: 2, a: a};
};
var $mdgriffith$elm_ui$Element$Input$email = $mdgriffith$elm_ui$Element$Input$textHelper(
	{
		ag: $elm$core$Maybe$Just('email'),
		an: false,
		E: $mdgriffith$elm_ui$Element$Input$TextInputNode('email')
	});
var $author$project$Pages$Register$inputStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Font$family(
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Font$typeface('Noto Serif'),
				$mdgriffith$elm_ui$Element$Font$serif
			])),
		$mdgriffith$elm_ui$Element$Font$size(25)
	]);
var $mdgriffith$elm_ui$Element$Input$newPassword = F2(
	function (attrs, pass) {
		return A3(
			$mdgriffith$elm_ui$Element$Input$textHelper,
			{
				ag: $elm$core$Maybe$Just('new-password'),
				an: false,
				E: $mdgriffith$elm_ui$Element$Input$TextInputNode(
					pass.i$ ? 'text' : 'password')
			},
			attrs,
			{h8: pass.h8, dk: pass.dk, dp: pass.dp, du: pass.du});
	});
var $author$project$Pages$Register$omgSoGreatColor = A3($mdgriffith$elm_ui$Element$rgb255, 52, 172, 224);
var $author$project$Pages$Register$errorColor = A3($mdgriffith$elm_ui$Element$rgb255, 255, 82, 82);
var $author$project$Pages$Register$greenColor = A3($mdgriffith$elm_ui$Element$rgb255, 46, 204, 113);
var $author$project$Pages$Register$warningColor = A3($mdgriffith$elm_ui$Element$rgb255, 255, 177, 66);
var $author$project$Pages$Register$getPasswordStrengthColor = function (length) {
	return (length < 8) ? $author$project$Pages$Register$errorColor : ((length < 12) ? $author$project$Pages$Register$warningColor : ((length < 20) ? $author$project$Pages$Register$greenColor : $author$project$Pages$Register$omgSoGreatColor));
};
var $author$project$Pages$Register$passwordStrengthIndicator = function (password) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height(
				$mdgriffith$elm_ui$Element$px(10)),
				$mdgriffith$elm_ui$Element$Background$color(
				$author$project$Pages$Register$getPasswordStrengthColor(
					$elm$core$String$length(password))),
				$mdgriffith$elm_ui$Element$Border$rounded(5)
			]),
		$mdgriffith$elm_ui$Element$none);
};
var $author$project$Pages$Register$inputErrorMessage = function (error) {
	if (!error.$) {
		var errorMessage = error.a;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Font$color($author$project$Pages$Register$errorColor)
				]),
			$mdgriffith$elm_ui$Element$text('Error: ' + errorMessage));
	} else {
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Font$color($author$project$Pages$Register$errorColor)
				]),
			$mdgriffith$elm_ui$Element$text(''));
	}
};
var $author$project$Pages$Register$viewInputError = F2(
	function (model, inputName) {
		return (inputName === 'email') ? $author$project$Pages$Register$inputErrorMessage(model.d.ff) : ((inputName === 'username') ? $author$project$Pages$Register$inputErrorMessage(model.d.eS) : ((inputName === 'password') ? $author$project$Pages$Register$inputErrorMessage(model.d.es) : $mdgriffith$elm_ui$Element$none));
	});
var $author$project$Pages$Register$darkGreenColor = A3($mdgriffith$elm_ui$Element$rgb255, 39, 174, 96);
var $author$project$Pages$Register$viewRegistrationButton = function (model) {
	var size = 42;
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_Nil,
		function () {
			var _v0 = model.bS;
			switch (_v0.$) {
				case 3:
					return A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$centerX,
								$mdgriffith$elm_ui$Element$centerY,
								$mdgriffith$elm_ui$Element$Font$color($author$project$Pages$Register$darkGreenColor)
							]),
						$mdgriffith$elm_ui$Element$html(
							A2($icidasset$elm_material_icons$Material$Icons$check, size, $icidasset$elm_material_icons$Material$Icons$Types$Inherit)));
				case 1:
					return A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
						$mdgriffith$elm_ui$Element$html(
							A2($icidasset$elm_material_icons$Material$Icons$hourglass_bottom, size, $icidasset$elm_material_icons$Material$Icons$Types$Inherit)));
				case 2:
					var err = _v0.a;
					return $mdgriffith$elm_ui$Element$text(
						$author$project$Api$errorToString(err));
				default:
					return A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$family(
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Font$typeface('Source Sans Pro')
									]))
							]),
						$mdgriffith$elm_ui$Element$text('register'));
			}
		}());
};
var $icidasset$elm_material_icons$Material$Icons$error = A2(
	$icidasset$elm_material_icons$Material$Icons$Internal$icon,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$viewBox('0 0 24 24')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M0 0h24v24H0z'),
					$elm$svg$Svg$Attributes$fill('none')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z')
				]),
			_List_Nil)
		]));
var $author$project$Pages$Register$viewUsernameTaken = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$centerX,
				$mdgriffith$elm_ui$Element$centerY,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
			]),
		function () {
			var size = 48;
			var _v0 = model.cM;
			switch (_v0.$) {
				case 3:
					var taken = _v0.a;
					return taken ? A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$centerX,
								$mdgriffith$elm_ui$Element$centerY,
								$mdgriffith$elm_ui$Element$Font$color($author$project$Pages$Register$errorColor)
							]),
						$mdgriffith$elm_ui$Element$html(
							A2($icidasset$elm_material_icons$Material$Icons$close, size, $icidasset$elm_material_icons$Material$Icons$Types$Inherit))) : A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$centerX,
								$mdgriffith$elm_ui$Element$centerY,
								$mdgriffith$elm_ui$Element$Font$color($author$project$Pages$Register$darkGreenColor)
							]),
						$mdgriffith$elm_ui$Element$html(
							A2($icidasset$elm_material_icons$Material$Icons$check, size, $icidasset$elm_material_icons$Material$Icons$Types$Inherit)));
				case 2:
					var err = _v0.a;
					return A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
						$mdgriffith$elm_ui$Element$html(
							A2(
								$icidasset$elm_material_icons$Material$Icons$error,
								$elm$core$Basics$round(size * 0.8),
								$icidasset$elm_material_icons$Material$Icons$Types$Inherit)));
				case 1:
					return A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
						$mdgriffith$elm_ui$Element$html(
							A2($icidasset$elm_material_icons$Material$Icons$hourglass_bottom, size, $icidasset$elm_material_icons$Material$Icons$Types$Inherit)));
				default:
					return A2($mdgriffith$elm_ui$Element$el, _List_Nil, $mdgriffith$elm_ui$Element$none);
			}
		}());
};
var $author$project$Pages$Register$view = function (model) {
	return {
		bc: _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$centerX, $mdgriffith$elm_ui$Element$centerY]),
						A2(
							$mdgriffith$elm_ui$Element$column,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Background$color(
									A3($mdgriffith$elm_ui$Element$rgb255, 230, 230, 230)),
									$mdgriffith$elm_ui$Element$padding(50),
									$mdgriffith$elm_ui$Element$spacing(10)
								]),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Font$family(
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$Font$typeface('Noto Serif'),
													$mdgriffith$elm_ui$Element$Font$serif
												])),
											$mdgriffith$elm_ui$Element$Font$size(40)
										]),
									$mdgriffith$elm_ui$Element$text('Register')),
									A2(
									$mdgriffith$elm_ui$Element$row,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$spacing(10)
										]),
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$column,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$width(
													$mdgriffith$elm_ui$Element$fillPortion(20)),
													$author$project$Utils$OnEnter$onEnter($author$project$Pages$Register$Register)
												]),
											_List_fromArray(
												[
													A2($author$project$Pages$Register$viewInputError, model, 'email'),
													A2(
													$mdgriffith$elm_ui$Element$Input$email,
													$author$project$Pages$Register$inputStyle,
													{
														h8: $mdgriffith$elm_ui$Element$Input$labelHidden('email'),
														dk: $author$project$Pages$Register$EmailInput,
														dp: $elm$core$Maybe$Just(
															A2(
																$mdgriffith$elm_ui$Element$Input$placeholder,
																_List_Nil,
																$mdgriffith$elm_ui$Element$text('enter email address'))),
														du: model.cl
													})
												])),
											A2(
											$mdgriffith$elm_ui$Element$column,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$width(
													$mdgriffith$elm_ui$Element$fillPortion(18)),
													$mdgriffith$elm_ui$Element$alignBottom
												]),
											_List_fromArray(
												[
													A2(
													$mdgriffith$elm_ui$Element$Input$text,
													$author$project$Pages$Register$inputStyle,
													{
														h8: $mdgriffith$elm_ui$Element$Input$labelHidden('username'),
														dk: $author$project$Pages$Register$UsernameInput,
														dp: $elm$core$Maybe$Just(
															A2(
																$mdgriffith$elm_ui$Element$Input$placeholder,
																_List_Nil,
																$mdgriffith$elm_ui$Element$text('enter username'))),
														du: model.cL
													})
												])),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$width(
													$mdgriffith$elm_ui$Element$px(50)),
													$mdgriffith$elm_ui$Element$height(
													$mdgriffith$elm_ui$Element$px(50)),
													$mdgriffith$elm_ui$Element$Background$color(
													A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
													$mdgriffith$elm_ui$Element$Border$rounded(3),
													$mdgriffith$elm_ui$Element$Border$solid,
													$mdgriffith$elm_ui$Element$Border$width(1),
													$mdgriffith$elm_ui$Element$Border$color(
													A3($mdgriffith$elm_ui$Element$rgb, 0.7, 0.7, 0.7)),
													$mdgriffith$elm_ui$Element$alignBottom
												]),
											$author$project$Pages$Register$viewUsernameTaken(model))
										])),
									A2(
									$mdgriffith$elm_ui$Element$column,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
											$mdgriffith$elm_ui$Element$spacing(5),
											$author$project$Utils$OnEnter$onEnter($author$project$Pages$Register$Register)
										]),
									_List_fromArray(
										[
											A2($author$project$Pages$Register$viewInputError, model, 'password'),
											$author$project$Pages$Register$passwordStrengthIndicator(model.cx),
											A2(
											$mdgriffith$elm_ui$Element$Input$newPassword,
											$author$project$Pages$Register$inputStyle,
											{
												h8: $mdgriffith$elm_ui$Element$Input$labelHidden('password'),
												dk: $author$project$Pages$Register$PasswordInput,
												dp: $elm$core$Maybe$Just(
													A2(
														$mdgriffith$elm_ui$Element$Input$placeholder,
														_List_Nil,
														$mdgriffith$elm_ui$Element$text('enter password'))),
												i$: false,
												du: model.cx
											})
										])),
									A2(
									$mdgriffith$elm_ui$Element$Input$currentPassword,
									_Utils_ap(
										$author$project$Pages$Register$inputStyle,
										_List_fromArray(
											[
												$author$project$Utils$OnEnter$onEnter($author$project$Pages$Register$Register)
											])),
									{
										h8: $mdgriffith$elm_ui$Element$Input$labelHidden('validate password'),
										dk: $author$project$Pages$Register$ValidatePasswordInput,
										dp: $elm$core$Maybe$Just(
											A2(
												$mdgriffith$elm_ui$Element$Input$placeholder,
												_List_Nil,
												$mdgriffith$elm_ui$Element$text('repeat password'))),
										i$: false,
										du: model.cN
									}),
									A2(
									$mdgriffith$elm_ui$Element$Input$button,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Background$color($author$project$Pages$Register$omgSoGreatColor),
											$mdgriffith$elm_ui$Element$Font$size(20),
											$mdgriffith$elm_ui$Element$Font$color(
											A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
											$mdgriffith$elm_ui$Element$Border$rounded(5),
											$mdgriffith$elm_ui$Element$centerX,
											A2($mdgriffith$elm_ui$Element$paddingXY, 30, 15),
											$mdgriffith$elm_ui$Element$Font$bold,
											$author$project$Utils$OnEnter$onEnter($author$project$Pages$Register$Register)
										]),
									{
										h8: $author$project$Pages$Register$viewRegistrationButton(model),
										ay: $elm$core$Maybe$Just($author$project$Pages$Register$Register)
									})
								])))
					]))
			]),
		jt: 'Register'
	};
};
var $author$project$Pages$Register$page = $author$project$Spa$Page$application(
	{h_: $author$project$Pages$Register$init, h9: $author$project$Pages$Register$load, iQ: $author$project$Pages$Register$save, ja: $author$project$Pages$Register$subscriptions, jC: $author$project$Pages$Register$update, jD: $author$project$Pages$Register$view});
var $author$project$Pages$Top$init = F2(
	function (shared, url) {
		return _Utils_Tuple2(
			{bv: url, gw: shared.gw},
			function () {
				if (!shared.fX) {
					var _v0 = shared.gw;
					if (!_v0.$) {
						return A2($author$project$Utils$Route$navigate, url.h7, 1);
					} else {
						return $elm$core$Platform$Cmd$none;
					}
				} else {
					return $elm$core$Platform$Cmd$none;
				}
			}());
	});
var $author$project$Pages$Top$load = F2(
	function (shared, model) {
		return _Utils_Tuple2(
			model,
			function () {
				if (!shared.fX) {
					var _v0 = shared.gw;
					if (!_v0.$) {
						return A2($author$project$Utils$Route$navigate, model.bv.h7, 1);
					} else {
						return $elm$core$Platform$Cmd$none;
					}
				} else {
					return $elm$core$Platform$Cmd$none;
				}
			}());
	});
var $author$project$Pages$Top$save = F2(
	function (model, shared) {
		return shared;
	});
var $author$project$Pages$Top$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Pages$Top$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
	});
var $author$project$Pages$Top$view = function (_v0) {
	return {
		bc: _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$column,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
					]),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$family(
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Font$typeface('Noto Serif'),
										$mdgriffith$elm_ui$Element$Font$serif
									])),
								$mdgriffith$elm_ui$Element$height(
								A2($mdgriffith$elm_ui$Element$minimum, 1000, $mdgriffith$elm_ui$Element$fill)),
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
							]),
						A2(
							$mdgriffith$elm_ui$Element$column,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$centerX,
									$mdgriffith$elm_ui$Element$centerY,
									$mdgriffith$elm_ui$Element$spacing(10)
								]),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$centerX,
											$mdgriffith$elm_ui$Element$Font$size(80)
										]),
									$mdgriffith$elm_ui$Element$text('Homework Organizer')),
									A2(
									$mdgriffith$elm_ui$Element$paragraph,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$centerX,
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
											$mdgriffith$elm_ui$Element$Font$center,
											A2($mdgriffith$elm_ui$Element$paddingXY, 10, 0)
										]),
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text('not to be confused with: ')),
											A2(
											$mdgriffith$elm_ui$Element$link,
											_List_Nil,
											{
												h8: A2(
													$mdgriffith$elm_ui$Element$el,
													_List_fromArray(
														[$mdgriffith$elm_ui$Element$Font$underline]),
													$mdgriffith$elm_ui$Element$text('schule.3nt3.de')),
												bv: 'https://schule.3nt3.de'
											})
										])),
									A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$centerX,
											$mdgriffith$elm_ui$Element$Font$size(30),
											$mdgriffith$elm_ui$Element$Font$family(
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$Font$typeface('Source Sans Pro')
												])),
											$mdgriffith$elm_ui$Element$Font$bold,
											$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$blueColor),
											$mdgriffith$elm_ui$Element$Font$color(
											A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
											$mdgriffith$elm_ui$Element$padding(5),
											$mdgriffith$elm_ui$Element$Border$rounded(5)
										]),
									$mdgriffith$elm_ui$Element$text('Beta v0.8.5'))
								]))),
						A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$family(
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Font$typeface('Noto Serif'),
										$mdgriffith$elm_ui$Element$Font$serif
									])),
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$darkGreyColor),
								$mdgriffith$elm_ui$Element$Font$color(
								A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
							]),
						A2(
							$mdgriffith$elm_ui$Element$column,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$padding(100),
									$mdgriffith$elm_ui$Element$spacing(10)
								]),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Font$size(60)
										]),
									$mdgriffith$elm_ui$Element$text('About')),
									A2(
									$mdgriffith$elm_ui$Element$el,
									_List_Nil,
									A2(
										$mdgriffith$elm_ui$Element$paragraph,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$Font$size(24)
											]),
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$text('This is a tool created to help you organize homework assignments collaboratively with your classmates.')
											])))
								])))
					]))
			]),
		jt: 'dwb?'
	};
};
var $author$project$Pages$Top$page = $author$project$Spa$Page$application(
	{h_: $author$project$Pages$Top$init, h9: $author$project$Pages$Top$load, iQ: $author$project$Pages$Top$save, ja: $author$project$Pages$Top$subscriptions, jC: $author$project$Pages$Top$update, jD: $author$project$Pages$Top$view});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Tuple$mapBoth = F3(
	function (funcA, funcB, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			funcA(x),
			funcB(y));
	});
var $author$project$Spa$Url$toQueryDict = function (queryString) {
	var second = A2(
		$elm$core$Basics$composeR,
		$elm$core$List$drop(1),
		$elm$core$List$head);
	var toTuple = function (list) {
		return A2(
			$elm$core$Maybe$map,
			function (first) {
				return _Utils_Tuple2(
					first,
					A2(
						$elm$core$Maybe$withDefault,
						'',
						second(list)));
			},
			$elm$core$List$head(list));
	};
	var decode = A2(
		$elm$core$Basics$composeR,
		$elm$url$Url$percentDecode,
		$elm$core$Maybe$withDefault(''));
	return $elm$core$Dict$fromList(
		A2(
			$elm$core$List$map,
			A2($elm$core$Tuple$mapBoth, decode, decode),
			A2(
				$elm$core$List$filterMap,
				toTuple,
				A2(
					$elm$core$List$map,
					$elm$core$String$split('='),
					A2($elm$core$String$split, '&', queryString)))));
};
var $author$project$Spa$Url$create = F3(
	function (params, key, url) {
		return {
			h7: key,
			iE: params,
			eu: A2(
				$elm$core$Maybe$withDefault,
				$elm$core$Dict$empty,
				A2($elm$core$Maybe$map, $author$project$Spa$Url$toQueryDict, url.eu)),
			f8: url
		};
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$core$Platform$Sub$map = _Platform_map;
var $mdgriffith$elm_ui$Element$map = $mdgriffith$elm_ui$Internal$Model$map;
var $author$project$Spa$Document$map = F2(
	function (fn, doc) {
		return {
			bc: A2(
				$elm$core$List$map,
				$mdgriffith$elm_ui$Element$map(fn),
				doc.bc),
			jt: doc.jt
		};
	});
var $author$project$Spa$Generated$Pages$upgrade = F3(
	function (toModel, toMsg, page) {
		var update_ = F2(
			function (msg, model) {
				return A3(
					$elm$core$Tuple$mapBoth,
					toModel,
					$elm$core$Platform$Cmd$map(toMsg),
					A2(page.jC, msg, model));
			});
		var load_ = F2(
			function (model, shared) {
				return A3(
					$elm$core$Tuple$mapBoth,
					toModel,
					$elm$core$Platform$Cmd$map(toMsg),
					A2(page.h9, shared, model));
			});
		var init_ = F2(
			function (params, shared) {
				return A3(
					$elm$core$Tuple$mapBoth,
					toModel,
					$elm$core$Platform$Cmd$map(toMsg),
					A2(
						page.h_,
						shared,
						A3($author$project$Spa$Url$create, params, shared.h7, shared.bv)));
			});
		var bundle_ = function (model) {
			return {
				h9: function (_v0) {
					return load_(model);
				},
				iQ: function (_v1) {
					return page.iQ(model);
				},
				ja: function (_v2) {
					return A2(
						$elm$core$Platform$Sub$map,
						toMsg,
						page.ja(model));
				},
				jD: function (_v3) {
					return A2(
						$author$project$Spa$Document$map,
						toMsg,
						page.jD(model));
				}
			};
		};
		return {aq: bundle_, h_: init_, jC: update_};
	});
var $author$project$Spa$Generated$Pages$pages = {
	c0: A3($author$project$Spa$Generated$Pages$upgrade, $author$project$Spa$Generated$Pages$Dashboard__Model, $author$project$Spa$Generated$Pages$Dashboard__Msg, $author$project$Pages$Dashboard$page),
	c1: A3($author$project$Spa$Generated$Pages$upgrade, $author$project$Spa$Generated$Pages$Dashboard__Admin__Model, $author$project$Spa$Generated$Pages$Dashboard__Admin__Msg, $author$project$Pages$Dashboard$Admin$page),
	c2: A3($author$project$Spa$Generated$Pages$upgrade, $author$project$Spa$Generated$Pages$Dashboard__Moodle__Model, $author$project$Spa$Generated$Pages$Dashboard__Moodle__Msg, $author$project$Pages$Dashboard$Moodle$page),
	de: A3($author$project$Spa$Generated$Pages$upgrade, $author$project$Spa$Generated$Pages$Login__Model, $author$project$Spa$Generated$Pages$Login__Msg, $author$project$Pages$Login$page),
	di: A3($author$project$Spa$Generated$Pages$upgrade, $author$project$Spa$Generated$Pages$NotFound__Model, $author$project$Spa$Generated$Pages$NotFound__Msg, $author$project$Pages$NotFound$page),
	dq: A3($author$project$Spa$Generated$Pages$upgrade, $author$project$Spa$Generated$Pages$Register__Model, $author$project$Spa$Generated$Pages$Register__Msg, $author$project$Pages$Register$page),
	cF: A3($author$project$Spa$Generated$Pages$upgrade, $author$project$Spa$Generated$Pages$Top__Model, $author$project$Spa$Generated$Pages$Top__Msg, $author$project$Pages$Top$page)
};
var $author$project$Spa$Generated$Pages$init = function (route) {
	switch (route) {
		case 0:
			return $author$project$Spa$Generated$Pages$pages.cF.h_(0);
		case 1:
			return $author$project$Spa$Generated$Pages$pages.c0.h_(0);
		case 2:
			return $author$project$Spa$Generated$Pages$pages.de.h_(0);
		case 3:
			return $author$project$Spa$Generated$Pages$pages.di.h_(0);
		case 4:
			return $author$project$Spa$Generated$Pages$pages.dq.h_(0);
		case 5:
			return $author$project$Spa$Generated$Pages$pages.c1.h_(0);
		default:
			return $author$project$Spa$Generated$Pages$pages.c2.h_(0);
	}
};
var $author$project$Main$init = F3(
	function (flags, url, key) {
		var _v0 = A3($author$project$Shared$init, flags, url, key);
		var shared = _v0.a;
		var sharedCmd = _v0.b;
		var _v1 = A2(
			$author$project$Spa$Generated$Pages$init,
			$author$project$Main$fromUrl(url),
			shared);
		var page = _v1.a;
		var pageCmd = _v1.b;
		return _Utils_Tuple2(
			A2($author$project$Main$Model, shared, page),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$core$Platform$Cmd$map, $author$project$Main$Shared, sharedCmd),
						A2($elm$core$Platform$Cmd$map, $author$project$Main$Pages, pageCmd)
					])));
	});
var $author$project$Shared$Resize = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$browser$Browser$Events$Window = 1;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {f1: pids, gr: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {fi: event, h7: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.f1,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.h7;
		var event = _v0.fi;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.gr);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Shared$subscriptions = function (_v0) {
	return $elm$browser$Browser$Events$onResize(
		F2(
			function (w, h) {
				return A2($author$project$Shared$Resize, w, h);
			}));
};
var $author$project$Spa$Generated$Pages$bundle = function (bigModel) {
	switch (bigModel.$) {
		case 0:
			var model = bigModel.a;
			return $author$project$Spa$Generated$Pages$pages.cF.aq(model);
		case 1:
			var model = bigModel.a;
			return $author$project$Spa$Generated$Pages$pages.c0.aq(model);
		case 2:
			var model = bigModel.a;
			return $author$project$Spa$Generated$Pages$pages.de.aq(model);
		case 3:
			var model = bigModel.a;
			return $author$project$Spa$Generated$Pages$pages.di.aq(model);
		case 4:
			var model = bigModel.a;
			return $author$project$Spa$Generated$Pages$pages.dq.aq(model);
		case 5:
			var model = bigModel.a;
			return $author$project$Spa$Generated$Pages$pages.c1.aq(model);
		default:
			var model = bigModel.a;
			return $author$project$Spa$Generated$Pages$pages.c2.aq(model);
	}
};
var $author$project$Spa$Generated$Pages$subscriptions = function (model) {
	return $author$project$Spa$Generated$Pages$bundle(model).ja(0);
};
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$Shared,
				$author$project$Shared$subscriptions(model.am)),
				A2(
				$elm$core$Platform$Sub$map,
				$author$project$Main$Pages,
				$author$project$Spa$Generated$Pages$subscriptions(model.aB))
			]));
};
var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$AllowHover = 1;
var $mdgriffith$elm_ui$Internal$Model$Layout = 0;
var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
	g0: $elm$core$Maybe$Nothing,
	g6: $elm$core$Maybe$Nothing,
	i_: $elm$core$Maybe$Just(
		{
			bA: 0,
			bB: A4($mdgriffith$elm_ui$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			b: _Utils_Tuple2(0, 0),
			gk: 3
		})
};
var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 0:
					var hoverable = opt.a;
					var _v4 = record.hS;
					if (_v4.$ === 1) {
						return _Utils_update(
							record,
							{
								hS: $elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 1:
					var focusStyle = opt.a;
					var _v5 = record.hJ;
					if (_v5.$ === 1) {
						return _Utils_update(
							record,
							{
								hJ: $elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _v6 = record.ie;
					if (_v6.$ === 1) {
						return _Utils_update(
							record,
							{
								ie: $elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			hJ: function () {
				var _v0 = record.hJ;
				if (_v0.$ === 1) {
					return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _v0.a;
					return focusable;
				}
			}(),
			hS: function () {
				var _v1 = record.hS;
				if (_v1.$ === 1) {
					return 1;
				} else {
					var hoverable = _v1.a;
					return hoverable;
				}
			}(),
			ie: function () {
				var _v2 = record.ie;
				if (_v2.$ === 1) {
					return 0;
				} else {
					var actualMode = _v2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			$elm$core$List$foldr,
			combine,
			{hJ: $elm$core$Maybe$Nothing, hS: $elm$core$Maybe$Nothing, ie: $elm$core$Maybe$Nothing},
			options));
};
var $mdgriffith$elm_ui$Internal$Model$toHtml = F2(
	function (mode, el) {
		switch (el.$) {
			case 0:
				var html = el.a;
				return html($mdgriffith$elm_ui$Internal$Model$asEl);
			case 1:
				var styles = el.a.gq;
				var html = el.a.hT;
				return A2(
					html,
					mode(styles),
					$mdgriffith$elm_ui$Internal$Model$asEl);
			case 2:
				var text = el.a;
				return $mdgriffith$elm_ui$Internal$Model$textElement(text);
			default:
				return $mdgriffith$elm_ui$Internal$Model$textElement('');
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = $mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _v0 = options.ie;
			if (_v0 === 1) {
				return $mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
			} else {
				return $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Internal$Model$toHtml,
			embedStyle,
			A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				attributes,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var $mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			$mdgriffith$elm_ui$Internal$Model$Typeface('Open Sans'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Helvetica'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Verdana'),
			$mdgriffith$elm_ui$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$bgColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0)),
				'background-color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontSize,
			$mdgriffith$elm_ui$Internal$Model$FontSize(20)),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontFamily,
			A2(
				$mdgriffith$elm_ui$Internal$Model$FontFamily,
				A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var $mdgriffith$elm_ui$Element$layoutWith = F3(
	function (_v0, attrs, child) {
		var options = _v0.iz;
		return A3(
			$mdgriffith$elm_ui$Internal$Model$renderRoot,
			options,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass(
					A2(
						$elm$core$String$join,
						' ',
						_List_fromArray(
							[$mdgriffith$elm_ui$Internal$Style$classes.iO, $mdgriffith$elm_ui$Internal$Style$classes.gY, $mdgriffith$elm_ui$Internal$Style$classes.i0]))),
				_Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)),
			child);
	});
var $mdgriffith$elm_ui$Element$layout = $mdgriffith$elm_ui$Element$layoutWith(
	{iz: _List_Nil});
var $author$project$Spa$Document$toBrowserDocument = function (doc) {
	return {
		bc: _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$layout,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
					]),
				A2(
					$mdgriffith$elm_ui$Element$column,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
						]),
					doc.bc))
			]),
		jt: doc.jt
	};
};
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $author$project$Spa$Generated$Pages$load = function (model) {
	return $author$project$Spa$Generated$Pages$bundle(model).h9(0);
};
var $author$project$Spa$Generated$Pages$save = function (model) {
	return $author$project$Spa$Generated$Pages$bundle(model).iQ(0);
};
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.f7;
		if (!_v0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.fn,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.eu,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.f2,
					_Utils_ap(http, url.ft)),
				url.f0)));
};
var $author$project$Shared$GotLogoutData = function (a) {
	return {$: 3, a: a};
};
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Shared$deleteCookie = _Platform_outgoingPort(
	'deleteCookie',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $elm$http$Http$expectBytesResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'arraybuffer',
			_Http_toDataView,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 4, a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$NetworkError = {$: 2};
var $elm$http$Http$Timeout = {$: 1};
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 0:
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 1:
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 2:
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 3:
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.eJ));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectWhatever = function (toMsg) {
	return A2(
		$elm$http$Http$expectBytesResponse,
		toMsg,
		$elm$http$Http$resolve(
			function (_v0) {
				return $elm$core$Result$Ok(0);
			}));
};
var $author$project$Api$Homework$User$logout = function (options) {
	return $elm$http$Http$riskyRequest(
		{
			bc: $elm$http$Http$emptyBody,
			bh: $elm$http$Http$expectWhatever(options.fT),
			bk: _List_Nil,
			bl: 'POST',
			bq: $elm$core$Maybe$Nothing,
			bt: $elm$core$Maybe$Nothing,
			bv: $author$project$Api$Api$apiAddress + '/user/logout'
		});
};
var $author$project$Shared$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var userData = msg.a;
				if (userData.$ === 3) {
					var user = userData.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								fX: false,
								gw: $elm$core$Maybe$Just(user)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{gw: $elm$core$Maybe$Nothing}),
						$elm$core$Platform$Cmd$none);
				}
			case 1:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{gw: $elm$core$Maybe$Nothing}),
					$author$project$Api$Homework$User$logout(
						{fT: $author$project$Shared$GotLogoutData}));
			case 2:
				var w = msg.a;
				var h = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							hw: $author$project$Shared$classifyDevice(
								{hP: h, jF: w})
						}),
					$elm$core$Platform$Cmd$none);
			case 3:
				return _Utils_Tuple2(
					model,
					$author$project$Shared$deleteCookie(0));
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{fX: true}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Spa$Generated$Pages$update = F2(
	function (bigMsg, bigModel) {
		var _v0 = _Utils_Tuple2(bigMsg, bigModel);
		_v0$7:
		while (true) {
			switch (_v0.a.$) {
				case 0:
					if (!_v0.b.$) {
						var msg = _v0.a.a;
						var model = _v0.b.a;
						return A2($author$project$Spa$Generated$Pages$pages.cF.jC, msg, model);
					} else {
						break _v0$7;
					}
				case 1:
					if (_v0.b.$ === 1) {
						var msg = _v0.a.a;
						var model = _v0.b.a;
						return A2($author$project$Spa$Generated$Pages$pages.c0.jC, msg, model);
					} else {
						break _v0$7;
					}
				case 2:
					if (_v0.b.$ === 2) {
						var msg = _v0.a.a;
						var model = _v0.b.a;
						return A2($author$project$Spa$Generated$Pages$pages.de.jC, msg, model);
					} else {
						break _v0$7;
					}
				case 3:
					if (_v0.b.$ === 3) {
						var msg = _v0.a.a;
						var model = _v0.b.a;
						return A2($author$project$Spa$Generated$Pages$pages.di.jC, msg, model);
					} else {
						break _v0$7;
					}
				case 4:
					if (_v0.b.$ === 4) {
						var msg = _v0.a.a;
						var model = _v0.b.a;
						return A2($author$project$Spa$Generated$Pages$pages.dq.jC, msg, model);
					} else {
						break _v0$7;
					}
				case 5:
					if (_v0.b.$ === 5) {
						var msg = _v0.a.a;
						var model = _v0.b.a;
						return A2($author$project$Spa$Generated$Pages$pages.c1.jC, msg, model);
					} else {
						break _v0$7;
					}
				default:
					if (_v0.b.$ === 6) {
						var msg = _v0.a.a;
						var model = _v0.b.a;
						return A2($author$project$Spa$Generated$Pages$pages.c2.jC, msg, model);
					} else {
						break _v0$7;
					}
			}
		}
		return _Utils_Tuple2(bigModel, $elm$core$Platform$Cmd$none);
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				if (!msg.a.$) {
					var url = msg.a.a;
					return _Utils_Tuple2(
						model,
						A2(
							$elm$browser$Browser$Navigation$pushUrl,
							model.am.h7,
							$elm$url$Url$toString(url)));
				} else {
					var href = msg.a.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(href));
				}
			case 1:
				var url = msg.a;
				var original = model.am;
				var shared = _Utils_update(
					original,
					{bv: url});
				var _v1 = A2(
					$author$project$Spa$Generated$Pages$init,
					$author$project$Main$fromUrl(url),
					shared);
				var page = _v1.a;
				var pageCmd = _v1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aB: page,
							am: A2($author$project$Spa$Generated$Pages$save, page, shared)
						}),
					A2($elm$core$Platform$Cmd$map, $author$project$Main$Pages, pageCmd));
			case 2:
				var sharedMsg = msg.a;
				var _v2 = A2($author$project$Shared$update, sharedMsg, model.am);
				var shared = _v2.a;
				var sharedCmd = _v2.b;
				var _v3 = A2($author$project$Spa$Generated$Pages$load, model.aB, shared);
				var page = _v3.a;
				var pageCmd = _v3.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aB: page, am: shared}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2($elm$core$Platform$Cmd$map, $author$project$Main$Shared, sharedCmd),
								A2($elm$core$Platform$Cmd$map, $author$project$Main$Pages, pageCmd)
							])));
			default:
				var pageMsg = msg.a;
				var _v4 = A2($author$project$Spa$Generated$Pages$update, pageMsg, model.aB);
				var page = _v4.a;
				var pageCmd = _v4.b;
				var shared = A2($author$project$Spa$Generated$Pages$save, page, model.am);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aB: page, am: shared}),
					A2($elm$core$Platform$Cmd$map, $author$project$Main$Pages, pageCmd));
		}
	});
var $author$project$Shared$Logout = {$: 1};
var $mdgriffith$elm_ui$Internal$Model$Left = 0;
var $mdgriffith$elm_ui$Element$alignLeft = $mdgriffith$elm_ui$Internal$Model$AlignX(0);
var $author$project$Shared$lighterGreyColor = A3($mdgriffith$elm_ui$Element$rgb255, 29, 32, 37);
var $author$project$Shared$OverrideRedirect = {$: 4};
var $author$project$Shared$navBarElement = F3(
	function (label, toMsg, url) {
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_Nil,
			A2(
				$mdgriffith$elm_ui$Element$link,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Events$onClick(
						toMsg($author$project$Shared$OverrideRedirect))
					]),
				{h8: label, bv: url}));
	});
var $author$project$Shared$viewHomeButton = A2(
	$mdgriffith$elm_ui$Element$row,
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$spacing(7)
		]),
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$text('hausis.3nt3.de'),
			A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$padding(3),
					$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$Colors$blueColor),
					$mdgriffith$elm_ui$Element$Font$color(
					A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1)),
					$mdgriffith$elm_ui$Element$Border$rounded(5)
				]),
			$mdgriffith$elm_ui$Element$text('v0.8.6'))
		]));
var $author$project$Shared$navBarView = F3(
	function (device, maybeUser, options) {
		return A2(
			function () {
				var _v0 = device.hg;
				if (!_v0) {
					return $mdgriffith$elm_ui$Element$column;
				} else {
					return $mdgriffith$elm_ui$Element$row;
				}
			}(),
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Background$color($author$project$Shared$lighterGreyColor),
					$mdgriffith$elm_ui$Element$Font$color(
					A3($mdgriffith$elm_ui$Element$rgb255, 255, 255, 255)),
					$mdgriffith$elm_ui$Element$Font$size(20),
					$mdgriffith$elm_ui$Element$Font$family(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$typeface('Source Sans Pro'),
							$mdgriffith$elm_ui$Element$Font$sansSerif
						])),
					$mdgriffith$elm_ui$Element$Font$semiBold,
					A2($mdgriffith$elm_ui$Element$paddingXY, 60, 30),
					$mdgriffith$elm_ui$Element$spacing(40),
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					$mdgriffith$elm_ui$Element$Font$center
				]),
			function () {
				if (!maybeUser.$) {
					return _List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Element$el,
							_Utils_ap(
								_List_fromArray(
									[$mdgriffith$elm_ui$Element$centerY]),
								function () {
									var _v2 = device.hg;
									if (!_v2) {
										return _List_fromArray(
											[
												$mdgriffith$elm_ui$Element$alignBottom,
												$mdgriffith$elm_ui$Element$paddingEach(
												{b8: 20, cp: 0, cy: 0, cF: 0})
											]);
									} else {
										return _List_fromArray(
											[$mdgriffith$elm_ui$Element$alignLeft]);
									}
								}()),
							A3($author$project$Shared$navBarElement, $author$project$Shared$viewHomeButton, options.jx, '/')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									function () {
									var _v3 = device.hg;
									if (!_v3) {
										return $mdgriffith$elm_ui$Element$alignBottom;
									} else {
										return $mdgriffith$elm_ui$Element$alignRight;
									}
								}()
								]),
							A3(
								$author$project$Shared$navBarElement,
								$mdgriffith$elm_ui$Element$text('dashboard'),
								options.jx,
								'/dashboard')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									function () {
									var _v4 = device.hg;
									if (!_v4) {
										return $mdgriffith$elm_ui$Element$alignBottom;
									} else {
										return $mdgriffith$elm_ui$Element$alignRight;
									}
								}(),
									$mdgriffith$elm_ui$Element$Events$onClick(
									options.jx($author$project$Shared$Logout))
								]),
							A3(
								$author$project$Shared$navBarElement,
								$mdgriffith$elm_ui$Element$text('logout'),
								options.jx,
								'/'))
						]);
				} else {
					return _List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									function () {
									var _v5 = device.hg;
									if (!_v5) {
										return $mdgriffith$elm_ui$Element$alignTop;
									} else {
										return $mdgriffith$elm_ui$Element$alignLeft;
									}
								}(),
									$mdgriffith$elm_ui$Element$centerY
								]),
							A3($author$project$Shared$navBarElement, $author$project$Shared$viewHomeButton, options.jx, '/')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									function () {
									var _v6 = device.hg;
									if (!_v6) {
										return $mdgriffith$elm_ui$Element$alignBottom;
									} else {
										return $mdgriffith$elm_ui$Element$alignRight;
									}
								}()
								]),
							A3(
								$author$project$Shared$navBarElement,
								$mdgriffith$elm_ui$Element$text('login'),
								options.jx,
								'/login')),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									function () {
									var _v7 = device.hg;
									if (_v7 === 2) {
										return $mdgriffith$elm_ui$Element$alignLeft;
									} else {
										return $mdgriffith$elm_ui$Element$alignBottom;
									}
								}(),
									$mdgriffith$elm_ui$Element$Font$underline
								]),
							A3(
								$author$project$Shared$navBarElement,
								$mdgriffith$elm_ui$Element$text('register'),
								options.jx,
								'/register'))
						]);
				}
			}());
	});
var $author$project$Shared$view = F2(
	function (_v0, model) {
		var page = _v0.aB;
		var toMsg = _v0.jx;
		return {
			bc: _List_fromArray(
				[
					A3(
					$author$project$Shared$navBarView,
					model.hw,
					model.gw,
					{jx: toMsg}),
					A2(
					$mdgriffith$elm_ui$Element$column,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
						]),
					page.bc)
				]),
			jt: page.jt
		};
	});
var $author$project$Spa$Generated$Pages$view = function (model) {
	return $author$project$Spa$Generated$Pages$bundle(model).jD(0);
};
var $author$project$Main$view = function (model) {
	return A2(
		$author$project$Shared$view,
		{
			aB: A2(
				$author$project$Spa$Document$map,
				$author$project$Main$Pages,
				$author$project$Spa$Generated$Pages$view(model.aB)),
			jx: $author$project$Main$Shared
		},
		model.am);
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{
		h_: $author$project$Main$init,
		iw: $author$project$Main$UrlChanged,
		ix: $author$project$Main$LinkClicked,
		ja: $author$project$Main$subscriptions,
		jC: $author$project$Main$update,
		jD: A2($elm$core$Basics$composeR, $author$project$Main$view, $author$project$Spa$Document$toBrowserDocument)
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (width) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (height) {
					return $elm$json$Json$Decode$succeed(
						{hP: height, jF: width});
				},
				A2($elm$json$Json$Decode$field, 'height', $elm$json$Json$Decode$int));
		},
		A2($elm$json$Json$Decode$field, 'width', $elm$json$Json$Decode$int)))(0)}});}(this));