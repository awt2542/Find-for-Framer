# Select for Framer

Inspired by CSS selectors, this module makes it easier to find and target layers based on the .name property.

#### Basic examples
```coffeescript
Select('card') # find all layers named "card" (case-sensitive)
Select('card > image') # find all layers named "image" and direct descendants of layers named "card"
Select('card image') # find all layers named "image" and descendants of layers named "container"
Select('card, image') # find all layers named "card" and all layers named "image"
Select('card*') # find all layers with names starting with "card". eg. card1,card2,card3 etc.
page.currentPage.select('card') # find all layers named "card" and descendants of the current page
```
#### Reference
```coffeescript
Select(selectorString) # returns array of layers matching the selectorString
layer.select(selectorString) # only search descendants of layer
```

| Selector      |  Result |
| ------------- | ------------- |
| A    | Any layer named A |
| A B    | Any layer named B that is a descendant of a layer named A (that is: a subLayer, or a subLayer of a subLayer, etc.)  |
| A > B  | Any layer named B that is a subLayer (i.e. direct descendant) of a layer named A  |
| A, B  | Any layer named A or any layer named B |
| *  | Any layer (wildcard character) |

#### Installation

1. Add the Select.coffee file to the /modules directory inside your framer project.
2. Include it in your app.coffee file by adding ```{Select} = require 'Select'``` to the top of your code.

More info about modules in Framer and how to install them: [Framer Docs - Modules](http://framerjs.com/docs/#modules.modules)

#### More examples
```coffeescript
Select() # find all layers in your project
Select('card > *') # find all layers that are direct descendants of layers named "card"
Select('card *') # find all layers that are descendants of layers named "card"
Select('*image*') # find all layers containing "image"
Select('*card*,*image*') # find all layers containing either "card" or "image"
Select('card1 > container *') # find all descendant layers of the "container" inside "card1"

# Add a "slide in" animation to all layers ending with "_slideIn"
for layer in Select('*_slideIn')
    originalValue = layer.maxX
    layer.maxX = 0
    layer.animate
        properties:
            maxX: originalValue
```

####Contact

Twitter: [@andreaswah](http://twitter.com/andreaswah)
