(function() {
  var assert, chromic, describe, errored, failed, indent, level, make_spyer, make_stubber, outdent, passed, pre, render;
  var __hasProp = Object.prototype.hasOwnProperty, __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (__hasProp.call(this, i) && this[i] === item) return i; } return -1; };

  assert = require('assert');

  require('./should_be');

  require('./should_contain');

  make_spyer = require('./spy').make_spyer;

  make_stubber = require('./stub').make_stubber;

  chromic = {};

  make_stubber(chromic);

  make_spyer(chromic);

  pre = "";

  level = 0;

  outdent = function() {
    level = level - 1;
    return pre = Array(level).join("  ");
  };

  indent = function() {
    level = level + 1;
    return pre = Array(level).join("  ");
  };

  render = function(s) {
    return console.log(s);
  };

  failed = function(should) {
    return "" + pre + "  " + should + " (\033[31m \u2716 \033[0m)";
  };

  errored = function(e) {
    return "" + pre + "\033[31m  \u21b3  " + e + " \033[0m";
  };

  passed = function(should) {
    return "" + pre + "  " + should + " (\033[32m \u2714 \033[0m)";
  };

  describe = function(what) {
    return "" + pre + "\033[33m" + what + "\033[0m";
  };

  chromic.reset = function() {
    this.undo = [];
    this.invokees = [];
    this.callees = [];
    return this.nega_callees = [];
  };

  chromic.it = function(should, spec, done) {
    var callee, fn, removed, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _results;
    chromic.reset();
    try {
      spec();
      _ref = chromic.invokees;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fn = _ref[_i];
        if (fn.invoked === false) throw "function not invoked";
      }
      render(passed(should));
      _ref2 = chromic.callees;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        callee = _ref2[_j];
        if (!(_ref3 = callee.key, __indexOf.call(callee.object.received, _ref3) >= 0)) {
          throw "object did not receive " + callee.key;
        }
      }
      _ref4 = chromic.nega_callees;
      _results = [];
      for (_k = 0, _len3 = _ref4.length; _k < _len3; _k++) {
        callee = _ref4[_k];
        if (_ref5 = callee.key, __indexOf.call(callee.object.received, _ref5) >= 0) {
          throw "object should not have received " + callee.key;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    } catch (e) {
      render(failed(should));
      return render(errored(e));
    } finally {
      _ref6 = chromic.undo;
      for (_l = 0, _len4 = _ref6.length; _l < _len4; _l++) {
        removed = _ref6[_l];
        removed["object"][removed["prop"]] = removed["original"];
      }
      if (typeof done === "function") done();
    }
  };

  chromic.describe = function(what, spec) {
    indent();
    render(describe(what));
    spec();
    return outdent();
  };

  (function() {
    var double, immediately;
    double = function() {
      var doubled, should_receive, shouldnt_receive;
      doubled = Object.create(this);
      Object.defineProperty(doubled, "received", {
        value: [],
        enumerable: false,
        writable: true
      });
      should_receive = function(property) {
        var receive, return_value;
        return_value = null;
        receive = function() {
          this.received.push(property);
          return return_value;
        };
        Object.defineProperty(this, property, {
          value: receive
        });
        chromic.callees.push({
          object: this,
          key: property
        });
        return {
          and_return: function(value) {
            return return_value = value;
          }
        };
      };
      shouldnt_receive = function(property) {
        var receive;
        receive = function() {
          this.received.push(property);
          return false;
        };
        Object.defineProperty(this, property, {
          value: receive
        });
        return chromic.nega_callees.push({
          object: this,
          key: property
        });
      };
      Object.defineProperty(doubled, "should_receive", {
        value: should_receive,
        enumerable: false
      });
      Object.defineProperty(doubled, "shouldnt_receive", {
        value: shouldnt_receive,
        enumerable: false
      });
      return doubled;
    };
    Object.defineProperty(Object.prototype, "double", {
      get: double,
      set: (function() {
        return false;
      }),
      enumerable: false
    });
    (function() {
      var should_throw;
      should_throw = function(expected_message) {
        return assert.throws(this, function(e) {
          return e.message === expected_message;
        });
      };
      return Object.defineProperty(Function.prototype, "should_throw", {
        value: should_throw,
        enumerable: false
      });
    })();
    Object.defineProperty(Object.prototype, "should_have_property", {
      value: (function(property) {
        return this.hasOwnProperty(property);
      }),
      enumerable: false
    });
    immediately = function() {
      return function(fn, trigger) {
        return fn();
      };
    };
    return Object.defineProperty(Object.prototype, "immediately", {
      get: immediately,
      set: (function() {
        return false;
      }),
      enumerable: false
    });
  })();

  exports.it = chromic.it;

  exports.describe = chromic.describe;

  exports.stub = chromic.stub;

}).call(this);
