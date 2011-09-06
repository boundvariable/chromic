(function() {
  var assert, make_stubber;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  assert = require('assert');
  make_stubber = function(owner) {
    var stub;
    stub = function(method) {
      return __bind(function(lambda) {
        if (this.prototype) {
          owner.undo.push({
            object: this.prototype,
            prop: method,
            original: this[method]
          });
          return this.prototype[method] = lambda;
        } else {
          owner.undo.push({
            object: this,
            prop: method,
            original: this[method]
          });
          return this[method] = lambda;
        }
      }, this);
    };
    return Object.defineProperty(Object.prototype, "stub", {
      value: stub,
      enumerable: false
    });
  };
  exports.make_stubber = make_stubber;
}).call(this);
