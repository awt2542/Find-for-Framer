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
      return _.includes(selector, c);
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
    expected: [image]
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW53YS9Eb2N1bWVudHMvRmluZC1mb3ItRnJhbWVyL2V4YW1wbGVQcm9qZWN0LXVwZGF0ZS5mcmFtZXIvbW9kdWxlcy9maW5kTW9kdWxlLmNvZmZlZSIsIi9Vc2Vycy9hbndhL0RvY3VtZW50cy9GaW5kLWZvci1GcmFtZXIvZXhhbXBsZVByb2plY3QtdXBkYXRlLmZyYW1lci9tb2R1bGVzL3Rlc3RzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7O0FBQUEsYUFBQSxHQUFnQixTQUFDLEtBQUQ7QUFDZCxNQUFBO0VBQUEsTUFBQSxHQUFTO0FBQ1Q7QUFBQSxPQUFBLHFDQUFBOztJQUNFLE1BQUEsR0FBUyxDQUFDLENBQUMsSUFBRixHQUFPLEdBQVAsR0FBVztBQUR0QjtBQUVBLFNBQU8sTUFBQSxHQUFTLE1BQUEsR0FBTyxLQUFLLENBQUM7QUFKZjs7QUFNaEIsTUFBQSxHQUFTLFNBQUMsU0FBRCxFQUFZLE1BQVo7QUFFUCxNQUFBO0VBQUEsTUFBQSxHQUFTLE1BQU0sQ0FBQyxPQUFQLENBQWUsVUFBZixFQUEwQixHQUExQjtFQUNULE1BQUEsR0FBUyxNQUFNLENBQUMsS0FBUCxDQUFhLEdBQWIsQ0FBaUIsQ0FBQyxJQUFsQixDQUF1QixPQUF2QjtFQUNULE1BQUEsR0FBUyxNQUFNLENBQUMsS0FBUCxDQUFhLEdBQWIsQ0FBaUIsQ0FBQyxJQUFsQixDQUF1QixTQUF2QjtFQUNULE1BQUEsR0FBUyxNQUFNLENBQUMsS0FBUCxDQUFhLEdBQWIsQ0FBaUIsQ0FBQyxJQUFsQixDQUF1QixJQUF2QjtFQUNULFdBQUEsR0FBYyxPQUFBLEdBQVEsTUFBUixHQUFlO0VBRTdCLE1BQUEsR0FBYSxJQUFBLE1BQUEsQ0FBTyxXQUFQO0FBQ2IsU0FBTyxTQUFTLENBQUMsS0FBVixDQUFnQixNQUFoQjtBQVRBOztBQVdULFFBQUEsR0FBVyxTQUFDLFFB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YSxpQ0FBYjtJQUNBLE1BQUEsRUFBUSxFQUFBLENBQUcscUJBQUgsQ0FEUjtJQUVBLFFBQUEsRUFBVSxDQUFDLFVBQUQsRUFBWSxnQkFBWixDQUZWO0dBREY7U0FLQSxNQUFBLENBQ0U7SUFBQSxXQUFBLEVBQWEsWUFBYjtJQUNBLE1BQUEsRUFBUSxFQUFBLENBQUcsU0FBSCxDQURSO0lBRUEsUUFBQSxFQUFVLENBQUMsS0FBRCxFQUFPLGdCQUFQLENBRlY7R0FERjtBQTlEaUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiX2dldEhpZXJhcmNoeSA9IChsYXllcikgLT5cbiAgc3RyaW5nID0gJydcbiAgZm9yIGEgaW4gbGF5ZXIuYW5jZXN0b3JzKClcbiAgICBzdHJpbmcgPSBhLm5hbWUrJz4nK3N0cmluZ1xuICByZXR1cm4gc3RyaW5nID0gc3RyaW5nK2xheWVyLm5hbWVcblxuX21hdGNoID0gKGhpZXJhcmNoeSwgc3RyaW5nKSAtPlxuICAjIHByZXBhcmUgcmVnZXggdG9rZW5zXG4gIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXHMqPlxccyovZywnPicpICMgY2xlYW4gdXAgc3BhY2VzIGFyb3VuZCBhcnJvd3NcbiAgc3RyaW5nID0gc3RyaW5nLnNwbGl0KCcqJykuam9pbignW14+XSonKSAjIGFzdGVyaWtzIGFzIGxheWVyIG5hbWUgd2lsZGNhcmRcbiAgc3RyaW5nID0gc3RyaW5nLnNwbGl0KCcgJykuam9pbignKD86LiopPicpICMgc3BhY2UgYXMgc3RydWN0dXJlIHdpbGRjYXJkXG4gIHN0cmluZyA9IHN0cmluZy5zcGxpdCgnLCcpLmpvaW4oJyR8JykgIyBhbGxvdyBtdWx0aXBsZSBzZWFyY2hlcyB1c2luZyBjb21tYVxuICByZWdleFN0cmluZyA9IFwiKF58PilcIitzdHJpbmcrXCIkXCIgIyBhbHdheXMgYm90dG9tIGxheWVyLCBtYXliZSBwYXJ0IG9mIGhpZXJhcmNoeVxuXG4gIHJlZ0V4cCA9IG5ldyBSZWdFeHAocmVnZXhTdHJpbmcpIFxuICByZXR1cm4gaGllcmFyY2h5Lm1hdGNoKHJlZ0V4cClcblxuX2ZpbmRBbGwgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT5cbiAgbGF5ZXJzID0gRnJhbWVyLkN1cnJlbnRDb250ZXh0LmdldExheWVycygpXG5cbiAgaWYgc2VsZWN0b3I/XG4gICAgc3RyaW5nTmVlZHNSZWdleCA9IF8uZmluZCBbJyonLCcgJywnPicsJywnXSwgKGMpIC0+IF8uaW5jbHVkZXMgc2VsZWN0b3IsY1xuICAgIHVubGVzcyBzdHJpbmdOZWVkc1JlZ2V4IG9yIGZyb21MYXllclxuICAgICAgbGF5ZXJzID0gXy5maWx0ZXIgbGF5ZXJzLCAobGF5ZXIpIC0+IFxuICAgICAgICBpZiBsYXllci5uYW1lIGlzIHNlbGVjdG9yIHRoZW4gdHJ1ZVxuICAgIGVsc2VcbiAgICAgIGxheWVycyA9IF8uZmlsdGVyIGxheWVycywgKGxheWVyKSAtPlxuICAgICAgICAgIGhpZXJhcmNoeSA9IF9nZXRIaWVyYXJjaHkobGF5ZXIpXG4gICAgICAgICAgaWYgZnJvbUxheWVyP1xuICAgICAgICAgICAgX21hdGNoKGhpZXJhcmNoeSwgZnJvbUxheWVyLm5hbWUrJyAnK3NlbGVjdG9yKVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIF9tYXRjaChoaWVyYXJjaHksIHNlbGVjdG9yKVxuICBlbHNlXG4gICAgbGF5ZXJzXG5cblxuIyBHbG9iYWxcbmV4cG9ydHMuRmluZCAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgZnJvbUxheWVyKVswXVxuZXhwb3J0cy7GkiAgICAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgZnJvbUxheWVyKVswXVxuXG5leHBvcnRzLkZpbmRBbGwgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIGZyb21MYXllcilcbmV4cG9ydHMuxpLGkiAgICAgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBmcm9tTGF5ZXIpXG5cbiMgTWV0aG9kc1xuTGF5ZXI6OmZpbmQgICAgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBAKVswXVxuTGF5ZXI6OsaSICAgICAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgQClbMF1cblxuTGF5ZXI6OmZpbmRBbGwgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBAKVxuTGF5ZXI6OsaSxpIgICAgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIEApIiwiIyBURVNUU1xue8aSLMaSxpJ9ID0gcmVxdWlyZSAnZmluZE1vZHVsZSdcbiMgRXhhbXBsZSBsYXllcnNcbmNhcmQgPSBuZXcgTGF5ZXIgbmFtZTogJ2NhcmQnXG5jbG9zZV9idG4gPSBuZXcgTGF5ZXIgbmFtZTogJ2Nsb3NlX2J0bicsIHN1cGVyTGF5ZXI6IGNhcmRcbmNvbnRhaW5lciA9IG5ldyBMYXllciBuYW1lOiAnY29udGFpbmVyJywgc3VwZXJMYXllcjogY2FyZFxucHVibGlzaF9idG4gPSBuZXcgTGF5ZXIgbmFtZTogJ3B1Ymxpc2hfQnRuJywgc3VwZXJMYXllcjogY29udGFpbmVyXG5jYW5jZWxfYnRuID0gbmV3IExheWVyIG5hbWU6ICdjYW5jZWxfYnRuJywgc3VwZXJMYXllcjogY29udGFpbmVyXG5pbWFnZSA9IG5ldyBMYXllciBuYW1lOiAnaW1hZ2UnLCBzdXBlckxheWVyOiBjb250YWluZXJcbnJlbW92ZV9pbWFnZV9idG4gPSBuZXcgTGF5ZXIgbmFtZTogJ3JlbW92ZV9pbWFnZV9idG4nLCBzdXBlckxheWVyOiBpbWFnZVxuXG4jIEhpZXJhcmNoaWVzIGZvciByZWdleCB0ZXN0aW5nXG4jIGNhcmRcbiMgY2FyZD5jbG9zZV9idG5cbiMgY2FyZD5jb250YWluZXJcbiMgY2FyZD5jb250YWluZXI+cHVibGlzaF9CdG5cbiMgY2FyZD5jb250YWluZXI+Y2FuY2VsX2J0blxuIyBjYXJkPmNvbnRhaW5lcj5pbWFnZVxuIyBjYXJkPmNvbnRhaW5lcj5pbWFnZT5yZW1vdmVfaW1hZ2VfYnRuXG5cbmFzc2VydCA9IChvYmopIC0+XG4gIGlmIF8uaXNFcXVhbChvYmoucmVzdWx0LCBvYmouZXhwZWN0ZWQpIGlzIGZhbHNlXG4gICAgcHJpbnQgXCJURVNUIEZBSUxFRDogI3tvYmouZGVzY3JpcHRpb259XCJcblxuZXhwb3J0cy5ydW5UZXN0cyA9IC0+XG5cbiAgYXNzZXJ0XG4gICAgZGVzY3JpcHRpb246ICdnZXQgYWxsIGxheWVycydcbiAgICByZXN1bHQ6IMaSxpIoKVxuICAgIGV4cGVjdGVkOiBbY2FyZCwgY2xvc2VfYnRuLCBjb250YWluZXIsIHB1Ymxpc2hfYnRuLCBjYW5jZWxfYnRuLCBpbWFnZSwgcmVtb3ZlX2ltYWdlX2J0bl1cblxuICBhc3NlcnRcbiAgICBkZXNjcmlwdGlvbjogJ211bHRpcGxlIHNlYXJjaGVzIHVzaW5nIGNvbW1hJ1xuICAgIHJlc3VsdDogxpLGkignY2FyZCwgaW1hZ2UgPipidG4nKVxuICAgIGV4cGVjdGVkOiBbY2FyZCwgcmVtb3ZlX2ltYWdlX2J0bl1cblxuICBhc3NlcnRcbiAgICBkZXNjcmlwdGlvbjogJ2dldCBhbGwgbGF5ZXJzIGRpcmVjdGx5IHVuZGVyIGNhcmQnXG4gICAgcmVzdWx0OiDGksaSKCdjYXJkID4gKicpXG4gICAgZXhwZWN0ZWQ6IFtjbG9zZV9idG4sIGNvbnRhaW5lcl1cblxuICBhc3NlcnRcbiAgICBkZXNjcmlwdGlvbjogJ2dldCBhbGwgbGF5ZXJzIGJlbG93IGNhcmQnXG4gICAgcmVzdWx0OiDGksaSKCdjb250YWluZXIgKicpXG4gICAgZXhwZWN0ZWQ6IFtwdWJsaXNoX2J0biwgY2FuY2VsX2J0biwgaW1hZ2UsIHJlbW92ZV9pbWFnZV9idG5dXG5cbiAgYXNzZXJ0XG4gICAgZGVzY3JpcHRpb246ICdlbmQgb2Ygc3RyaW5nIHdpdGhvdXQgd2lsZGNhcmQnXG4gICAgcmVzdWx0OiDGksaSKCdtYWdlJylcbiAgICBleHBlY3RlZDogW11cblxuICBhc3NlcnRcbiAgICBkZXNjcmlwdGlvbjogJ2VuZCBvZiBzdHJpbmcgd2l0aG91dCB3aWxkY2FyZCBhbmQgZGVzY2VuZGFudCdcbiAgICByZXN1bHQ6IMaSxpIoJ2ltYWdlIGJ0bicpXG4gICAgZXhwZWN0ZWQ6IFtdXG5cbiAgYXNzZXJ0XG4gICAgZGVzY3JpcHRpb246ICdkaXJlY3QgcGFyZW50J1xuICAgIHJlc3VsdDogxpLGkignY2FyZD5jb250YWluZXInKVxuICAgIGV4cGVjdGVkOiBbY29udGFpbmVyXVxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnZGlyZWN0IHBhcmVudCArIHdpbGRjYXJkJ1xuICAgIHJlc3VsdDogxpLGkignY29udGFpbmVyPipidG4nKVxuICAgIGV4cGVjdGVkOiBbY2FuY2VsX2J0bl1cblxuICBhc3NlcnRcbiAgICBkZXNjcmlwdGlvbjogJ2Zyb20gbGF5ZXInXG4gICAgcmVzdWx0OiBjb250YWluZXIuxpLGkignaW1hZ2UnKVxuICAgIGV4cGVjdGVkOiBbaW1hZ2VdXG5cbiAgYXNzZXJ0XG4gICAgZGVzY3JpcHRpb246ICdzaW5nbGUgaXRlbSdcbiAgICByZXN1bHQ6IMaSxpIoJ2NhcmQnKVxuICAgIGV4cGVjdGVkOiBbY2FyZF1cblxuICBhc3NlcnRcbiAgICBkZXNjcmlwdGlvbjogJ2xvbmcgZGlzdGFuY2UnXG4gICAgcmVzdWx0OiDGksaSKCdjYXJkIGltYWdlJylcbiAgICBleHBlY3RlZDogW2ltYWdlXVxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnZGVzY2VuZGFudCBsYXllcnMgd2l0aCB3aWxkY2FyZCdcbiAgICByZXN1bHQ6IMaSxpIoJ2NhcmQgY29udGFpbmVyICpidG4nKVxuICAgIGV4cGVjdGVkOiBbY2FuY2VsX2J0bixyZW1vdmVfaW1hZ2VfYnRuXVxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnY29udGFpbmluZydcbiAgICByZXN1bHQ6IMaSxpIoJyppbWFnZSonKVxuICAgIGV4cGVjdGVkOiBbaW1hZ2UscmVtb3ZlX2ltYWdlX2J0bl0iXX0=
