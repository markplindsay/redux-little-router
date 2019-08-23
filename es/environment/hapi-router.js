

import createMemoryHistory from 'history/createMemoryHistory';


import normalizeHref from '../util/normalize-href';
import install from '../install';

export var createHapiRouter = function createHapiRouter(installer) {
  return function (_ref) {
    var routes = _ref.routes,
        request = _ref.request,
        _ref$historyOptions = _ref.historyOptions,
        historyOptions = _ref$historyOptions === undefined ? {} : _ref$historyOptions;

    var history = createMemoryHistory(historyOptions);

    var location = normalizeHref({
      pathname: request.path,
      query: request.query
    });

    return installer({ routes: routes, history: history, location: location });
  };
};

export default createHapiRouter(install);