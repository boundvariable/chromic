(function() {
  var assert;

  assert = require('assert');

  (function() {
    var should_be, shouldnt_be;
    should_be = function(value) {
      if (typeof value === 'number' && isNaN(value)) {
        return assert.ok(isNaN(this));
      } else if (typeof value === 'object') {
        return assert.deepEqual(this, value);
      } else {
        return assert.equal(this, value);
      }
    };
    Object.defineProperty(Object.prototype, "should_be", {
      value: should_be,
      enumerable: false
    });
    shouldnt_be = function(value) {
      if (typeof value === 'number' && isNaN(value)) {
        return assert.ok(!isNaN(this));
      } else if (typeof value === 'object') {
        return assert.notDeepEqual(this, value);
      } else {
        return assert.notEqual(this, value);
      }
    };
    return Object.defineProperty(Object.prototype, "shouldnt_be", {
      value: shouldnt_be,
      enumerable: false
    });
  })();

}).call(this);
