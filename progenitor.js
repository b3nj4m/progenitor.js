/*!
 * progenitor.js (c) 2015 Brian Norton
 * This library may be freely distributed under the MIT license.
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.progenitor = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var undefined;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	'use strict';
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var has_own_constructor = hasOwn.call(obj, 'constructor');
	var has_is_property_of_method = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !has_own_constructor && !has_is_property_of_method) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {}

	return key === undefined || hasOwn.call(obj, key);
};

module.exports = function extend() {
	'use strict';
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0],
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && isArray(src) ? src : [];
					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[name] = extend(deep, clone, copy);

				// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};


},{}],2:[function(require,module,exports){
var noop = function() {},
  extend = require('extend');

progenitor = function(baseClass) {
  baseClass.classMethods || (baseClass.classMethods = {});
  baseClass.classMethods.inherited || (baseClass.classMethods.inherited = noop);

  baseClass.instanceMethods || (baseClass.instanceMethods = {});
  baseClass.instanceMethods.init || (baseClass.instanceMethods.init = noop);

  return function(newClassName, methods, options) {
    methods = ((typeof methods == 'function') ? methods() : methods) || {};
    options = ((typeof options == 'function') ? options() : options) || {};

    options.classMethods || (options.classMethods = {});

    var klass = function(isDefinition) {
      if(isDefinition === 'prototype-definition') return;

      baseClass.instanceMethods.init.apply(this, arguments); // instance.super.init
      instanceMethods.init.apply(this, arguments); // instance.init
    };

    var callSuperClass = function(name) { return baseClass.classMethods[name] && baseClass.classMethods[name].apply(this, Array.prototype.slice.call(arguments, 1));},
      defaultClassMethods = { class: baseClass, className: newClassName, super: callSuperClass, progeny: progenitor(klass) },
      classMethods = extend({}, baseClass.classMethods, defaultClassMethods, options.classMethods);

    extend(klass, klass.classMethods = classMethods);

    var callSuperInstance = function(name) { return baseClass.instanceMethods[name] && baseClass.instanceMethods[name].apply(this, Array.prototype.slice.call(arguments, 1));},
      defaultInstanceMethods = { constructor: baseClass, class: klass, className: newClassName, super: callSuperInstance, init: noop },
      instanceMethods = extend({}, baseClass.instanceMethods, defaultInstanceMethods, methods);

    klass.prototype = new baseClass('prototype-definition');

    extend(klass.prototype, klass.instanceMethods = instanceMethods);

    baseClass.classMethods.inherited.apply(baseClass, [klass]);

    return klass;
  }
};

exports = module.exports = progenitor;

},{"extend":1}]},{},[2])(2)
});