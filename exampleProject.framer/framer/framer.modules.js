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
    layers = _.filter(layers, function(layer) {
      var hierarchy;
      hierarchy = _getHierarchy(layer);
      if (fromLayer != null) {
        return _match(hierarchy, fromLayer.name + ' ' + selector);
      } else {
        return _match(hierarchy, selector);
      }
    });
    if (layers.length > 1) {
      return layers;
    } else {
      return layers[0];
    }
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

exports.Find = function(selector, fromLayer) {
  return _findAll(selector, fromLayer);
};

Layer.prototype.find = function(selector, fromLayer) {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW53YS9Eb2N1bWVudHMvRmluZC1mb3ItRnJhbWVyL2V4YW1wbGVQcm9qZWN0LmZyYW1lci9tb2R1bGVzL2ZpbmRNb2R1bGUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSw4Q0FBQTtFQUFBOztBQUFBLGFBQUEsR0FBZ0IsU0FBQyxLQUFEO0FBQ2QsTUFBQTtFQUFBLE1BQUEsR0FBUztBQUNUO0FBQUEsT0FBQSxxQ0FBQTs7SUFDRSxNQUFBLEdBQVMsQ0FBQyxDQUFDLElBQUYsR0FBTyxHQUFQLEdBQVc7QUFEdEI7QUFFQSxTQUFPLE1BQUEsR0FBUyxNQUFBLEdBQU8sS0FBSyxDQUFDO0FBSmY7O0FBTWhCLE1BQUEsR0FBUyxTQUFDLFNBQUQsRUFBWSxNQUFaO0FBRVAsTUFBQTtFQUFBLE1BQUEsR0FBUyxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQWYsRUFBMEIsR0FBMUI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsT0FBdkI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsU0FBdkI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsSUFBdkI7RUFDVCxXQUFBLEdBQWMsT0FBQSxHQUFRLE1BQVIsR0FBZTtFQUU3QixNQUFBLEdBQWEsSUFBQSxNQUFBLENBQU8sV0FBUDtBQUNiLFNBQU8sU0FBUyxDQUFDLEtBQVYsQ0FBZ0IsTUFBaEI7QUFUQTs7QUFXVCxRQUFBLEdBQVcsU0FBQyxRQUFELEVBQVcsU0FBWDtBQUNULE1BQUE7RUFBQSxNQUFBLEdBQVMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUF0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LENBQUMsQ0FBQyxJQUFGLENBQU8sS0FBUCxFQUFVLFNBQUMsQ0FBRDtBQUFPLGdCQUFBO21CQUFBLE9BQUEsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxDQUFBLENBQUEsQ0FBVCxZQUFZLE1BQVo7VUFBUCxDQUFWO1FBRE87TUFEaUQ7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTVEO0FBR0EsV0FBTztFQUxKLENBRDBDO0VBTy9DLFlBQUEsRUFBYyxJQVBpQztFQVEvQyxVQUFBLEVBQVksS0FSbUM7Q0FBakQ7O0FBV0EsYUFBYSxDQUFDLE9BQWQsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJfZ2V0SGllcmFyY2h5ID0gKGxheWVyKSAtPlxuICBzdHJpbmcgPSAnJ1xuICBmb3IgYSBpbiBsYXllci5hbmNlc3RvcnMoKVxuICAgIHN0cmluZyA9IGEubmFtZSsnPicrc3RyaW5nXG4gIHJldHVybiBzdHJpbmcgPSBzdHJpbmcrbGF5ZXIubmFtZVxuXG5fbWF0Y2ggPSAoaGllcmFyY2h5LCBzdHJpbmcpIC0+XG4gICMgcHJlcGFyZSByZWdleCB0b2tlbnNcbiAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xccyo+XFxzKi9nLCc+JykgIyBjbGVhbiB1cCBzcGFjZXMgYXJvdW5kIGFycm93c1xuICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJyonKS5qb2luKCdbXj5dKicpICMgYXN0ZXJpa3MgYXMgbGF5ZXIgbmFtZSB3aWxkY2FyZFxuICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJyAnKS5qb2luKCcoPzouKik+JykgIyBzcGFjZSBhcyBzdHJ1Y3R1cmUgd2lsZGNhcmRcbiAgc3RyaW5nID0gc3RyaW5nLnNwbGl0KCcsJykuam9pbignJHwnKSAjIGFsbG93IG11bHRpcGxlIHNlYXJjaGVzIHVzaW5nIGNvbW1hXG4gIHJlZ2V4U3RyaW5nID0gXCIoXnw+KVwiK3N0cmluZytcIiRcIiAjIGFsd2F5cyBib3R0b20gbGF5ZXIsIG1heWJlIHBhcnQgb2YgaGllcmFyY2h5XG5cbiAgcmVnRXhwID0gbmV3IFJlZ0V4cChyZWdleFN0cmluZykgXG4gIHJldHVybiBoaWVyYXJjaHkubWF0Y2gocmVnRXhwKVxuXG5fZmluZEFsbCA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPlxuICBsYXllcnMgPSBGcmFtZXIuQ3VycmVudENvbnRleHQuZ2V0TGF5ZXJzKClcblxuICBpZiBzZWxlY3Rvcj9cbiAgICBsYXllcnMgPSBfLmZpbHRlciBsYXllcnMsIChsYXllcikgLT5cbiAgICAgIGhpZXJhcmNoeSA9IF9nZXRIaWVyYXJjaHkobGF5ZXIpXG4gICAgICBpZiBmcm9tTGF5ZXI/XG4gICAgICAgIF9tYXRjaChoaWVyYXJjaHksIGZyb21MYXllci5uYW1lKycgJytzZWxlY3RvcilcbiAgICAgIGVsc2VcbiAgICAgICAgX21hdGNoKGhpZXJhcmNoeSwgc2VsZWN0b3IpXG4gICAgaWYgbGF5ZXJzLmxlbmd0aCA+IDEgXG4gICAgICByZXR1cm4gbGF5ZXJzXG4gICAgZWxzZSBcbiAgICAgIHJldHVybiBsYXllcnNbMF1cbiAgZWxzZVxuICAgIGxheWVyc1xuXG4jIFJlY29tbWVuZGVkXG5leHBvcnRzLsaSID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpICAtPiBfZmluZEFsbChzZWxlY3RvciwgZnJvbUxheWVyKVxuI2V4cG9ydHMuxpLGkiA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgZnJvbUxheWVyKVxuTGF5ZXI6OsaSICA9IChzZWxlY3RvcikgICAgICAgICAgICAgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIEApXG4jTGF5ZXI6OsaSxpIgID0gKHNlbGVjdG9yKSAgICAgICAgICAgIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBAKVxuXG4jIEJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5leHBvcnRzLkZpbmQgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIGZyb21MYXllcilcbiNleHBvcnRzLkZpbmRBbGwgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIGZyb21MYXllcilcbkxheWVyOjpmaW5kICAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgQClcbiNMYXllcjo6ZmluZEFsbCAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIEApXG5cbiMjI1xuQWRkIGFiaWxpdHkgdG8gY2FsbCBsYXllciBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIG9uIGFsbCBhcnJheXMsIG5vdCBqdXN0IHRob3NlIHJldHVybmVkIGJ5IMaSKClcbiMjI1xuXG50ZW1wbGF0ZUxheWVyID0gbmV3IExheWVyXG5cbiMgQWRkIGxheWVyIHByb3BlcnRpZXMgYW5kIG1ldGhvZHNcbl8ua2V5cyhMYXllci5wcm90b3R5cGUpLmZvckVhY2ggKGspIC0+XG4gIGlmIGsgaXMgJ3RvSW5zcGVjdCcgdGhlbiByZXR1cm5cbiAgaWYgdHlwZW9mIHRlbXBsYXRlTGF5ZXJba10gaXMgJ2Z1bmN0aW9uJ1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnJheS5wcm90b3R5cGUsIGssIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIHZhbHVlOiAocGFyYW1zLi4uKSAtPiBcbiAgICAgICAgXy5lYWNoIEAsIChsKSAtPiBsW2tdKHBhcmFtcy4uLikgaWYgbCBpbnN0YW5jZW9mIExheWVyXG4gICAgfSlcbiAgZWxzZVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnJheS5wcm90b3R5cGUsIGssIHtcbiAgICAgIHNldDogKG5ld1ZhbHVlKSAtPlxuICAgICAgICBfLmVhY2ggQCwgKGwpIC0+XG4gICAgICAgICAgbFtrXSA9IG5ld1ZhbHVlIGlmIGwgaW5zdGFuY2VvZiBMYXllclxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgIH0pXG5cbiMgQWRkIHN1cHBvcnQgZm9yIHN0YXRlc1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KEFycmF5LnByb3RvdHlwZSwgJ3N0YXRlcycsIHtcbiAgZ2V0OiAtPiBcbiAgICBvYmogPSB7fVxuICAgIF8ua2V5cyhPYmplY3QuZ2V0UHJvdG90eXBlT2YodGVtcGxhdGVMYXllci5zdGF0ZXMpKS5mb3JFYWNoIChrKSA9PlxuICAgICAgb2JqW2tdID0gKHBhcmFtcy4uLikgPT5cbiAgICAgICAgXy5lYWNoIEAsIChsKSAtPiBsLnN0YXRlc1trXShwYXJhbXMuLi4pXG4gICAgcmV0dXJuIG9ialxuICBjb25maWd1cmFibGU6IHRydWVcbiAgZW51bWVyYWJsZTogZmFsc2Vcbn0pXG5cbnRlbXBsYXRlTGF5ZXIuZGVzdHJveSgpIl19
