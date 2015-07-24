var progenitorFactory = require('./lib/factory');

exports = module.exports = function() {
  Object.progeny || (Object.progeny = progenitorFactory(Object));
  Error.progeny || (Error.progeny = progenitorFactory(Error));
};
