'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isImmutable = exports.fromJS = exports.List = exports.Map = undefined;

var _throwError = require('../../util/throw-error');

var _throwError2 = _interopRequireDefault(_throwError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var throwImmutableError = (0, _throwError2.default)('immutable.js was not imported. Make sure you have it installed.');
/* eslint-disable import/no-mutable-exports, no-empty */


var immutable = void 0;
var Map = throwImmutableError;
var List = throwImmutableError;
var fromJS = throwImmutableError;
var isImmutable = throwImmutableError;

try {
  immutable = require('immutable');
  exports.Map = Map = immutable.Map;
  exports.List = List = immutable.List;
  exports.fromJS = fromJS = immutable.fromJS;
  // To account for immutable versions 3.8.x -> 4.x.x
  exports.isImmutable = isImmutable = immutable.isImmutable ? immutable.isImmutable : immutable.Iterable.isIterable;
} catch (e) {}

exports.Map = Map;
exports.List = List;
exports.fromJS = fromJS;
exports.isImmutable = isImmutable;
exports.default = immutable;