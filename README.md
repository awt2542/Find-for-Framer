# $find for Framer.js

Inspired by jQuery's selectors, this module makes it easier to find and target layers in Framer.js based on the .name property.

![find](https://s3.amazonaws.com/f.cl.ly/items/3p3L1p1W0B412p0g3Q0p/Image%202016-01-01%20at%205.49.05%20em.png?v=87880c1f)

## Installation

1. Add the find.coffee file to the /modules directory inside your framer project.
2. Include it in your app.coffee file by adding ```{$find,$get} = require 'find'``` to the top of your code.

More info about modules in Framer and how to install them: [FramerJS Docs - Modules](http://framerjs.com/docs/#modules)


## Functions

**$find(string)** -
Returns an array of layers that match the string (case-sensitive). Use ```>``` for targeting descendant layers. ie. ```'overlay > btn'``` to target all ```btn``` layers somewhere below ```overlay``` in the hierachy. 

**$get(string)** -
Same as $find, but returns the first matching layer from the array.

## Examples

### Find all layers in a project
    for layer in $find()
        print layer

### Create custom naming schemes to define default behaviors
    for layer in $find '_hide'
    	layer.visible = false


### Specify using descendant selectors (>)

Find all layers below 'card1' that contains the string 'image':

    $find 'card1 > image'
    
Find all layers below 'card':

    $find 'card >'



##Contact

Twitter: [@andreaswah](http://twitter.com/andreaswah)
