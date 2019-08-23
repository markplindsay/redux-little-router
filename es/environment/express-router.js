

import createMemoryHistory from 'history/createMemoryHistory';


import normalizeHref from '../util/normalize-href';
import install from '../install';

var locationForRequest = function locationForRequest(request) {
  var pathname = request.path,
      basename = request.baseUrl,
      query = request.query;

  var descriptor = basename ? { pathname: pathname, basename: basename, query: query } : { pathname: pathname, query: query };
  return normalizeHref(descriptor);
};

export var createExpressRouter = function createExpressRouter(installer) {
  return function (_ref) {
    var routes = _ref.routes,
        request = _ref.request,
        _ref$historyOptions = _ref.historyOptions,
        historyOptions = _ref$historyOptions === undefined ? {} : _ref$historyOptions;

    var history = createMemoryHistory(historyOptions);
    var location = locationForRequest(request);

    return installer({ routes: routes, history: history, location: location });
  };
};

export default createExpressRouter(install);