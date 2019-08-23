'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createMatcher = require('../util/create-matcher');

var _createMatcher2 = _interopRequireDefault(_createMatcher);

var _validateRoutes = require('../util/validate-routes');

var _validateRoutes2 = _interopRequireDefault(_validateRoutes);

var _flattenRoutes = require('../util/flatten-routes');

var _flattenRoutes2 = _interopRequireDefault(_flattenRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var reducer = _ref.reducer,
      middleware = _ref.middleware,
      enhancer = _ref.enhancer;
  return function (_ref2) {
    var nestedRoutes = _ref2.routes,
        history = _ref2.history,
        location = _ref2.location,
        _ref2$createMatcher = _ref2.createMatcher,
        createMatcher = _ref2$createMatcher === undefined ? _createMatcher2.default : _ref2$createMatcher;

    (0, _validateRoutes2.default)(nestedRoutes);
    var routes = (0, _flattenRoutes2.default)(nestedRoutes);
    var matchRoute = createMatcher(routes);

    return {
      reducer: reducer({
        routes: routes,
        initialLocation: _extends({}, location, matchRoute(location.pathname))
      }),
      middleware: middleware({ history: history }),
      enhancer: enhancer({
        history: history,
        matchRoute: matchRoute,
        createMatcher: createMatcher
      })
    };
  };
};