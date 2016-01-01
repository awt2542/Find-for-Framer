# $find for Framer.js

Inspired by jQuery's selectors, this module makes it easier to find and target layers in Framer.js. Find all layers in your project, target layers that shares the same name, create custom naming schemes for default behaviors and more. This module requires the .name property to be set on your layers in order to find them (automatically done if you import from PS/Sketch).

![find](https://s3.amazonaws.com/f.cl.ly/items/3p3L1p1W0B412p0g3Q0p/Image%202016-01-01%20at%205.49.05%20em.png?v=87880c1f)

## Installation

1. Add the find.coffee file to the /modules directory inside your framer project.
2. Include it in your app.coffee file by adding ```{$find,$get} = require 'find'``` to the top of your code.

More info about modules in Framer and how to install them: [FramerJS Docs - Modules](http://framerjs.com/docs/#modules)


## Functions

**$find(string)**
Returns an array of layers containing the string. 

**$get(string)**
Same as $find, but returns the first matching layer.


## Examples

### Find all layers in a project
    for layer in $find()
        print layer

### Create custom naming schemes to dictate behaviors
    for l in $find '_hide' then l.visible = false
Find all layers containing the string '_hide'

### Specify your targeting using descendant selectors (>)
    $find 'card1 > image'
Find all layers below 'card1' that contains the string 'image'.

    $find 'card >'
Find all layers below layers matching 'card'.



##Contact

Twitter: [@andreaswah](http://twitter.com/andreaswah)
