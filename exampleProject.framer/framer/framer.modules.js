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


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW53YS9Eb2N1bWVudHMvRmluZC1mb3ItRnJhbWVyL2V4YW1wbGVQcm9qZWN0LmZyYW1lci9tb2R1bGVzL2ZpbmRNb2R1bGUuY29mZmVlIiwiL1VzZXJzL2Fud2EvRG9jdW1lbnRzL0ZpbmQtZm9yLUZyYW1lci9leGFtcGxlUHJvamVjdC5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLGFBQUEsR0FBZ0IsU0FBQyxLQUFEO0FBQ2QsTUFBQTtFQUFBLE1BQUEsR0FBUztBQUNUO0FBQUEsT0FBQSxxQ0FBQTs7SUFDRSxNQUFBLEdBQVMsQ0FBQyxDQUFDLElBQUYsR0FBTyxHQUFQLEdBQVc7QUFEdEI7QUFFQSxTQUFPLE1BQUEsR0FBUyxNQUFBLEdBQU8sS0FBSyxDQUFDO0FBSmY7O0FBTWhCLE1BQUEsR0FBUyxTQUFDLFNBQUQsRUFBWSxNQUFaO0FBRVAsTUFBQTtFQUFBLE1BQUEsR0FBUyxNQUFNLENBQUMsT0FBUCxDQUFlLFVBQWYsRUFBMEIsR0FBMUI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsT0FBdkI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsU0FBdkI7RUFDVCxNQUFBLEdBQVMsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWlCLENBQUMsSUFBbEIsQ0FBdUIsSUFBdkI7RUFDVCxXQUFBLEdBQWMsT0FBQSxHQUFRLE1BQVIsR0FBZTtFQUU3QixNQUFBLEdBQWEsSUFBQSxNQUFBLENBQU8sV0FBUDtBQUNiLFNBQU8sU0FBUyxDQUFDLEtBQVYsQ0FBZ0IsTUFBaEI7QUFUQTs7QUFXVCxRQUFBLEdBQVcsU0FBQyxRQUFELEVBQVcsU0FBWDtBQUNULE1BQUE7RUFBQSxNQUFBLEdBQVMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUF0QixDQUFBO0VBRVQsSUFBRyxnQkFBSDtXQUNFLE1BQUEsR0FBUyxDQUFDLENBQUMsTUFBRixDQUFTLE1BQVQsRUFBaUIsU0FBQyxLQUFEO0FBQ3hCLFVBQUE7TUFBQSxTQUFBLEdBQVksYUFBQSxDQUFjLEtBQWQ7TUFDWixJQUFHLGlCQUFIO2VBQ0UsTUFBQSxDQUFPLFNBQVAsRUFBa0IsU0FBUyxDQUFDLElBQVYsR0FBZSxHQUFmLEdBQW1CLFFBQXJDLEVBREY7T0FBQSxNQUFBO2VBR0UsTUFBQSxDQUFPLFNBQVAsRUFBa0IsUUFBbEIsRUFIRjs7SUFGd0IsQ0FBakIsRUFEWDtHQUFBLE1BQUE7V0FRRSxPQVJGOztBQUhTOztBQWVYLE9BQU8sQ0FBQyxJQUFSLEdBQWtCLFNBQUMsUUFBRCxFQUFXLFNBQVg7U0FBeUIsUUFBQSxDQUFTLFFBQVQsRUFBbUIsU0FBbkIsQ0FBOEIsQ0FBQSxDQUFBO0FBQXZEOztBQUNsQixPQUFPLENBQUMsQ0FBUixHQUFrQixTQUFDLFFBQUQsRUFBVyxTQUFYO1NBQXlCLFFBQUEsQ0FBUyxRQUFULEVBQW1CLFNBQW5CLENBQThCLENBQUEsQ0FBQTtBQUF2RDs7QUFFbEIsT0FBTyxDQUFDLE9BQVIsR0FBa0IsU0FBQyxRQUFELEVBQVcsU0FBWDtTQUF5QixRQUFBLENBQVMsUUFBVCxFQUFtQixTQUFuQjtBQUF6Qjs7QUFDbEIsT0FBTyxDQUFDLEVBQVIsR0FBa0IsU0FBQyxRQUFELEVBQVcsU0FBWDtTQUF5QixRQUFBLENBQVMsUUFBVCxFQUFtQixTQUFuQjtBQUF6Qjs7QUFHbEIsS0FBSyxDQUFBLFNBQUUsQ0FBQSxJQUFQLEdBQWtCLFNBQUMsUUFBRCxFQUFXLFNBQVg7U0FBeUIsUUFBQSxDQUFTLFFBQVQsRUFBbUIsSUFBbkIsQ0FBc0IsQ0FBQSxDQUFBO0FBQS9DOztBQUNsQixLQUFLLENBQUEsU0FBRSxDQUFBLENBQVAsR0FBa0IsU0FBQyxRQUFELEVBQVcsU0FBWDtTQUF5QixRQUFBLENBQVMsUUFBVCxFQUFtQixJQUFuQixDQUFzQixDQUFBLENBQUE7QUFBL0M7O0FBRWxCLEtBQUssQ0FBQSxTQUFFLENBQUEsT0FBUCxHQUFrQixTQUFDLFFBQUQsRUFBVyxTQUFYO1NBQXlCLFFBQUEsQ0FBUyxRQUFULEVBQW1CLElBQW5CO0FBQXpCOztBQUNsQixLQUFLLENBQUEsU0FBRSxDQUFBLEVBQVAsR0FBa0IsU0FBQyxRQUFELEVBQVcsU0FBWDtTQUF5QixRQUFBLENBQVMsUUFBVCxFQUFtQixJQUFuQjtBQUF6Qjs7OztBQ3ZDbEIsT0FBTyxDQUFDLEtBQVIsR0FBZ0I7O0FBRWhCLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFNBQUE7U0FDcEIsS0FBQSxDQUFNLHVCQUFOO0FBRG9COztBQUdyQixPQUFPLENBQUMsT0FBUixHQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJfZ2V0SGllcmFyY2h5ID0gKGxheWVyKSAtPlxuICBzdHJpbmcgPSAnJ1xuICBmb3IgYSBpbiBsYXllci5hbmNlc3RvcnMoKVxuICAgIHN0cmluZyA9IGEubmFtZSsnPicrc3RyaW5nXG4gIHJldHVybiBzdHJpbmcgPSBzdHJpbmcrbGF5ZXIubmFtZVxuXG5fbWF0Y2ggPSAoaGllcmFyY2h5LCBzdHJpbmcpIC0+XG4gICMgcHJlcGFyZSByZWdleCB0b2tlbnNcbiAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xccyo+XFxzKi9nLCc+JykgIyBjbGVhbiB1cCBzcGFjZXMgYXJvdW5kIGFycm93c1xuICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJyonKS5qb2luKCdbXj5dKicpICMgYXN0ZXJpa3MgYXMgbGF5ZXIgbmFtZSB3aWxkY2FyZFxuICBzdHJpbmcgPSBzdHJpbmcuc3BsaXQoJyAnKS5qb2luKCcoPzouKik+JykgIyBzcGFjZSBhcyBzdHJ1Y3R1cmUgd2lsZGNhcmRcbiAgc3RyaW5nID0gc3RyaW5nLnNwbGl0KCcsJykuam9pbignJHwnKSAjIGFsbG93IG11bHRpcGxlIHNlYXJjaGVzIHVzaW5nIGNvbW1hXG4gIHJlZ2V4U3RyaW5nID0gXCIoXnw+KVwiK3N0cmluZytcIiRcIiAjIGFsd2F5cyBib3R0b20gbGF5ZXIsIG1heWJlIHBhcnQgb2YgaGllcmFyY2h5XG5cbiAgcmVnRXhwID0gbmV3IFJlZ0V4cChyZWdleFN0cmluZykgXG4gIHJldHVybiBoaWVyYXJjaHkubWF0Y2gocmVnRXhwKVxuXG5fZmluZEFsbCA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPlxuICBsYXllcnMgPSBGcmFtZXIuQ3VycmVudENvbnRleHQuZ2V0TGF5ZXJzKClcblxuICBpZiBzZWxlY3Rvcj9cbiAgICBsYXllcnMgPSBfLmZpbHRlciBsYXllcnMsIChsYXllcikgLT5cbiAgICAgIGhpZXJhcmNoeSA9IF9nZXRIaWVyYXJjaHkobGF5ZXIpXG4gICAgICBpZiBmcm9tTGF5ZXI/XG4gICAgICAgIF9tYXRjaChoaWVyYXJjaHksIGZyb21MYXllci5uYW1lKycgJytzZWxlY3RvcilcbiAgICAgIGVsc2VcbiAgICAgICAgX21hdGNoKGhpZXJhcmNoeSwgc2VsZWN0b3IpXG4gIGVsc2VcbiAgICBsYXllcnNcblxuXG4jIEdsb2JhbFxuZXhwb3J0cy5GaW5kICAgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBmcm9tTGF5ZXIpWzBdXG5leHBvcnRzLsaSICAgICAgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBmcm9tTGF5ZXIpWzBdXG5cbmV4cG9ydHMuRmluZEFsbCA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgZnJvbUxheWVyKVxuZXhwb3J0cy7GksaSICAgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIGZyb21MYXllcilcblxuIyBNZXRob2RzXG5MYXllcjo6ZmluZCAgICAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIEApWzBdXG5MYXllcjo6xpIgICAgICAgID0gKHNlbGVjdG9yLCBmcm9tTGF5ZXIpIC0+IF9maW5kQWxsKHNlbGVjdG9yLCBAKVswXVxuXG5MYXllcjo6ZmluZEFsbCAgPSAoc2VsZWN0b3IsIGZyb21MYXllcikgLT4gX2ZpbmRBbGwoc2VsZWN0b3IsIEApXG5MYXllcjo6xpLGkiAgICAgICA9IChzZWxlY3RvciwgZnJvbUxheWVyKSAtPiBfZmluZEFsbChzZWxlY3RvciwgQCkiLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIl19
