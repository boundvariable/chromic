// Generated by CoffeeScript 1.3.3
(function() {
  var make_stubber;

  make_stubber = function(owner) {
    var stub;
    stub = function(method) {
      var _this = this;
      return function(lambda) {
        if (_this.prototype) {
          owner.undo.push({
            object: _this.prototype,
            prop: method,
            original: _this[method]
          });
          return _this.prototype[method] = lambda;
        } else {
          owner.undo.push({
            object: _this,
            prop: method,
            original: _this[method]
          });
          return _this[method] = lambda;
        }
      };
    };
    return Object.defineProperty(Object.prototype, "stub", {
      value: stub,
      enumerable: false
    });
  };

  exports.make_stubber = make_stubber;

}).call(this);
