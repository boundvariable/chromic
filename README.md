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
* It's still early days. Expect changes. Problems.
* I used underscores instead of camelcase

If you don't like any of the above then don't use it. Except for the underscores, I might have to assimilate there.

## What does it look like?

```
describe "true", ->
  it "should be true", ->
    true.should_be true
```

## What else?

### Stubs

```
describe "stubs", ->
  it "should create a method stub on object", ->
    x = {stubbed: -> false }
    x.stub("stubbed") -> true
    x.stubbed().should_be true
```

### Expectations
```
describe "should_receive", ->
  it "should have method call expectation", ->
    x = fn: -> "zork"
    x_double = x.double
    x_double.should_receive("fn").and_return 4
    x_double.fn().should_be 4
```

### Function spies

```
describe "function spies", ->
  it "should spy on a function", ->
    closed_over = 0
    fn = -> closed_over = 4
    fn = fn.spy
    fn.should_be_invoked
    fn()
    closed_over.should_be 4
```

## What next?

Integrating with JSDOM. I'm sick of having to fire up a browser to test stuff that should not be browser specific.

## Is it on npm?

Yes ```npm install chromic```