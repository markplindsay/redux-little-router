

export var LOCATION_CHANGED = 'ROUTER_LOCATION_CHANGED';

export var PUSH = 'ROUTER_PUSH';
export var REPLACE = 'ROUTER_REPLACE';
export var GO = 'ROUTER_GO';
export var GO_BACK = 'ROUTER_GO_BACK';
export var GO_FORWARD = 'ROUTER_GO_FORWARD';
export var POP = 'ROUTER_POP';
export var BLOCK = 'ROUTER_BLOCK';
export var UNBLOCK = 'ROUTER_UNBLOCK';
export var REPLACE_ROUTES = 'ROUTER_REPLACE_ROUTES';
export var DID_REPLACE_ROUTES = 'ROUTER_DID_REPLACE_ROUTES';

var actionsWithPayload = [PUSH, REPLACE, GO, POP];
var actions = [].concat(actionsWithPayload, [GO_FORWARD, GO_BACK, POP, BLOCK, UNBLOCK]);

export var isNavigationAction = function isNavigationAction(action) {
  return actions.indexOf(action.type) !== -1;
};

export var isNavigationActionWithPayload = function isNavigationActionWithPayload(action) {
  return actionsWithPayload.indexOf(action.type) !== -1;
};