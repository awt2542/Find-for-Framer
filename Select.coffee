getHierarchy = (layer, string = '') ->
  string = layer.name+string
  if layer.superLayer?
    string = '>'+string
    getHierarchy layer.superLayer, string
  else
    return string

match = (hierarchy, string) ->
  # prepare regex tokens
  string = string.replace(/\s*>\s*/g,'>') # clean up spaces around arrows
  string = string.split('*').join('[^>]*') # asteriks as layer name wildcard
  string = string.split(' ').join('(?:.*)>') # space as structure wildcard
  string = string.split(',').join('$|') # allow multiple searches using comma
  regexString = "(^|>)"+string+"$" # always bottom layer, maybe part of hierarchy

  regExp = new RegExp(regexString) 
  return hierarchy.match(regExp)

exports.Select = (selector, fromLayer) ->
  layers = Framer.CurrentContext.getLayers()

  if selector?
    layers = _.filter layers, (layer) ->
      hierarchy = getHierarchy(layer)
      if fromLayer?
        match(hierarchy, fromLayer.name+' '+selector)
      else
        match(hierarchy, selector)
  else
    layers

exports.SelectOne = (selector, fromLayer) -> exports.Select(selector, fromLayer)[0]

Layer::select = (selector) -> exports.Select(selector, @)
Layer::selectOne = (selector) -> exports.Select(selector, @)[0]
