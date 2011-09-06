assert = require 'assert'

do ->
  should_be = (value) ->
    if typeof value is 'number' and isNaN value
      assert.ok isNaN @
    else if typeof value == 'object'
      assert.deepEqual @, value
    else
      assert.equal @, value

  Object.defineProperty Object.prototype, "should_be", { value: should_be, enumerable: false }

  shouldnt_be = (value) ->
    if typeof value is 'number' and isNaN value
      assert.ok !isNaN(@)
    else if typeof value == 'object'
      assert.notDeepEqual @, value
    else
      assert.notEqual @, value

  Object.defineProperty Object.prototype, "shouldnt_be", { value: shouldnt_be, enumerable: false }
