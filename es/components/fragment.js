import _getContext from 'recompose/getContext';
import _withContext from 'recompose/withContext';
import _compose from 'recompose/compose';
/* eslint-disable react/sort-comp */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import UrlPattern from 'url-pattern';
import React, { Children, Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import matchCache from '../util/match-cache';
import generateId from '../util/generate-id';
import throwError from '../util/throw-error';

var withId = function withId(ComposedComponent) {
  return function (_Component) {
    _inherits(WithId, _Component);

    function WithId() {
      _classCallCheck(this, WithId);

      var _this = _possibleConstructorReturn(this, (WithId.__proto__ || Object.getPrototypeOf(WithId)).call(this));

      _this.id = generateId();
      return _this;
    }

    _createClass(WithId, [{
      key: 'render',
      value: function render() {
        return React.createElement(ComposedComponent, _extends({}, this.props, { id: this.id }));
      }
    }]);

    return WithId;
  }(Component);
};

var resolveChildRoute = function resolveChildRoute(parentRoute, currentRoute) {
  var parentIsRootRoute = parentRoute && parentRoute !== '/' && parentRoute !== currentRoute;

  return parentIsRootRoute ? '' + parentRoute + (currentRoute || '') : currentRoute;
};

var resolveCurrentRoute = function resolveCurrentRoute(parentRoute, currentRoute) {
  if (!currentRoute) {
    return null;
  }

  // First route will always be a wildcard
  if (!parentRoute) {
    return currentRoute + '*';
  }

  var currentIsRootRoute = currentRoute === '/';
  var parentIsRootRoute = parentRoute === '/';

  // Only prefix non-root parent routes
  var routePrefix = !parentIsRootRoute && parentRoute || '';

  // Support "index" routes:
  // <Fragment forRoute='/home'>
  //   <Fragment forRoute='/'>
  //   </Fragment>
  // </Fragment>
  var routeSuffix = currentIsRootRoute && !parentIsRootRoute ? '' : currentRoute;

  var wildcard = currentIsRootRoute && parentIsRootRoute ? '' : '*';

  return '' + routePrefix + routeSuffix + wildcard;
};

var shouldShowFragment = function shouldShowFragment(_ref) {
  var forRoute = _ref.forRoute,
      withConditions = _ref.withConditions,
      matcher = _ref.matcher,
      location = _ref.location;

  if (!forRoute) {
    return withConditions && withConditions(location);
  }

  var matchesRoute = matcher && matcher.match(location.pathname);

  return withConditions ? matchesRoute && withConditions(location) : matchesRoute;
};

export var FragmentComponent = function (_Component2) {
  _inherits(FragmentComponent, _Component2);

  function FragmentComponent(props) {
    _classCallCheck(this, FragmentComponent);

    var _this2 = _possibleConstructorReturn(this, (FragmentComponent.__proto__ || Object.getPrototypeOf(FragmentComponent)).call(this, props));

    var currentRoute = resolveCurrentRoute(props.parentRoute, props.forRoute);

    _this2.matcher = currentRoute && new UrlPattern(currentRoute) || null;
    return _this2;
  }

  _createClass(FragmentComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.forRoute !== nextProps.forRoute) {
        throwError('Updating route props is not yet supported')();
      }

      // When Fragment rerenders, matchCache can get out of sync.
      // Blow it away at the root Fragment on every render.
      if (!this.props.parentId) {
        matchCache.clear();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var matcher = this.matcher;
      var _props = this.props,
          children = _props.children,
          forRoute = _props.forRoute,
          withConditions = _props.withConditions,
          forNoMatch = _props.forNoMatch,
          location = _props.location,
          parentRoute = _props.parentRoute,
          parentId = _props.parentId;


      var shouldShow = shouldShowFragment({
        forRoute: forRoute,
        withConditions: withConditions,
        matcher: matcher,
        location: location
      });

      if (!shouldShow && !forNoMatch) {
        return null;
      }

      var currentRoute = resolveCurrentRoute(parentRoute, forRoute);

      if (parentId) {
        var previousMatch = matchCache.get(parentId);
        if (previousMatch && previousMatch !== currentRoute) {
          return null;
        } else {
          matchCache.add(parentId, currentRoute);
        }
      }

      return Children.only(children);
    }
  }]);

  return FragmentComponent;
}(Component);

export var withIdAndContext = _compose(_getContext({
  parentRoute: PropTypes.string,
  parentId: PropTypes.string
}), withId, _withContext({
  parentRoute: PropTypes.string,
  parentId: PropTypes.string
}, function (props) {
  return {
    parentRoute: resolveChildRoute(props.parentRoute, props.forRoute),
    parentId: props.id
  };
}));

var mapStateToProps = function mapStateToProps(state) {
  return {
    location: state.router
  };
};

export default _compose(connect(mapStateToProps), withIdAndContext)(FragmentComponent);