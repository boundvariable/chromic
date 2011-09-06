assert = require 'assert'

do ->
  array_should_contain = (value) ->
    assert.ok (value in @)

  Object.defineProperty Array.prototype, "should_contain", { value: array_should_contain, enumerable: false }

  array_shouldnt_contain = (value) ->
    assert.ok !(value in @)

  Object.defineProperty Array.prototype, "shouldnt_contain", { value: array_shouldnt_contain, enumerable: false }

do ->
  pair_in_object = (pair, object) ->
    for k,v of object
      if k of pair and pair[k] is v
        true
      else
        false

  should_contain = (object) ->
    haystack = pair_in_object(object,@)
    assert.ok true in haystack

  Object.defineProperty Object.prototype, "should_contain", { value: should_contain, enumerable: false }

  shouldnt_contain = (value) ->
    assert.ok !(value in @)

  Object.defineProperty Object.prototype, "shouldnt_contain", { value: shouldnt_contain, enumerable: false }
