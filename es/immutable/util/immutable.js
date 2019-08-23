
/* eslint-disable import/no-mutable-exports, no-empty */
import throwError from '../../util/throw-error';

var throwImmutableError = throwError('immutable.js was not imported. Make sure you have it installed.');

var immutable = void 0;
var Map = throwImmutableError;
var List = throwImmutableError;
var fromJS = throwImmutableError;
var isImmutable = throwImmutableError;

try {
  immutable = require('immutable');
  Map = immutable.Map;
  List = immutable.List;
  fromJS = immutable.fromJS;
  // To account for immutable versions 3.8.x -> 4.x.x
  isImmutable = immutable.isImmutable ? immutable.isImmutable : immutable.Iterable.isIterable;
} catch (e) {}

export { Map, List, fromJS, isImmutable };

export default immutable;