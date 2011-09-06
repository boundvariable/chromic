(function() {
  var make_spyer;
  var __slice = Array.prototype.slice;
  make_spyer = function(owner) {
    var spy;
    spy = function() {
      var expect_invoke, new_fn, old_fn;
      old_fn = this;
      new_fn = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        Object.defineProperty(new_fn, "invoked", {
          value: true
        });
        return old_fn.apply(null, args);
      };
      expect_invoke = function() {
        owner.invokees.push(this);
        return Object.defineProperty(new_fn, "invoked", {
          value: false,
          enumerable: false,
          configurable: true
        });
      };
      Object.defineProperty(new_fn, "should_be_invoked", {
        get: expect_invoke,
        enumerable: false
      });
      return new_fn;
    };
    return Object.defineProperty(Function.prototype, "spy", {
      get: spy,
      enumerable: false
    });
  };
  exports.make_spyer = make_spyer;
}).call(this);
