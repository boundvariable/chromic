assert = require 'assert'
require './should_be'
require './should_contain'
make_spyer = require('./spy').make_spyer
make_stubber = require('./stub').make_stubber


chromic = {}

make_stubber chromic
make_spyer chromic

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

chromic.reset = ->
  @undo = []
  @invokees = []
  @callees = []
  @nega_callees = []

chromic.it = (should, spec, done) ->
  chromic.reset()
  try
    spec()
    for fn in chromic.invokees
      if fn.invoked == false then throw "function not invoked"
    render passed should
    for callee in chromic.callees
      if not (callee.key in callee.object.received)
        throw "object did not receive #{callee.key}"
    for callee in chromic.nega_callees
      if callee.key in callee.object.received
        throw "object should not have received #{callee.key}"
  catch e
    render failed should
    render errored e
  finally
    for removed in chromic.undo
      removed["object"][removed["prop"]] = removed["original"]
    done?()

chromic.describe = (what, spec) ->
  indent()
  render describe what
  spec()
  outdent()

do ->
  double = ->
    doubled = Object.create @

    Object.defineProperty doubled, "received", {value: [], enumerable: false, writable: true }

    should_receive = (property) ->
      return_value = null
      receive = ->
        @received.push property
        return_value

      Object.defineProperty @, property, { value: receive }

      chromic.callees.push { object: @, key: property }

      and_return: (value) ->
        return_value = value

    shouldnt_receive = (property) ->
      receive = ->
        @received.push property
        false
      Object.defineProperty @, property, { value: receive }
      chromic.nega_callees.push { object: @, key: property }

    Object.defineProperty doubled, "should_receive", { value: should_receive, enumerable: false }
    Object.defineProperty doubled, "shouldReceive", { value: should_receive, enumerable: false }

    Object.defineProperty doubled, "shouldnt_receive", { value: shouldnt_receive, enumerable: false }
    Object.defineProperty doubled, "shouldntReceive", { value: shouldnt_receive, enumerable: false }

    doubled

  Object.defineProperty Object.prototype, "double", { get: double, set: (-> false), enumerable: false }

  do ->
    should_throw = (expected_message) ->
      assert.throws @, (e) ->
        e.message is expected_message
    Object.defineProperty Function.prototype, "should_throw", { value: should_throw, enumerable: false }
    Object.defineProperty Function.prototype, "shouldThrow", { value: should_throw, enumerable: false }

  Object.defineProperty Object.prototype, "should_have_property", { value: ((property) -> @.hasOwnProperty property ), enumerable: false }
  Object.defineProperty Object.prototype, "shouldHaveProperty", { value: ((property) -> @.hasOwnProperty property ), enumerable: false }

  immediately = ->
    (fn, trigger) -> fn()

  Object.defineProperty Object.prototype, "immediately", { get: immediately, set: (-> false), enumerable: false }


exports.it = chromic.it
exports.describe = chromic.describe
exports.stub = chromic.stub

