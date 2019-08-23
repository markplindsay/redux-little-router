'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _enhancer = require('./enhancer');

var _enhancer2 = _interopRequireDefault(_enhancer);

var _createInstaller = require('./util/create-installer');

var _createInstaller2 = _interopRequireDefault(_createInstaller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createInstaller2.default)({ reducer: _reducer2.default, middleware: _middleware2.default, enhancer: _enhancer2.default });