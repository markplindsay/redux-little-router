'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNavigationAction = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
/* eslint-disable consistent-return */


var _types = require('./types');

var _mergeQueries = require('./util/merge-queries');

var _mergeQueries2 = _interopRequireDefault(_mergeQueries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unblock = null;

var navigate = function navigate(history, action) {
  switch (action.type) {
    case _types.PUSH:
      history.push(action.payload);
      break;
    case _types.REPLACE:
      history.replace(action.payload);
      break;
    case _types.GO:
      history.go(action.payload);
      break;
    case _types.GO_BACK:
      history.goBack();
      break;
    case _types.GO_FORWARD:
      history.goForward();
      break;
    case _types.BLOCK:
      unblock = history.block(action.payload);
      break;
    case _types.UNBLOCK:
      if (unblock) {
        unblock();
      }
      break;
    default:
      break;
  }
};

var handleNavigationAction = exports.handleNavigationAction = function handleNavigationAction(_ref) {
  var next = _ref.next,
      action = _ref.action,
      history = _ref.history,
      query = _ref.query;

  // Synchronously dispatch the original action so that the
  // reducer can add it to its location queue
  var originalDispatch = next(action);

  if ((action.type === _types.PUSH || action.type === _types.REPLACE) && action.payload.options && action.payload.options.persistQuery) {
    navigate(history, {
      type: action.type,
      payload: _extends({}, action.payload, (0, _mergeQueries2.default)(query, action.payload.query))
    });
  } else {
    navigate(history, action);
  }

  return originalDispatch;
};

exports.default = function (_ref2) {
  var history = _ref2.history;
  return function (_ref3) {
    var getState = _ref3.getState;
    return function (next) {
      return function (action) {
        var query = getState().router.query;

        return (0, _types.isNavigationAction)(action) ? handleNavigationAction({ next: next, action: action, history: history, query: query }) : next(action);
      };
    };
  };
};