module.exports = {
  get: function(name) {
    return Object.progeny.cache[name] || null;
  }
};
