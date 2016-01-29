# Select for Framer.js

Inspired by jQuery's selectors, this module makes it easier to find and target layers in Framer.js based on the .name property.

## Installation

1. Add the Select.coffee file to the /modules directory inside your framer project.
2. Include it in your app.coffee file by adding ```{Select} = require 'Select'``` to the top of your code.

More info about modules in Framer and how to install them: [FramerJS Docs - Modules](http://framerjs.com/docs/#modules.modules)

## Functions

**Select(string)** -
Returns an array of layers that match the string (case-sensitive). Use ``` ```(spacebar) for targeting descendant layers. Eg. ```'overlay btn'``` to target all ```btn``` layers somewhere below ```overlay``` in the hierachy.

**layer.select(string)** -
Start the search from ```layer```. Eg. page.currentPage.select('btn')

## Examples

### Find all layers in a project
    for layer in Select()
        print layer

### Create custom naming schemes to define default behaviors
    for layer in Select '*_hide'
    	layer.visible = false


### Specify using descendant selectors (>)

Find all layers below 'card1' that contains the string 'image':

    $find 'card1 > image'
    


##Contact

Twitter: [@andreaswah](http://twitter.com/andreaswah)
