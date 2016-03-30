require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"findModule":[function(require,module,exports){
var _findAll, _getHierarchy, _match;

_getHierarchy = function(layer) {
  var a, i, len, ref, string;
  string = '';
  ref = layer.ancestors();
  for (i = 0, len = ref.length; i < len; i++) {
    a = ref[i];
    string = a.name + '>' + string;
  }
  return string = string + layer.name;
};

_match = function(hierarchy, string) {
  var regExp, regexString;
  string = string.replace(/\s*>\s*/g, '>');
  string = string.split('*').join('[^>]*');
  string = string.split(' ').join('(?:.*)>');
  string = string.split(',').join('$|');
  regexString = "(^|>)" + string + "$";
  regExp = new RegExp(regexString);
  return hierarchy.match(regExp);
};

_findAll = function(selector, fromLayer) {
  var layers, stringNeedsRegex;
  layers = Framer.CurrentContext.getLayers();
  if (selector != null) {
    stringNeedsRegex = _.find(['*', ' ', '>', ','], function(c) {
      return _.contains(selector, c);
    });
    if (!(stringNeedsRegex || fromLayer)) {
      return layers = _.filter(layers, function(layer) {
        if (layer.name === selector) {
          return true;
        }
      });
    } else {
      return layers = _.filter(layers, function(layer) {
        var hierarchy;
        hierarchy = _getHierarchy(layer);
        if (fromLayer != null) {
          return _match(hierarchy, fromLayer.name + ' ' + selector);
        } else {
          return _match(hierarchy, selector);
        }
      });
    }
  } else {
    return layers;
  }
};

exports.Find = function(selector, fromLayer) {
  return _findAll(selector, fromLayer)[0];
};

exports.ƒ = function(selector, fromLayer) {
  return _findAll(selector, fromLayer)[0];
};

exports.FindAll = function(selector, fromLayer) {
  return _findAll(selector, fromLayer);
};

exports.ƒƒ = function(selector, fromLayer) {
  return _findAll(selector, fromLayer);
};

Layer.prototype.find = function(selector, fromLayer) {
  return _findAll(selector, this)[0];
};

Layer.prototype.ƒ = function(selector, fromLayer) {
  return _findAll(selector, this)[0];
};

Layer.prototype.findAll = function(selector, fromLayer) {
  return _findAll(selector, this);
};

Layer.prototype.ƒƒ = function(selector, fromLayer) {
  return _findAll(selector, this);
};


},{}],"tests":[function(require,module,exports){
var assert, cancel_btn, card, close_btn, container, image, publish_btn, ref, remove_image_btn, ƒ, ƒƒ;

ref = require('findModule'), ƒ = ref.ƒ, ƒƒ = ref.ƒƒ;

card = new Layer({
  name: 'card'
});

close_btn = new Layer({
  name: 'close_btn',
  superLayer: card
});

container = new Layer({
  name: 'container',
  superLayer: card
});

publish_btn = new Layer({
  name: 'publish_Btn',
  superLayer: container
});

cancel_btn = new Layer({
  name: 'cancel_btn',
  superLayer: container
});

image = new Layer({
  name: 'image',
  superLayer: container
});

remove_image_btn = new Layer({
  name: 'remove_image_btn',
  superLayer: image
});

assert = function(obj) {
  if (_.isEqual(obj.result, obj.expected) === false) {
    return print("TEST FAILED: " + obj.description);
  }
};

exports.runTests = function() {
  assert({
    description: 'get all layers',
    result: ƒƒ(),
    expected: [card, close_btn, container, publish_btn, cancel_btn, image, remove_image_btn]
  });
  assert({
    description: 'multiple searches using comma',
    result: ƒƒ('card, image >*btn'),
    expected: [card, remove_image_btn]
  });
  assert({
    description: 'get all layers directly under card',
    result: ƒƒ('card > *'),
    expected: [close_btn, container]
  });
  assert({
    description: 'get all layers below card',
    result: ƒƒ('container *'),
    expected: [publish_btn, cancel_btn, image, remove_image_btn]
  });
  assert({
    description: 'end of string without wildcard',
    result: ƒƒ('mage'),
    expected: []
  });
  assert({
    description: 'end of string without wildcard and descendant',
    result: ƒƒ('image btn'),
    expected: []
  });
  assert({
    description: 'direct parent',
    result: ƒƒ('card>container'),
    expected: [container]
  });
  assert({
    description: 'direct parent + wildcard',
    result: ƒƒ('container>*btn'),
    expected: [cancel_btn]
  });
  assert({
    description: 'from layer',
    result: container.ƒƒ('image'),
    expected: [image, container]
  });
  assert({
    description: 'single item',
    result: ƒƒ('card'),
    expected: [card]
  });
  assert({
    description: 'long distance',
    result: ƒƒ('card image'),
    expected: [image]
  });
  assert({
    description: 'descendant layers with wildcard',
    result: ƒƒ('card container *btn'),
    expected: [cancel_btn, remove_image_btn]
  });
  return assert({
    description: 'containing',
    result: ƒƒ('*image*'),
    expected: [image, remove_image_btn]
  });
};


},{"findModule":"findModule"}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW53YS9Eb2N1bWVudHMvRmluZC1mb3ItRnJhbWVyL2V4YW1wbGVQcm9qZWN0LmZyYW1lci9tb2R1bGVzL2ZpbmRNb2R1bGUuY29mZmVlIiwiL1VzZXJzL2Fud2EvRG9jdW1lbnRzL0ZpbmQtZm9yLUZyYW1lci9leGFtcGxlUHJvamVjdC5mcmFtZXIvbW9kdWxlcy90ZXN0cy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLGFBQUEsR0FBZ0IsU0FBQyxLQUFEO0FBQ2QsTUFBQTtFQUFBLE1BQUEsR0FBUztBQUNUO0FBQUEsT0FBQSxxQ0FBQTs7SUFDRSxNQUFBLEdBQVMsQ0FBQyxDQUFDLElBQUYsR0FBTyxHQUFQLEdBQVc7QUFEdEI7QUFFQSxTQUFPLE1BQUEsR0FBUyxNQUFBLEdBQU8sS0FBSyxDQUFDO0FBSmY7O0FBTWhCLE1BQUEsR0FBUyxTQUFDLFNBQUQsRUFBWSxNQUFaO0FBRVAsTUFBQTtFQUFBLE1BQUEsR0FBUyxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQWYsRUFBMEIsR0FBMUI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsT0FBdkI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsU0FBdkI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsSUFBdkI7RUFDVCxXQUFBLEdBQWMsT0FBQSxHQUFRLE1BQVIsR0FBZTtFQUU3QixNQUFBLEdBQWEsSUFBQSxNQUFBLENBQU8sV0FBUDtBQUNiLFNBQU8sU0FBUyxDQUFDLEtBQVYsQ0FBZ0IsTUFBaEI7QUFUQTs7QUFXVCxRQUFBLEdB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QSxDQUNFO0lBQUEsV0FBQSxFQUFhLGlDQUFiO0lBQ0EsTUFBQSxFQUFRLEVBQUEsQ0FBRyxxQkFBSCxDQURSO0lBRUEsUUFBQSxFQUFVLENBQUMsVUFBRCxFQUFZLGdCQUFaLENBRlY7R0FERjtTQUtBLE1BQUEsQ0FDRTtJQUFBLFdBQUEsRUFBYSxZQUFiO0lBQ0EsTUFBQSxFQUFRLEVBQUEsQ0FBRyxTQUFILENBRFI7SUFFQSxRQUFBLEVBQVUsQ0FBQyxLQUFELEVBQU8sZ0JBQVAsQ0FGVjtHQURGO0FBOURpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJfZ2V0SGllcmFyY2h5ID0gKGxheWVyKSAtPlxuICBzdHJpbmcgPSAnJ1xuICBmb3IgYSBpbiBsYXllci5hbmNlc3RvcnMoKVxuICAgIHN0cmluZyA9IGEubmFtZSsnPicrc3RyaW5nXG4gIHJldHVybiBzdHJpbmcgPSBzdHJpbmcrbGF5ZXIubmFtZVxuXG5fbWF0Y2ggPSAoaGllcmFyY2h5LCBzdHJpbmcpIC0+XG4gICMgcHJlcGFyZSByZWdleCB0b2tlbnNcbiAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xccyo+XFxzKi9nLCc+JykgIyBjbGVhbiB1cCBzcGFjZXMgYXJvdW5kIGFycm93c1xuICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJyonKS5qb2luKCdbXj5dKicpICMgYXN0ZXJpa3MgYXMgbGF5ZXIgbmFtZSB3aWxkY2FyZFxuICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJyAnKS5qb2luKCcoPzouKik+JykgIyBzcGFjZSBhcyBzdHJ1Y3R1cmUgd2lsZGNhcmRcbiAgc3RyaW5nID0gc3RyaW5nLnNwbGl0KCcsJykuam9pbignJHwnKSAjIGFsbG93IG11bHRpcGxlIHNlYXJjaGVzIHVzaW5nIGNvbW1hXG4gIHJlZ2V4U3RyaW5nID0gXCIoXnw+KVwiK3N0cmluZytcIiRcIiAjIGFsd2F5cyBib3R0b20gbGF5ZXIsIG1heWJlIHBhcnQgb2YgaGllcmFyY2h5XG5cbiAgcmVnRXhwID0gbmV3IFJlZ0V4cChyZWdleFN0cmluZykgXG4gIHJldHVybiBoaWVyYXJjaHkubWF0Y2gocmVnRXhwKVxuXG5fZmluZEFsbCA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPlxuICBsYXllcnMgPSBGcmFtZXIuQ3VycmVudENvbnRleHQuZ2V0TGF5ZXJzKClcblxuICBpZiBzZWxlY3Rvcj9cbiAgICBzdHJpbmdOZWVkc1JlZ2V4ID0gXy5maW5kIFsnKicsJyAnLCc+JywnLCddLCAoYykgLT4gXy5jb250YWlucyBzZWxlY3RvcixjXG4gICAgdW5sZXNzIHN0cmluZ05lZWRzUmVnZXggb3IgZnJvbUxheWVyXG4gICAgICBsYXllcnMgPSBfLmZpbHRlciBsYXllcnMsIChsYXllcikgLT4gXG4gICAgICAgIGlmIGxheWVyLm5hbWUgaXMgc2VsZWN0b3IgdGhlbiB0cnVlXG4gICAgZWxzZVxuICAgICAgbGF5ZXJzID0gXy5maWx0ZXIgbGF5ZXJzLCAobGF5ZXIpIC0+XG4gICAgICAgICAgaGllcmFyY2h5ID0gX2dldEhpZXJhcmNoeShsYXllcilcbiAgICAgICAgICBpZiBmcm9tTGF5ZXI/XG4gICAgICAgICAgICBfbWF0Y2goaGllcmFyY2h5LCBmcm9tTGF5ZXIubmFtZSsnICcrc2VsZWN0b3IpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgX21hdGNoKGhpZXJhcmNoeSwgc2VsZWN0b3IpXG4gIGVsc2VcbiAgICBsYXllcnNcblxuXG4jIEdsb2JhbFxuZXhwb3J0cy5GaW5kICAgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBmcm9tTGF5ZXIpWzBdXG5leHBvcnRzLsaSICAgICAgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBmcm9tTGF5ZXIpWzBdXG5cbmV4cG9ydHMuRmluZEFsbCA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgZnJvbUxheWVyKVxuZXhwb3J0cy7GksaSICAgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIGZyb21MYXllcilcblxuIyBNZXRob2RzXG5MYXllcjo6ZmluZCAgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIEApWzBdXG5MYXllcjo6xpIgICAgICAgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBAKVswXVxuXG5MYXllcjo6ZmluZEFsbCAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIEApXG5MYXllcjo6xpLGkiAgICAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgQCkiLCIjIFRFU1RTXG57xpIsxpLGkn0gPSByZXF1aXJlICdmaW5kTW9kdWxlJ1xuIyBFeGFtcGxlIGxheWVyc1xuY2FyZCA9IG5ldyBMYXllciBuYW1lOiAnY2FyZCdcbmNsb3NlX2J0biA9IG5ldyBMYXllciBuYW1lOiAnY2xvc2VfYnRuJywgc3VwZXJMYXllcjogY2FyZFxuY29udGFpbmVyID0gbmV3IExheWVyIG5hbWU6ICdjb250YWluZXInLCBzdXBlckxheWVyOiBjYXJkXG5wdWJsaXNoX2J0biA9IG5ldyBMYXllciBuYW1lOiAncHVibGlzaF9CdG4nLCBzdXBlckxheWVyOiBjb250YWluZXJcbmNhbmNlbF9idG4gPSBuZXcgTGF5ZXIgbmFtZTogJ2NhbmNlbF9idG4nLCBzdXBlckxheWVyOiBjb250YWluZXJcbmltYWdlID0gbmV3IExheWVyIG5hbWU6ICdpbWFnZScsIHN1cGVyTGF5ZXI6IGNvbnRhaW5lclxucmVtb3ZlX2ltYWdlX2J0biA9IG5ldyBMYXllciBuYW1lOiAncmVtb3ZlX2ltYWdlX2J0bicsIHN1cGVyTGF5ZXI6IGltYWdlXG5cbiMgSGllcmFyY2hpZXMgZm9yIHJlZ2V4IHRlc3RpbmdcbiMgY2FyZFxuIyBjYXJkPmNsb3NlX2J0blxuIyBjYXJkPmNvbnRhaW5lclxuIyBjYXJkPmNvbnRhaW5lcj5wdWJsaXNoX0J0blxuIyBjYXJkPmNvbnRhaW5lcj5jYW5jZWxfYnRuXG4jIGNhcmQ+Y29udGFpbmVyPmltYWdlXG4jIGNhcmQ+Y29udGFpbmVyPmltYWdlPnJlbW92ZV9pbWFnZV9idG5cblxuYXNzZXJ0ID0gKG9iaikgLT5cbiAgaWYgXy5pc0VxdWFsKG9iai5yZXN1bHQsIG9iai5leHBlY3RlZCkgaXMgZmFsc2VcbiAgICBwcmludCBcIlRFU1QgRkFJTEVEOiAje29iai5kZXNjcmlwdGlvbn1cIlxuXG5leHBvcnRzLnJ1blRlc3RzID0gLT5cblxuICBhc3NlcnRcbiAgICBkZXNjcmlwdGlvbjogJ2dldCBhbGwgbGF5ZXJzJ1xuICAgIHJlc3VsdDogxpLGkigpXG4gICAgZXhwZWN0ZWQ6IFtjYXJkLCBjbG9zZV9idG4sIGNvbnRhaW5lciwgcHVibGlzaF9idG4sIGNhbmNlbF9idG4sIGltYWdlLCByZW1vdmVfaW1hZ2VfYnRuXVxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnbXVsdGlwbGUgc2VhcmNoZXMgdXNpbmcgY29tbWEnXG4gICAgcmVzdWx0OiDGksaSKCdjYXJkLCBpbWFnZSA+KmJ0bicpXG4gICAgZXhwZWN0ZWQ6IFtjYXJkLCByZW1vdmVfaW1hZ2VfYnRuXVxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnZ2V0IGFsbCBsYXllcnMgZGlyZWN0bHkgdW5kZXIgY2FyZCdcbiAgICByZXN1bHQ6IMaSxpIoJ2NhcmQgPiAqJylcbiAgICBleHBlY3RlZDogW2Nsb3NlX2J0biwgY29udGFpbmVyXVxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnZ2V0IGFsbCBsYXllcnMgYmVsb3cgY2FyZCdcbiAgICByZXN1bHQ6IMaSxpIoJ2NvbnRhaW5lciAqJylcbiAgICBleHBlY3RlZDogW3B1Ymxpc2hfYnRuLCBjYW5jZWxfYnRuLCBpbWFnZSwgcmVtb3ZlX2ltYWdlX2J0bl1cblxuICBhc3NlcnRcbiAgICBkZXNjcmlwdGlvbjogJ2VuZCBvZiBzdHJpbmcgd2l0aG91dCB3aWxkY2FyZCdcbiAgICByZXN1bHQ6IMaSxpIoJ21hZ2UnKVxuICAgIGV4cGVjdGVkOiBbXVxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnZW5kIG9mIHN0cmluZyB3aXRob3V0IHdpbGRjYXJkIGFuZCBkZXNjZW5kYW50J1xuICAgIHJlc3VsdDogxpLGkignaW1hZ2UgYnRuJylcbiAgICBleHBlY3RlZDogW11cblxuICBhc3NlcnRcbiAgICBkZXNjcmlwdGlvbjogJ2RpcmVjdCBwYXJlbnQnXG4gICAgcmVzdWx0OiDGksaSKCdjYXJkPmNvbnRhaW5lcicpXG4gICAgZXhwZWN0ZWQ6IFtjb250YWluZXJdXG5cbiAgYXNzZXJ0XG4gICAgZGVzY3JpcHRpb246ICdkaXJlY3QgcGFyZW50ICsgd2lsZGNhcmQnXG4gICAgcmVzdWx0OiDGksaSKCdjb250YWluZXI+KmJ0bicpXG4gICAgZXhwZWN0ZWQ6IFtjYW5jZWxfYnRuXVxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnZnJvbSBsYXllcidcbiAgICByZXN1bHQ6IGNvbnRhaW5lci7GksaSKCdpbWFnZScpXG4gICAgZXhwZWN0ZWQ6IFtpbWFnZSxjb250YWluZXJdXG5cbiAgYXNzZXJ0XG4gICAgZGVzY3JpcHRpb246ICdzaW5nbGUgaXRlbSdcbiAgICByZXN1bHQ6IMaSxpIoJ2NhcmQnKVxuICAgIGV4cGVjdGVkOiBbY2FyZF1cblxuICBhc3NlcnRcbiAgICBkZXNjcmlwdGlvbjogJ2xvbmcgZGlzdGFuY2UnXG4gICAgcmVzdWx0OiDGksaSKCdjYXJkIGltYWdlJylcbiAgICBleHBlY3RlZDogW2ltYWdlXVxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnZGVzY2VuZGFudCBsYXllcnMgd2l0aCB3aWxkY2FyZCdcbiAgICByZXN1bHQ6IMaSxpIoJ2NhcmQgY29udGFpbmVyICpidG4nKVxuICAgIGV4cGVjdGVkOiBbY2FuY2VsX2J0bixyZW1vdmVfaW1hZ2VfYnRuXVxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnY29udGFpbmluZydcbiAgICByZXN1bHQ6IMaSxpIoJyppbWFnZSonKVxuICAgIGV4cGVjdGVkOiBbaW1hZ2UscmVtb3ZlX2ltYWdlX2J0bl0iXX0=
