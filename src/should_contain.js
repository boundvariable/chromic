(function() {
  var assert;
  var __hasProp = Object.prototype.hasOwnProperty, __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (__hasProp.call(this, i) && this[i] === item) return i; } return -1; };

  assert = require('assert');

  (function() {
    var array_should_contain, array_shouldnt_contain;
    array_should_contain = function(value) {
      return assert.ok((__indexOf.call(this, value) >= 0));
    };
    Object.defineProperty(Array.prototype, "should_contain", {
      value: array_should_contain,
      enumerable: false
    });
    array_shouldnt_contain = function(value) {
      return assert.ok(!(__indexOf.call(this, value) >= 0));
    };
    return Object.defineProperty(Array.prototype, "shouldnt_contain", {
      value: array_shouldnt_contain,
      enumerable: false
    });
  })();

  (function() {
    var pair_in_object, should_contain, shouldnt_contain;
    pair_in_object = function(pair, object) {
      var k, v, _results;
      _results = [];
      for (k in object) {
        v = object[k];
        if (k in pair && pair[k] === v) {
          _results.push(true);
        } else {
          _results.push(false);
        }
      }
      return _results;
    };
    should_contain = function(object) {
      var haystack;
      haystack = pair_in_object(object, this);
      return assert.ok(__indexOf.call(haystack, true) >= 0);
    };
    Object.defineProperty(Object.prototype, "should_contain", {
      value: should_contain,
      enumerable: false
    });
    shouldnt_contain = function(value) {
      return assert.ok(!(__indexOf.call(this, value) >= 0));
    };
    return Object.defineProperty(Object.prototype, "shouldnt_contain", {
      value: shouldnt_contain,
      enumerable: false
    });
  })();

}).call(this);
