var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { PUSH, REPLACE, GO, GO_BACK, GO_FORWARD, BLOCK, UNBLOCK, LOCATION_CHANGED, REPLACE_ROUTES, DID_REPLACE_ROUTES } from './types';

import normalizeHref from './util/normalize-href';
import flattenRoutes from './util/flatten-routes';

export var push = function push(href) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    type: PUSH,
    payload: _extends({}, normalizeHref(href), { options: options })
  };
};

export var replace = function replace(href) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    type: REPLACE,
    payload: _extends({}, normalizeHref(href), { options: options })
  };
};

export var go = function go(index) {
  return {
    type: GO,
    payload: index
  };
};

export var goBack = function goBack() {
  return { type: GO_BACK };
};
export var goForward = function goForward() {
  return { type: GO_FORWARD };
};

export var block = function block(historyShouldBlock) {
  return {
    type: BLOCK,
    payload: historyShouldBlock
  };
};

export var unblock = function unblock() {
  return { type: UNBLOCK };
};

export var locationDidChange = function locationDidChange(location) {
  return {
    type: LOCATION_CHANGED,
    payload: location
  };
};

export var initializeCurrentLocation = function initializeCurrentLocation(location) {
  return {
    type: LOCATION_CHANGED,
    payload: location
  };
};

export var replaceRoutes = function replaceRoutes(routes) {
  return {
    type: REPLACE_ROUTES,
    payload: {
      routes: flattenRoutes(routes),
      options: {
        updateRoutes: true
      }
    }
  };
};

export var didReplaceRoutes = function didReplaceRoutes() {
  return {
    type: DID_REPLACE_ROUTES
  };
};