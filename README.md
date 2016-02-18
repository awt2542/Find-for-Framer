# Find for Framer

Inspired by CSS selectors, this module makes it easier to find and target layers based on the .name property.

#### Basic examples
```coffeescript
# florin sign (option+f)
ƒ('card') # returns the first layer named "card" (case-sensitive)
ƒ('card') # returns an array with all layers named "card"
ƒ('card > image') # all layers named "image" and direct descendants of layers named "card"
ƒ('card image') # all layers named "image" and descendants of layers named "card"
ƒ('card, image') # all layers named "card" and all layers named "image"
ƒ('card*') # all layers with names starting with "card". eg. card1,card2,card3 etc.
page.currentPage.ƒ('card') #  all layers named "card" and descendants of the current page
```

#### Installation

1. Download findModule.coffee and add it to your project's module folder
2. Add ```{ƒ} = require 'findModule'``` to the top of your code
3. Make sure you're running the latest version of Framer.js: File -> Update Framer...

More info: [Framer Docs - Modules](http://framerjs.com/docs/#modules.modules)

#### Reference
```coffeescript
# the find functions (ƒ = option+f)
ƒ(selector) # Search layers based on selector. Returns array or Layer, depending on number of matches.
layer.ƒ(selector) # Only search descendants of layer.
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
ƒ() # find all layers in your project
ƒ('card > *') # find all layers that are direct descendants of layers named "card"
ƒ('card *') # find all layers that are descendants of layers named "card"
ƒ('*image*') # find all layers containing "image"
ƒ('*card*,*image*') # find all layers containing either "card" or "image"
ƒ('card1 > container *') # find all descendant layers of the "container" inside "card1"

# Add a "slide in" animation to all layers ending with "_slideIn"
for layer in ƒ('*_slideIn')
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
