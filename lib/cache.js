module.exports = {
  get: function(name) {
    return (progenyCache[name]) || null;
  }
};
