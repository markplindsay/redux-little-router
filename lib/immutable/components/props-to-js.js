'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('../util/immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = function (WrappedComponent) {
  return function (wrappedProps) {
    var propsJS = Object.keys(wrappedProps).reduce(function (props, key) {
      return _extends({}, props, _defineProperty({}, key, (0, _immutable.isImmutable)(wrappedProps[key]) ? wrappedProps[key].toJS() : wrappedProps[key]));
    }, {});

    return _react2.default.createElement(WrappedComponent, propsJS);
  };
};