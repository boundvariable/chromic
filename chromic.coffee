
assert = require 'assert'
require './should_be.coffee'
require './should_contain.coffee'
require './stub.coffee'

Object.defineProperty String.prototype, "repeat", {value: (n) -> Array(n).join @ , enumerable: false}

chromic = {}

pre = ""

level = 0

outdent = ->
  level = level - 1
  pre = Array(level).join "  "

indent = ->
  level = level + 1
  pre = Array(level).join "  "

render = (s) ->
  console.log s

failed = (should) ->
  "#{pre}  #{should} (\033[31m \u2716 \033[0m)"

errored = (e) ->
  "#{pre}\033[31m  \u21b3  #{e} \033[0m"

passed = (should) ->
  "#{pre}  #{should} (\033[32m \u2714 \033[0m)"

describe = (what) ->
  "#{pre}\033[33m#{what}\033[0m"

chromic.it = (should, lambda) ->
  try
    do lambda
    for fn in chromic.invokees
      if fn.invoked == false then throw "function not invoked"
    render passed should
    for callee in chromic.callees
      if not (callee.key in callee.object.received) then throw "object did not receive #{callee.key}"
  catch e
    render failed should
    render errored e
  finally
    for removed in chromic.undo
      removed["object"].prototype[removed["method"]] = removed["original"]

chromic.describe = (what, lambda) ->
  do indent
  render describe what
  chromic.undo = []
  chromic.invokees = []
  chromic.callees = []
  do ->
    do lambda
    do outdent

do ->
  double = ->
    doubled = Object.create @

    Object.defineProperty doubled, "received", {value: [], enumerable: false, writable: true }

    should_receive = (property) ->
      return_value = null
      receive = ->
        @received.push property
        return_value

      Object.defineProperty @, property, {value: receive }

      chromic.callees.push { object: @, key: property }

      and_return: (value) ->
        return_value = value

    should_be_invoked = ->
      chromic.invokees.push @

    for property of @
      if typeof @[property] == "function"
        do =>
          original = @[property]
          proxy = ->
            proxy.invoked = true
          Object.defineProperty proxy, "invoked", {value: false, enumerable: false, writable: true }
          @[property] = proxy

        Object.defineProperty @[property], "should_be_invoked", { get: should_be_invoked, set: (-> false), enumerable: false }

    Object.defineProperty doubled, "should_receive", { value: should_receive, enumerable: false }

    doubled

  Object.defineProperty Object.prototype, "double", { get: double, set: (-> false), enumerable: false }

  do ->
    should_throw = (expected_message) ->
      assert.throws @, (e) ->
        e.message is expected_message
    Object.defineProperty Function.prototype, "should_throw", { value: should_throw, enumerable: false }

  Object.defineProperty Object.prototype, "should_have_property", { value: ((property) -> @.hasOwnProperty property ), enumerable: false }

  immediately = ->
    (fn, trigger) -> fn()

  Object.defineProperty Object.prototype, "immediately", { get: immediately, set: (-> false), enumerable: false }

  tee = (what) ->
    to: (object) ->
      #console.log object
      tee_fn = (teed_value) ->
        console.log "@"
        #object[what] = teed_value
        #@[what](teed_value)
      Object.defineProperty console, what, {value: tee_fn, enumerable: false }

  Object.defineProperty console, "tee", { value: tee, enumerable: false }



exports.it = chromic.it
exports.describe = chromic.describe
exports.stub = chromic.stub

