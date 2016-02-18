_getHierarchy = (layer) ->
  string = ''
  for a in layer.ancestors()
    string = a.name+'>'+string
  return string = string+layer.name

_match = (hierarchy, string) ->
  # prepare regex tokens
  string = string.replace(/\s*>\s*/g,'>') # clean up spaces around arrows
  string = string.split('*').join('[^>]*') # asteriks as layer name wildcard
  string = string.split(' ').join('(?:.*)>') # space as structure wildcard
  string = string.split(',').join('$|') # allow multiple searches using comma
  regexString = "(^|>)"+string+"$" # always bottom layer, maybe part of hierarchy

  regExp = new RegExp(regexString) 
  return hierarchy.match(regExp)

_findAll = (selector, fromLayer) ->
  layers = Framer.CurrentContext.getLayers()

  if selector?
    layers = _.filter layers, (layer) ->
      hierarchy = _getHierarchy(layer)
      if fromLayer?
        _match(hierarchy, fromLayer.name+' '+selector)
      else
        _match(hierarchy, selector)
  else
    layers

# Recommended
exports.ƒ = (selector, fromLayer)  -> _findAll(selector, fromLayer)[0]
exports.ƒƒ = (selector, fromLayer) -> _findAll(selector, fromLayer)
Layer::ƒ  = (selector)             -> _findAll(selector, @)[0]
Layer::ƒƒ  = (selector)            -> _findAll(selector, @)

# Backwards compatibility
exports.Find    = (selector, fromLayer) -> _findAll(selector, fromLayer)[0]
exports.FindAll = (selector, fromLayer) -> _findAll(selector, fromLayer)
Layer::find     = (selector, fromLayer) -> _findAll(selector, @)[0]
Layer::findAll  = (selector, fromLayer) -> _findAll(selector, @)

###
Add ability to call layer methods and properties on all arrays, not just those returned by ƒ()
###

templateLayer = new Layer

# Add layer properties and methods
_.keys(Layer.prototype).forEach (k) ->
  if k is 'toInspect' then return
  if typeof templateLayer[k] is 'function'
    Object.defineProperty(Array.prototype, k, {
      enumerable: false
      configurable: true
      value: (params...) -> 
        _.each @, (l) -> l[k](params...) if l instanceof Layer
    })
  else
    Object.defineProperty(Array.prototype, k, {
      set: (newValue) ->
        _.each @, (l) ->
          l[k] = newValue if l instanceof Layer
      configurable: true
      enumerable: false
    })

# Add support for states
Object.defineProperty(Array.prototype, 'states', {
  get: -> 
    obj = {}
    _.keys(Object.getPrototypeOf(templateLayer.states)).forEach (k) =>
      obj[k] = (params...) =>
        _.each @, (l) -> l.states[k](params...)
    return obj
  configurable: true
  enumerable: false
})

templateLayer.destroy()