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
