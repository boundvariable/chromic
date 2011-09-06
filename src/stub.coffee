assert = require 'assert'

make_stubber = (owner) ->
  stub = (method) ->
    (lambda) =>
      if @prototype
        owner.undo.push object: @prototype, prop: method, original: @[method]
        @prototype[method] = lambda
      else
        owner.undo.push object: @, prop: method, original: @[method]
        @[method] = lambda

  Object.defineProperty Object.prototype, "stub", { value: stub, enumerable: false }

exports.make_stubber = make_stubber