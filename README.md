# Select for Framer

Inspired by CSS selectors, this module makes it easier to find and target layers based on the .name property.


#### Examples
```coffeescript
Select('card') # find all layers named "card" (case-sensitive)
Select('card > image') # find all layers named "image" and direct descandant of layers named "card"
Select('card image') # find all layers named "image" and descendants of layers named "container"
Select('card, image') # find all layers named "card" and all layers named "image"
Select('card*') # find all layers with names starting with "card". eg. card1,card2,card3 etc.
page.currentPage.select('card') # find all layers named "card" and descendants of the current page 

# use case example: add behaviors based on custom naming schemes
for layer in Select('*_hide')
    layer.visible = false

```
#### Documentation
```coffeescript
Select(selectorString) # returns array of layers matching the selectorString
layer.select(selectorString) # only search descendants of layer
```

| Supported selectors      |  Resulting array |
| ------------- | ------------- |
| A    | Any layer named A |
| A B    | Any layer named B that is a descendant of a layer named A (that is: a subLayer, or a subLayer of a subLayer, etc.)  |
| A > B  | Any layer named B that is a subLayer (i.e. direct descendant) of a layer named A  |
| A, B  | Any layer named A or any layer named B |
| *  | Any layer (wildcard character) |

## Installation

1. Add the Select.coffee file to the /modules directory inside your framer project.
2. Include it in your app.coffee file by adding ```{Select} = require 'Select'``` to the top of your code.

More info about modules in Framer and how to install them: [FramerJS Docs - Modules](http://framerjs.com/docs/#modules.modules)

##Contact

Twitter: [@andreaswah](http://twitter.com/andreaswah)
