assert = require 'assert'

do ->
  stub = (method) ->
    (lambda) =>
      if @prototype
        @prototype[method] = lambda
      else
        @[method] = lambda

  Object.defineProperty Object.prototype, "stub", { value: stub, enumerable: false }
