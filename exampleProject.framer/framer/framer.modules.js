require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"findModule":[function(require,module,exports){
var _findAll, _getHierarchy, _match, templateLayer,
  slice = [].slice;

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
  var layers;
  layers = Framer.CurrentContext.getLayers();
  if (selector != null) {
    return layers = _.filter(layers, function(layer) {
      var hierarchy;
      hierarchy = _getHierarchy(layer);
      if (fromLayer != null) {
        return _match(hierarchy, fromLayer.name + ' ' + selector);
      } else {
        return _match(hierarchy, selector);
      }
    });
  } else {
    return layers;
  }
};

exports.ƒ = function(selector, fromLayer) {
  return _findAll(selector, fromLayer);
};

Layer.prototype.ƒ = function(selector) {
  return _findAll(selector, this);
};


/*
Add ability to call layer methods and properties on all arrays, not just those returned by ƒ()
 */

templateLayer = new Layer;

_.keys(Layer.prototype).forEach(function(k) {
  if (k === 'toInspect') {
    return;
  }
  if (typeof templateLayer[k] === 'function') {
    return Object.defineProperty(Array.prototype, k, {
      enumerable: false,
      configurable: true,
      value: function() {
        var params;
        params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return _.each(this, function(l) {
          if (l instanceof Layer) {
            return l[k].apply(l, params);
          }
        });
      }
    });
  } else {
    return Object.defineProperty(Array.prototype, k, {
      set: function(newValue) {
        return _.each(this, function(l) {
          if (l instanceof Layer) {
            return l[k] = newValue;
          }
        });
      },
      configurable: true,
      enumerable: false
    });
  }
});

Object.defineProperty(Array.prototype, 'states', {
  get: function() {
    var obj;
    obj = {};
    _.keys(Object.getPrototypeOf(templateLayer.states)).forEach((function(_this) {
      return function(k) {
        return obj[k] = function() {
          var params;
          params = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return _.each(_this, function(l) {
            var ref;
            return (ref = l.states)[k].apply(ref, params);
          });
        };
      };
    })(this));
    return obj;
  },
  configurable: true,
  enumerable: false
});

templateLayer.destroy();


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW53YS9Eb2N1bWVudHMvRmluZC1mb3ItRnJhbWVyL2V4YW1wbGVQcm9qZWN0LmZyYW1lci9tb2R1bGVzL2ZpbmRNb2R1bGUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSw4Q0FBQTtFQUFBOztBQUFBLGFBQUEsR0FBZ0IsU0FBQyxLQUFEO0FBQ2QsTUFBQTtFQUFBLE1BQUEsR0FBUztBQUNUO0FBQUEsT0FBQSxxQ0FBQTs7SUFDRSxNQUFBLEdBQVMsQ0FBQyxDQUFDLElBQUYsR0FBTyxHQUFQLEdBQVc7QUFEdEI7QUFFQSxTQUFPLE1BQUEsR0FBUyxNQUFBLEdBQU8sS0FBSyxDQUFDO0FBSmY7O0FBTWhCLE1BQUEsR0FBUyxTQUFDLFNBQUQsRUFBWSxNQUFaO0FBRVAsTUFBQTtFQUFBLE1BQUEsR0FBUyxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQWYsRUFBMEIsR0FBMUI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsT0FBdkI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsU0FBdkI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsSUFBdkI7RUFDVCxXQUFBLEdBQWMsT0FBQSxHQUFRLE1BQVIsR0FBZTtFQUU3QixNQUFBLEdBQWEsSUFBQSxNQUFBLENBQU8sV0FBUDtBQUNiLFNBQU8sU0FBUyxDQUFDLEtBQVYsQ0FBZ0IsTUFBaEI7QUFUQTs7QUFXVCxRQUFBLEdBQVcsU0FBQyxRQUFELEVBQVcsU0FBWDtBQUNULE1BQUE7RUFBQSxNQUFBLEdBQVMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUF0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Iiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiX2dldEhpZXJhcmNoeSA9IChsYXllcikgLT5cbiAgc3RyaW5nID0gJydcbiAgZm9yIGEgaW4gbGF5ZXIuYW5jZXN0b3JzKClcbiAgICBzdHJpbmcgPSBhLm5hbWUrJz4nK3N0cmluZ1xuICByZXR1cm4gc3RyaW5nID0gc3RyaW5nK2xheWVyLm5hbWVcblxuX21hdGNoID0gKGhpZXJhcmNoeSwgc3RyaW5nKSAtPlxuICAjIHByZXBhcmUgcmVnZXggdG9rZW5zXG4gIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXHMqPlxccyovZywnPicpICMgY2xlYW4gdXAgc3BhY2VzIGFyb3VuZCBhcnJvd3NcbiAgc3RyaW5nID0gc3RyaW5nLnNwbGl0KCcqJykuam9pbignW14+XSonKSAjIGFzdGVyaWtzIGFzIGxheWVyIG5hbWUgd2lsZGNhcmRcbiAgc3RyaW5nID0gc3RyaW5nLnNwbGl0KCcgJykuam9pbignKD86LiopPicpICMgc3BhY2UgYXMgc3RydWN0dXJlIHdpbGRjYXJkXG4gIHN0cmluZyA9IHN0cmluZy5zcGxpdCgnLCcpLmpvaW4oJyR8JykgIyBhbGxvdyBtdWx0aXBsZSBzZWFyY2hlcyB1c2luZyBjb21tYVxuICByZWdleFN0cmluZyA9IFwiKF58PilcIitzdHJpbmcrXCIkXCIgIyBhbHdheXMgYm90dG9tIGxheWVyLCBtYXliZSBwYXJ0IG9mIGhpZXJhcmNoeVxuXG4gIHJlZ0V4cCA9IG5ldyBSZWdFeHAocmVnZXhTdHJpbmcpIFxuICByZXR1cm4gaGllcmFyY2h5Lm1hdGNoKHJlZ0V4cClcblxuX2ZpbmRBbGwgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT5cbiAgbGF5ZXJzID0gRnJhbWVyLkN1cnJlbnRDb250ZXh0LmdldExheWVycygpXG5cbiAgaWYgc2VsZWN0b3I/XG4gICAgbGF5ZXJzID0gXy5maWx0ZXIgbGF5ZXJzLCAobGF5ZXIpIC0+XG4gICAgICBoaWVyYXJjaHkgPSBfZ2V0SGllcmFyY2h5KGxheWVyKVxuICAgICAgaWYgZnJvbUxheWVyP1xuICAgICAgICBfbWF0Y2goaGllcmFyY2h5LCBmcm9tTGF5ZXIubmFtZSsnICcrc2VsZWN0b3IpXG4gICAgICBlbHNlXG4gICAgICAgIF9tYXRjaChoaWVyYXJjaHksIHNlbGVjdG9yKVxuICBlbHNlXG4gICAgbGF5ZXJzXG5cbmV4cG9ydHMuxpIgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBmcm9tTGF5ZXIpXG5MYXllcjo6xpIgID0gKHNlbGVjdG9yKSAgICAgICAgICAgICAtPiBfZmluZEFsbChzZWxlY3RvciwgQClcblxuIyMjXG5BZGQgYWJpbGl0eSB0byBjYWxsIGxheWVyIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgb24gYWxsIGFycmF5cywgbm90IGp1c3QgdGhvc2UgcmV0dXJuZWQgYnkgxpIoKVxuIyMjXG5cbnRlbXBsYXRlTGF5ZXIgPSBuZXcgTGF5ZXJcblxuIyBBZGQgbGF5ZXIgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xuXy5rZXlzKExheWVyLnByb3RvdHlwZSkuZm9yRWFjaCAoaykgLT5cbiAgaWYgayBpcyAndG9JbnNwZWN0JyB0aGVuIHJldHVyblxuICBpZiB0eXBlb2YgdGVtcGxhdGVMYXllcltrXSBpcyAnZnVuY3Rpb24nXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSwgaywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgdmFsdWU6IChwYXJhbXMuLi4pIC0+IFxuICAgICAgICBfLmVhY2ggQCwgKGwpIC0+IGxba10ocGFyYW1zLi4uKSBpZiBsIGluc3RhbmNlb2YgTGF5ZXJcbiAgICB9KVxuICBlbHNlXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSwgaywge1xuICAgICAgc2V0OiAobmV3VmFsdWUpIC0+XG4gICAgICAgIF8uZWFjaCBALCAobCkgLT5cbiAgICAgICAgICBsW2tdID0gbmV3VmFsdWUgaWYgbCBpbnN0YW5jZW9mIExheWVyXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgfSlcblxuIyBBZGQgc3VwcG9ydCBmb3Igc3RhdGVzXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnc3RhdGVzJywge1xuICBnZXQ6IC0+IFxuICAgIG9iaiA9IHt9XG4gICAgXy5rZXlzKE9iamVjdC5nZXRQcm90b3R5cGVPZih0ZW1wbGF0ZUxheWVyLnN0YXRlcykpLmZvckVhY2ggKGspID0+XG4gICAgICBvYmpba10gPSAocGFyYW1zLi4uKSA9PlxuICAgICAgICBfLmVhY2ggQCwgKGwpIC0+IGwuc3RhdGVzW2tdKHBhcmFtcy4uLilcbiAgICByZXR1cm4gb2JqXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICBlbnVtZXJhYmxlOiBmYWxzZVxufSlcblxudGVtcGxhdGVMYXllci5kZXN0cm95KCkiXX0=
