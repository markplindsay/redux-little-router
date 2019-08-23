var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';

import { isImmutable } from '../util/immutable';

export default (function (WrappedComponent) {
  return function (wrappedProps) {
    var propsJS = Object.keys(wrappedProps).reduce(function (props, key) {
      return _extends({}, props, _defineProperty({}, key, isImmutable(wrappedProps[key]) ? wrappedProps[key].toJS() : wrappedProps[key]));
    }, {});

    return React.createElement(WrappedComponent, propsJS);
  };
});