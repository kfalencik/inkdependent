if (typeof Object.assign !== 'function') {
	// Must be writable: true, enumerable: false, configurable: true
	Object.defineProperty(Object, 'assign', {
		value: function assign(target) { // .length of function is 2
			'use strict';
			if (target === null) { // TypeError if undefined or null
				throw new TypeError('Cannot convert undefined or null to object');
			}

			var to = Object(target);

			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];

				if (nextSource !== null) { // Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		},
		writable: true,
		configurable: true
	});
}

if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
}

Number.isNaN = Number.isNaN || function(value) {
    return value !== value;
}

if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, pos) {
            pos = !pos || pos < 0 ? 0 : +pos;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}

if (!Array.prototype.fill) {
	Object.defineProperty(Array.prototype, 'fill', {
	  value: function(value) {

		// Steps 1-2.
		if (this === null) {
		  throw new TypeError('this is null or not defined');
		}

		var O = Object(this);

		// Steps 3-5.
		var len = O.length >>> 0;

		// Steps 6-7.
		var start = arguments[1];
		var relativeStart = start >> 0;

		// Step 8.
		var k = relativeStart < 0 ?
		  Math.max(len + relativeStart, 0) :
		  Math.min(relativeStart, len);

		// Steps 9-10.
		var end = arguments[2];
		var relativeEnd = end === undefined ?
		  len : end >> 0;

		// Step 11.
		var final = relativeEnd < 0 ?
		  Math.max(len + relativeEnd, 0) :
		  Math.min(relativeEnd, len);

		// Step 12.
		while (k < final) {
		  O[k] = value;
		  k++;
		}

		// Step 13.
		return O;
	  }
	});
  }

  if (!String.prototype.repeat) {
	String.prototype.repeat = function(count) {
	  'use strict';
	  if (this === null)
		throw new TypeError('can\'t convert ' + this + ' to object');

	  var str = '' + this;
	  // To convert string to integer.
	  count = +count;
	  // Check NaN
	  if (count != count)
		count = 0;

	  if (count < 0)
		throw new RangeError('repeat count must be non-negative');

	  if (count === Infinity)
		throw new RangeError('repeat count must be less than infinity');

	  count = Math.floor(count);
	  if (str.length === 0 || count === 0)
		return '';

	  // Ensuring count is a 31-bit integer allows us to heavily optimize the
	  // main part. But anyway, most current (August 2014) browsers can't handle
	  // strings 1 << 28 chars or longer, so:
	  if (str.length * count >= 1 << 28)
		throw new RangeError('repeat count must not overflow maximum string size');

	  var maxCount = str.length * count;
	  count = Math.floor(Math.log(count) / Math.log(2));
	  while (count) {
		 str += str;
		 count--;
	  }
	  str += str.substring(0, maxCount - str.length);
	  return str;
	}
  }
