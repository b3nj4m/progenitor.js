module.exports = {
  get: function(name) {
    return (global.__progenyCache_ && global.__progenyCache_[name]) || null;
  }
};
