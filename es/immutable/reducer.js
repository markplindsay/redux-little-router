var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { List, Map, fromJS } from './util/immutable';
/* eslint-disable new-cap */


import { LOCATION_CHANGED, REPLACE_ROUTES, DID_REPLACE_ROUTES, isNavigationActionWithPayload } from '../types';
import { resolveLocation } from '../reducer';

var locationChangeReducer = function locationChangeReducer(state, action) {
  // No-op the initial route action
  var queue = state.get('queue', List());
  if (state.get('pathname') === action.payload.pathname && state.get('search') === action.payload.search && state.get('hash') === action.payload.hash && !queue.size) {
    return state;
  }

  var queuedLocation = queue.get(0, Map());
  var newQueue = queue.rest();

  // Extract the previous state, but dump the
  // previous state's previous state so that the
  // state tree doesn't keep growing indefinitely
  // eslint-disable-next-line no-unused-vars
  var oldLocation = state.withMutations(function (routerState) {
    routerState.delete('previous').delete('routes');
  }).toJS();
  var options = queuedLocation.get('options', Map()).toJS();
  var query = queuedLocation.get('query', Map()).toJS();
  var newLocation = _extends({}, action.payload, { query: query });

  var _resolveLocation = resolveLocation({
    oldLocation: oldLocation,
    newLocation: newLocation,
    options: options
  }),
      resolvedNewLocation = _resolveLocation.newLocation;

  return fromJS(resolvedNewLocation).merge({
    routes: state.get('routes', Map()),
    queue: newQueue
  });
};

export default (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$routes = _ref.routes,
      routes = _ref$routes === undefined ? {} : _ref$routes,
      initialLocation = _ref.initialLocation;

  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fromJS(_extends({}, initialLocation, { routes: routes, queue: [] }));
    var action = arguments[1];

    if (isNavigationActionWithPayload(action)) {
      var payload = fromJS(action.payload);
      return state.update('queue', List(), function (queue) {
        return queue.push(payload);
      });
    }

    if (action.type === REPLACE_ROUTES) {
      var _action$payload = action.payload,
          currentRoutes = _action$payload.routes,
          options = _action$payload.options;

      return state.withMutations(function (routerState) {
        routerState.set('routes', fromJS(currentRoutes)).set('options', fromJS(options));
      });
    }

    if (action.type === DID_REPLACE_ROUTES) {
      return state.set('options', Map());
    }

    if (action.type === LOCATION_CHANGED) {
      return locationChangeReducer(state, action);
    }

    return state;
  };
});