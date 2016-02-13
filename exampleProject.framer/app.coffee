# Find-For-Framer Example Project
# https://github.com/awt2542/Find-for-Framer

# Import the module
{Find, ƒ, FindAll, ƒƒ} = require 'findModule'

# https://dribbble.com/shots/2139142-Free-Happy-Manje
sketch = Framer.Importer.load("imported/selectProject@2x")

# Setup animation
swing = (layer) ->
	layer.originY = .8
	layer.animate
		properties: {rotation: -360}
		time: 1.5
		repeat: 999

# Return an array of happy emojis below item1
for layer in FindAll('item1 > happy*')
	swing(layer)
	
# Return the first layer matching the selector
Find('item1 > happybagel').hueRotate = 100

### 

More selectors to try
FindAll('item2 > *, item3 > *')
FindAll('happy*')
FindAll('*burger')
FindAll('item1 happy*')
FindAll('artboard > happy*')

Use the florin sign as a shortcut (option + f)
eg. ƒ('item3 > happymilk')

ƒ() = Find()
ƒƒ() = FindAll()

###