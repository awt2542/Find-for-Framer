getHierarchy = (layer, string = '') ->
  string = layer.name+string
  if layer.superLayer?
    string = '>'+string
    getHierarchy layer.superLayer, string
  else
    return string

match = (hierarchy, string) ->
  # prepare regex tokens
  cleanSpaces = string.replace(/\s*>\s*/g,'>') # clean up spaces around arrows
  wildcard = cleanSpaces.split('*').join('[^>]*') # asteriks as layer name wildcard
  descendants = wildcard.split(' ').join('(?:.*)>') # space as structure wildcard
  regexString = "(^|>)"+descendants+"$" # always bottom layer, maybe part of hierarchy

  regExp = new RegExp(regexString) 
  return hierarchy.match(regExp)

exports.Select = (selector, fromLayer) ->
  layers = Framer.CurrentContext.layers

  if selector?
    layers = _.filter layers, (layer) ->
      hierarchy = getHierarchy(layer)
      if fromLayer?
        match(hierarchy, fromLayer.name+' '+selector)
      else
        match(hierarchy, selector)
  else
    layers

Layer::select = (string) -> Select(string, @)
