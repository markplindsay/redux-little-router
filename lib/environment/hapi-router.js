'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHapiRouter = undefined;

var _createMemoryHistory = require('history/createMemoryHistory');

var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);

var _normalizeHref = require('../util/normalize-href');

var _normalizeHref2 = _interopRequireDefault(_normalizeHref);

var _install = require('../install');

var _install2 = _interopRequireDefault(_install);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createHapiRouter = exports.createHapiRouter = function createHapiRouter(installer) {
  return function (_ref) {
    var routes = _ref.routes,
        request = _ref.request,
        _ref$historyOptions = _ref.historyOptions,
        historyOptions = _ref$historyOptions === undefined ? {} : _ref$historyOptions;

    var history = (0, _createMemoryHistory2.default)(historyOptions);

    var location = (0, _normalizeHref2.default)({
      pathname: request.path,
      query: request.query
    });

    return installer({ routes: routes, history: history, location: location });
  };
};

exports.default = createHapiRouter(_install2.default);