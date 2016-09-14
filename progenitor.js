var progenitorFactory = require('./lib/factory');

exports = module.exports = function() {
  if(!Object.progeny) {
    Object.progeny = progenitorFactory(Object);
    Object.progeny.cache = {};
    Object.progeny.factory = progenitorFactory;
  }

  Error.progeny || (Error.progeny = progenitorFactory(Error));
};
