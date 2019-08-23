'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImmutableFragment = exports.ImmutablePersistentQueryLink = exports.ImmutableLink = exports.immutableRouterForHash = exports.immutableRouterForHapi = exports.immutableRouterForExpress = exports.immutableRouterForBrowser = undefined;

var _browserRouter = require('./environment/browser-router');

var _browserRouter2 = _interopRequireDefault(_browserRouter);

var _expressRouter = require('./environment/express-router');

var _expressRouter2 = _interopRequireDefault(_expressRouter);

var _hashRouter = require('./environment/hash-router');

var _hashRouter2 = _interopRequireDefault(_hashRouter);

var _hapiRouter = require('./environment/hapi-router');

var _hapiRouter2 = _interopRequireDefault(_hapiRouter);

var _link = require('./components/link');

var _fragment = require('./components/fragment');

var _fragment2 = _interopRequireDefault(_fragment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.immutableRouterForBrowser = _browserRouter2.default;
exports.immutableRouterForExpress = _expressRouter2.default;
exports.immutableRouterForHapi = _hapiRouter2.default;
exports.immutableRouterForHash = _hashRouter2.default;
exports.ImmutableLink = _link.ImmutableLink;
exports.ImmutablePersistentQueryLink = _link.ImmutablePersistentQueryLink;
exports.ImmutableFragment = _fragment2.default;