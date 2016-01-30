# Select for Framer.js

Inspired by CSS selectors, this module makes it easier to find and target layers in Framer.js based on the .name property.

## Installation

1. Add the Select.coffee file to the /modules directory inside your framer project.
2. Include it in your app.coffee file by adding ```{Select} = require 'Select'``` to the top of your code.

More info about modules in Framer and how to install them: [FramerJS Docs - Modules](http://framerjs.com/docs/#modules.modules)

## Functions

**Select(string)** -
Returns an array of layers that match the string (case-sensitive). Use ``` ```(spacebar) for targeting descendant layers. Eg. ```'overlay btn'``` to target all ```btn``` layers somewhere below ```overlay``` in the hierachy.

**layer.select(string)** -
Start the search from ```layer```. Eg. ```page.currentPage.select('image')```

### Wildcard selectors (*)

Find all layers that ends with '_btn':

    Select '*_btn'

### Specify using descendant selectors (space)

Find all layers below 'card1' that contains the string 'image':

    Select 'card1 image'

### Specify using direct selectors (>)

Find all layers directly below 'card1' that contains the string 'image':

    Select 'card1 > image'
    
### Multiple searches (,)

Find layer matching two or more selectors

    Select 'popup, container, save_button'
    
### Combinations

Find all button layers inside the page named "first"

    Select 'pages > first *_btn'
    

##Contact

Twitter: [@andreaswah](http://twitter.com/andreaswah)
