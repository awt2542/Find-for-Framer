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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW53YS9Eb2N1bWVudHMvRmluZC1mb3ItRnJhbWVyL2V4YW1wbGVQcm9qZWN0LmZyYW1lci9tb2R1bGVzL2ZpbmRNb2R1bGUuY29mZmVlIiwiL1VzZXJzL2Fud2EvRG9jdW1lbnRzL0ZpbmQtZm9yLUZyYW1lci9leGFtcGxlUHJvamVjdC5mcmFtZXIvbW9kdWxlcy90ZXN0cy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLGFBQUEsR0FBZ0IsU0FBQyxLQUFEO0FBQ2QsTUFBQTtFQUFBLE1BQUEsR0FBUztBQUNUO0FBQUEsT0FBQSxxQ0FBQTs7SUFDRSxNQUFBLEdBQVMsQ0FBQyxDQUFDLElBQUYsR0FBTyxHQUFQLEdBQVc7QUFEdEI7QUFFQSxTQUFPLE1BQUEsR0FBUyxNQUFBLEdBQU8sS0FBSyxDQUFDO0FBSmY7O0FBTWhCLE1BQUEsR0FBUyxTQUFDLFNBQUQsRUFBWSxNQUFaO0FBRVAsTUFBQTtFQUFBLE1BQUEsR0FBUyxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQWYsRUFBMEIsR0FBMUI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsT0FBdkI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsU0FBdkI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsSUFBdkI7RUFDVCxXQUFBLEdBQWMsT0FBQSxHQUFRLE1BQVIsR0FBZTtFQUU3QixNQUFBLEdBQWEsSUFBQSxNQUFBLENBQU8sV0FBUDtBQUNiLFNBQU8sU0FBUyxDQUFDLEtBQVYsQ0FBZ0IsTUFBaEI7QUFUQTs7QUFXVCxRQUFBLEdB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QSxXQUFBLEVBQWEsaUNBQWI7SUFDQSxNQUFBLEVBQVEsRUFBQSxDQUFHLHFCQUFILENBRFI7SUFFQSxRQUFBLEVBQVUsQ0FBQyxVQUFELEVBQVksZ0JBQVosQ0FGVjtHQURGO1NBS0EsTUFBQSxDQUNFO0lBQUEsV0FBQSxFQUFhLFlBQWI7SUFDQSxNQUFBLEVBQVEsRUFBQSxDQUFHLFNBQUgsQ0FEUjtJQUVBLFFBQUEsRUFBVSxDQUFDLEtBQUQsRUFBTyxnQkFBUCxDQUZWO0dBREY7QUE5RGlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIl9nZXRIaWVyYXJjaHkgPSAobGF5ZXIpIC0+XG4gIHN0cmluZyA9ICcnXG4gIGZvciBhIGluIGxheWVyLmFuY2VzdG9ycygpXG4gICAgc3RyaW5nID0gYS5uYW1lKyc+JytzdHJpbmdcbiAgcmV0dXJuIHN0cmluZyA9IHN0cmluZytsYXllci5uYW1lXG5cbl9tYXRjaCA9IChoaWVyYXJjaHksIHN0cmluZykgLT5cbiAgIyBwcmVwYXJlIHJlZ2V4IHRva2Vuc1xuICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFxzKj5cXHMqL2csJz4nKSAjIGNsZWFuIHVwIHNwYWNlcyBhcm91bmQgYXJyb3dzXG4gIHN0cmluZyA9IHN0cmluZy5zcGxpdCgnKicpLmpvaW4oJ1tePl0qJykgIyBhc3RlcmlrcyBhcyBsYXllciBuYW1lIHdpbGRjYXJkXG4gIHN0cmluZyA9IHN0cmluZy5zcGxpdCgnICcpLmpvaW4oJyg/Oi4qKT4nKSAjIHNwYWNlIGFzIHN0cnVjdHVyZSB3aWxkY2FyZFxuICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJywnKS5qb2luKCckfCcpICMgYWxsb3cgbXVsdGlwbGUgc2VhcmNoZXMgdXNpbmcgY29tbWFcbiAgcmVnZXhTdHJpbmcgPSBcIihefD4pXCIrc3RyaW5nK1wiJFwiICMgYWx3YXlzIGJvdHRvbSBsYXllciwgbWF5YmUgcGFydCBvZiBoaWVyYXJjaHlcblxuICByZWdFeHAgPSBuZXcgUmVnRXhwKHJlZ2V4U3RyaW5nKSBcbiAgcmV0dXJuIGhpZXJhcmNoeS5tYXRjaChyZWdFeHApXG5cbl9maW5kQWxsID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+XG4gIGxheWVycyA9IEZyYW1lci5DdXJyZW50Q29udGV4dC5nZXRMYXllcnMoKVxuXG4gIGlmIHNlbGVjdG9yP1xuICAgIHN0cmluZ05lZWRzUmVnZXggPSBfLmZpbmQgWycqJywnICcsJz4nLCcsJ10sIChjKSAtPiBfLmNvbnRhaW5zIHNlbGVjdG9yLGNcbiAgICB1bmxlc3Mgc3RyaW5nTmVlZHNSZWdleCBvciBmcm9tTGF5ZXJcbiAgICAgIGxheWVycyA9IF8uZmlsdGVyIGxheWVycywgKGxheWVyKSAtPiBcbiAgICAgICAgaWYgbGF5ZXIubmFtZSBpcyBzZWxlY3RvciB0aGVuIHRydWVcbiAgICBlbHNlXG4gICAgICBsYXllcnMgPSBfLmZpbHRlciBsYXllcnMsIChsYXllcikgLT5cbiAgICAgICAgICBoaWVyYXJjaHkgPSBfZ2V0SGllcmFyY2h5KGxheWVyKVxuICAgICAgICAgIGlmIGZyb21MYXllcj9cbiAgICAgICAgICAgIF9tYXRjaChoaWVyYXJjaHksIGZyb21MYXllci5uYW1lKycgJytzZWxlY3RvcilcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBfbWF0Y2goaGllcmFyY2h5LCBzZWxlY3RvcilcbiAgZWxzZVxuICAgIGxheWVyc1xuXG5cbiMgR2xvYmFsXG5leHBvcnRzLkZpbmQgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIGZyb21MYXllcilbMF1cbmV4cG9ydHMuxpIgICAgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIGZyb21MYXllcilbMF1cblxuZXhwb3J0cy5GaW5kQWxsID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBmcm9tTGF5ZXIpXG5leHBvcnRzLsaSxpIgICAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgZnJvbUxheWVyKVxuXG4jIE1ldGhvZHNcbkxheWVyOjpmaW5kICAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgQClbMF1cbkxheWVyOjrGkiAgICAgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIEApWzBdXG5cbkxheWVyOjpmaW5kQWxsICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgQClcbkxheWVyOjrGksaSICAgICAgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBAKSIsIiMgVEVTVFNcbnvGkizGksaSfSA9IHJlcXVpcmUgJ2ZpbmRNb2R1bGUnXG4jIEV4YW1wbGUgbGF5ZXJzXG5jYXJkID0gbmV3IExheWVyIG5hbWU6ICdjYXJkJ1xuY2xvc2VfYnRuID0gbmV3IExheWVyIG5hbWU6ICdjbG9zZV9idG4nLCBzdXBlckxheWVyOiBjYXJkXG5jb250YWluZXIgPSBuZXcgTGF5ZXIgbmFtZTogJ2NvbnRhaW5lcicsIHN1cGVyTGF5ZXI6IGNhcmRcbnB1Ymxpc2hfYnRuID0gbmV3IExheWVyIG5hbWU6ICdwdWJsaXNoX0J0bicsIHN1cGVyTGF5ZXI6IGNvbnRhaW5lclxuY2FuY2VsX2J0biA9IG5ldyBMYXllciBuYW1lOiAnY2FuY2VsX2J0bicsIHN1cGVyTGF5ZXI6IGNvbnRhaW5lclxuaW1hZ2UgPSBuZXcgTGF5ZXIgbmFtZTogJ2ltYWdlJywgc3VwZXJMYXllcjogY29udGFpbmVyXG5yZW1vdmVfaW1hZ2VfYnRuID0gbmV3IExheWVyIG5hbWU6ICdyZW1vdmVfaW1hZ2VfYnRuJywgc3VwZXJMYXllcjogaW1hZ2VcblxuIyBIaWVyYXJjaGllcyBmb3IgcmVnZXggdGVzdGluZ1xuIyBjYXJkXG4jIGNhcmQ+Y2xvc2VfYnRuXG4jIGNhcmQ+Y29udGFpbmVyXG4jIGNhcmQ+Y29udGFpbmVyPnB1Ymxpc2hfQnRuXG4jIGNhcmQ+Y29udGFpbmVyPmNhbmNlbF9idG5cbiMgY2FyZD5jb250YWluZXI+aW1hZ2VcbiMgY2FyZD5jb250YWluZXI+aW1hZ2U+cmVtb3ZlX2ltYWdlX2J0blxuXG5hc3NlcnQgPSAob2JqKSAtPlxuICBpZiBfLmlzRXF1YWwob2JqLnJlc3VsdCwgb2JqLmV4cGVjdGVkKSBpcyBmYWxzZVxuICAgIHByaW50IFwiVEVTVCBGQUlMRUQ6ICN7b2JqLmRlc2NyaXB0aW9ufVwiXG5cbmV4cG9ydHMucnVuVGVzdHMgPSAtPlxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnZ2V0IGFsbCBsYXllcnMnXG4gICAgcmVzdWx0OiDGksaSKClcbiAgICBleHBlY3RlZDogW2NhcmQsIGNsb3NlX2J0biwgY29udGFpbmVyLCBwdWJsaXNoX2J0biwgY2FuY2VsX2J0biwgaW1hZ2UsIHJlbW92ZV9pbWFnZV9idG5dXG5cbiAgYXNzZXJ0XG4gICAgZGVzY3JpcHRpb246ICdtdWx0aXBsZSBzZWFyY2hlcyB1c2luZyBjb21tYSdcbiAgICByZXN1bHQ6IMaSxpIoJ2NhcmQsIGltYWdlID4qYnRuJylcbiAgICBleHBlY3RlZDogW2NhcmQsIHJlbW92ZV9pbWFnZV9idG5dXG5cbiAgYXNzZXJ0XG4gICAgZGVzY3JpcHRpb246ICdnZXQgYWxsIGxheWVycyBkaXJlY3RseSB1bmRlciBjYXJkJ1xuICAgIHJlc3VsdDogxpLGkignY2FyZCA+IConKVxuICAgIGV4cGVjdGVkOiBbY2xvc2VfYnRuLCBjb250YWluZXJdXG5cbiAgYXNzZXJ0XG4gICAgZGVzY3JpcHRpb246ICdnZXQgYWxsIGxheWVycyBiZWxvdyBjYXJkJ1xuICAgIHJlc3VsdDogxpLGkignY29udGFpbmVyIConKVxuICAgIGV4cGVjdGVkOiBbcHVibGlzaF9idG4sIGNhbmNlbF9idG4sIGltYWdlLCByZW1vdmVfaW1hZ2VfYnRuXVxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnZW5kIG9mIHN0cmluZyB3aXRob3V0IHdpbGRjYXJkJ1xuICAgIHJlc3VsdDogxpLGkignbWFnZScpXG4gICAgZXhwZWN0ZWQ6IFtdXG5cbiAgYXNzZXJ0XG4gICAgZGVzY3JpcHRpb246ICdlbmQgb2Ygc3RyaW5nIHdpdGhvdXQgd2lsZGNhcmQgYW5kIGRlc2NlbmRhbnQnXG4gICAgcmVzdWx0OiDGksaSKCdpbWFnZSBidG4nKVxuICAgIGV4cGVjdGVkOiBbXVxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnZGlyZWN0IHBhcmVudCdcbiAgICByZXN1bHQ6IMaSxpIoJ2NhcmQ+Y29udGFpbmVyJylcbiAgICBleHBlY3RlZDogW2NvbnRhaW5lcl1cblxuICBhc3NlcnRcbiAgICBkZXNjcmlwdGlvbjogJ2RpcmVjdCBwYXJlbnQgKyB3aWxkY2FyZCdcbiAgICByZXN1bHQ6IMaSxpIoJ2NvbnRhaW5lcj4qYnRuJylcbiAgICBleHBlY3RlZDogW2NhbmNlbF9idG5dXG5cbiAgYXNzZXJ0XG4gICAgZGVzY3JpcHRpb246ICdmcm9tIGxheWVyJ1xuICAgIHJlc3VsdDogY29udGFpbmVyLsaSxpIoJ2ltYWdlJylcbiAgICBleHBlY3RlZDogW2ltYWdlXVxuXG4gIGFzc2VydFxuICAgIGRlc2NyaXB0aW9uOiAnc2luZ2xlIGl0ZW0nXG4gICAgcmVzdWx0OiDGksaSKCdjYXJkJylcbiAgICBleHBlY3RlZDogW2NhcmRdXG5cbiAgYXNzZXJ0XG4gICAgZGVzY3JpcHRpb246ICdsb25nIGRpc3RhbmNlJ1xuICAgIHJlc3VsdDogxpLGkignY2FyZCBpbWFnZScpXG4gICAgZXhwZWN0ZWQ6IFtpbWFnZV1cblxuICBhc3NlcnRcbiAgICBkZXNjcmlwdGlvbjogJ2Rlc2NlbmRhbnQgbGF5ZXJzIHdpdGggd2lsZGNhcmQnXG4gICAgcmVzdWx0OiDGksaSKCdjYXJkIGNvbnRhaW5lciAqYnRuJylcbiAgICBleHBlY3RlZDogW2NhbmNlbF9idG4scmVtb3ZlX2ltYWdlX2J0bl1cblxuICBhc3NlcnRcbiAgICBkZXNjcmlwdGlvbjogJ2NvbnRhaW5pbmcnXG4gICAgcmVzdWx0OiDGksaSKCcqaW1hZ2UqJylcbiAgICBleHBlY3RlZDogW2ltYWdlLHJlbW92ZV9pbWFnZV9idG5dIl19
