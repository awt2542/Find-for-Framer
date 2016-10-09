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
  layers = Framer.CurrentContext._layers

  if selector?
    stringNeedsRegex = _.find ['*',' ','>',','], (c) -> _.includes selector,c
    unless stringNeedsRegex or fromLayer
      layers = _.filter layers, (layer) -> 
        if layer.name is selector then true
    else
      layers = _.filter layers, (layer) ->
          hierarchy = _getHierarchy(layer)
          if fromLayer?
            _match(hierarchy, fromLayer.name+' '+selector)
          else
            _match(hierarchy, selector)
  else
    layers


# Global
exports.Find    = (selector, fromLayer) -> _findAll(selector, fromLayer)[0]
exports.ƒ       = (selector, fromLayer) -> _findAll(selector, fromLayer)[0]

exports.FindAll = (selector, fromLayer) -> _findAll(selector, fromLayer)
exports.ƒƒ      = (selector, fromLayer) -> _findAll(selector, fromLayer)

# Methods
Layer::find     = (selector, fromLayer) -> _findAll(selector, @)[0]
Layer::ƒ        = (selector, fromLayer) -> _findAll(selector, @)[0]

Layer::findAll  = (selector, fromLayer) -> _findAll(selector, @)
Layer::ƒƒ       = (selector, fromLayer) -> _findAll(selector, @)