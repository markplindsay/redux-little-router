'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExpressRouter = undefined;

var _createMemoryHistory = require('history/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _normalizeHref = require('../util/normalize-href');

var _normalizeHref2 = _interopRequireDefault(_normalizeHref);

var _install = require('../install');

var _install2 = _interopRequireDefault(_install);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locationForRequest = function locationForRequest(request) {
  var pathname = request.path,
      basename = request.baseUrl,
      query = request.query;

  var descriptor = basename ? { pathname: pathname, basename: basename, query: query } : { pathname: pathname, query: query };
  return (0, _normalizeHref2.default)(descriptor);
};

var createExpressRouter = exports.createExpressRouter = function createExpressRouter(installer) {
  return function (_ref) {
    var routes = _ref.routes,
        request = _ref.request,
        _ref$historyOptions = _ref.historyOptions,
        historyOptions = _ref$historyOptions === undefined ? {} : _ref$historyOptions;

    var history = (0, _createMemoryHistory2.default)(historyOptions);
    var location = locationForRequest(request);

    return installer({ routes: routes, history: history, location: location });
  };
};

exports.default = createExpressRouter(_install2.default);