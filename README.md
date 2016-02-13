# Find for Framer

Inspired by CSS selectors, this module makes it easier to find and target layers based on the .name property.

#### Basic examples
```coffeescript
FindAll('card') # returns an array with all layers named "card" (case-sensitive)
FindAll('card > image') # all layers named "image" and direct descendants of layers named "card"
FindAll('card image') # all layers named "image" and descendants of layers named "card"
FindAll('card, image') # all layers named "card" and all layers named "image"
FindAll('card*') # all layers with names starting with "card". eg. card1,card2,card3 etc.
Find('card3') # returns the first layer matching the name "card3"
page.currentPage.findAll('card') #  all layers named "card" and descendants of the current page
```
![findModule](https://s3.amazonaws.com/f.cl.ly/items/2T0P0s033S160O060l3K/findScreenshot.png?v=bfb59d28)

Try the example project: http://share.framerjs.com/oecn8w0szhkh/

#### Installation

1. Download [findModule.coffee](https://github.com/awt2542/Find-for-Framer/raw/master/findModule.coffee) to your project's /modules directory 
2. Add ```{Find, ƒ, FindAll, ƒƒ} = require 'findModule'``` to the top of your code
3. Make sure you're running the latest version of Framer.js. File -> Update Framer...

More info: [Framer Docs - Modules](http://framerjs.com/docs/#modules.modules)

#### Reference
```coffeescript
FindAll(selector) # returns array of layers matching the selector
Find(selector) # same as above, but returns first matching layer

layer.findAll(selector) # only search descendants of layer
layer.find(selector) # same as above, but returns first matching layer

# Shortcuts using the florin sign (option+f)
ƒ(selector) # Find()
ƒƒ(selector) # FindAll()
layer.ƒ(selector) # layer.find()
layer.ƒƒ(selector) # layer.findAll()
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
FindAll() # find all layers in your project
FindAll('card > *') # find all layers that are direct descendants of layers named "card"
FindAll('card *') # find all layers that are descendants of layers named "card"
FindAll('*image*') # find all layers containing "image"
FindAll('*card*,*image*') # find all layers containing either "card" or "image"
FindAll('card1 > container *') # find all descendant layers of the "container" inside "card1"

# Add a "slide in" animation to all layers ending with "_slideIn"
for layer in FindAll('*_slideIn')
    originalValue = layer.maxX
    layer.maxX = 0
    layer.animate
        properties:
            maxX: originalValue
            
# Florin sign (option+f) as a shortcut for Find()
for i in [0..5]
    temp = new Layer
        name: item+i
        y: 100*i
        
ƒ('item2').x = 200
```

####Contact

Twitter: [@andreaswah](http://twitter.com/andreaswah)

####Thanks to
Jordan, Marc, David and Koen for early feedback!
