# Find for Framer

Inspired by CSS selectors, this module makes it easier to find and target layers based on the .name property.

#### Basic examples
```coffeescript
# florin sign (option+f)
ƒ('card') # returns the first layer named "card" (case-sensitive)
ƒƒ('card') # returns an array with all layers named "card"
ƒƒ('card > image') # all layers named "image" and direct descendants of layers named "card"
ƒƒ('card image') # all layers named "image" and descendants of layers named "card"
ƒƒ('card, image') # all layers named "card" and all layers named "image"
ƒƒ('card*') # all layers with names starting with "card". eg. card1,card2,card3 etc.
page.currentPage.ƒƒ('card') #  all layers named "card" and descendants of the current page
```

#### Installation

1. Download findModule.coffee and add it to your project's module folder
2. Add ```{ƒ,ƒƒ} = require 'findModule'``` to the top of your code
3. Make sure you're running the latest version of Framer.js: File -> Update Framer...

More info: [Framer Docs - Modules](http://framerjs.com/docs/#modules.modules)

#### Reference
```coffeescript
# the find functions (ƒ = option+f)
ƒƒ(selector) # Returns array of layers matching the selector
ƒ(selector) # Same as above but returns first match
layer.ƒƒ(selector) # only search descendants of layer
layer.ƒ(selector) # same as layer.ƒƒ(), but returns first match
```

| Selector      |  Result |
| ------------- | ------------- |
| A    | Any layer named A |
| A B    | Any layer named B that is a descendant of a layer named A (that is: a child, or a child of a child, etc.)  |
| A > B  | Any layer named B that is a child (i.e. direct child) of a layer named A  |
| A, B  | Any layer named A or any layer named B |
| *  | Any layer (wildcard character) |

#### More examples
```coffeescript
ƒƒ() # find all layers in your project
ƒƒ('card > *') # find all layers that are direct descendants of layers named "card"
ƒƒ('card *') # find all layers that are descendants of layers named "card"
ƒƒ('*image*') # find all layers containing "image"
ƒƒ('*card*,*image*') # find all layers containing either "card" or "image"
ƒƒ('card1 > container *') # find all descendant layers of the "container" inside "card1"

# Add a "slide in" animation to all layers ending with "_slideIn"
for layer in ƒƒ('*_slideIn')
    originalValue = layer.maxX
    layer.maxX = 0
    layer.animate
        properties:
            maxX: originalValue
            
# Target layers not stored in a variable
for i in [0..5]
    new Layer
        name: item+i
        y: 100*i
        
ƒ('item2').x = 200
```

####Contact

Twitter: [@andreaswah](http://twitter.com/andreaswah)

####Thanks to
Jordan, Marc, David and Koen for early feedback!
