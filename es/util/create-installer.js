var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { default as matcherFactory } from '../util/create-matcher';
import validateRoutes from '../util/validate-routes';
import flattenRoutes from '../util/flatten-routes';

export default (function (_ref) {
  var reducer = _ref.reducer,
      middleware = _ref.middleware,
      enhancer = _ref.enhancer;
  return function (_ref2) {
    var nestedRoutes = _ref2.routes,
        history = _ref2.history,
        location = _ref2.location,
        _ref2$createMatcher = _ref2.createMatcher,
        createMatcher = _ref2$createMatcher === undefined ? matcherFactory : _ref2$createMatcher;

    validateRoutes(nestedRoutes);
    var routes = flattenRoutes(nestedRoutes);
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
});