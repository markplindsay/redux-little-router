'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/* eslint-disable new-cap */


var _immutable = require('./util/immutable');

var _types = require('../types');

var _reducer = require('../reducer');

var locationChangeReducer = function locationChangeReducer(state, action) {
  // No-op the initial route action
  var queue = state.get('queue', (0, _immutable.List)());
  if (state.get('pathname') === action.payload.pathname && state.get('search') === action.payload.search && state.get('hash') === action.payload.hash && !queue.size) {
    return state;
  }

  var queuedLocation = queue.get(0, (0, _immutable.Map)());
  var newQueue = queue.rest();

  // Extract the previous state, but dump the
  // previous state's previous state so that the
  // state tree doesn't keep growing indefinitely
  // eslint-disable-next-line no-unused-vars
  var oldLocation = state.withMutations(function (routerState) {
    routerState.delete('previous').delete('routes');
  }).toJS();
  var options = queuedLocation.get('options', (0, _immutable.Map)()).toJS();
  var query = queuedLocation.get('query', (0, _immutable.Map)()).toJS();
  var newLocation = _extends({}, action.payload, { query: query });

  var _resolveLocation = (0, _reducer.resolveLocation)({
    oldLocation: oldLocation,
    newLocation: newLocation,
    options: options
  }),
      resolvedNewLocation = _resolveLocation.newLocation;

  return (0, _immutable.fromJS)(resolvedNewLocation).merge({
    routes: state.get('routes', (0, _immutable.Map)()),
    queue: newQueue
  });
};

exports.default = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$routes = _ref.routes,
      routes = _ref$routes === undefined ? {} : _ref$routes,
      initialLocation = _ref.initialLocation;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.fromJS)(_extends({}, initialLocation, { routes: routes, queue: [] }));
    var action = arguments[1];

    if ((0, _types.isNavigationActionWithPayload)(action)) {
      var payload = (0, _immutable.fromJS)(action.payload);
      return state.update('queue', (0, _immutable.List)(), function (queue) {
        return queue.push(payload);
      });
    }

    if (action.type === _types.REPLACE_ROUTES) {
      var _action$payload = action.payload,
          currentRoutes = _action$payload.routes,
          options = _action$payload.options;

      return state.withMutations(function (routerState) {
        routerState.set('routes', (0, _immutable.fromJS)(currentRoutes)).set('options', (0, _immutable.fromJS)(options));
      });
    }

    if (action.type === _types.DID_REPLACE_ROUTES) {
      return state.set('options', (0, _immutable.Map)());
    }

    if (action.type === _types.LOCATION_CHANGED) {
      return locationChangeReducer(state, action);
    }

    return state;
  };
};