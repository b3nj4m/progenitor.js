var noop = function() {},
  extend = require('extend');

var progenitorFactory = exports = module.exports = function(baseClass) {
  baseClass.classMethods || (baseClass.classMethods = {});
  baseClass.classMethods.inherited || (baseClass.classMethods.inherited = noop);

  baseClass.instanceMethods || (baseClass.instanceMethods = {});
  baseClass.instanceMethods.init || (baseClass.instanceMethods.init = noop);

  return function(newClassName, methods, options) { var klass;
    if(klass = Object.progeny.cache[newClassName]) {
      return klass;
    }

    methods = ((typeof methods == 'function') ? methods() : methods) || {};
    options = ((typeof options == 'function') ? options() : options) || {};

    options.classMethods || (options.classMethods = {});

    klass = function(isDefinition) {
      if(isDefinition === 'progeny-definition') return;

      baseClass.instanceMethods.init.apply(this, arguments); // instance.super.init
      instanceMethods.init.apply(this, arguments); // instance.init
    };

    var callSuperClass = function(name) { return baseClass.classMethods[name] && baseClass.classMethods[name].apply(this, getArgs(arguments));},
      defaultClassMethods = { class: baseClass, className: newClassName, super: callSuperClass, progeny: progenitorFactory(klass) },
      classMethods = extend({}, baseClass.classMethods, defaultClassMethods, options.classMethods);

    extend(klass, klass.classMethods = classMethods);

    var callSuperInstance = function(name) { return baseClass.instanceMethods[name] && baseClass.instanceMethods[name].apply(this, getArgs(arguments));},
      defaultInstanceMethods = { constructor: baseClass, class: klass, className: newClassName, super: callSuperInstance, init: noop },
      instanceMethods = extend({}, baseClass.instanceMethods, defaultInstanceMethods, methods);

    klass.prototype = new baseClass('progeny-definition');

    extend(klass.prototype, klass.instanceMethods = instanceMethods);

    baseClass.classMethods.inherited.call(baseClass, klass);

    return Object.progeny.cache[newClassName] = klass;
  }
};

function getArgs(args) {
  args = Array.prototype.slice.call(args, 1);

  return Object.prototype.toString.call(args[0]) === '[object Arguments]' ? args[0] : args;
}

exports = module.exports = progenitorFactory;
