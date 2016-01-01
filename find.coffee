exports.$find = (string) ->

  matchParents = (l, arr) ->
    if arr.length is 0 then return true
    if l.superLayer?
      if _.contains l.superLayer.name, _.last(arr).trim()
        arr.pop() # next
      matchParents l.superLayer, arr
      
  layers = Framer.CurrentContext.getLayers()
  
  if string?
    string = string.trim()
    stringArr = string.split('>')
    if stringArr.length > 1
      bottomLayerString = stringArr.pop()
      layers = _.filter layers, (layer) ->
        if _.contains layer.name, bottomLayerString.trim()
          if layer.superLayer?
            if matchParents layer, stringArr
              return true
    else
      layers = _.filter layers, (layer) -> 
        true if _.contains layer.name, string

  layers

exports.$get = (string) -> exports.$find(string)[0]