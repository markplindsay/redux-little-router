'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require('../types');

var _middleware = require('../middleware');

exports.default = function (_ref) {
  var history = _ref.history;
  return function (_ref2) {
    var getState = _ref2.getState;
    return function (next) {
      return function (action) {
        var query = getState().getIn(['router', 'query']);
        return (0, _types.isNavigationAction)(action) ? (0, _middleware.handleNavigationAction)({
          next: next,
          action: action,
          history: history,
          query: query && query.toJS()
        }) : next(action);
      };
    };
  };
};