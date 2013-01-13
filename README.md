[![build status](https://secure.travis-ci.org/boundvariable/chromic.png)](http://travis-ci.org/boundvariable/chromic)
```
      _                         _
  ___| |__  _ __ ___  _ __ ___ (_) ___
 / __| '_ \| '__/ _ \| '_ ` _ \| |/ __|
| (__| | | | | | (_) | | | | | | | (__
 \___|_| |_|_|  \___/|_| |_| |_|_|\___|

```

## What is it?

A small test framework written to test drive the code in CoffeeScript in Action.

* Chromic tests are written in Chromic
* It adds non-enumarable properties to Object.prototype (the horror!)
* It requires ES5

If you don't like any of the above then don't use it.

## What does it look like?

```
describe "true", ->
  it "should be true", ->
    true.shouldBe true
  it "shouldn't be false", ->
    true.shouldntBe false
```

## What else?

### Stubs

```
describe "stubs", ->
  it "should create a method stub on object", ->
    x = {stubbed: -> false }
    x.stub("stubbed") -> true
    x.stubbed().shouldBe true
```

### Expectations
```
describe "should_receive", ->
  it "should have method call expectation", ->
    x = fn: -> "zork"
    xDouble = x.double
    xDouble.shouldReceive("fn").andReturn 4
    xDouble.fn().shouldBe 4
```

### Function spies

```
describe "function spies", ->
  it "should spy on a function", ->
    closed_over = 0
    fn = -> closedOver = 4
    fn = fn.spy
    fn.shouldBeInvoked
    fn()
    closedOver.shouldBe 4
```

## Is it on npm?

Yes ```npm install chromic```