# TESTS
{ƒ,ƒƒ} = require 'findModule'
# Example layers
card = new Layer name: 'card'
close_btn = new Layer name: 'close_btn', superLayer: card
container = new Layer name: 'container', superLayer: card
publish_btn = new Layer name: 'publish_Btn', superLayer: container
cancel_btn = new Layer name: 'cancel_btn', superLayer: container
image = new Layer name: 'image', superLayer: container
remove_image_btn = new Layer name: 'remove_image_btn', superLayer: image

# Hierarchies for regex testing
# card
# card>close_btn
# card>container
# card>container>publish_Btn
# card>container>cancel_btn
# card>container>image
# card>container>image>remove_image_btn

assert = (obj) ->
  if _.isEqual(obj.result, obj.expected) is false
    print "TEST FAILED: #{obj.description}"

exports.runTests = ->

  assert
    description: 'get all layers'
    result: ƒƒ()
    expected: [card, close_btn, container, publish_btn, cancel_btn, image, remove_image_btn]

  assert
    description: 'multiple searches using comma'
    result: ƒƒ('card, image >*btn')
    expected: [card, remove_image_btn]

  assert
    description: 'get all layers directly under card'
    result: ƒƒ('card > *')
    expected: [close_btn, container]

  assert
    description: 'get all layers below card'
    result: ƒƒ('container *')
    expected: [publish_btn, cancel_btn, image, remove_image_btn]

  assert
    description: 'end of string without wildcard'
    result: ƒƒ('mage')
    expected: []

  assert
    description: 'end of string without wildcard and descendant'
    result: ƒƒ('image btn')
    expected: []

  assert
    description: 'direct parent'
    result: ƒƒ('card>container')
    expected: [container]

  assert
    description: 'direct parent + wildcard'
    result: ƒƒ('container>*btn')
    expected: [cancel_btn]

  assert
    description: 'from layer'
    result: container.ƒƒ('image')
    expected: [image,container]

  assert
    description: 'single item'
    result: ƒƒ('card')
    expected: [card]

  assert
    description: 'long distance'
    result: ƒƒ('card image')
    expected: [image]

  assert
    description: 'descendant layers with wildcard'
    result: ƒƒ('card container *btn')
    expected: [cancel_btn,remove_image_btn]

  assert
    description: 'containing'
    result: ƒƒ('*image*')
    expected: [image,remove_image_btn]