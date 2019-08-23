'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hapiRouter = require('../../environment/hapi-router');

var _install = require('../install');

var _install2 = _interopRequireDefault(_install);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _hapiRouter.createHapiRouter)(_install2.default);