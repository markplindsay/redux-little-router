import UrlPattern from 'url-pattern';

var hasTrailingSlash = /\w+\/$/;

var eagerMatcher = function eagerMatcher(routeList) {
  return function (incomingUrl) {
    // Discard query strings
    var pathname = incomingUrl.split('?')[0].replace(hasTrailingSlash, function (path) {
      return path.slice(0, path.length - 1);
    });

    // Find the route that matches the URL
    for (var i = 0; i < routeList.length; i++) {
      var storedRoute = routeList[i];
      var match = storedRoute.pattern.match(pathname);

      if (match) {
        // Return the matched params and user-defined result object
        return {
          route: storedRoute.route,
          params: match,
          result: storedRoute.result
        };
      }
    }

    return null;
  };
};

export default (function (routes) {
  var routeList = Object.keys(routes).sort().reverse().map(function (route) {
    return {
      route: route,
      pattern: new UrlPattern(route),
      result: routes[route]
    };
  });

  return eagerMatcher(routeList);
});