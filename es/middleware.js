var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { PUSH, REPLACE, GO, GO_BACK, GO_FORWARD, BLOCK, UNBLOCK, isNavigationAction } from './types';
/* eslint-disable consistent-return */


import mergeQueries from './util/merge-queries';

var unblock = null;

var navigate = function navigate(history, action) {
  switch (action.type) {
    case PUSH:
      history.push(action.payload);
      break;
    case REPLACE:
      history.replace(action.payload);
      break;
    case GO:
      history.go(action.payload);
      break;
    case GO_BACK:
      history.goBack();
      break;
    case GO_FORWARD:
      history.goForward();
      break;
    case BLOCK:
      unblock = history.block(action.payload);
      break;
    case UNBLOCK:
      if (unblock) {
        unblock();
      }
      break;
    default:
      break;
  }
};

export var handleNavigationAction = function handleNavigationAction(_ref) {
  var next = _ref.next,
      action = _ref.action,
      history = _ref.history,
      query = _ref.query;

  // Synchronously dispatch the original action so that the
  // reducer can add it to its location queue
  var originalDispatch = next(action);

  if ((action.type === PUSH || action.type === REPLACE) && action.payload.options && action.payload.options.persistQuery) {
    navigate(history, {
      type: action.type,
      payload: _extends({}, action.payload, mergeQueries(query, action.payload.query))
    });
  } else {
    navigate(history, action);
  }

  return originalDispatch;
};

export default (function (_ref2) {
  var history = _ref2.history;
  return function (_ref3) {
    var getState = _ref3.getState;
    return function (next) {
      return function (action) {
        var query = getState().router.query;

        return isNavigationAction(action) ? handleNavigationAction({ next: next, action: action, history: history, query: query }) : next(action);
      };
    };
  };
});