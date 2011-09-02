{it, stub, describe} = require '../chromic/chromic.coffee'

describe "chromic", ->
  it "should define a should_be property on Object.prototype", ->
    Object.prototype.should_have_property "should_be"

  describe "should_be", ->
    it "should be idempotent", ->
      0.should_be 0
      "idempotent".should_be "idempotent"
    it "should do deep array comparison", ->
      [1,2,3,4].should_be [1,2,3,4]
    it "should assert NaN", ->
      (3*'bork').should_be NaN

  it "should define a shouldnt_be property on Object.prototype", ->
    Object.prototype.should_have_property "shouldnt_be"

  describe "shouldnt_be", ->
    it "should compare numbers", ->
      1.shouldnt_be 0
    it "should compare to NaN", ->
      1.shouldnt_be NaN
    it "should do deep array comparison", ->
      [1,2,3,4].shouldnt_be [1,2,2,3]
    it "should require arrays to be in same order", ->
      [1,2,3,4].shouldnt_be [4,3,2,1]
    it "should work for null", ->
      4.shouldnt_be null

  describe "should_contain", ->
    it "should test in array", ->
      [1,3,2,6].should_contain 3
   
  describe "shouldnt_contain", ->
    it "should test exclusion", ->
      [1,2,3].shouldnt_contain 5

  describe "stub", ->
    it "should create a method stub on object", ->
      x = {}
      x.stub("test") -> 4
      x.test().should_be 4
    it "should create a method stub on constructor", ->
      Date.stub("getDay") -> 4
      today = new Date()
      today.getDay().should_be 4

  describe "double", ->
    it "should create a test double", ->
      x = a:1
      x_double = x.double
      x_double.a.should_be 1
    describe "should_receive", ->
      it "should have method call expectation", ->
        x = fn: "zork"
        x_double = x.double
        x_double.should_receive("fn").and_return 4
        x_double.fn().should_be 4
