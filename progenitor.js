var progenitorFactory = require('./lib/factory');

exports = module.exports = function() {
  Object.progeny || (Object.progeny = progenitorFactory(Object));
  Object.progeny.cache || (Object.progeny.cache = {});
  Error.progeny || (Error.progeny = progenitorFactory(Error));
};
