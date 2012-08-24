
make_spyer = (owner) ->
  spy = ->
    old_fn = @
    new_fn = (args...) ->
      Object.defineProperty new_fn, "invoked", {value:true}
      old_fn args...
    expect_invoke = ->
      owner.invokees.push @
      Object.defineProperty new_fn, "invoked", {value:false, enumerable:false, configurable: true}
    Object.defineProperty new_fn, "should_be_invoked", {get: expect_invoke, enumerable: false}
    Object.defineProperty new_fn, "shouldBeInvoked", {get: expect_invoke, enumerable: false}

    new_fn

  Object.defineProperty Function.prototype, "spy", {get: spy, enumerable:false}

exports.make_spyer = make_spyer